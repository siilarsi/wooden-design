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
        setHeight(Math.max(50, startHeight + diff));
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
    <div
      id="eventViewer"
      style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <div
        onMouseDown={startDrag}
        style={{ height: 6, cursor: 'ns-resize', background: '#ccc' }}
      />
      <div
        id="eventLog"
        style={{ height, overflowY: 'auto', background: 'white' }}
      >
        {events.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </div>
    </div>
  );
}
