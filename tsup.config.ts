import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/lib.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: 'terser',
});
