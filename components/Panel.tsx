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
    (e: React.MouseEvent<HTMLSpanElement>) => {
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
      <div className="panel-title">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="collapse-icon">{collapsed ? '▸' : '▾'}</span>
          {title}
        </button>
        <span className="drag-dots" onMouseDown={onMouseDown}>
          <svg width="20" height="10" viewBox="0 0 28 14">
            <circle cx="2" cy="2" r="2" />
            <circle cx="14" cy="2" r="2" />
            <circle cx="26" cy="2" r="2" />
            <circle cx="2" cy="12" r="2" />
            <circle cx="14" cy="12" r="2" />
            <circle cx="26" cy="12" r="2" />
          </svg>
        </span>
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
}
