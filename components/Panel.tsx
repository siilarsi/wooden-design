import React, { useState, useRef, useCallback } from 'react';

type PanelProps = {
  id?: string;
  title: string;
  children: React.ReactNode;
};

export default function Panel({ id, title, children }: PanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const start = useRef<{ x: number; y: number } | null>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      const onMove = (ev: MouseEvent) => {
        if (!start.current) return;
        setPos({
          x: ev.clientX - start.current.x,
          y: ev.clientY - start.current.y,
        });
      };
      const onUp = () => {
        start.current = null;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [pos],
  );

  return (
    <div
      id={id}
      className={`panel${collapsed ? ' collapsed' : ''}`}
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="panel-title" onMouseDown={onMouseDown}>
        <span className="drag-dots">•••••</span>
        <button onClick={() => setCollapsed(!collapsed)}>{title}</button>
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
}
