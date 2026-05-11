import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://competitor-review-spy.com/sitemap.xml',
    host: 'https://competitor-review-spy.com',
  };
}
