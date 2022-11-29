import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config'
import iView from 'view-design'
import ElementUI from 'element-ui'
import 'lib-flexible'
import 'mockjs'

Vue.config.productionTip = false

//中英文切换
import VueI18n from 'vue-i18n' //引入vue-i18n
import zh from '@/lang/zh.json' // 中文语言包
import en from '@/lang/en.json' // 英文语言包
// import Locales from './locale';
import enLocale from 'view-design/dist/locale/en-US' //引入iview的中文语言包
import zhLocale from 'view-design/dist/locale/zh-CN' //引入iview的英文语言包
import enLocale1 from 'element-ui/lib/locale/lang/en'
import zhLocale1 from 'element-ui/lib/locale/lang/zh-CN'
import zh1 from '@/lang/zh1.js'
import en1 from '@/lang/en1.js'
import dataV from "@jiaminghi/data-view"

Vue.use(dataV);

Vue.use(iView, ElementUI, {
	//增加注册elementUI
	i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueI18n) // 通过插件的形式挂载
Vue.use(iView)
Vue.use(ElementUI)
Vue.locale = () => { }
const i18n = new VueI18n({
	locale: sessionStorage.getItem('locale') ? sessionStorage.getItem('locale') : 'zh-CN', // 语言标识
	//this.$i18n.locale // 通过切换locale的值来实现语言切换
	messages: {
		// 'zh-CN': require('./lang/zh.json'),   // 引入中文语言包依赖
		// 'en-US': require('./lang/en.json')    // 引入英文语言包依赖
		'zh-CN': Object.assign(zh, zhLocale, zhLocale1, zh1), // 中文语言包
		'en-US': Object.assign(en, enLocale, enLocale1, en1) // 英文语言包
	}
})

let vm1 = new Vue({
	router,
	store,
	i18n,
	render: h => h(App),
	beforeCreate(){
		Vue.prototype.$bus=this;
	}
}).$mount('#app') //挂载

export default vm1
