'use client';
import React, { useEffect, useState } from 'react';
import Viewer from '../components/Viewer';
import DropZone from '../components/DropZone';
import FinishSelect from '../components/FinishSelect';
import EventLog from '../components/EventLog';
import Panel from '../components/Panel';
import { buildQuery } from '../src/utils.js';
import { useMaterialStore } from '../src/state';
import { Leva, useControls } from 'leva';

export default function Page() {
  const [events, setEvents] = useState<string[]>([]);
  const {
    model,
    finish,
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
    set,
  } = useMaterialStore();

  const logEvent = (m: string) => setEvents((e) => [...e, m]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const obj: any = {};
    if (params.get('model')) obj.model = params.get('model');
    if (params.get('finish')) obj.finish = params.get('finish');
    if (params.get('roughness'))
      obj.roughness = parseFloat(params.get('roughness')!);
    if (params.get('metalness'))
      obj.metalness = parseFloat(params.get('metalness')!);
    if (params.get('clearcoat'))
      obj.clearcoat = parseFloat(params.get('clearcoat')!);
    if (params.get('clearcoatRoughness'))
      obj.clearcoatRoughness = parseFloat(
        params.get('clearcoatRoughness')!,
      );
    if (params.get('specularIntensity'))
      obj.specularIntensity = parseFloat(
        params.get('specularIntensity')!,
      );
    if (params.get('specularColor'))
      obj.specularColor = params.get('specularColor');
    if (params.get('sheenColor')) obj.sheenColor = params.get('sheenColor');
    if (params.get('sheenRoughness'))
      obj.sheenRoughness = parseFloat(params.get('sheenRoughness')!);
    if (params.get('anisotropy'))
      obj.anisotropy = parseFloat(params.get('anisotropy')!);
    if (params.get('anisotropyRotation'))
      obj.anisotropyRotation = parseFloat(
        params.get('anisotropyRotation')!,
      );
    if (params.get('texture')) obj.texture = params.get('texture');
    set(obj);
  }, [set]);

  useEffect(() => {
    const q = buildQuery({
      model,
      finish,
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
    });
    history.replaceState(null, '', '?' + q);
  }, [
    model,
    finish,
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

  const [, setCtrl] = useControls(() => ({
    roughness: {
      value: roughness,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ roughness: v, finish: 'custom' }),
    },
    metalness: {
      value: metalness,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ metalness: v, finish: 'custom' }),
    },
    clearcoat: {
      value: clearcoat,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ clearcoat: v, finish: 'custom' }),
    },
    clearcoatRoughness: {
      value: clearcoatRoughness,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ clearcoatRoughness: v, finish: 'custom' }),
    },
    specularIntensity: {
      value: specularIntensity,
      min: 0,
      max: 2,
      step: 0.01,
      onChange: (v: number) => set({ specularIntensity: v, finish: 'custom' }),
    },
    specularColor: {
      value: specularColor,
      onChange: (v: string) => set({ specularColor: v, finish: 'custom' }),
    },
    sheenColor: {
      value: sheenColor,
      onChange: (v: string) => set({ sheenColor: v, finish: 'custom' }),
    },
    sheenRoughness: {
      value: sheenRoughness,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ sheenRoughness: v, finish: 'custom' }),
    },
    anisotropy: {
      value: anisotropy,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ anisotropy: v, finish: 'custom' }),
    },
    anisotropyRotation: {
      value: anisotropyRotation,
      min: 0,
      max: Math.PI * 2,
      step: 0.01,
      onChange: (v: number) => set({ anisotropyRotation: v, finish: 'custom' }),
    },
  }));

  useEffect(() => {
    if (finish === 'matte') {
      set({ roughness: 0.9, metalness: 0 });
      setCtrl({ roughness: 0.9, metalness: 0 });
    } else if (finish === 'satin') {
      set({ roughness: 0.5, metalness: 0 });
      setCtrl({ roughness: 0.5, metalness: 0 });
    } else if (finish === 'gloss') {
      set({ roughness: 0.1, metalness: 0 });
      setCtrl({ roughness: 0.1, metalness: 0 });
    }
  }, [finish, set, setCtrl]);

  return (
    <div>
      <Viewer />
      <Leva collapsed />
      <Panel id="ui" title="">
        <section className="option-row">
          <label htmlFor="modelSelect" className="option-label">
            model
          </label>
          <select
            id="modelSelect"
            value={model}
            onChange={(e) => set({ model: e.target.value })}
          >
            <option value="models/plank1.gltf">Plank 1</option>
            <option value="models/plank2.gltf">Plank 2</option>
            <option value="cube">Cube</option>
            <option value="sphere">Sphere</option>
            <option value="cylinder">Cylinder</option>
          </select>
        </section>
        <section className="option-row">
          <label htmlFor="finishSelect" className="option-label">
            finish
          </label>
          <FinishSelect value={finish} onChange={(v) => set({ finish: v })} />
        </section>
        <DropZone
          onFile={(f) => {
            set({ texture: URL.createObjectURL(f) });
            logEvent('Loaded texture ' + f.name);
          }}
        />
      </Panel>
      <EventLog events={events} />
    </div>
  );
}
