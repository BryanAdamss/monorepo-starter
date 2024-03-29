/**
 * @author GuangHui
 * @description comp package.json模板
 */

module.exports = `{
  "name": "@{{scope}}/{{fileName}}",
  "_pkgType": "comp",
  "version": "1.0.0",
  "description": "A vue {{fileName}} component",
  "author": {
    "name": "GuangHui",
    "email": "bryanadamss@foxmail.com",
    "url": "https://github.com/BryanAdamss"
  },
  "homepage": "https://github.com/BryanAdamss/monorepo-starter#readme",
  "license": "MIT",
  "main": "./dist/index.cjs.js",
  "exports": {
    "import":"./dist/index.modern.mjs",
    "require":"./dist/index.cjs.js"
  },
  "module": "./dist/index.es.js",
  "unpkg": "./dist/index.umd.js",
  "scripts": {
    "build": "lerna exec --scope @{{scope}}/{{fileName}} -- rollup -c=../../build/comp.js"
  },
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "dist"
  ],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/BryanAdamss/monorepo-starter.git"
  },
  "bugs": {
    "url": "https://github.com/BryanAdamss/monorepo-starter/issues"
  }
}`
