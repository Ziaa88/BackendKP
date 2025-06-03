module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "controllers/**/*.js", // Pastikan path sesuai dengan file controller Anda
      "!**/node_modules/**",  // Jangan masukkan node_modules
      "!**/test/**",          // Jangan masukkan file tes
      "!**/config/**",
      "!**/migrations/**",
      "!**/models/**",
      "!**/repositories/**",
      "!**/routes/**",
      "!**/seeders/**",
      "!**/services/**",
      "!**/FooterController.js /**"
    ],
    coverageDirectory: "coverage", // Direktori untuk laporan coverage
    coverageReporters: ["text", "lcov", "json"], // Format laporan coverage
    testEnvironment: "node"
  };
  