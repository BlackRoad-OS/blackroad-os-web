import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

const components: MDXComponents = {
  a: ({ href = '', children }) => (
    <Link className="text-cyan-300 underline decoration-dotted" href={href}>
      {children}
    </Link>
  ),
  pre: ({ children }) => <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4">{children}</pre>,
  code: ({ children }) => <code className="rounded bg-slate-800 px-1 py-0.5 text-cyan-200">{children}</code>,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-invert prose-pre:bg-slate-900">
      <Component components={components} />
    </div>
  );
}
