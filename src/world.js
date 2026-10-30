import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { WORLD, TOWNS, NODES, EDGES, KIND, STATIONS } from './config.js';
import {
  clamp,
  lerp,
  makeRng,
  makeCanvas,
  canvasTexture,
  makeLabelTexture,
  makeSpeedLimitTexture,
  distancePointSegment,
  roundRect,
} from './utils.js';

const MAP_W = WORLD.maxX - WORLD.minX;
const MAP_H = WORLD.maxZ - WORLD.minZ;

function quadGeometry(ax, az, bx, bz, width, y, colorShift = 0) {
  const dx = bx - ax;
  const dz = bz - az;
  const len = Math.hypot(dx, dz) || 1;
  const nx = (-dz / len) * (width / 2);
  const nz = (dx / len) * (width / 2);
  const p = [
    ax - nx, y, az - nz,
    ax + nx, y, az + nz,
    bx + nx, y, bz + nz,
    ax - nx, y, az - nz,
    bx + nx, y, bz + nz,
    bx - nx, y, bz - nz,
  ];
  const n = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
  const uv = [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(n, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}

function quadFromSegment(ax, az, bx, bz, width, y, u0 = 0, u1 = 1) {
  const dx = bx - ax;
  const dz = bz - az;
  const len = Math.hypot(dx, dz) || 1;
  const px = (-dz / len) * (width / 2);
  const pz = (dx / len) * (width / 2);
  const p = [
    ax - px, y, az - pz,
    ax + px, y, az + pz,
    bx + px, y, bz + pz,
    ax - px, y, az - pz,
    bx + px, y, bz + pz,
    bx - px, y, bz - pz,
  ];
  const n = new Array(18).fill(0);
  for (let i = 0; i < 6; i++) n[i * 3 + 1] = 1;
  const uv = [u0, 0, u1, 0, u1, 1, u0, 0, u1, 1, u0, 1];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(n, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}

function discGeometry(x, z, radius, y, segments = 20) {
  const g = new THREE.CircleGeometry(radius, segments);
  g.rotateX(-Math.PI / 2);
  g.translate(x, y, z);
  const ng = g.toNonIndexed();
  g.dispose();
  return ng;
}

function createTerrainTexture(roads) {
  const W = 2048;
  const H = Math.round((W * MAP_H) / MAP_W);
  const { canvas, ctx } = makeCanvas(W, H);
  const rng = makeRng(8123);
  const toU = (x) => ((x - WORLD.minX) / MAP_W) * W;
  const toV = (z) => ((z - WORLD.minZ) / MAP_H) * H;

  ctx.fillStyle = '#5d7f46';
  ctx.fillRect(0, 0, W, H);

  // patchwork fields with dark hedgerow boundaries
  const cols = 29;
  const rows = 23;
  const cw = W / cols;
  const ch = H / rows;
  const palette = ['#6f934e', '#7b9b4f', '#89a354', '#55783e', '#9ba75b', '#b4ac68', '#7d8f48', '#c1b577'];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const jx = (rng.next() - 0.5) * cw * 0.18;
      const jy = (rng.next() - 0.5) * ch * 0.18;
      const w = cw + 2 + (rng.next() - 0.5) * 4;
      const h = ch + 2 + (rng.next() - 0.5) * 4;
      ctx.fillStyle = palette[Math.floor(rng.next() * palette.length)];
      ctx.fillRect(x * cw + jx + 1, y * ch + jy + 1, w - 2, h - 2);
      if (rng.chance(0.45)) {
        ctx.fillStyle = 'rgba(30,55,28,0.10)';
        ctx.fillRect(x * cw + jx + 1, y * ch + jy + 1, w - 2, h * 0.22);
      }
      ctx.strokeStyle = 'rgba(36,62,32,0.55)';
      ctx.lineWidth = 2.2;
      ctx.strokeRect(x * cw + jx + 1, y * ch + jy + 1, w - 2, h - 2);
    }
  }

  // soft woods
  for (let i = 0; i < 95; i++) {
    const x = rng.next() * W;
    const y = rng.next() * H;
    const r = 12 + rng.next() * 60;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(38,73,36,0.85)');
    grad.addColorStop(1, 'rgba(38,73,36,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // town textures
  for (const town of Object.values(TOWNS)) {
    const x = toU(town.x);
    const y = toV(town.z);
    const r = (town.radius / MAP_W) * W * 1.45;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(154,146,124,0.82)');
    grad.addColorStop(0.55, 'rgba(132,130,111,0.58)');
    grad.addColorStop(1, 'rgba(116,125,90,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(214,199,158,0.25)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.45, 0, Math.PI * 2);
    ctx.stroke();
  }

  // rivers — Trent, Soar and Derwent
  const drawRiver = (points, width, tint) => {
    ctx.strokeStyle = tint;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    points.forEach(([wx, wz], i) => {
      const x = toU(wx);
      const y = toV(wz);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  };
  const trent = [
    [-980, 80], [-830, 180], [-690, 240], [-510, 250], [-330, 215],
    [-150, 140], [20, 30], [190, -90], [350, -190], [520, -260],
    [690, -300], [850, -325], [1030, -330],
  ];
  drawRiver(trent, 34, '#3f6f8d');
  drawRiver(trent, 20, '#5f93ad');
  const soar = [[250, 720], [285, 560], [300, 380], [270, 250], [120, 120], [-10, 50]];
  drawRiver(soar, 18, '#4e809b');
  const derwent = [[-980, 80], [-930, 220], [-840, 330], [-720, 390], [-650, 420]];
  drawRiver(derwent, 15, '#4e809b');

  // field detail speckles
  for (let i = 0; i < 7000; i++) {
    const x = rng.next() * W;
    const y = rng.next() * H;
    ctx.fillStyle = rng.chance(0.5) ? 'rgba(235,232,178,0.07)' : 'rgba(24,45,22,0.08)';
    ctx.fillRect(x, y, 2, 2);
  }

  // a subtle motorway halo on the ground
  ctx.globalAlpha = 0.5;
  for (const r of roads) {
    if (r.minor) continue;
    ctx.strokeStyle = 'rgba(70,65,55,0.55)';
    ctx.lineWidth = Math.max(5, (r.width / MAP_W) * W * 1.8);
    ctx.beginPath();
    ctx.moveTo(toU(r.ax), toV(r.az));
    ctx.lineTo(toU(r.bx), toV(r.bz));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  return canvasTexture(canvas, { anisotropy: 8 });
}

function createFacadeTexture() {
  const { canvas, ctx } = makeCanvas(128, 128);
  const rng = makeRng(42);
  ctx.fillStyle = '#efe7d7';
  ctx.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const wx = 11 + x * 29;
      const wy = 12 + y * 29;
      ctx.fillStyle = rng.chance(0.18) ? '#e8c777' : '#29313a';
      ctx.fillRect(wx, wy, 15, 18);
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.fillRect(wx, wy, 15, 3);
    }
  }
  ctx.fillStyle = 'rgba(80,55,35,0.18)';
  ctx.fillRect(0, 0, 128, 5);
  ctx.fillRect(0, 123, 128, 5);
  return canvasTexture(canvas);
}

function createPoliceTexture() {
  const { canvas, ctx } = makeCanvas(512, 128);
  ctx.fillStyle = '#f3f4f0';
  ctx.fillRect(0, 0, 512, 128);
  const colors = ['#16358f', '#f4d21a'];
  const sw = 34;
  for (let x = 0; x < 512; x += sw) {
    ctx.fillStyle = colors[(x / sw) % 2];
    ctx.fillRect(x, 74, sw, 28);
  }
  ctx.fillStyle = '#111';
  ctx.font = '800 40px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('POLICE', 256, 48);
  return canvasTexture(canvas);
}

function createFuelTexture(name) {
  const { canvas, ctx } = makeCanvas(512, 256);
  ctx.fillStyle = '#090c0a';
  roundRect(ctx, 4, 4, 504, 248, 20);
  ctx.fill();
  ctx.strokeStyle = '#d9ff3a';
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#d9ff3a';
  ctx.font = '800 66px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CARROT FUEL', 256, 82);
  ctx.fillStyle = '#f6f1df';
  ctx.font = '800 74px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
  ctx.fillText(name, 256, 162);
  ctx.fillStyle = '#f2b52f';
  ctx.font = '700 34px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
  ctx.fillText('3 CARROTS  =  45 LITRES', 256, 218);
  return canvasTexture(canvas);
}

function createPriceTexture() {
  const { canvas, ctx } = makeCanvas(256, 320);
  ctx.fillStyle = '#0b0e0c';
  roundRect(ctx, 4, 4, 248, 312, 16);
  ctx.fill();
  ctx.strokeStyle = '#f2b52f';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#d9ff3a';
  ctx.font = '800 36px "Barlow Condensed", Arial, sans-serif';
  ctx.fillText('GOLDEN', 128, 58);
  ctx.fillText('CARROTS', 128, 96);
  ctx.strokeStyle = 'rgba(242,181,47,0.4)';
  ctx.beginPath();
  ctx.moveTo(30, 116);
  ctx.lineTo(226, 116);
  ctx.stroke();
  ctx.fillStyle = '#f6f1df';
  ctx.font = '800 54px "Barlow Condensed", Arial, sans-serif';
  ctx.fillText('3 = 45L', 128, 180);
  ctx.fillStyle = '#f2b52f';
  ctx.font = '700 30px "Barlow Condensed", Arial, sans-serif';
  ctx.fillText('PETROL', 128, 234);
  ctx.fillStyle = '#9fb18f';
  ctx.font = '600 22px "Barlow Condensed", Arial, sans-serif';
  ctx.fillText('THANK YOU', 128, 276);
  return canvasTexture(canvas);
}

function createTownSignTexture(name, limit) {
  const { canvas, ctx } = makeCanvas(640, 260);
  ctx.fillStyle = '#f7f5ea';
  roundRect(ctx, 4, 4, 632, 252, 26);
  ctx.fill();
  ctx.strokeStyle = '#1f5c36';
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.fillStyle = '#151714';
  ctx.font = '800 82px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(name.toUpperCase(), 320, 112);
  ctx.fillStyle = '#1f5c36';
  ctx.font = '700 34px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
  ctx.fillText('PLEASE DRIVE CAREFULLY', 320, 172);
  ctx.fillStyle = '#d7262e';
  ctx.beginPath();
  ctx.arc(320, 212, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '800 30px "Barlow Condensed", Arial, sans-serif';
  ctx.fillText(String(limit), 320, 223);
  return canvasTexture(canvas);
}

export function buildWorld(scene, renderer) {
  const root = new THREE.Group();
  root.name = 'East Midlands';
  scene.add(root);
  const rng = makeRng(20261014);

  const nodes = {};
  for (const [id, [x, z]] of Object.entries(NODES)) nodes[id] = { id, x, z };

  const roads = [];
  const addRoad = (aId, bId, kindKey, limit, ref, minor = false) => {
    const a = nodes[aId];
    const b = nodes[bId];
    if (!a || !b) return null;
    const kind = KIND[kindKey] || KIND.aroad;
    const road = {
      id: roads.length,
      a: aId,
      b: bId,
      ax: a.x,
      az: a.z,
      bx: b.x,
      bz: b.z,
      kind: kindKey,
      minor,
      width: kind.width,
      lane: kind.lane,
      limit: limit || kind.limit,
      ref: ref || '',
      length: Math.hypot(b.x - a.x, b.z - a.z),
      dx: (b.x - a.x) / (Math.hypot(b.x - a.x, b.z - a.z) || 1),
      dz: (b.z - a.z) / (Math.hypot(b.x - a.x, b.z - a.z) || 1),
    };
    roads.push(road);
    return road;
  };

  for (const [a, b, kind, limit, ref] of EDGES) addRoad(a, b, kind, limit, ref);

  // A little urban street grid around each town, so towns feel like towns.
  for (const [key, town] of Object.entries(TOWNS)) {
    const r = Math.min(115, town.radius * 0.72);
    const ring = {
      nw: [town.x - r, town.z - r],
      ne: [town.x + r, town.z - r],
      se: [town.x + r, town.z + r],
      sw: [town.x - r, town.z + r],
      w: [town.x - r * 1.6, town.z],
      e: [town.x + r * 1.6, town.z],
      n: [town.x, town.z - r * 1.6],
      s: [town.x, town.z + r * 1.6],
    };
    for (const [suffix, [x, z]] of Object.entries(ring)) {
      nodes[`${key}_${suffix}`] = { id: `${key}_${suffix}`, x, z };
    }
    addRoad(`${key}_nw`, `${key}_ne`, 'town', 30, '', true);
    addRoad(`${key}_ne`, `${key}_se`, 'town', 30, '', true);
    addRoad(`${key}_se`, `${key}_sw`, 'town', 30, '', true);
    addRoad(`${key}_sw`, `${key}_nw`, 'town', 30, '', true);
    addRoad(`${key}_w`, `${key}_nw`, 'town', 30, '', true);
    addRoad(`${key}_nw`, `${key}_n`, 'town', 30, '', true);
    addRoad(`${key}_n`, `${key}_ne`, 'town', 30, '', true);
    addRoad(`${key}_ne`, `${key}_e`, 'town', 30, '', true);
    addRoad(`${key}_e`, `${key}_se`, 'town', 30, '', true);
    addRoad(`${key}_se`, `${key}_s`, 'town', 30, '', true);
    addRoad(`${key}_s`, `${key}_sw`, 'town', 30, '', true);
    addRoad(`${key}_sw`, `${key}_w`, 'town', 30, '', true);
  }

  // ---------- spatial index for road queries ----------
  const CELL = 130;
  const grid = new Map();
  const cellKey = (cx, cz) => `${cx},${cz}`;
  for (const road of roads) {
    const minX = Math.min(road.ax, road.bx) - road.width;
    const maxX = Math.max(road.ax, road.bx) + road.width;
    const minZ = Math.min(road.az, road.bz) - road.width;
    const maxZ = Math.max(road.az, road.bz) + road.width;
    for (let cx = Math.floor(minX / CELL); cx <= Math.floor(maxX / CELL); cx++) {
      for (let cz = Math.floor(minZ / CELL); cz <= Math.floor(maxZ / CELL); cz++) {
        const k = cellKey(cx, cz);
        if (!grid.has(k)) grid.set(k, []);
        grid.get(k).push(road);
      }
    }
  }

  function nearestTown(x, z, slack = 0) {
    let best = null;
    let bestD = Infinity;
    for (const town of Object.values(TOWNS)) {
      const d = Math.hypot(x - town.x, z - town.z);
      if (d - town.radius <= slack && d < bestD) {
        best = town;
        bestD = d;
      }
    }
    return best;
  }

  function effectiveLimit(road, x, z) {
    let limit = road.limit;
    if (road.kind !== 'motorway' && road.kind !== 'trunk') {
      const town = nearestTown(x, z);
      if (town) limit = Math.min(limit, town.limit);
    }
    return limit;
  }

  const queryScratch = { road: null, dist: Infinity, t: 0, x: 0, z: 0 };
  function queryRoad(x, z) {
    const cx = Math.floor(x / CELL);
    const cz = Math.floor(z / CELL);
    let best = null;
    let bestD = Infinity;
    let bestT = 0;
    for (let ix = cx - 1; ix <= cx + 1; ix++) {
      for (let iz = cz - 1; iz <= cz + 1; iz++) {
        const list = grid.get(cellKey(ix, iz));
        if (!list) continue;
        for (const road of list) {
          const res = distancePointSegment(x, z, road.ax, road.az, road.bx, road.bz);
          if (res.dist < bestD) {
            bestD = res.dist;
            best = road;
            bestT = res.t;
          }
        }
      }
    }
    if (!best) return { onRoad: false, dist: 999, limit: 30, road: null, town: nearestTown(x, z) };
    const onRoad = bestD <= best.width / 2 + 1.4;
    return {
      road: best,
      dist: bestD,
      t: bestT,
      onRoad,
      limit: effectiveLimit(best, x, z),
      town: nearestTown(x, z),
    };
  }

  const surfaceGroup = new THREE.Group();
  surfaceGroup.name = 'Road surfaces';
  root.add(surfaceGroup);

  const asphaltParts = [];
  const mainMarkParts = [];
  const townMarkParts = [];
  const medianParts = [];
  const junctionParts = [];

  roads.forEach((road, index) => {
    const y = road.minor ? 0.012 + (index % 5) * 0.0004 : 0.018 + (index % 9) * 0.0006;
    asphaltParts.push(quadGeometry(road.ax, road.az, road.bx, road.bz, road.width, y));
    const mdY = y + 0.013;
    const len = road.length;
    const nx = -road.dz;
    const nz = road.dx;

    if (!road.minor) {
      // solid edge lines
      for (const side of [-1, 1]) {
        const off = side * (road.width / 2 - 0.4);
        mainMarkParts.push(
          quadGeometry(
            road.ax + nx * off,
            road.az + nz * off,
            road.bx + nx * off,
            road.bz + nz * off,
            0.15,
            mdY
          )
        );
      }
      // dashed centre line
      if (road.kind !== 'motorway') {
        for (let s = 3; s < len - 3; s += 9) {
          const t0 = s / len;
          const t1 = Math.min(1, (s + 3.4) / len);
          const ax = lerp(road.ax, road.bx, t0);
          const az = lerp(road.az, road.bz, t0);
          const bx = lerp(road.ax, road.bx, t1);
          const bz = lerp(road.az, road.bz, t1);
          mainMarkParts.push(quadGeometry(ax, az, bx, bz, 0.16, mdY));
        }
      } else {
        // motorway: median reservicing + lane dividers
        for (const side of [-1, 1]) {
          const off = side * 1.0;
          mainMarkParts.push(
            quadGeometry(
              road.ax + nx * off,
              road.az + nz * off,
              road.bx + nx * off,
              road.bz + nz * off,
              0.16,
              mdY
            )
          );
          const divider = side * (road.width / 2 - 2.7);
          for (let s = 2; s < len - 2; s += 8) {
            const t0 = s / len;
            const t1 = Math.min(1, (s + 3.8) / len);
            mainMarkParts.push(
              quadGeometry(
                lerp(road.ax, road.bx, t0) + nx * divider,
                lerp(road.az, road.bz, t0) + nz * divider,
                lerp(road.ax, road.bx, t1) + nx * divider,
                lerp(road.az, road.bz, t1) + nz * divider,
                0.13,
                mdY
              )
            );
          }
        }
        medianParts.push(quadGeometry(road.ax, road.az, road.bx, road.bz, 1.6, y + 0.008));
      }
    } else {
      // town street: only edge markings
      for (const side of [-1, 1]) {
        const off = side * (road.width / 2 - 0.3);
        townMarkParts.push(
          quadGeometry(
            road.ax + nx * off,
            road.az + nz * off,
            road.bx + nx * off,
            road.bz + nz * off,
            0.11,
            mdY
          )
        );
      }
    }
  });

  // junction discs
  const nodeMaxWidth = new Map();
  for (const road of roads) {
    for (const id of [road.a, road.b]) {
      nodeMaxWidth.set(id, Math.max(nodeMaxWidth.get(id) || 0, road.width));
    }
  }
  for (const [id, w] of nodeMaxWidth.entries()) {
    const n = nodes[id];
    if (!n) continue;
    junctionParts.push(discGeometry(n.x, n.z, w / 2 + 0.7, 0.022, 18));
  }

  const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x34383c, roughness: 0.94, metalness: 0.02 });
  const asphalt = new THREE.Mesh(mergeGeometries(asphaltParts), asphaltMat);
  asphalt.receiveShadow = true;
  surfaceGroup.add(asphalt);
  asphaltParts.forEach((g) => g.dispose());

  const mainMarkMat = new THREE.MeshBasicMaterial({ color: 0xf2efd9 });
  const mainMark = new THREE.Mesh(mergeGeometries(mainMarkParts), mainMarkMat);
  surfaceGroup.add(mainMark);
  mainMarkParts.forEach((g) => g.dispose());

  if (townMarkParts.length) {
    const townMarkMat = new THREE.MeshBasicMaterial({ color: 0xd7d3c0, transparent: true, opacity: 0.55 });
    surfaceGroup.add(new THREE.Mesh(mergeGeometries(townMarkParts), townMarkMat));
    townMarkParts.forEach((g) => g.dispose());
  }

  if (medianParts.length) {
    const medianMat = new THREE.MeshStandardMaterial({ color: 0x30452c, roughness: 1 });
    surfaceGroup.add(new THREE.Mesh(mergeGeometries(medianParts), medianMat));
    medianParts.forEach((g) => g.dispose());
  }

  const junctionMat = new THREE.MeshStandardMaterial({ color: 0x313539, roughness: 0.95 });
  const junctions = new THREE.Mesh(mergeGeometries(junctionParts), junctionMat);
  junctions.receiveShadow = true;
  surfaceGroup.add(junctions);
  junctionParts.forEach((g) => g.dispose());

  // ---------- ground ----------
  const groundTex = createTerrainTexture(roads);
  const groundMat = new THREE.MeshStandardMaterial({
    map: groundTex,
    roughness: 1,
    metalness: 0,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(MAP_W, MAP_H, 1, 1), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set((WORLD.minX + WORLD.maxX) / 2, 0, (WORLD.minZ + WORLD.maxZ) / 2);
  ground.receiveShadow = true;
  ground.name = 'Terrain';
  root.add(ground);

  // ---------- colliders ----------
  const colliders = [];
  const colliderGrid = new Map();
  const CCELL = 48;
  function addCollider(x, z, hw, hd, kind = 'building') {
    const c = { x, z, hw, hd, kind };
    colliders.push(c);
    const minX = x - hw;
    const maxX = x + hw;
    const minZ = z - hd;
    const maxZ = z + hd;
    for (let cx = Math.floor(minX / CCELL); cx <= Math.floor(maxX / CCELL); cx++) {
      for (let cz = Math.floor(minZ / CCELL); cz <= Math.floor(maxZ / CCELL); cz++) {
        const k = cellKey(cx, cz);
        if (!colliderGrid.has(k)) colliderGrid.set(k, []);
        colliderGrid.get(k).push(c);
      }
    }
    return c;
  }

  function blockedByBuilding(x, z, pad = 0) {
    const list = colliderGrid.get(cellKey(Math.floor(x / CCELL), Math.floor(z / CCELL)));
    if (!list) return null;
    for (const c of list) {
      if (Math.abs(x - c.x) < c.hw + pad && Math.abs(z - c.z) < c.hd + pad) return c;
    }
    return null;
  }

  function resolveCollision(x, z, radius = 0.85) {
    const list = colliderGrid.get(cellKey(Math.floor(x / CCELL), Math.floor(z / CCELL)));
    if (!list) return null;
    for (const c of list) {
      const nx = clamp(x, c.x - c.hw, c.x + c.hw);
      const nz = clamp(z, c.z - c.hd, c.z + c.hd);
      const dx = x - nx;
      const dz = z - nz;
      const d2 = dx * dx + dz * dz;
      if (d2 < radius * radius) {
        const d = Math.sqrt(d2) || 0.0001;
        return { nx: dx / d, nz: dz / d, depth: radius - d, collider: c };
      }
    }
    return null;
  }

  // ---------- stations ----------
  const stations = [];
  const stationGroup = new THREE.Group();
  stationGroup.name = 'Petrol stations';
  root.add(stationGroup);
  const fuelTexture = createPriceTexture();

  for (const def of STATIONS) {
    const road = roads.find(
      (r) =>
        (r.a === def.edge[0] && r.b === def.edge[1]) ||
        (r.a === def.edge[1] && r.b === def.edge[0])
    );
    if (!road) continue;
    const a = nodes[road.a];
    const b = nodes[road.b];
    const t = def.edge[0] === road.a ? def.t : 1 - def.t;
    const px = lerp(road.ax, road.bx, t);
    const pz = lerp(road.az, road.bz, t);
    const nx = -road.dz;
    const nz = road.dx;
    const side = def.side;
    const off = road.width / 2 + 15;
    const x = px + nx * side * off;
    const z = pz + nz * side * off;
    const yaw = Math.atan2(nx * side, nz * side);
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = yaw;
    stationGroup.add(group);

    const dark = new THREE.MeshStandardMaterial({ color: 0x141916, roughness: 0.8 });
    const steel = new THREE.MeshStandardMaterial({ color: 0x5c6764, roughness: 0.55, metalness: 0.55 });
    const cream = new THREE.MeshStandardMaterial({ color: 0xd6cfb8, roughness: 0.8 });
    const neon = new THREE.MeshStandardMaterial({
      color: 0xd9ff3a,
      emissive: 0xb4e21e,
      emissiveIntensity: 0.7,
      roughness: 0.4,
    });
    const gold = new THREE.MeshStandardMaterial({
      color: 0xf2b52f,
      emissive: 0x8a5c06,
      emissiveIntensity: 0.5,
      roughness: 0.45,
      metalness: 0.2,
    });

    const forecourt = new THREE.Mesh(new THREE.BoxGeometry(32, 0.24, 19), new THREE.MeshStandardMaterial({ color: 0x3c4142, roughness: 0.9 }));
    forecourt.position.set(0, 0.12, 0);
    forecourt.receiveShadow = true;
    group.add(forecourt);

    const shop = new THREE.Mesh(new THREE.BoxGeometry(11, 4.4, 5.2), cream);
    shop.position.set(-7, 2.2, 7.2);
    shop.castShadow = true;
    shop.receiveShadow = true;
    group.add(shop);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.35, 5.7), dark);
    roof.position.set(-7, 4.55, 7.2);
    group.add(roof);
    const shopGlass = new THREE.Mesh(
      new THREE.BoxGeometry(9.8, 1.7, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x1c2a2c, emissive: 0x6c7a44, emissiveIntensity: 0.22, roughness: 0.15, metalness: 0.4 })
    );
    shopGlass.position.set(-7, 2.2, 4.55);
    group.add(shopGlass);
    const shopSign = new THREE.Mesh(
      new THREE.PlaneGeometry(9.4, 1.0),
      new THREE.MeshBasicMaterial({ map: createFuelTexture(def.name), transparent: true })
    );
    shopSign.position.set(-7, 3.75, 4.52);
    group.add(shopSign);

    // canopy
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(27, 0.6, 12), cream);
    canopy.position.set(0, 5.3, 0.4);
    canopy.castShadow = true;
    group.add(canopy);
    const canopyTrim = new THREE.Mesh(new THREE.BoxGeometry(27.4, 0.34, 12.4), neon);
    canopyTrim.position.set(0, 4.98, 0.4);
    group.add(canopyTrim);
    for (const cx of [-11.5, 11.5]) {
      for (const cz of [-4.6, 5.2]) {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 5, 8), steel);
        col.position.set(cx, 2.5, cz);
        col.castShadow = true;
        group.add(col);
      }
    }

    // pumps
    for (const pxp of [-5, 5]) {
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.4, 3.4), dark);
      base.position.set(pxp, 0.8, 0.4);
      base.castShadow = true;
      group.add(base);
      const top = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.7, 2.9), cream);
      top.position.set(pxp, 1.82, 0.4);
      group.add(top);
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.9, 0.42),
        new THREE.MeshBasicMaterial({ map: fuelTexture })
      );
      screen.position.set(pxp, 1.9, 1.86);
      group.add(screen);
      addCollider(x + pxp * Math.cos(yaw), z - pxp * Math.sin(yaw), 0.9, 1.9, 'pump');
    }

    // pylon sign
    const pylon = new THREE.Group();
    pylon.position.set(13.5, 0, -7.8);
    pylon.rotation.y = Math.PI;
    group.add(pylon);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 5.6, 8), steel);
    pole.position.y = 2.8;
    pylon.add(pole);
    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(5.6, 3.2, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x101510, roughness: 0.5 })
    );
    signBoard.position.set(0, 6.4, 0);
    signBoard.castShadow = true;
    pylon.add(signBoard);
    const signFace = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 2.8),
      new THREE.MeshBasicMaterial({ map: createFuelTexture(def.name), transparent: true })
    );
    signFace.position.set(0, 6.4, 0.19);
    pylon.add(signFace);
    const signFaceBack = signFace.clone();
    signFaceBack.rotation.y = Math.PI;
    signFaceBack.position.z = -0.19;
    pylon.add(signFaceBack);
    // 3D carrot on top
    const carrotIcon = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.4, 7), gold);
    carrotIcon.rotation.x = Math.PI;
    carrotIcon.position.set(0, 8.5, 0);
    pylon.add(carrotIcon);
    const leaf = new THREE.Mesh(
      new THREE.ConeGeometry(0.22, 0.7, 5),
      new THREE.MeshStandardMaterial({ color: 0x4c8a2a, roughness: 0.8 })
    );
    leaf.position.set(0, 9.5, 0);
    pylon.add(leaf);

    const groundRing = new THREE.Mesh(
      new THREE.RingGeometry(8.4, 9.2, 40),
      new THREE.MeshBasicMaterial({ color: 0xf2b52f, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
    );
    groundRing.rotation.x = -Math.PI / 2;
    groundRing.position.y = 0.32;
    groundRing.position.z = 1.5;
    group.add(groundRing);

    addCollider(x, z, 1, 1, 'station');
    addCollider(
      x + Math.cos(yaw) * -7 + Math.sin(yaw) * 7.2,
      z - Math.sin(yaw) * -7 + Math.cos(yaw) * 7.2,
      5.8,
      3.0,
      'shop'
    );

    stations.push({
      name: def.name,
      town: def.town,
      x,
      z,
      yaw,
      radius: 15,
      group,
      ring: groundRing,
      fuelTexture,
      baseY: 0,
    });
  }

  // ---------- buildings & landmarks ----------
  const facadeTex = createFacadeTexture();
  const bodyGeo = new THREE.BoxGeometry(1, 1, 1);
  const bodyMat = new THREE.MeshStandardMaterial({
    map: facadeTex,
    roughness: 0.94,
    metalness: 0,
    vertexColors: false,
  });
  const roofGeo = (() => {
    const g = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4);
    g.rotateY(Math.PI / 4);
    return g;
  })();
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 });

  const bodyData = [];
  const roofData = [];
  const buildingColors = [0x9b5b47, 0xa96a51, 0xb88365, 0xc8b596, 0xd3c7ae, 0x9f9280, 0xb1a18d, 0x8c8f82];
  const roofColors = [0x4b4f54, 0x55403a, 0x3d4749, 0x5e5851, 0x47403e];

  const landmarkMats = {
    stone: new THREE.MeshStandardMaterial({ color: 0xc7bda6, roughness: 0.95 }),
    darkStone: new THREE.MeshStandardMaterial({ color: 0x8e8574, roughness: 0.95 }),
    slate: new THREE.MeshStandardMaterial({ color: 0x4a4e52, roughness: 0.9 }),
    clock: new THREE.MeshStandardMaterial({ color: 0xf3e7c2, emissive: 0x42350f, emissiveIntensity: 0.35, roughness: 0.5 }),
  };

  function clearSpot(x, z, radius, roadPad = 9) {
    if (Math.hypot(x, z) > 9000) return false;
    const q = queryRoad(x, z);
    if (q.road && q.dist < q.road.width / 2 + roadPad) return false;
    if (blockedByBuilding(x, z, radius)) return false;
    for (const st of stations) if (Math.hypot(x - st.x, z - st.z) < 30) return false;
    return true;
  }

  for (const [key, town] of Object.entries(TOWNS)) {
    const target = key === 'nottingham' || key === 'leicester' || key === 'derby' ? 32 : 20;
    let placed = 0;
    for (let attempt = 0; attempt < 220 && placed < target; attempt++) {
      const ang = rng.next() * Math.PI * 2;
      const rad = 20 + Math.pow(rng.next(), 0.7) * town.radius * 1.15;
      const x = town.x + Math.cos(ang) * rad;
      const z = town.z + Math.sin(ang) * rad;
      const w = 7 + rng.next() * 12;
      const d = 7 + rng.next() * 12;
      const h = 4 + Math.pow(rng.next(), 1.5) * 20;
      if (!clearSpot(x, z, Math.max(w, d) * 0.55, 8.2)) continue;
      let tooClose = false;
      for (const c of colliders) {
        if (Math.abs(x - c.x) < (c.hw + w / 2 + 1.5) && Math.abs(z - c.z) < (c.hd + d / 2 + 1.5)) {
          tooClose = true;
          break;
        }
      }
      if (tooClose) continue;
      bodyData.push({ x, z, w, d, h, color: rng.pick(buildingColors), roof: rng.chance(0.82) });
      addCollider(x, z, w / 2 + 0.3, d / 2 + 0.3, 'building');
      placed++;
    }

    // Landmark tower near the centre
    let lx = town.x + 38;
    let lz = town.z - 42;
    for (let tries = 0; tries < 12; tries++) {
      if (clearSpot(lx, lz, 8, 7)) break;
      lx = town.x + (rng.next() - 0.5) * 90;
      lz = town.z + (rng.next() - 0.5) * 90;
    }
    const landmark = new THREE.Group();
    landmark.position.set(lx, 0, lz);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(4, 5.2, 1.2, 8), landmarkMats.darkStone);
    base.position.y = 0.6;
    landmark.add(base);
    const towerH = town.landmark === 'cathedral' ? 24 : 14 + rng.next() * 8;
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.8, towerH, 8), landmarkMats.stone);
    tower.position.y = 1.2 + towerH / 2;
    tower.castShadow = true;
    landmark.add(tower);
    if (town.landmark === 'crooked') {
      tower.rotation.z = 0.12;
      tower.position.x = 0.8;
    }
    const spire = new THREE.Mesh(new THREE.ConeGeometry(3.9, 10, 8), landmarkMats.slate);
    spire.position.y = 1.2 + towerH + 5;
    spire.castShadow = true;
    landmark.add(spire);
    const clock = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 0.3, 18), landmarkMats.clock);
    clock.rotation.z = Math.PI / 2;
    clock.position.set(0, 1.2 + towerH * 0.74, 3.25);
    landmark.add(clock);
    if (town.landmark === 'cathedral' || town.landmark === 'castle') {
      const twin = tower.clone();
      twin.scale.set(0.7, 0.85, 0.7);
      twin.position.set(4.2, 1.2 + (towerH * 0.85) / 2, 0);
      landmark.add(twin);
    }
    root.add(landmark);
    addCollider(lx, lz, 4.6, 4.6, 'landmark');
  }

  // instanced building bodies
  const bodies = new THREE.InstancedMesh(bodyGeo, bodyMat, bodyData.length);
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const col = new THREE.Color();
  bodyData.forEach((b, i) => {
    pos.set(b.x, b.h / 2, b.z);
    scale.set(b.w, b.h, b.d);
    m4.compose(pos, q, scale);
    bodies.setMatrixAt(i, m4);
    col.setHex(b.color);
    bodies.setColorAt(i, col);
  });
  bodies.instanceMatrix.needsUpdate = true;
  if (bodies.instanceColor) bodies.instanceColor.needsUpdate = true;
  bodies.castShadow = true;
  bodies.receiveShadow = true;
  bodies.name = 'Buildings';
  root.add(bodies);

  const roofed = bodyData.filter((b) => b.roof);
  const roofs = new THREE.InstancedMesh(roofGeo, roofMat, roofed.length);
  roofed.forEach((b, i) => {
    const rh = 2.2 + (b.w + b.d) * 0.08;
    pos.set(b.x, b.h + rh / 2, b.z);
    scale.set(b.w * 1.06, rh, b.d * 1.06);
    m4.compose(pos, q, scale);
    roofs.setMatrixAt(i, m4);
    col.setHex(roofColors[i % roofColors.length]);
    roofs.setColorAt(i, col);
  });
  roofs.instanceMatrix.needsUpdate = true;
  if (roofs.instanceColor) roofs.instanceColor.needsUpdate = true;
  roofs.castShadow = true;
  root.add(roofs);

  // ---------- trees ----------
  const treeCount = 760;
  const trunkGeo = new THREE.CylinderGeometry(0.16, 0.28, 1, 5);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x543c27, roughness: 1 });
  const leafGeo = new THREE.IcosahedronGeometry(1, 0);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, treeCount);
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, treeCount);
  const treeColors = [0x2c562b, 0x376b32, 0x477a36, 0x578a3e, 0x3f6e34, 0x264d2b];
  const treeData = [];
  let treePlaced = 0;
  for (let i = 0; i < treeCount * 14 && treePlaced < treeCount; i++) {
    const x = rng.range(WORLD.minX + 60, WORLD.maxX - 60);
    const z = rng.range(WORLD.minZ + 60, WORLD.maxZ - 60);
    const town = nearestTown(x, z);
    if (town) {
      const d = Math.hypot(x - town.x, z - town.z);
      if (d < town.radius * 0.95) continue;
    }
    const rq = queryRoad(x, z);
    if (rq.road && rq.dist < rq.road.width / 2 + 7) continue;
    if (blockedByBuilding(x, z, 1.5)) continue;
    let nearStation = false;
    for (const st of stations) if (Math.hypot(x - st.x, z - st.z) < 26) nearStation = true;
    if (nearStation) continue;
    treeData.push({ x, z, h: rng.range(2.5, 5.2), r: rng.range(1.4, 3.1), color: rng.pick(treeColors) });
    treePlaced++;
  }
  treeData.forEach((t, i) => {
    pos.set(t.x, t.h / 2, t.z);
    scale.set(1, t.h, 1);
    m4.compose(pos, q, scale);
    trunks.setMatrixAt(i, m4);
    pos.set(t.x, t.h + t.r * 0.55, t.z);
    scale.set(t.r, t.r * 1.15, t.r);
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rng.next() * 6.28);
    m4.compose(pos, q, scale);
    leaves.setMatrixAt(i, m4);
    col.setHex(t.color);
    leaves.setColorAt(i, col);
    q.identity();
  });
  trunks.instanceMatrix.needsUpdate = true;
  leaves.instanceMatrix.needsUpdate = true;
  if (leaves.instanceColor) leaves.instanceColor.needsUpdate = true;
  trunks.castShadow = true;
  leaves.castShadow = true;
  leaves.receiveShadow = true;
  root.add(trunks, leaves);

  // ---------- town signs & signs ----------
  const signGroup = new THREE.Group();
  signGroup.name = 'Road furniture';
  root.add(signGroup);
  const postMat = new THREE.MeshStandardMaterial({ color: 0x8c9188, roughness: 0.6, metalness: 0.4 });
  const signBackMat = new THREE.MeshStandardMaterial({ color: 0x5b615c, roughness: 0.7, metalness: 0.3 });

  function addBillboard(tex, x, z, yaw, width, height, y) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = yaw;
    const back = new THREE.Mesh(new THREE.BoxGeometry(width + 0.16, height + 0.16, 0.12), signBackMat);
    back.position.y = y;
    back.castShadow = true;
    g.add(back);
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true })
    );
    face.position.set(0, y, 0.075);
    g.add(face);
    const backFace = face.clone();
    backFace.rotation.y = Math.PI;
    backFace.position.z = -0.075;
    g.add(backFace);
    const legH = y - height / 2;
    for (const side of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, legH, 6), postMat);
      leg.position.set(side * width * 0.3, legH / 2, 0);
      g.add(leg);
    }
    signGroup.add(g);
    return g;
  }

  const townList = Object.entries(TOWNS);
  for (const [key, town] of townList) {
    const candidates = roads.filter(
      (r) => !r.minor && (r.a === key || r.b === key) && r.kind !== 'motorway'
    );
    if (!candidates.length) continue;
    const road = candidates[0];
    const fromTown = road.a === key;
    const t = fromTown ? 0.14 : 0.86;
    const px = lerp(road.ax, road.bx, t);
    const pz = lerp(road.az, road.bz, t);
    const nx = -road.dz;
    const nz = road.dx;
    const side = key.length % 2 === 0 ? 1 : -1;
    const off = road.width / 2 + 3.1;
    const x = px + nx * side * off;
    const z = pz + nz * side * off;
    const yaw = Math.atan2(-nx * side, -nz * side);
    addBillboard(createTownSignTexture(town.name, town.limit), x, z, yaw, 5.6, 2.3, 3.25);

    // speed limit roundel on the other approach
    const road2 = candidates[Math.min(1, candidates.length - 1)];
    if (road2) {
      const from2 = road2.a === key;
      const t2 = from2 ? 0.07 : 0.93;
      const px2 = lerp(road2.ax, road2.bx, t2);
      const pz2 = lerp(road2.az, road2.bz, t2);
      const nx2 = -road2.dz;
      const nz2 = road2.dx;
      const side2 = -side;
      const x2 = px2 + nx2 * side2 * (road2.width / 2 + 3.0);
      const z2 = pz2 + nz2 * side2 * (road2.width / 2 + 3.0);
      const yaw2 = Math.atan2(-nx2 * side2, -nz2 * side2);
      const rg = new THREE.Group();
      rg.position.set(x2, 0, z2);
      rg.rotation.y = yaw2;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 2.8, 6), postMat);
      pole.position.y = 1.4;
      rg.add(pole);
      const roundel = new THREE.Mesh(
        new THREE.CircleGeometry(0.62, 24),
        new THREE.MeshBasicMaterial({ map: makeSpeedLimitTexture(town.limit), transparent: true, side: THREE.DoubleSide })
      );
      roundel.position.y = 3.15;
      rg.add(roundel);
      signGroup.add(rg);
    }
  }

  // route confirmation signs on key roads
  const routeSigns = [
    ['A52', 'NOTTINGHAM 4  ·  GRANTHAM 23', ['nott', 'a52_e1'], 0.09, 1],
    ['M1', 'THE NORTH  ·  LONDON', ['m1_5', 'm1_6'], 0.4, -1],
    ['A46', 'NEWARK 12  ·  LINCOLN 26', ['leic', 'a46_1'], 0.2, 1],
    ['A1', 'GRANTHAM 8  ·  NEWARK 15', ['gran', 'a1_1'], 0.25, -1],
  ];
  for (const [ref, text, pair, t, side] of routeSigns) {
    const road = roads.find(
      (r) => (r.a === pair[0] && r.b === pair[1]) || (r.a === pair[1] && r.b === pair[0])
    );
    if (!road) continue;
    const px = lerp(road.ax, road.bx, t);
    const pz = lerp(road.az, road.bz, t);
    const nx = -road.dz;
    const nz = road.dx;
    const x = px + nx * side * (road.width / 2 + 3.2);
    const z = pz + nz * side * (road.width / 2 + 3.2);
    const { canvas, ctx } = makeCanvas(512, 200);
    ctx.fillStyle = '#164a34';
    roundRect(ctx, 5, 5, 502, 190, 14);
    ctx.fill();
    ctx.strokeStyle = '#f3f1e2';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = '#f3f1e2';
    ctx.font = '800 80px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(ref, 28, 95);
    ctx.font = '700 40px "Barlow Condensed", Arial Narrow, Arial, sans-serif';
    ctx.fillText(text, 28, 150);
    addBillboard(canvasTexture(canvas), x, z, Math.atan2(-nx * side, -nz * side), 5.2, 2.0, 3.1);
  }

  // ---------- town labels ----------
  const labels = [];
  for (const town of Object.values(TOWNS)) {
    const tex = makeLabelTexture(town.name.toUpperCase(), {
      w: 512,
      h: 140,
      bg: 'rgba(7,10,8,0.72)',
      border: 'rgba(217,255,58,0.85)',
      color: '#f7f3e2',
      sub: `LIMIT ${town.limit}`,
      fontSize: 58,
      radius: 12,
    });
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.94 });
    const sprite = new THREE.Sprite(mat);
    const scaleX = Math.min(64, 24 + town.name.length * 3.4);
    sprite.scale.set(scaleX, scaleX * 0.28, 1);
    sprite.position.set(town.x, 52, town.z);
    root.add(sprite);
    labels.push({ sprite, town });
  }

  // ---------- carrot spawn points ----------
  const carrotSpawns = [];
  const placed = [];
  function carrotSpot(x, z, source) {
    if (x < WORLD.minX + 20 || x > WORLD.maxX - 20 || z < WORLD.minZ + 20 || z > WORLD.maxZ - 20) return;
    if (blockedByBuilding(x, z, 1.2)) return;
    for (const p of placed) if (Math.hypot(p.x - x, p.z - z) < 9) return;
    const q = queryRoad(x, z);
    if (q.road && q.dist < q.road.width / 2 + 0.8) return;
    placed.push({ x, z });
    carrotSpawns.push({ x, y: 0.92, z, phase: rng.next() * Math.PI * 2, source });
  }

  for (const road of roads) {
    if (road.minor) continue;
    const step = road.kind === 'motorway' ? 105 : 72;
    let flip = 1;
    for (let s = 26; s < road.length - 15; s += step * (0.8 + rng.next() * 0.45)) {
      if (!rng.chance(road.kind === 'motorway' ? 0.42 : 0.68)) {
        flip *= -1;
        continue;
      }
      const t = s / road.length;
      const px = lerp(road.ax, road.bx, t);
      const pz = lerp(road.az, road.bz, t);
      const nx = -road.dz;
      const nz = road.dx;
      const off = road.width / 2 + 2.1 + rng.next() * 1.5;
      carrotSpot(px + nx * flip * off, pz + nz * flip * off, 'road');
      flip *= -1;
    }
  }

  // Ring of carrots in each town centre
  for (const town of Object.values(TOWNS)) {
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + rng.next() * 0.3;
      const r = 28 + rng.next() * 45;
      carrotSpot(town.x + Math.cos(a) * r, town.z + Math.sin(a) * r, 'town');
    }
  }

  // Bonus cluster around each petrol station
  for (const st of stations) {
    for (let i = 0; i < 5; i++) {
      const a = rng.next() * Math.PI * 2;
      const r = 12 + rng.next() * 10;
      carrotSpot(st.x + Math.cos(a) * r, st.z + Math.sin(a) * r, 'station');
    }
  }

  // Guaranteed trail near the player's start
  const startRoad = roads.find(
    (r) =>
      (r.a === 'nott' && r.b === 'a52_e1') || (r.a === 'a52_e1' && r.b === 'nott')
  );
  if (startRoad) {
    const fromNott = startRoad.a === 'nott';
    for (let i = 0; i < 9; i++) {
      const t = fromNott ? 0.43 + i * 0.048 : 0.57 - i * 0.048;
      const px = lerp(startRoad.ax, startRoad.bx, t);
      const pz = lerp(startRoad.az, startRoad.bz, t);
      const nx = -startRoad.dz;
      const nz = startRoad.dx;
      const side = i % 2 === 0 ? 1 : -1;
      carrotSpot(px + nx * side * (startRoad.width / 2 + 2.2), pz + nz * side * (startRoad.width / 2 + 2.2), 'start');
    }
  }

  // ---------- distant hills ----------
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x54724a, roughness: 1 });
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2;
    const radius = 1950 + rng.next() * 240;
    const x = (WORLD.minX + WORLD.maxX) / 2 + Math.cos(a) * radius * 1.05;
    const z = (WORLD.minZ + WORLD.maxZ) / 2 + Math.sin(a) * radius * 0.9;
    const h = 60 + rng.next() * 160;
    const hill = new THREE.Mesh(new THREE.ConeGeometry(220 + rng.next() * 180, h, 5), hillMat);
    hill.position.set(x, h / 2 - 4, z);
    hill.rotation.y = rng.next() * Math.PI;
    root.add(hill);
  }

  return {
    root,
    roads,
    nodes,
    towns: TOWNS,
    queryRoad,
    effectiveLimit,
    nearestTown,
    colliders,
    resolveCollision,
    blockedByBuilding,
    stations,
    carrotSpawns,
    labels,
    startRoad,
  };
}

export function addSky(scene) {
  const skyGeo = new THREE.SphereGeometry(8000, 24, 16);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      top: { value: new THREE.Color(0x2f6da8) },
      horizon: { value: new THREE.Color(0xcfe2ea) },
      bottom: { value: new THREE.Color(0xe9ddc2) },
      sunDir: { value: new THREE.Vector3(0.45, 0.55, -0.2).normalize() },
    },
    vertexShader: `
      varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = normalize(world.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vWorld;
      uniform vec3 top;
      uniform vec3 horizon;
      uniform vec3 bottom;
      uniform vec3 sunDir;
      void main() {
        float h = clamp(vWorld.y, -0.2, 1.0);
        vec3 col = mix(horizon, top, smoothstep(0.02, 0.55, h));
        col = mix(bottom, col, smoothstep(-0.12, 0.03, h));
        float sun = pow(max(dot(normalize(vWorld), sunDir), 0.0), 140.0);
        col += vec3(1.0, 0.82, 0.5) * sun * 0.8;
        float haze = pow(1.0 - clamp(abs(h), 0.0, 1.0), 12.0);
        col = mix(col, vec3(0.92,0.93,0.88), haze*0.18);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  sky.frustumCulled = false;
  scene.add(sky);
  return sky;
}
