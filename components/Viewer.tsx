import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMaterialStore } from '../src/state';
import {
  BoxGeometry,
  SphereGeometry,
  CylinderGeometry,
  Mesh,
  MeshPhysicalMaterial,
  TextureLoader,
  Color,
  DoubleSide,
  Object3D,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Model() {
  const {
    model,
    texture,
    roughness,
    metalness,
    clearcoat,
    clearcoatRoughness,
    specularIntensity,
    specularColor,
    sheenColor,
    sheenRoughness,
    anisotropy,
    anisotropyRotation,
  } = useMaterialStore();

  const [object, setObject] = useState<Object3D | null>(null);
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!texture) {
      setTex(null);
      return;
    }
    const loader = new TextureLoader();
    loader.load(texture, (t) => setTex(t));
  }, [texture]);

  useEffect(() => {
    let cancelled = false;
    if (model === 'cube' || model === 'sphere' || model === 'cylinder') {
      let geometry;
      if (model === 'cube') geometry = new BoxGeometry();
      else if (model === 'sphere') geometry = new SphereGeometry(1, 32, 16);
      else geometry = new CylinderGeometry(1, 1, 2, 32);
      const mesh = new Mesh(geometry);
      setObject(mesh);
      return () => {};
    }
    const loader = new GLTFLoader();
    loader.load(model, (gltf) => {
      if (!cancelled) setObject(gltf.scene);
    });
    return () => {
      cancelled = true;
    };
  }, [model]);

  useEffect(() => {
    if (!object) return;
    const params = {
      roughness,
      metalness,
      clearcoat,
      clearcoatRoughness,
      specularIntensity,
      specularColor: new Color(specularColor),
      sheenColor: new Color(sheenColor),
      sheenRoughness,
      anisotropy,
      anisotropyRotation,
      side: DoubleSide,
      map: tex || null,
    };
    object.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new MeshPhysicalMaterial(params);
      }
    });
  }, [
    object,
    tex,
    roughness,
    metalness,
    clearcoat,
    clearcoatRoughness,
    specularIntensity,
    specularColor,
    sheenColor,
    sheenRoughness,
    anisotropy,
    anisotropyRotation,
  ]);

  if (!object) return null;
  return <primitive object={object} />;
}

export default function Viewer() {
  return (
    <Canvas
      className="viewerCanvas"
      style={{ width: '100vw', height: '100vh', display: 'block' }}
    >
      <ambientLight intensity={0.8} />
      <Model />
      <OrbitControls makeDefault />
    </Canvas>
  );
}
