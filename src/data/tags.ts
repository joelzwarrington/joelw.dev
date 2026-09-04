export const tagLabels: Record<string, string> = {
  rails: 'Rails',
  js: 'JavaScript',
  ts: 'TypeScript',
  react: 'React',
  gql: 'GraphQL',
  csharp: 'C#',
  ruby: 'Ruby',
  tailwind: 'Tailwind CSS',
};

export function formatTags(tags: string[]): string {
  return tags.map((tag) => tagLabels[tag] ?? tag).join(' · ');
}
