import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupBuiltins from 'rollup-plugin-node-builtins';
import rollupGlobals from 'rollup-plugin-node-globals';
import rollupReplace from '@rollup/plugin-replace';

const replace = fromRollup(rollupReplace);
const builtins = fromRollup(rollupBuiltins);
const commonjs = fromRollup(rollupCommonjs);
const globals = fromRollup(rollupGlobals);

export default [
  replace({
    global: 'window',
    'process.env.NODE_ENV': '"production"',
    'process.env.CONDUCTOR_URL': process.env.CONDUCTOR_URL
      ? `"${process.env.CONDUCTOR_URL}"`
      : 'undefined',
  }),
  builtins(),
  commonjs({
    include: [
      'node_modules/leaflet/**/*',
      'node_modules/graphql-tag/**/*',
      'node_modules/isomorphic-ws/**/*',
      'node_modules/@msgpack/**/*',
      'node_modules/@holochain/conductor-api/**/*',
    ],
  }),
  globals(),
];
