'use client';
import React, { useEffect, useState } from 'react';
import Viewer from '../components/Viewer';
import DropZone from '../components/DropZone';
import FinishSelect from '../components/FinishSelect';
import EventLog from '../components/EventLog';
import ParamHelp from '../components/ParamHelp';
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
    set(obj);
  }, [set]);

  useEffect(() => {
    const q = buildQuery({ model, finish });
    history.replaceState(null, '', '?' + q);
  }, [model, finish]);

  useControls({
    roughness: {
      value: roughness,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ roughness: v }),
    },
    metalness: {
      value: metalness,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ metalness: v }),
    },
    clearcoat: {
      value: clearcoat,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ clearcoat: v }),
    },
    clearcoatRoughness: {
      value: clearcoatRoughness,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ clearcoatRoughness: v }),
    },
    specularIntensity: {
      value: specularIntensity,
      min: 0,
      max: 2,
      step: 0.01,
      onChange: (v: number) => set({ specularIntensity: v }),
    },
    specularColor: {
      value: specularColor,
      onChange: (v: string) => set({ specularColor: v }),
    },
    sheenColor: {
      value: sheenColor,
      onChange: (v: string) => set({ sheenColor: v }),
    },
    sheenRoughness: {
      value: sheenRoughness,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ sheenRoughness: v }),
    },
    anisotropy: {
      value: anisotropy,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v: number) => set({ anisotropy: v }),
    },
    anisotropyRotation: {
      value: anisotropyRotation,
      min: 0,
      max: Math.PI * 2,
      step: 0.01,
      onChange: (v: number) => set({ anisotropyRotation: v }),
    },
  });

  return (
    <div>
      <Viewer />
      <Leva collapsed />
      <Panel id="ui" title="Settings">
        <section>
          <h2>Model</h2>
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
        <section>
          <h2>Texture</h2>
          <DropZone
            onFile={(f) => {
              set({ texture: URL.createObjectURL(f) });
              logEvent('Loaded texture ' + f.name);
            }}
          />
        </section>
        <section>
          <h2>Finish</h2>
          <FinishSelect value={finish} onChange={(v) => set({ finish: v })} />
        </section>
        <ParamHelp />
      </Panel>
      <EventLog events={events} />
    </div>
  );
}
