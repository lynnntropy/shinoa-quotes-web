module.exports = {
  client: {
    excludes: ["src/graphql/schema.graphql"],
    service: {
      name: "shinoa",
      url: "http://host.docker.internal:8080",
    },
  },
};
