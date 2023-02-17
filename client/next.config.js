const { PHASE_DEVELOPMENT_SERVER } = require("next/dist/shared/lib/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        markdownPath: "",
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      markdownPath: "",
    },
  };
};
``;

module.exports = nextConfig;
