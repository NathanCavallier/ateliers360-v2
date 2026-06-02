import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/reserver/success'],
            },
        ],
        sitemap: 'https://www.ateliers360.fr/sitemap.xml',
    };
}
