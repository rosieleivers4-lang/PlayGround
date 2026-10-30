import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

const _c = new THREE.Color();

/**
 * Bake the direct mesh children of a group into one geometry.
 *
 * Each source mesh keeps its own colour by writing it into a vertex-colour
 * attribute, which lets a whole animal use a single material. Child groups are
 * deliberately left alone so animated parts (heads, ears, legs, tails) keep
 * their own transforms.
 */
export function bakeGroup(group, material, test = null) {
  if (!group) return null;
  const meshes = group.children.filter(o => o.isMesh && !o.isInstancedMesh && (!test || test(o)));
  if (!meshes.length) return null;

  const prepared = [];
  for (const mesh of meshes) {
    mesh.updateMatrix();
    let geo = mesh.geometry;
    if (geo.index) geo = geo.toNonIndexed();
    else geo = geo.clone();
    geo.applyMatrix4(mesh.matrix);
    geo.deleteAttribute("uv");
    geo.deleteAttribute("uv1");
    geo.deleteAttribute("uv2");
    geo.deleteAttribute("tangent");

    const count = geo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    if (mesh.material?.vertexColors && geo.attributes.color) {
      // already authored with vertex colours
      colors.set(geo.attributes.color.array.subarray(0, count * 3));
    } else {
      _c.copy(mesh.material?.color || new THREE.Color(0xffffff));
      for (let i = 0; i < count; i++) {
        colors[i * 3] = _c.r;
        colors[i * 3 + 1] = _c.g;
        colors[i * 3 + 2] = _c.b;
      }
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    prepared.push(geo);
  }

  const merged = mergeGeometries(prepared, false);
  for (const geo of prepared) geo.dispose();
  if (!merged) return null;
  merged.computeBoundingSphere();
  merged.computeBoundingBox();

  for (const mesh of meshes) group.remove(mesh);

  const mesh = new THREE.Mesh(merged, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  // Let callers keep per-part references working (eyes, paws, etc).
  return mesh;
}

export function matteMaterial(roughness = 0.9, metalness = 0.02, rimColor = null, rimStrength = 0.55) {
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness,
    metalness,
    dithering: true,
  });
  if (rimColor !== null) {
    const c = new THREE.Color(rimColor);
    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <opaque_fragment>",
        `#include <opaque_fragment>
        float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.8);
        gl_FragColor.rgb += vec3(${c.r.toFixed(4)}, ${c.g.toFixed(4)}, ${c.b.toFixed(4)}) * rim * ${rimStrength.toFixed(3)};`
      );
    };
    material.customProgramCacheKey = () => `pup-rim-${rimColor}-${rimStrength}`;
  }
  return material;
}
