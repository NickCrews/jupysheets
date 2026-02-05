import type { UserConfig } from 'vite'
import { viteSingleFile } from "vite-plugin-singlefile"

export default {
  plugins: [
    viteSingleFile(),
  ],
  // build: {
  //   outDir: 'build',
  //   // rollupOptions: {
  //   //   input: './src/index.html',
  //   // },
  // },
} satisfies UserConfig