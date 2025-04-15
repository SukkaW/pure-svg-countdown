import { defineConfig } from 'rollup';
import { swc } from 'rollup-plugin-swc3';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig([
  {
    input: 'src/vercel.ts',
    output: {
      file: 'dist/varcel.js',
      format: 'esm'
    },
    plugins: [
      nodeResolve(),
      swc({
        minify: false
      })
    ]
  },
  {
    input: 'src/cloudflare.ts',
    output: {
      file: 'dist/cloudflare.js',
      format: 'esm'
    },
    plugins: [
      nodeResolve(),
      swc({
        minify: false
      })
    ]
  }
]);
