export const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.blackroad.systems';
export const PRISM_URL = process.env.NEXT_PUBLIC_PRISM_URL || 'https://prism.blackroad.systems';
export const CONTACT_URL =
  process.env.NEXT_PUBLIC_CONTACT_URL || 'mailto:blackroad.systems@gmail.com?subject=BlackRoad%20OS%20intro';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Product' },
  { href: '/vision', label: 'Vision' },
  { href: '/docs', label: 'Docs' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/regulated', label: 'Regulated' },
  { href: '/console', label: 'Console' },
  { href: '/roadchain', label: 'Roadchain' },
  { href: '/agents', label: 'Agents' },
  { href: '/about', label: 'About' },
  { href: '/company', label: 'Company' },
  { href: '/contact', label: 'Contact' },
  { href: '/stack', label: 'Stack' },
  { href: DOCS_URL, label: 'Docs', external: true },
  { href: PRISM_URL, label: 'Prism Console', external: true },
  { href: CONTACT_URL, label: 'Contact', external: true }
];

export const GITHUB_URL = 'https://github.com/blackroadlabs/blackroad-os-web';
export const CTA_LABEL = 'Open Prism Console';
export const CTA_DESTINATION = PRISM_URL;
