/**
 * @author GuangHui
 * @description 模板文件出口
 */

const assets = (params) => ({
  index: {
    tpl: require('./assets-index'),
    params,
    name: './src/index.js'
  },
  readme: {
    tpl: require('./readme'),
    params,
    name: './README.md'
  },
  package: {
    tpl: require('./assets-pkg'),
    params,
    name: './package.json'
  },
  mdx: {
    tpl: require('./assets-mdx'),
    params,
    name: `./stories/${params.fileName}.stories.mdx`
  }
})

const comp = (params) => ({
  index: {
    tpl: require('./comp-index'),
    params,
    name: './src/index.js'
  },
  vue: {
    tpl: require('./comp-vue'),
    params,
    name: `./src/${params.fileName}.vue`
  },
  readme: {
    tpl: require('./readme'),
    params,
    name: './README.md'
  },
  stories: {
    tpl: require('./comp-mdx'),
    params,
    name: `./stories/${params.fileName}.stories.mdx`
  },
  package: {
    tpl: require('./comp-pkg'),
    params,
    name: './package.json'
  },
  test: {
    tpl: require('./comp-test'),
    params,
    name: `./__tests__/${params.fileName}.test.js`
  },
  scss: {
    tpl: require('./comp-scss'),
    params,
    name: `./src/${params.fileName}.scss`
  }
})

const lib = (params) => ({
  index: {
    tpl: require('./lib-index'),
    params,
    name: './src/index.js'
  },
  test: {
    tpl: require('./lib-test'),
    params,
    name: `./__tests__/${params.fileName}.test.js`
  },
  readme: {
    tpl: require('./readme'),
    params,
    name: './README.md'
  },
  package: {
    tpl: require('./lib-pkg'),
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
