export interface Social {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'dev';
}

export const socials: Social[] = [
  { name: 'GitHub', url: 'https://github.com/joelzwarrington', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/joelwarrington', icon: 'linkedin' },
  { name: 'DEV', url: 'https://dev.to/joelzwarrington', icon: 'dev' },
];
