import Vue from 'vue'
import App from './App'

import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import uniNumberBox from './components/uni-number-box/uni-number-box.vue'
Vue.component('uni-number-box',uniNumberBox)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



