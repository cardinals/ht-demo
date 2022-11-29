## vue-i18n

## Download dependency
```
yarn add vue-i18n
```

### Basic configuration 
```main.js

import Vue from 'vue'
import iView from 'view-design'
//中英文切换
import VueI18n from 'vue-i18n' //引入vue-i18n
import zh from './lang/zh'  // 中文语言包
import en from './lang/en'  // 英文语言包
//引入iview的中文语言包
import enLocale from 'view-design/dist/locale/en-US'
//引入iview的英文语言包
import zhLocale from 'view-design/dist/locale/zh-CN' 
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(VueI18n) // 注册vue-i18n
Vue.use(iView)
const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  messages: {
    'zh-CN':  Object.assign(zh, zhLocale),   // 中文语言包
    'en-US':  Object.assign(en, enLocale)    // 英文语言包
  }
})


```

### Use
```
<div>{{$t('navbar.ABOUTUS')}}</div>

```