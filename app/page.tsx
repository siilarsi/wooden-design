'use client';
import React, { useEffect, useState } from 'react';
import Viewer from '../components/Viewer';
import DropZone from '../components/DropZone';
import FinishSelect from '../components/FinishSelect';
import EventLog from '../components/EventLog';
import { buildQuery } from '../src/utils.js';

export default function Page() {
  const [events, setEvents] = useState<string[]>([]);
  const [model, setModel] = useState('models/plank1.gltf');
  const [finish, setFinish] = useState('custom');

  const logEvent = (m: string) => setEvents((e) => [...e, m]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('model')) setModel(params.get('model') as string);
    if (params.get('finish')) setFinish(params.get('finish') as string);
  }, []);

  useEffect(() => {
    const q = buildQuery({ model, finish });
    history.replaceState(null, '', '?' + q);
  }, [model, finish]);

  return (
    <div>
      <Viewer />
      <div id="ui">
        <section>
          <h2>Model</h2>
          <select id="modelSelect" value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="models/plank1.gltf">Plank 1</option>
            <option value="models/plank2.gltf">Plank 2</option>
            <option value="cube">Cube</option>
            <option value="sphere">Sphere</option>
            <option value="cylinder">Cylinder</option>
          </select>
        </section>
        <section>
          <h2>Texture</h2>
          <DropZone onFile={(f) => logEvent('Loaded texture ' + f.name)} />
        </section>
        <section>
          <h2>Finish</h2>
          <FinishSelect value={finish} onChange={setFinish} />
        </section>
      </div>
      <EventLog events={events} />
    </div>
  );
}
