module.exports = {
  client: {
    includes: ["./pages/**/*"],
    excludes: ["src/graphql/**/*"],
    service: {
      name: "shinoa-quotes-web",
      localSchemaFile: "./src/graphql/schema.graphql",
    },
  },
};
