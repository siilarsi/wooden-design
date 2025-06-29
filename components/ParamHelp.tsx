import React from 'react';

export default function ParamHelp() {
  return (
    <details id="paramHelp" style={{ maxWidth: 400 }}>
      <summary>Material Parameter Help</summary>
      <ul>
        <li>
          <strong>roughness</strong> – 0 is mirror smooth, 1 is completely
          matte.
        </li>
        <li>
          <strong>metalness</strong> – 0 behaves like plastic/wood, 1 is a metal
          surface.
        </li>
        <li>
          <strong>clearcoat</strong> – strength of a transparent varnish layer.
        </li>
        <li>
          <strong>clearcoatRoughness</strong> – roughness of that varnish layer.
        </li>
        <li>
          <strong>specularIntensity</strong> – brightness of the specular
          highlight.
        </li>
        <li>
          <strong>specularColor</strong> – tint color of reflections.
        </li>
        <li>
          <strong>sheenColor</strong> – color used for fabric-like sheen.
        </li>
        <li>
          <strong>sheenRoughness</strong> – how sharp the sheen highlight is.
        </li>
        <li>
          <strong>anisotropy</strong> – amount of directional reflection, as in
          brushed metal or wood grain.
        </li>
        <li>
          <strong>anisotropyRotation</strong> – rotation of that anisotropic
          direction in radians.
        </li>
      </ul>
    </details>
  );
}
