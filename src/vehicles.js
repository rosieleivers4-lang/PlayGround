import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { makeCanvas, canvasTexture, roundRect } from './utils.js';

const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0a0b0b, roughness: 0.98 });
const hubMat = new THREE.MeshStandardMaterial({ color: 0x9ba0a0, roughness: 0.4, metalness: 0.75 });
const glassMat = new THREE.MeshStandardMaterial({
  color: 0x172325,
  roughness: 0.12,
  metalness: 0.35,
  emissive: 0x0b1414,
  emissiveIntensity: 0.2,
});
const headMat = new THREE.MeshStandardMaterial({
  color: 0xfff5cf,
  emissive: 0xffedb0,
  emissiveIntensity: 2.6,
  roughness: 0.3,
});
const tailMat = new THREE.MeshStandardMaterial({
  color: 0xff2a20,
  emissive: 0xff160c,
  emissiveIntensity: 1.8,
  roughness: 0.4,
});

function box(w, h, d, x, y, z) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.translate(x, y, z);
  return g;
}

function wheelsGeometry(w, track, wheelbase, radius = 0.34, wheelWidth = 0.22) {
  const parts = [];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const tyre = new THREE.CylinderGeometry(radius, radius, wheelWidth, 12);
      tyre.rotateZ(Math.PI / 2);
      tyre.translate((sx * track) / 2, radius, (sz * wheelbase) / 2);
      parts.push(tyre);
      const hub = new THREE.CylinderGeometry(radius * 0.42, radius * 0.42, wheelWidth + 0.02, 8);
      hub.rotateZ(Math.PI / 2);
      hub.translate((sx * track) / 2, radius, (sz * wheelbase) / 2);
      parts.push(hub);
    }
  }
  const merged = mergeGeometries(parts);
  parts.forEach((g) => g.dispose());
  return merged;
}

const TYPE_SPECS = {
  car: {
    bodyW: 1.8,
    bodyH: 0.62,
    bodyL: 4.1,
    bodyY: 0.58,
    cabinW: 1.62,
    cabinH: 0.55,
    cabinL: 2.0,
    cabinY: 1.14,
    cabinZ: -0.18,
    wheelbase: 2.6,
    track: 1.6,
    wheelR: 0.33,
    wheelW: 0.22,
    weight: 0.64,
  },
  van: {
    bodyW: 2.0,
    bodyH: 1.25,
    bodyL: 5.1,
    bodyY: 0.92,
    cabinW: 1.82,
    cabinH: 0.62,
    cabinL: 1.55,
    cabinY: 1.72,
    cabinZ: 1.45,
    wheelbase: 3.1,
    track: 1.7,
    wheelR: 0.37,
    wheelW: 0.26,
    weight: 0.19,
  },
  lorry: {
    bodyW: 2.42,
    bodyH: 2.0,
    bodyL: 7.0,
    bodyY: 1.55,
    cabinW: 2.3,
    cabinH: 1.35,
    cabinL: 2.2,
    cabinY: 2.3,
    cabinZ: 2.2,
    wheelbase: 4.2,
    track: 2.0,
    wheelR: 0.46,
    wheelW: 0.3,
    weight: 0.1,
  },
  bus: {
    bodyW: 2.45,
    bodyH: 2.85,
    bodyL: 8.2,
    bodyY: 1.9,
    cabinW: 2.3,
    cabinH: 0.8,
    cabinL: 7.4,
    cabinY: 2.6,
    cabinZ: 0,
    wheelbase: 5.1,
    track: 2.0,
    wheelR: 0.45,
    wheelW: 0.3,
    weight: 0.07,
  },
};

const palette = [0xb63232, 0x2e5e9e, 0xd7d4cc, 0x2b2e33, 0x6a7d68, 0xc7a444, 0x5a4a72, 0x8b4d3a, 0x3b6f76, 0xcf7c30, 0x445c36];

function policeLiveryTexture() {
  const { canvas, ctx } = makeCanvas(512, 160);
  ctx.fillStyle = '#f4f5f1';
  ctx.fillRect(0, 0, 512, 160);
  const colors = ['#193a9b', '#f2d21a'];
  const sw = 42;
  for (let x = 0; x < 512; x += sw) {
    ctx.fillStyle = colors[(x / sw) % 2];
    ctx.fillRect(x, 92, sw, 38);
  }
  ctx.fillStyle = '#111';
  ctx.font = '800 46px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('POLICE', 256, 48);
  ctx.font = '700 22px "Barlow Condensed", Arial, sans-serif';
  ctx.fillText('EAST MIDLANDS TRAFFIC', 256, 140);
  return canvasTexture(canvas);
}

