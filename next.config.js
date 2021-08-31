const withTM = require("next-transpile-modules")(["react-markdown"]);

module.exports = withTM({
  future: {
    webpack5: true,
  },

  pageExtensions: ["page.tsx", "page.ts"],

  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      oneOf: [
        {
          use: [
            {
              loader: "graphql-tag/loader",
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
      ],
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
});
