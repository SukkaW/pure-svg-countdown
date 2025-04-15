import { defineConfig } from 'rollup';
import { swc } from 'rollup-plugin-swc3';

export default defineConfig([
  {
    input: 'src/vercel.ts',
    output: {
      file: 'dist/varcel.js',
      format: 'esm'
    },
    plugins: [swc()]
  },
  {
    input: 'src/cloudflare.ts',
    output: {
      file: 'dist/cloudflare.js',
      format: 'esm'
    },
    plugins: [swc()]
  }
]);
