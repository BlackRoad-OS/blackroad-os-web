import type { Metadata } from 'next';
import { CallToAction } from '@/components/sections/CallToAction';
import { Hero } from '@/components/sections/Hero';
import { SeasonsRoadmap } from '@/components/sections/SeasonsRoadmap';
import { StackOverview } from '@/components/sections/StackOverview';
import { UseCases } from '@/components/sections/UseCases';
import { CONTACT_URL, DOCS_URL, PRISM_URL } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'BlackRoad OS — Desktop shell for orchestration',
  description:
    'BlackRoad OS is the public-facing desktop shell for orchestrating agents, infra, finance, and audit with the Prism Console and RoadChain.',
  openGraph: {
    title: 'BlackRoad OS — Desktop shell for orchestration',
    description:
      'Operate agents, infra, and finance through the BlackRoad desktop. Prism Console, RoadChain audit, and Atlas safeguards built in.',
    siteName: 'BlackRoad OS',
    url: 'https://blackroad.systems'
  }
};

export default function HomePage() {
  const prismUrl = PRISM_URL;
  const docsUrl = DOCS_URL;
  const contactUrl = CONTACT_URL;

  return (
    <div>
      <div className="section">
        <div className="section-inner">
          <Hero prismUrl={prismUrl} docsUrl={docsUrl} contactUrl={contactUrl} />
        </div>
      </div>

      <div className="section">
        <div className="section-inner">
          <StackOverview docsUrl={docsUrl} />
        </div>
      </div>

      <div className="section">
        <div className="section-inner">
          <UseCases />
        </div>
      </div>

      <div className="section">
        <div className="section-inner">
          <SeasonsRoadmap />
        </div>
      </div>

      <div className="section">
        <div className="section-inner">
          <CallToAction docsUrl={docsUrl} contactUrl={contactUrl} />
        </div>
      </div>
    </div>
  );
}
