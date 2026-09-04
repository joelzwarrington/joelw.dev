// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://joelw.dev',
  integrations: [sitemap()],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "img-src 'self' data: https://media.giphy.com",
        "font-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: {
        resources: ['https://static.cloudflareinsights.com'],
        // The anti-FOUC theme script in Base.astro uses is:inline so it runs
        // synchronously before paint; Astro's CSP hashing only covers scripts
        // it bundles itself, so this one needs a manually provided hash.
        hashes: ['sha256-4IM8jvPMvKBETckgwuwPXer8C4eRnRp1CedM3MnahTc='],
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          properties: { className: ['pilcrow'], ariaLabel: 'Link to this section' },
          content: { type: 'text', value: '¶' },
        },
      ],
    ],
  },
});
