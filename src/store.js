import Vue from 'vue'
import Vuex from 'vuex'
import { getgoods } from './api/apis'

// 全局注册 
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        // name: '测试姓名',
        list: [] //商品数据
    },
    mutations:{
        // 修改名字
        // changeName(state,obj) {
        //     state.name = obj.name;
        // },
        // action发送过来的
        initlist(state, obj){
            state.list = obj.data
        },
        
        // 改变商品数量
        changeFoodNum(state, param) {
            // obj.id 当前要改变数量的食品id
            // obj.num 要改变的数量 -1 1
            for(let obj of state.list) {
                for(let v of obj.foods) {
                    if(v.id == param.id) {
                        v.num += param.num;
                        return //整个打断 提升代码性能
                    }
                }
            }
        }
    },
    actions: {
        async initlist(context) {
            // 1- 发请求 拿数据
            let res = await getgoods()
            console.log(res)

            let id = 0
            // 前端制作自己的前端数据  ==>此num,id字段可以找后台沟通
            let arr = res.data.data;
            for(let obj of arr) {
                for(let v of obj.foods){
                    v.num = 0 
                    v.id = id++
                }
            }

            // 2- 提交mutation
            context.commit({
                type: 'initlist',
                data: arr
            })
        }
    },
    getters: {
        // 过滤所有数量>0的数据， 返回数据不为0的食品数组
        shopcarFoods(state) {
            let arr = []

            for(let obj of state.list) {
                for(let v of obj.foods) {
                    if(v.num > 0) {
                        arr.push(v)
                    }
                }
            }

            return arr;
        }
    }
})