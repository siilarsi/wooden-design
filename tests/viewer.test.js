import fs from 'fs';

const code = fs.readFileSync('components/Viewer.tsx', 'utf8');

describe('Viewer component', () => {
  it('imports Canvas from react-three-fiber', () => {
    expect(/from '@react-three\/fiber'/.test(code)).toEqual(true);
  });

  it('uses OrbitControls from drei', () => {
    expect(/OrbitControls/.test(code)).toEqual(true);
  });
});
