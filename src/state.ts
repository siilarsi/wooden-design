import create from 'zustand';

export interface MaterialState {
  model: string;
  finish: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  specularIntensity: number;
  specularColor: string;
  sheenColor: string;
  sheenRoughness: number;
  anisotropy: number;
  anisotropyRotation: number;
  texture: string | null;
  set(values: Partial<MaterialState>): void;
}

export const useMaterialStore = create<MaterialState>((set) => ({
  model: 'models/plank1.gltf',
  finish: 'custom',
  roughness: 0.5,
  metalness: 0,
  clearcoat: 0,
  clearcoatRoughness: 0,
  specularIntensity: 1,
  specularColor: '#111111',
  sheenColor: '#000000',
  sheenRoughness: 0.5,
  anisotropy: 0,
  anisotropyRotation: 0,
  texture: (null),
  set: (values) => set(values),
}));
