/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"))

import withMDX from '@next/mdx'

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    // image optimization is disabled because of exceeding the vercel hobby tier limit
    unoptimized: true,
    domains: ["image.tmdb.org", "res.cloudinary.com"],
  },

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */

  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  async redirects() {
    return [
      {
        source: '/rsvp',
        destination: '/account',
        permanent: true,
      },
      {
        source: '/floorplan',
        destination: 'https://tinyurl.com/adcm-rooms',
        permanent: true,
      },
      {
        source: '/timings',
        destination: 'https://docs.google.com/document/d/1xjZgokqB2lg4ajjHC6UH8Vxa4l7Iu5vmp_P4vu7N67I/edit?usp=sharing',
        permanent: true,
      },
    ]
  },

  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
}
export default withMDX()(config)
