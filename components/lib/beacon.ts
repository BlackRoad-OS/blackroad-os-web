export interface BeaconMessage {
  id: string;
  agent: string;
  level: 'info' | 'warn' | 'error';
  detail: string;
  ts: number;
}

export function connectBeacon(onMessage: (msg: BeaconMessage) => void): { close: () => void } {
  // Mock implementation for static build - real beacon would connect to SSE endpoint
  const mockEvents: BeaconMessage[] = [
    { id: '1', agent: 'orchestrator', level: 'info', detail: 'System initialized', ts: Date.now() },
    { id: '2', agent: 'planner', level: 'info', detail: 'Task queue ready', ts: Date.now() - 1000 },
    { id: '3', agent: 'executor', level: 'info', detail: 'Workers online', ts: Date.now() - 2000 },
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index < mockEvents.length) {
      onMessage({ ...mockEvents[index], id: crypto.randomUUID(), ts: Date.now() });
      index++;
    }
  }, 2000);

  return {
    close: () => clearInterval(interval)
  };
}
