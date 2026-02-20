/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const routeMeta = {
  "/": { changefreq: "weekly", priority: 1 },
  "/about": { changefreq: "monthly", priority: 0.8 },
  "/faq": { changefreq: "monthly", priority: 0.7 },
  "/discussions": { changefreq: "weekly", priority: 0.8 },
  "/personal": { changefreq: "weekly", priority: 0.9 },
};

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0.5,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },
    ],
  },
  transform: async (config, path) => {
    const meta = routeMeta[path];
    const isYearRoute = /^\/\d{4}$/.test(path);

    return {
      loc: path,
      changefreq: meta?.changefreq || "monthly",
      priority: meta?.priority || (isYearRoute ? 0.9 : 0.7),
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
