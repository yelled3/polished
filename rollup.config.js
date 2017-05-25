import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import inject from 'rollup-plugin-inject'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import flow from 'rollup-plugin-flow'
import uglify from 'rollup-plugin-uglify'

const processShim = '\0process-shim'

const prod = process.env.PRODUCTION
const mode = prod ? 'production' : 'development'

console.log(`Creating ${mode} bundle...`)

const targets = prod ?
[
  { dest: 'dist/polished.min.js', format: 'umd' },
] :
[
  { dest: 'dist/polished.js', format: 'umd' },
  { dest: 'dist/polished.es.js', format: 'es' },
]

const plugins = [
  flow(),
  nodeResolve(),
  commonjs(),
  babel({
    babelrc: false,
    presets: [
      ['latest', { es2015: { modules: false } }],
    ],
    plugins: [
      'external-helpers',
      'transform-object-rest-spread',
    ],
  }),
  json(),
]

if (prod) plugins.push(uglify())

export default {
  entry: 'src/index.js',
  moduleName: 'polished',
  exports: 'named',
  targets,
  plugins,
}
