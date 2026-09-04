export interface Role {
  title: string;
  company: { name: string; url?: string };
  start: string; // ISO date
  end: string | null; // null = ongoing
  highlights: string[]; // rendered as raw HTML, see RoleEntry.astro
  tags: string[]; // tag slugs, see src/data/tags.ts
}

export const experience: Role[] = [
  {
    title: "Software Engineer, Docs",
    company: { name: "Stripe", url: "https://stripe.com" },
    start: "2025-03-01",
    end: null,
    highlights: [
      "Building the platform that powers and distributes Stripe's technical documentation, including docs.stripe.com as well as API, JS, and CLI reference sites",
      "Building the generator which programmatically builds Stripe's API Reference documentation from OpenAPI",
      'Maintaining <a href="https://markdoc.dev">Markdoc</a>, Stripe\'s open-source documentation format and surrounding tooling',
      "Developing editor and web tooling to help teams write and maintain documentation effectively",
      "Building thoughtful, interactive documentation experiences that help developers effectively understand and integrate against Stripe's APIs and products",
    ],
    tags: ["ruby", "ts", "go"],
  },
  {
    title: "Senior Software Engineer, Internal Tools",
    company: { name: "Shopify", url: "https://shopify.com" },
    start: "2024-09-01",
    end: "2025-03-01",
    highlights: [
      "Maintained Shopify's internal project management tool, the Vault",
      "Interviewed intern, intermediate, and senior engineering candidates in pair programming sessions",
    ],
    tags: ["rails", "js"],
  },
  {
    title: "Senior Software Engineer, Growth",
    company: { name: "Shopify", url: "https://shopify.com" },
    start: "2024-01-01",
    end: "2024-08-01",
    highlights: [
      "Launched pricing change to our enterprise plan for new and existing merchants. Integrated with a third-party contract management tool to automate contract amendments via DocuSign",
      "Refactored &amp; migrated our bespoke enterprise billing system to our new standardized billing system",
      "Authored detailed technical design documents that outlined architectural decisions, evaluated trade-offs, and provided clear rationale for design choices, ensuring alignment with project goals and facilitating effective communication across the development team",
      "Mentored intern and intermediate software engineers through one-on-one pairing sessions, comprehensive code reviews, and regular feedback, fostering skill development and enhancing team performance",
    ],
    tags: ["rails", "gql", "react", "ts"],
  },
  {
    title: "Software Engineer, Growth",
    company: { name: "Shopify", url: "https://shopify.com" },
    start: "2022-04-01",
    end: "2024-01-01",
    highlights: [
      "Launched enterprise upgrade funnels which has led to over <strong>500+</strong> merchant upgrades, and <strong>$20M+</strong> in annual recurring revenue",
      "Built automation tools for Sales to easily onboard new merchants",
      'Improved A/B testing functionality on our <a href="https://shopify.com">marketing site</a> to improve scalability, developer experience and enable concurrency of experiments.',
      'Improved conversion rates of popular landing pages on our <a href="https://shopify.com">marketing site</a> via A/B experiments resulting in <strong>17,000+</strong> new merchants',
      "Conducted coding interviews with potential engineering candidates, and mentored intern and junior engineers",
    ],
    tags: ["rails", "gql", "react", "ts"],
  },
  {
    title: "Software Engineer, Platform",
    company: { name: "Jobber", url: "https://getjobber.com" },
    start: "2021-03-01",
    end: "2022-03-01",
    highlights: [
      'Led the development and implementation of our <a href="https://developer.getjobber.com">third-party developer platform</a> and public API, providing customers with the ability to easily integrate their favorite products and creating an additional revenue stream for Jobber',
      "Published GraphQL API design guidelines for the engineering organization, and organized workshops with other teams to model their domain systems",
    ],
    tags: ["rails", "gql", "react", "ts"],
  },
  {
    title: "Software Engineer",
    company: { name: "Elantis Solutions Inc." },
    start: "2019-01-01",
    end: "2022-02-01",
    highlights: [
      "Built web applications using C#, React, and TypeScript for industry clients as consultant",
    ],
    tags: ["csharp", "react", "ts", "js"],
  },
];
