export default {
    verbose: true,
    testMatch: [
        "**/*.test.mjs"
    ],
    transform: {
        "^.+\\.m?js$": "babel-jest"
    },
    globalSetup: "./tests/globalSetup.mjs",
    moduleFileExtensions: ["js", "mjs"],
    // collectCoverage: true,
    // collectCoverageFrom: ['src/**/*.mjs'],
    // coverageDirectory: 'coverage',
    // coverageReporters: ['lcov', 'text', 'html'],
    testEnvironment: 'node',
    globals: {
        __BASEURL__: 'http://localhost:3000'
    },
    testSequencer: './tests/testSequencer.mjs',
}
