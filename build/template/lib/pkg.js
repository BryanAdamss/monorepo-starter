/**
 * @author GuangHui
 * @description lib package.json模板
 */

module.exports = `{
  "name": "@{{scope}}/{{fileName}}",
  "_pkgType": "lib",
  "version": "1.0.0",
  "description": "A {{fileName}}",
  "author": {
    "name": "GuangHui",
    "email": "bryanadamss@foxmail.com",
    "url": "https://github.com/BryanAdamss"
  },
  "homepage": "https://github.com/BryanAdamss/monorepo-starter#readme",,
  "license": "MIT",
  "main": "./dist/index.cjs.js",
  "exports": {
    "import": "./dist/index.modern.mjs",
    "require": "./dist/index.cjs.js"
  },
  "module": "./dist/index.es.js",
  "browser": "./dist/index.umd.js",
  "unpkg": "./dist/index.umd.js",
  "scripts": {
    "build": "lerna exec --scope @{{scope}}/{{fileName}} -- rollup -c ../../build/lib.js",
    "jsdoc2mdx": "lerna exec --scope @{{scope}}/{{fileName}} -- node ../../build/bin/jsdoc2mdx.js"
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
