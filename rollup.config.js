import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/html-annex.js',
    format: 'esm',
  },
  plugins: [ resolve() ]
};
