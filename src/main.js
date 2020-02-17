import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import {
  Input,
  Icon,
  Button,
  Upload,
  Dialog,
  Message,
  Loading
} from 'element-ui'
import AV from 'leancloud-storage'
AV.init({
  appId: 'BdpF9zFGsClR3IznzIsMkhvO-gzGzoHsz',
  appKey: 'PU4ywVI33tEnoPO0IlcgxISU',
  serverURLs: 'https://bdpf9zfg.lc-cn-n1-shared.com'
})

Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Loading.directive)

Vue.component('Waterfall', Waterfall)
Vue.component('WaterfallSlot', WaterfallSlot)
Vue.prototype.$AV = AV
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
