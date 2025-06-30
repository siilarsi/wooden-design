import React, { useCallback, useState } from 'react';

type Props = {
  events: string[];
};

export default function EventLog({ events }: Props) {
  const [height, setHeight] = useState(200);

  const startDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startY = e.clientY;
      const startHeight = height;
      const onMove = (ev: MouseEvent) => {
        const diff = startY - ev.clientY;
        const maxHeight = window.innerHeight * 0.5;
        setHeight(Math.min(maxHeight, Math.max(50, startHeight + diff)));
      };
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [height],
  );

  return (
    <div id="eventViewer">
      <div
        className="drag-handle"
        aria-label="Resize log"
        onMouseDown={startDrag}
      />
      <div id="eventLog" style={{ height }}>
        {events.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </div>
    </div>
  );
}
