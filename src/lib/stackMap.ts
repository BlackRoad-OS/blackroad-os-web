export type StackLayer = 'Core' | 'Runtime' | 'Interface' | 'Infra' | 'Docs' | 'Agents';

export interface StackComponent {
  id: string;
  name: string;
  repo: string;
  layer: StackLayer;
  description: string;
  status: 'planned' | 'alpha' | 'beta' | 'prod';
  links?: {
    github?: string;
    docs?: string;
    console?: string;
  };
}

export const STACK_COMPONENTS: StackComponent[] = [
  {
    id: 'core',
    name: 'blackroad-os-core',
    repo: 'BlackRoad-OS/blackroad-os-core',
    layer: 'Core',
    status: 'alpha',
    description: 'Domain primitives: PS-SHA∞ identity, truth, events, agents, jobs.'
  },
  {
    id: 'operator',
    name: 'blackroad-os-operator',
    repo: 'BlackRoad-OS/blackroad-os-operator',
    layer: 'Runtime',
    status: 'alpha',
    description: 'Automation runtime that runs agents and jobs, emits events.'
  },
  {
    id: 'api',
    name: 'blackroad-os-api',
    repo: 'BlackRoad-OS/blackroad-os-api',
    layer: 'Runtime',
    status: 'alpha',
    description: 'Typed HTTP surface for Prism Console and other clients.'
  },
  {
    id: 'prism',
    name: 'blackroad-os-prism-console',
    repo: 'BlackRoad-OS/blackroad-os-prism-console',
    layer: 'Interface',
    status: 'alpha',
    description: 'Operator console for agents, finance, and RoadChain events.'
  },
  {
    id: 'web',
    name: 'blackroad-os-web',
    repo: 'BlackRoad-OS/blackroad-os-web',
    layer: 'Interface',
    status: 'alpha',
    description: 'Public face of BlackRoad OS with the desktop shell experience.'
  },
  {
    id: 'infra',
    name: 'blackroad-os-infra',
    repo: 'BlackRoad-OS/blackroad-os-infra',
    layer: 'Infra',
    status: 'alpha',
    description: 'DNS, environments, deployment and runbooks.'
  },
  {
    id: 'docs',
    name: 'blackroad-os-docs',
    repo: 'BlackRoad-OS/blackroad-os-docs',
    layer: 'Docs',
    status: 'alpha',
    description: 'Canonical documentation for the OS and its components.'
  },
  {
    id: 'agents',
    name: 'Lucidia, Atlas & friends',
    repo: '',
    layer: 'Agents',
    status: 'planned',
    description: 'Specialized agents orchestrated via Operator and Core primitives.'
  }
];
