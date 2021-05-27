/**
 * @author GuangHui
 * @description 模板文件出口
 */

const {
  TPL_PKG_LIB,
  TPL_README,
  TPL_INDEX_ASSETS,
  TPL_INDEX,
  TPL_VUE,
  TPL_PKG_VUE,
  TPL_SCSS,
  TPL_TEST,
  TPL_STORIES_MDX_VUE,
  TPL_INDEX_LIB,
  TPL_TEST_LIB
} = require('./template')

const assets = (params) => ({
  index: {
    tpl: TPL_INDEX_ASSETS,
    params,
    name: './src/index.js'
  },
  readme: {
    tpl: TPL_README,
    params,
    name: './README.md'
  },
  package: {
    tpl: TPL_PKG_LIB,
    params,
    name: './package.json'
  }
})

const comp = (params) => ({
  index: {
    tpl: TPL_INDEX,
    params,
    name: './src/index.js'
  },
  vue: {
    tpl: TPL_VUE,
    params,
    name: `./src/${params.fileName}.vue`
  },
  readme: {
    tpl: TPL_README,
    params,
    name: './README.md'
  },
  stories: {
    tpl: TPL_STORIES_MDX_VUE,
    params,
    name: `./stories/${params.fileName}.stories.mdx`
  },
  package: {
    tpl: TPL_PKG_VUE,
    params,
    name: './package.json'
  },
  test: {
    tpl: TPL_TEST,
    params,
    name: `./__tests__/${params.fileName}.test.js`
  },
  scss: {
    tpl: TPL_SCSS,
    params,
    name: `./src/${params.fileName}.scss`
  }
})

const lib = (params) => ({
  index: {
    tpl: TPL_INDEX_LIB,
    params,
    name: './src/index.js'
  },
  test: {
    tpl: TPL_TEST_LIB,
    params,
    name: `./__tests__/${params.fileName}.test.js`
  },
  readme: {
    tpl: TPL_README,
    params,
    name: './README.md'
  },
  package: {
    tpl: TPL_PKG_LIB,
    params,
    name: './package.json'
  }
})

const fnMap = {
  lib,
  comp,
  assets
}

module.exports = {
  getTplMap: (type, params) => fnMap[type](params)
}
