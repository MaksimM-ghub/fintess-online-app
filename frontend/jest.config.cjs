module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/mocks/fileMocks.js",
        "\\.(jpg|jpeg|png|svg)$": "<rootDir>/mocks/fileMocks.js",
    },
};
