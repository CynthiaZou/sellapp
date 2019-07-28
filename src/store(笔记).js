import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { getseller } from './api/apis'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        name: '张二狗子',
        age: 19,
        list:[]

    },
    mutations: {
        // changeName(state, val) {
        //     // state.name = val; //方式1
        //     state.name = val.name; //方式1 ==>此时的val是一个对象
        // },
        // changeAge(state, val){
        //     // state.age = val; //方式1
        //     state.age = val.age; //方式1
        // }

        // 从actions传过来的 用于改变state
        initlist(state,obj) {
            state.list = obj.data
            console.log(obj.data)
        }
        

    },
    actions: {
        async initlist(context){
            // 1- 发送请求拿到数据
            let res = await getseller();
            console.log(res.data.data)

            // 2- 提交一个mutation，让mutation去改变state
            context.commit({
                type: 'initlist',
                data: res.data.data
            })
        }
    },
    getters:{
        
    }
})

// 触发mutation
/* 触发方式一 */
// store.commit('changeName', '四0四') //方式 1
// store.commit('changeAge', 20) //方式 1

/* 触发方式二 */
// store.commit( {
//     type: 'changeName',
//     name: '张三'
// })
// store.commit( {
//     type: 'changeAge',
//     age: 30
// })

// 触发actions
store.dispatch('initlist')


console.log(store.state.name)
console.log(store.state.age)
console.log(store.state.list)

export default store;
