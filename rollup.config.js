import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/progressive-web-components.js',
    format: 'esm',
  },
  plugins: [ resolve() ]
};
