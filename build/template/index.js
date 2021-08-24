/**
 * @author GuangHui
 * @description 模板文件出口
 */

const assets = (params) => ({
  index: {
    tpl: require('./assets/main'),
    params,
    name: './src/index.js'
  },
  readme: {
    tpl: require('./common/readme'),
    params,
    name: './README.md'
  },
  package: {
    tpl: require('./assets/pkg'),
    params,
    name: './package.json'
  },
  stories: {
    tpl: require('./assets/mdx'),
    params,
    name: `./stories/${params.fileName}.stories.mdx`
  }
})

const comp = (params) => ({
  index: {
    tpl: require('./comp/main'),
    params,
    name: './src/index.js'
  },
  vue: {
    tpl: require('./comp/vue'),
    params,
    name: `./src/${params.fileName}.vue`
  },
  readme: {
    tpl: require('./comp/readme'),
    params,
    name: './README.md'
  },
  stories: {
    tpl: require('./comp/mdx'),
    params,
    name: `./stories/${params.fileName}.stories.mdx`
  },
  package: {
    tpl: require('./comp/pkg'),
    params,
    name: './package.json'
  },
  test: {
    tpl: require('./comp/test'),
    params,
    name: `./__tests__/${params.fileName}.test.js`
  },
  scss: {
    tpl: require('./comp/scss'),
    params,
    name: `./src/${params.fileName}.scss`
  }
})

const lib = (params) => ({
  index: {
    tpl: require('./lib/main'),
    params,
    name: './src/index.js'
  },
  test: {
    tpl: require('./lib/test'),
    params,
    name: `./__tests__/${params.fileName}.test.js`
  },
  readme: {
    tpl: require('./common/readme'),
    params,
    name: './README.md'
  },
  package: {
    tpl: require('./lib/pkg'),
    params,
    name: './package.json'
  },
  stories: {
    tpl: require('./lib/mdx'),
    params,
    name: `./stories/${params.fileName}.stories.mdx`
  }
})

const cli = (params) => ({
  index: {
    tpl: require('./cli/main'),
    params,
    name: './lib/index.js'
  },
  test: {
    tpl: require('./cli/test'),
    params,
    name: `./__tests__/${params.fileName}.test.js`
  },
  readme: {
    tpl: require('./cli/readme'),
    params,
    name: './README.md'
  },
  package: {
    tpl: require('./cli/pkg'),
    params,
    name: './package.json'
  },
  stories: {
    tpl: require('./cli/mdx'),
    params,
    name: `./stories/${params.fileName}.stories.mdx`
  },
  bin: {
    tpl: require('./cli/bin'),
    params,
    name: './lib/bin.js'
  },
  www: {
    tpl: require('./cli/www'),
    params,
    name: './bin/www'
  }
})

const conf = (params) => ({
  index: {
    tpl: require('./conf/main'),
    params,
    name: './src/index.js'
  },
  test: {
    tpl: require('./conf/test'),
    params,
    name: `./__tests__/${params.fileName}.test.js`
  },
  readme: {
    tpl: require('./conf/readme'),
    params,
    name: './README.md'
  },
  package: {
    tpl: require('./conf/pkg'),
    params,
    name: './package.json'
  },
  stories: {
    tpl: require('./conf/mdx'),
    params,
    name: `./stories/${params.fileName}.stories.mdx`
  }
})

const fnMap = {
  lib,
  comp,
  assets,
  cli,
  conf
}

module.exports = {
  getTplMap: (type, params) => fnMap[type](params)
}
