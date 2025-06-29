import React from 'react';

type Props = {
  events: string[];
};

export default function EventLog({ events }: Props) {
  return (
    <details id="eventViewer" open style={{ position: 'fixed', bottom: 0 }}>
      <summary>Event Log</summary>
      <div id="eventLog" style={{ maxHeight: 200, overflowY: 'auto' }}>
        {events.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </div>
    </details>
  );
}
