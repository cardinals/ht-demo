# teach-admin

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 目录
# ···public                 公共文件，项目全局配置，打包后可修改
#   ...base                 全局基础配置
#   ...lib                  全局可配置文件，如路由json数据等
#   ...theme/resource        全局可配置资源文件，按主题分类，logo图片等


# ···src                    
#   ···apis                 接口js文件
      创建接口文件夹，针对不同实例不同后台接口
#    ...assets              样式资源等
      针对样式文件进行修改
#   ...axios                接口封装文件
#   ...components           公共组件
#   ...config               项目配置，内部开发修改
      新增插件，项目配置等
#   ...utils                公共js方法，可修改拓展
      自定义js方法，针对项目创建的公共方法
#   ...datas                自定义混入或数据等，可修改拓展
#   ...router               路由文件
      一般不做修改
#   ...store                vuex,模块化开发
      全局变量，针对不同模块进行定义
#   ...views                项目开发主体文件夹



# babel.config.js           插件配置文件

# vue.config.js             项目配置文件

# gitlab-ci.yml             项目自动部署配置，专人维护
#   ...lib                  固定工具类，（专人维护，非公开）
      固定公共方法，专人维护优化，私有方法放入utils
#   ...mixins               固定混入数据文件，（专人维护，非公开）
      固定公共数据，自定义数据放入datas


# app.vue                   无需修改
# main.js                   无需修改
# .browserslistrc           无需修改
# .gitignore                无需修改
# yarn.lock                 项目依赖文件版本锁定文件
# package.json              项目依赖，初始项目时维护，版本固定后非必要情况下不修改更新依赖版本，避免出现兼容性问题
