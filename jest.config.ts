import type { Config } from 'jest';

export default async (): Promise<Config> => {
    return {
        verbose: true,
        testEnvironment: 'node',
        roots: ['<rootDir>/test'],
        testMatch: ['**/*.test.ts'],
        transform: {
            '^.+\\.tsx?$': 'ts-jest',
        },
    };
};