export function createVehicle(type = 'car', color = null, { police = false } = {}) {
  const spec = TYPE_SPECS[type] || TYPE_SPECS.car;
  const group = new THREE.Group();
  group.name = police ? 'Traffic police car' : type;

  const baseColor = color ?? palette[Math.floor(Math.random() * palette.length)];
  const bodyMat = new THREE.MeshStandardMaterial({
    color: police ? 0xf2f3ee : baseColor,
    roughness: police ? 0.42 : 0.55,
    metalness: 0.18,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(spec.bodyW, spec.bodyH, spec.bodyL), bodyMat);
  body.position.y = spec.bodyY;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  if (type === 'lorry') {
    const cargo = new THREE.Mesh(
      new THREE.BoxGeometry(spec.bodyW, 2.4, 4.2),
      new THREE.MeshStandardMaterial({ color: police ? 0xffffff : 0xd8d6ca, roughness: 0.7 })
    );
    cargo.position.set(0, 1.85, -1.25);
    cargo.castShadow = true;
    group.add(cargo);
  }
  if (type === 'bus') {
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(spec.bodyW + 0.02, 0.18, spec.bodyL + 0.02),
      new THREE.MeshStandardMaterial({ color: 0x6a3f8f, roughness: 0.6 })
    );
    stripe.position.y = 1.4;
    group.add(stripe);
  }

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(spec.cabinW, spec.cabinH, spec.cabinL), glassMat);
  cabin.position.set(0, spec.cabinY, spec.cabinZ);
  cabin.castShadow = true;
  group.add(cabin);

  const wheels = new THREE.Mesh(wheelsGeometry(spec.bodyW + 0.05, spec.track, spec.wheelbase, spec.wheelR, spec.wheelW), wheelMat);
  group.add(wheels);

  const headGeo = mergeGeometries([
    box(0.34, 0.13, 0.04, -spec.bodyW * 0.31, spec.bodyY + 0.08, spec.bodyL / 2 + 0.01),
    box(0.34, 0.13, 0.04, spec.bodyW * 0.31, spec.bodyY + 0.08, spec.bodyL / 2 + 0.01),
  ]);
  group.add(new THREE.Mesh(headGeo, headMat));

  const tailGeo = mergeGeometries([
    box(0.3, 0.11, 0.04, -spec.bodyW * 0.32, spec.bodyY + 0.1, -spec.bodyL / 2 - 0.01),
    box(0.3, 0.11, 0.04, spec.bodyW * 0.32, spec.bodyY + 0.1, -spec.bodyL / 2 - 0.01),
  ]);
  group.add(new THREE.Mesh(tailGeo, tailMat));

  if (police) {
    const liveryMat = new THREE.MeshBasicMaterial({ map: policeLiveryTexture() });
    for (const side of [-1, 1]) {
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(spec.bodyL * 0.85, 0.52), liveryMat);
      panel.position.set(side * (spec.bodyW / 2 + 0.011), spec.bodyY + 0.02, 0);
      panel.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
      group.add(panel);
    }
    const barBase = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.1, 0.28), new THREE.MeshStandardMaterial({ color: 0x1a1c1d, roughness: 0.5 }));
    barBase.position.set(0, 1.54, -0.1);
    group.add(barBase);
    const redMat = new THREE.MeshStandardMaterial({ color: 0xff2b36, emissive: 0xff1a26, emissiveIntensity: 2.4, roughness: 0.3 });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x2f7bff, emissive: 0x1d5bff, emissiveIntensity: 2.4, roughness: 0.3 });
    const red = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.11, 0.25), redMat);
    red.position.set(-0.23, 1.6, -0.1);
    group.add(red);
    const blue = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.11, 0.25), blueMat);
    blue.position.set(0.23, 1.6, -0.1);
    group.add(blue);
    const push = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.26, 0.12), new THREE.MeshStandardMaterial({ color: 0x24292b, roughness: 0.5, metalness: 0.5 }));
    push.position.set(0, 0.55, spec.bodyL / 2 + 0.15);
    group.add(push);
    group.userData.lights = { red: redMat, blue: blueMat };
    group.userData.isPolice = true;
  }

  group.userData.type = type;
  group.userData.bodyMat = bodyMat;
  group.userData.length = spec.bodyL;
  group.userData.width = spec.bodyW;
  group.userData.spec = spec;
  return group;
}

export function pickVehicleType(rng) {
  const r = rng();
  let acc = 0;
  for (const [type, spec] of Object.entries(TYPE_SPECS)) {
    acc += spec.weight;
    if (r <= acc) return type;
  }
  return 'car';
}
