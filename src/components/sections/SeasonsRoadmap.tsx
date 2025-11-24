import { Card } from '../ui/Card';
import styles from './SeasonsRoadmap.module.css';

const SEASONS = [
  {
    title: 'Season 0–1',
    subtitle: 'Core & OS skeleton',
    copy: 'PS-SHA∞ identity, journaling, and the first Operator pipelines to prove the orchestration loop.'
  },
  {
    title: 'Season 2',
    subtitle: 'Master Orchestration',
    copy: 'Multi-repo cohesion across Core, Operator, API, Prism, and Web with env-aware deployments.'
  },
  {
    title: 'Season 3',
    subtitle: 'Intelligence layer',
    copy: 'Atlas and Lucidia agents gain autonomy with policy rails, RoadChain anchors, and finance sensing.'
  },
  {
    title: 'Season 4+',
    subtitle: 'Ecosystem and worlds',
    copy: 'RoadChain explorers, RoadWallet hooks, demo worlds, and partner integrations across the stack.'
  }
];

export function SeasonsRoadmap() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Seasons keep the OS paced and governed.</h2>
        <p className={styles.subtitle}>
          Each BlackRoad repo participates in the same season arc so we can ship brand, infra, intelligence, and docs together.
        </p>
      </div>
      <div className={styles.timeline}>
        {SEASONS.map((season) => (
          <Card key={season.title} title={season.title} description={season.copy}>
            <p className={styles.stepSubtitle}>{season.subtitle}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
