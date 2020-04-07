
module.exports = function () {
  return {
    files: [
      "index.js",
      "test/test.utils.js",
      "config/*",
      "modules/api/*/**",
      "modules/database/*/**",
      "modules/*/**"
    ],

    tests: [
      "test/**/*.spec.js",
      "test/modules/**/*.spec.js",
      "test/modules/database/**/*.spec.js"
    ],

    env: {
      type: "node"
    },

    // Setting this higher than 1 affects parallelism
    // This can affect database tests since we
    // delete and insert nodes
    workers: {
      initial: 1,
      regular: 1
    }
  };
};
