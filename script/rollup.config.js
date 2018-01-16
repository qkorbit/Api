import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'

let isProd = process.env.NODE_ENV === 'production'
let extraPlugins = isProd ? [uglify(), filesize()] : [filesize()]

export default {
  input: './src/index.ts',
  plugins: [
    typescript({
      verbosity: 2,
      clean: true,
      typescript: require('typescript') //local typescript
    }),
    resolve(),
    commonjs(),
    ...extraPlugins
  ],
  watch: {
    exclude: './node_modules/**'
  },
  output: [
    {
      format: 'umd',
      banner: '/** ApiJS - (c) Orbit 2018 - MIT Licensed */',
      name: 'Api',
      sourcemap: true,
      file: './dist/umd/api.' + (isProd ? 'min.' : '') + 'js'
    }
  ]
}
