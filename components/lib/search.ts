export interface SearchDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  href: string;
}

const DOCUMENTS: SearchDocument[] = [
  { id: '1', title: 'Getting Started', description: 'Quick start guide for BlackRoad OS', category: 'docs', url: '/docs/getting-started', href: '/docs/getting-started' },
  { id: '2', title: 'Agent API', description: 'API reference for creating agents', category: 'api', url: '/docs/api/agents', href: '/docs/api/agents' },
  { id: '3', title: 'Orchestration', description: 'Learn about task orchestration', category: 'guides', url: '/docs/orchestration', href: '/docs/orchestration' },
  { id: '4', title: 'Deployment', description: 'Deploy your agents to production', category: 'guides', url: '/docs/deployment', href: '/docs/deployment' },
  { id: '5', title: 'CLI Reference', description: 'Command line interface documentation', category: 'api', url: '/docs/cli', href: '/docs/cli' },
];

export function listDocuments(): SearchDocument[] {
  return DOCUMENTS;
}

export function searchDocuments(query: string): SearchDocument[] {
  if (!query.trim()) return DOCUMENTS;
  const lowerQuery = query.toLowerCase();
  return DOCUMENTS.filter(
    doc =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.description.toLowerCase().includes(lowerQuery) ||
      doc.category.toLowerCase().includes(lowerQuery)
  );
}
