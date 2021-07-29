import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
//配置路由
import router from './router'

//引入mock
import './mock'

//引入vuex
import store from './store'

import 'amfe-flexible'

import {
  Style,
  Button
} from 'cube-ui'

Vue.config.productionTip = false

Vue.use(Style,Button)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
