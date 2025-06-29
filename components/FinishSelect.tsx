import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const presets = ['custom', 'matte', 'satin', 'gloss'];

export default function FinishSelect({ value, onChange }: Props) {
  return (
    <select id="finishSelect" value={value} onChange={(e) => onChange(e.target.value)}>
      {presets.map((p) => (
        <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>
      ))}
    </select>
  );
}
