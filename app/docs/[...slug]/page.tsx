import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';
import GlowButton from '../../../components/GlowButton';
import { Mdx } from '../../../lib/mdx';
import { siteMetadata } from '../../../lib/metadata';

export const dynamicParams = false;

function findDoc(slug: string[]) {
  return allDocs.find((doc) => doc.slugAsParams === slug.join('/'));
}

export function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc.slugAsParams.split('/') }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }): Metadata {
  const doc = findDoc(params.slug);
  if (!doc) return siteMetadata;
  return {
    title: `${doc.title} · BlackRoad OS`,
    description: doc.description,
    openGraph: {
      title: `${doc.title} · BlackRoad OS`,
      description: doc.description,
      url: `${process.env.SITE_URL || 'https://blackroad.os'}/docs/${doc.slugAsParams}`,
    },
  };
}

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const doc = findDoc(params.slug);
  if (!doc) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-16 pt-16 prose prose-invert prose-br-day-night">
      <GlowButton href="/" label="Back to portal" />
      <h1 className="mt-6 text-balance text-4xl font-bold text-white">{doc.title}</h1>
      <p className="text-slate-400">{doc.description}</p>
      <Mdx code={doc.body.code} />
    </article>
  );
}
