import AgentTable from '../../../components/demo/AgentTable';

export default async function AgentsPage() {
  const version = 'unknown';
  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6">
        <div>
          <h1 className="text-3xl font-bold">Agents Registry</h1>
          <p className="mt-2 text-white/80">
            Pulls from the API Gateway `/agents` endpoint and validates the response locally with zod.
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">Gateway v{version}</span>
      </header>
      <AgentTable />
    </div>
  );
}
