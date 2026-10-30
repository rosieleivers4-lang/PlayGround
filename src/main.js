import * as THREE from 'three';
import { buildWorld, addSky } from './world.js';
import { createRider } from './rider.js';
import { createCarrotField } from './carrots.js';
import { Game } from './game.js';
import { Input } from './input.js';
import { UI } from './ui.js';
import { GameAudio } from './audio.js';

async function boot() {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {}
  }

  const canvas = document.getElementById('game');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      alpha: false,
    });
  } catch (err) {
    console.error(err);
    document.body.innerHTML =
      '<div style="color:#f6f2e4;font-family:sans-serif;padding:40px;line-height:1.6">This game needs WebGL. Try Chrome, Safari or Firefox with hardware acceleration enabled.</div>';
    return;
  }

  const isTouch = (navigator.maxTouchPoints || 0) > 0 || window.matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouch ? 1.75 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xc7d4cf, 720, 2800);

  const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 9000);
  camera.position.set(-320, 4, -80);

  addSky(scene);

  const hemi = new THREE.HemisphereLight(0xc6ddff, 0x4b5536, 1.72);
  scene.add(hemi);
  const ambient = new THREE.AmbientLight(0xfff3dd, 0.32);
  scene.add(ambient);

  // Camera-attached fill so the black rider never reads as a silhouette.
  const fill = new THREE.DirectionalLight(0xdfe9ff, 1.45);
  fill.target.position.set(0, 0, -1);
  scene.add(fill);
  scene.add(fill.target);
  const fillForward = new THREE.Vector3();

  const sun = new THREE.DirectionalLight(0xfff0d0, 2.75);
  sun.position.set(140, 220, 110);
  sun.castShadow = true;
  sun.shadow.mapSize.set(isTouch ? 1024 : 2048, isTouch ? 1024 : 2048);
  sun.shadow.camera.left = -90;
  sun.shadow.camera.right = 90;
  sun.shadow.camera.top = 90;
  sun.shadow.camera.bottom = -90;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 560;
  sun.shadow.bias = -0.00035;
  sun.shadow.normalBias = 0.025;
  scene.add(sun);
  scene.add(sun.target);

  const world = buildWorld(scene, renderer);

  const loader = new THREE.TextureLoader();
  const texturePaths = {
    boltLeft: '/assets/bolt-left.png',
    boltRight: '/assets/bolt-right.png',
    logo: '/assets/motorbunny-logo.png',
  };
  const loaded = await Promise.all(
    Object.values(texturePaths).map((p) => loader.loadAsync(p).catch(() => null))
  );
  const textures = {};
  Object.keys(texturePaths).forEach((key, i) => {
    const t = loaded[i];
    if (t) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
    }
    textures[key] = t;
  });

  const rider = createRider(textures);
  scene.add(rider.root);
  const carrots = createCarrotField(scene, world.carrotSpawns);
  const ui = new UI();
  const input = new Input();
  const audio = new GameAudio();
  const game = new Game({ scene, camera, renderer, world, rider, carrots, ui, input, audio, sun });

  input.onKey((e) => game.hotkey(e));

  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouch ? 1.75 : 2));
    renderer.setSize(w, h);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && game.state === 'playing') game.pause();
  });

  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  window.addEventListener('contextmenu', (e) => {
    if (e.target === canvas) e.preventDefault();
  });

  // optional tilt permission is requested from the menu toggle (a real gesture)
  window.__carrotRunner = { game, world, scene, camera, renderer, input, audio, ui };

  const clock = new THREE.Clock();
  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    if (input.consumeInteract()) game.tryRefuel();
    game.update(dt, elapsed);
    camera.getWorldDirection(fillForward);
    fill.position.copy(camera.position).addScaledVector(fillForward, -1.5);
    fill.target.position.copy(camera.position).addScaledVector(fillForward, 12);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  document.body.classList.add('game-ready');
  console.info(`East Midlands online · ${world.roads.length} roads · ${world.carrotSpawns.length} golden carrots`);
}

boot().catch((err) => {
  console.error(err);
  const msg = document.createElement('div');
  msg.style.cssText =
    'position:fixed;inset:0;display:grid;place-items:center;background:#080b08;color:#f6f2e4;font-family:sans-serif;padding:30px;text-align:center;z-index:99';
  msg.innerHTML = '<div><h2>Could not start the bike</h2><p>Check the browser console for details.</p></div>';
  document.body.appendChild(msg);
});
