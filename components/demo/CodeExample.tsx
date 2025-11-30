'use client';

import { useMemo, useState } from 'react';
import { DEFAULT_BEACON_URL, DEFAULT_GATEWAY_URL } from '../lib/constants';

const languages = ['TypeScript', 'Bash', 'Curl'] as const;

type Language = (typeof languages)[number];

function buildSnippets(step: number) {
  const baseHeaders = 'Authorization: Bearer $DEMO_JWT';
  return {
    TypeScript: `import fetch from 'node-fetch';

async function run() {
  const res = await fetch('${DEFAULT_GATEWAY_URL}/agents', {
    headers: { ${baseHeaders} }
  });
  const data = await res.json();
  console.log(data);
}

run();`,
    Bash: `GATEWAY_URL=${DEFAULT_GATEWAY_URL} \
BEACON_URL=${DEFAULT_BEACON_URL} \
node scripts/demo-step-${step + 1}.js # TODO(demo-next): wire live agent chat`,
    Curl: `curl -X POST ${DEFAULT_GATEWAY_URL}/graphql \
  -H 'Content-Type: application/json' \
  -H '${baseHeaders}' \
  -d '{"query":"mutation { trigger(job: \"demo-${step}\") }"}'`
  } satisfies Record<Language, string>;
}

export default function CodeExample({ step }: { step: number }) {
  const [language, setLanguage] = useState<Language>('TypeScript');
  const snippets = useMemo(() => buildSnippets(step), [step]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      <div className="flex items-center justify-between text-sm text-white/80">
        <p>Code samples</p>
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`rounded-full px-3 py-1 ${
                language === lang ? 'bg-brand-secondary text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
      <pre className="mt-4 h-64 overflow-auto rounded-lg bg-gradient-to-br from-black via-surface to-black p-4 text-xs text-emerald-100">
        <code>{snippets[language]}</code>
      </pre>
    </div>
  );
}
