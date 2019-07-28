import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '../src/store'//引入store中暴露出的实例store
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// 引入仓库==> 笔记测试
// import store from './store(笔记)'

// 全局注册  ==> 这样操作就不用 每次都引入再注册 了
Vue.use(iView)

Vue.config.productionTip = false

new Vue({ //挂载
  router,
  store,  //注册store
  render: h => h(App) //视图渲染
}).$mount('#app')
