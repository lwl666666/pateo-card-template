import Vue from 'vue'
import App from './App'

import filter from "./filter/filter.js"

Vue.config.productionTip = false

//窗口Module
const windowModule = uni.requireNativePlugin("WindowModule");

Vue.prototype.$windowModule = windowModule;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
