import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { makeCanvas, canvasTexture, makeRng } from './utils.js';

function glowSprite() {
  const { canvas, ctx } = makeCanvas(128, 128);
  const g = ctx.createRadialGradient(64, 64, 1, 64, 64, 62);
  g.addColorStop(0, 'rgba(255,236,150,1)');
  g.addColorStop(0.25, 'rgba(255,204,70,0.6)');
  g.addColorStop(0.6, 'rgba(255,180,30,0.12)');
  g.addColorStop(1, 'rgba(255,170,20,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return canvasTexture(canvas);
}

export function createCarrotField(scene, spawns) {
  const rng = makeRng(9917);
  const count = spawns.length;
  const carrots = spawns.map((s) => ({
    ...s,
    baseY: s.y,
    active: true,
    respawn: 0,
    spin: rng.next() * Math.PI * 2,
  }));

  const bodyGeo = new THREE.ConeGeometry(0.24, 1.0, 7);
  bodyGeo.rotateX(Math.PI);
  bodyGeo.translate(0, 0.05, 0);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffc21f,
    emissive: 0xa96a05,
    emissiveIntensity: 0.9,
    roughness: 0.4,
    metalness: 0.28,
  });

  const leafParts = [];
  for (let i = 0; i < 3; i++) {
    const leaf = new THREE.ConeGeometry(0.085, 0.55, 5);
    leaf.translate(0, 0.34, 0);
    leaf.rotateZ((i - 1) * 0.45);
    leaf.rotateY((i / 3) * Math.PI * 2);
    leaf.translate(0, 0.56, 0);
    leafParts.push(leaf);
  }
  const leafGeo = mergeGeometries(leafParts);
  leafParts.forEach((g) => g.dispose());
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x5ba832,
    emissive: 0x1b3a08,
    emissiveIntensity: 0.45,
    roughness: 0.8,
  });

  const bodyMesh = new THREE.InstancedMesh(bodyGeo, bodyMat, count);
  const leafMesh = new THREE.InstancedMesh(leafGeo, leafMat, count);
  bodyMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  leafMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  bodyMesh.frustumCulled = false;
  leafMesh.frustumCulled = false;
  bodyMesh.castShadow = true;
  leafMesh.castShadow = true;
  scene.add(bodyMesh, leafMesh);

  const glowGeo = new THREE.BufferGeometry();
  const glowPositions = new Float32Array(count * 3);
  glowGeo.setAttribute('position', new THREE.BufferAttribute(glowPositions, 3));
  const glowMat = new THREE.PointsMaterial({
    map: glowSprite(),
    size: 2.1,
    color: 0xffc448,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const glowPoints = new THREE.Points(glowGeo, glowMat);
  glowPoints.frustumCulled = false;
  scene.add(glowPoints);

  // sparkles
  const SPARKS = 180;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPos = new Float32Array(SPARKS * 3);
  const sparkVel = new Float32Array(SPARKS * 3);
  const sparkLife = new Float32Array(SPARKS);
  for (let i = 0; i < SPARKS; i++) sparkPos[i * 3 + 1] = -1000;
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
  const sparkMat = new THREE.PointsMaterial({
    map: glowSprite(),
    size: 0.5,
    color: 0xffe27a,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const sparks = new THREE.Points(sparkGeo, sparkMat);
  sparks.frustumCulled = false;
  scene.add(sparks);
  let sparkCursor = 0;

  function spawnSparkle(x, y, z, amount = 14) {
    for (let i = 0; i < amount; i++) {
      const idx = sparkCursor++ % SPARKS;
      sparkPos[idx * 3] = x;
      sparkPos[idx * 3 + 1] = y;
      sparkPos[idx * 3 + 2] = z;
      sparkVel[idx * 3] = (rng.next() - 0.5) * 7;
      sparkVel[idx * 3 + 1] = 1.5 + rng.next() * 5;
      sparkVel[idx * 3 + 2] = (rng.next() - 0.5) * 7;
      sparkLife[idx] = 0.7 + rng.next() * 0.5;
    }
  }

  const tempMatrix = new THREE.Matrix4();
  const tempPos = new THREE.Vector3();
  const tempQuat = new THREE.Quaternion();
  const tempScale = new THREE.Vector3(1, 1, 1);
  const zeroScale = new THREE.Vector3(0.0001, 0.0001, 0.0001);
  const up = new THREE.Vector3(0, 1, 0);

  function update(dt, time) {
    let visible = 0;
    for (let i = 0; i < count; i++) {
      const c = carrots[i];
      if (!c.active) {
        if (c.respawn > 0) {
          c.respawn -= dt;
          if (c.respawn <= 0) {
            c.active = true;
          }
        }
        tempMatrix.compose(tempPos.set(c.x, -100, c.z), tempQuat.identity(), zeroScale);
        bodyMesh.setMatrixAt(i, tempMatrix);
        leafMesh.setMatrixAt(i, tempMatrix);
        glowPositions[i * 3 + 1] = -100;
        continue;
      }
      visible++;
      const bob = Math.sin(time * 2.1 + c.phase) * 0.18;
      const y = c.baseY + bob;
      c.spin += dt * 1.6;
      tempQuat.setFromAxisAngle(up, c.spin);
      tempPos.set(c.x, y, c.z);
      tempMatrix.compose(tempPos, tempQuat, tempScale);
      bodyMesh.setMatrixAt(i, tempMatrix);
      leafMesh.setMatrixAt(i, tempMatrix);
      glowPositions[i * 3] = c.x;
      glowPositions[i * 3 + 1] = y + 0.15;
      glowPositions[i * 3 + 2] = c.z;
    }
    bodyMesh.instanceMatrix.needsUpdate = true;
    leafMesh.instanceMatrix.needsUpdate = true;
    glowGeo.attributes.position.needsUpdate = true;
    glowMat.opacity = 0.62 + Math.sin(time * 3) * 0.1;

    for (let i = 0; i < SPARKS; i++) {
      if (sparkLife[i] > 0) {
        sparkLife[i] -= dt;
        sparkPos[i * 3] += sparkVel[i * 3] * dt;
        sparkPos[i * 3 + 1] += sparkVel[i * 3 + 1] * dt;
        sparkPos[i * 3 + 2] += sparkVel[i * 3 + 2] * dt;
        sparkVel[i * 3 + 1] -= 9 * dt;
        if (sparkLife[i] <= 0) sparkPos[i * 3 + 1] = -1000;
      }
    }
    sparkGeo.attributes.position.needsUpdate = true;
    return visible;
  }

  function collect(x, z, radius = 3.0) {
    let got = 0;
    const gotAt = [];
    for (const c of carrots) {
      if (!c.active) continue;
      const dx = x - c.x;
      const dz = z - c.z;
      if (dx * dx + dz * dz < radius * radius) {
        c.active = false;
        c.respawn = 50;
        got++;
        gotAt.push(c);
        spawnSparkle(c.x, c.baseY + 0.3, c.z, 16);
      }
    }
    return { count: got, gotAt };
  }

  function reset() {
    for (const c of carrots) {
      c.active = true;
      c.respawn = 0;
    }
  }

  function remaining() {
    let n = 0;
    for (const c of carrots) if (c.active) n++;
    return n;
  }

  return { update, collect, reset, remaining, carrots };
}
