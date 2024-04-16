export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
  
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    coverageDirectory: "./coverage",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx}"],
    coverageReporters: ["json", "lcov", "text", "clover", "html"],
    coveragePathIgnorePatterns: [
      "node_modules",
      "src/main.tsx",
    ],
  };
  