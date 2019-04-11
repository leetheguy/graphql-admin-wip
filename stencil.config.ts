import { Config } from '@stencil/core';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [{ type: 'www' }],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  plugins: [
    builtins(),
    globals()
  ],
  nodeResolve: { browser: true, preferBuiltins: true },
  devServer: {
    openBrowser: false
  },
};
