/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        include: ['**/*.spec.tsx'],
        globals: true,
        environment: 'jsdom',
    },
})