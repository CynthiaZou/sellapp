import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/Goods.vue'
import Evaluate from './pages/Evaluate.vue'
import Merchant from './pages/Merchant.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // 商品
    {
      path: '/', // 监听的hash值 
      name: 'goods',
      component: Goods //对应加载的组件  
    },
    // 评价
    {
      path: '/evaluate',
      name: 'evaluate',
      component: () => import('./pages/Evaluate.vue') // 更适合懒加载
    },
    // 商家
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('./pages/Merchant.vue') // 更适合懒加载
    },

  ]
})
