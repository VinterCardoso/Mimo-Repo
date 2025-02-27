export default {
    preset: 'ts-jest/presets/default-esm', // Use the ESM preset
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ES Modules
    globals: {
        'ts-jest': {
            useESM: true, // Enable ESM support in ts-jest
        },
    },
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1', // Map imports from @src to src
    },
};