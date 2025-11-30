import TourStep from '../../components/TourStep';

const checklist = [
  'Set GATEWAY_URL and BEACON_URL environment variables.',
  'Optional: add DEMO_JWT for authenticated calls.',
  'Use the wizard to seed example agents.',
  'Trigger a job and keep Status page open.'
];

export default function TourPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold">Tour Wizard</h1>
        <p className="mt-2 text-white/80">
          Four guided steps to experience Core login, Agent Registry writes, Operator-triggered jobs, and Beacon updates.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {checklist.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-brand-accent" />
              {item}
            </li>
          ))}
        </ul>
      </header>
      <TourStep />
    </div>
  );
}
