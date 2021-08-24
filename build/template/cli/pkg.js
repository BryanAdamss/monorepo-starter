/**
 * @author GuangHui
 * @description cli package.json模板
 */

module.exports = `{
  "name": "@{{scope}}/{{fileName}}",
  "_pkgType": "cli",
  "version": "1.0.0",
  "description": "A {{fileName}}",
  "author": {
    "name": "GuangHui",
    "email": "bryanadamss@foxmail.com",
    "url": "https://github.com/BryanAdamss"
  },
  "homepage": "https://github.com/BryanAdamss/monorepo-starter#readme",
  "license": "MIT",
  "main": "./lib/index.js",
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "bin",
    "lib"
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
  },
  "dependencies": {
    "yargs": "^17.0.1"
  }
}`
