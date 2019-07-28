<template>
    <div class="container">
        <!-- 左菜单栏 -->
        <div class="left_div">
            <ul class="content">
                <div 
                    
                    @click="clickToRight(i)" 
                    :class="{left_title: true, selected: curIndex == i}" 
                    v-for="(item,i) in list" 
                    :key='i'
                    >
                    <label>{{ item.name }}</label> 
                </div>
            </ul>
        </div>

        <!-- 右边内容 -->
        <div class="right_div">
            <ul id="right_ul" class="content">
                <div :id="i" class="right_title" v-for="(item,i) in list" :key='i'>
                    <!-- 标题 -->
                    <h6>{{ item.name}} </h6>
                    <!-- 下方食物 -->
                    <div class="goodsUnit" v-for="(v,i) in item.foods" :key="i">
                        <img :src='v.icon' alt='#'>
                        <div class="goodsDetail">
                            <h5>{{ v.name }}</h5>
                            <p class="lalala">{{ v.description}} </p>
                            <p>月售{{ v.sellCount}}份 / 好评率{{ v.rating }}%</p>
                            <div class="addDec">
                                <div><span class="sellPrice">&yen;{{v.price}}</span></div>
                                <div class="delPrice"><del>&yen;{{v.oldPrice}}</del></div>
                                <!-- 加减按钮  -->
                                <div class="btn">
                                    <Icon  v-show="v.num > 0" @click="clickFoodDec(v.id)" type="ios-remove-circle-outline" />
                                    <span v-show="v.num > 0" >&nbsp;{{v.num}}&nbsp;</span>
                                    <Icon @click="clickFoodAdd(v.id)" type="md-add-circle" />

                                </div>

                             </div>   
                        </div>
                    </div>
                </div>
            </ul>
        </div>
        
    </div>
</template>

<script>
// 引入封装请求文件
import { getgoods } from '../api/apis'

// 引入better-scroll
import BScroll from 'better-scroll'

    export default {
        data() {
            return {
                // dataList: [], //数据源 数组
                curIndex: 0, //当前在左侧选中的索引
                heightArr: [], //定义空数组保存每个小标题的高度
            }
        },
        created(){
            // 初始化请求数据
            this.$store.dispatch('initlist')
        },
        computed: {
            list() {
                return this.$store.state.list;
            }
        },
        mounted() {
            //获取容器节点 
            // let left = document.querySelector('.left_title') 
            // 初始化左侧滚动区域
            this.left_scroll = new BScroll('.left_div', {//==> 这样写，底层也会通过querySelector去选择到元素
                click: true //让betterscroll允许 点击
            }) 

            // 初始化右侧滚动区域
            this.right_scroll = new BScroll('.right_div', {
                probeType: 3 ,
                click: true //让betterscroll允许 派发滚动事件
            })

            // 给右侧容器监听滚动事件 =====> 右联左step1
            this.right_scroll.on('scroll', (obj) => { 
                // 当前滚动距离
                let _y = Math.abs(obj.y)
                // console.log(this.heightArr) //空数组
                
                // 如果当前滚动距离 < 第1个元素的高度，把curIndex设置为0 =====> 右联左step3
                if(_y < this.heightArr[0]) {
                    this.curIndex = 0;
                } else {
                    // 剩下格子的判断
                    let totalHeight = 0;
                    for(let k=0; k<this.heightArr.length; k++){
                        totalHeight += this.heightArr[k];
                        // console.log(totalHeight)
    
                        // 若当前滚动距离 >= totalHeight 让就左侧curIndex的索引+1 即往后移一个位置
                        if(_y >= totalHeight) {
                            this.curIndex = k + 1;
                            // this.left_scroll.scrollToElement(document.getElementById(k),200);
                        }
                    }
                }
            })
            // 此阶段还没有拿到ajax的响应，所以此时data还是[]，子集div还未被创建
        },
        updated() {
            // 只运行一次 提高代码性能 =====> 右联左step2
            if(this.heightArr.length == 0) {
                // 获取右侧滚动的容器
                let ul = document.getElementById('right_ul');
                // 循环得到容器中每个子元素
                for( let elt of ul.childNodes) {
                    // 将子元素偏移高度push到数组heightArr中
                    this.heightArr.push(elt.offsetHeight);
                }
                // console.log(this.heightArr)
            }
        },
        methods: {
            /* 左联右 */
            clickToRight(index) { //形参
                // 点击时 改变当前索引值
                this.curIndex = index;
                // 滚动到目标元素(点左边索引 右边容器 滚动到 对应位置的索引; 200毫秒)
                this.right_scroll.scrollToElement(document.getElementById(index),200);
            },

            // 点击食品减少
            clickFoodDec(id) {
                this.$store.commit({
                    type: 'changeFoodNum',
                    id,
                    num: -1
                })
            },
            // 点击食品增加
            clickFoodAdd(id) {
                console.log(id)
                this.$store.commit({
                    type: 'changeFoodNum',
                    id,
                    num: 1
                })
            },


        }
    }
</script>

<style lang="less" scoped>
 // 中间部份
    .container{
        height: 440px;
        display: flex;

        // 左边菜单栏
        .left_div{
            width: 100px;
            overflow: auto;

            .left_title{
                height: 50px;
                display: flex;
                align-items: center;
                padding: 10px;
                background-color:#f4f5f7;

            }
            .selected {
                background-color: #fff;
            }
        }

        // 右边内容
        .right_div{
            width:100%;
            background-color: #fff;
            overflow: auto;
            .right_title{
                h6{
                    height: 30px;
                    line-height: 30px;
                    background-color:#f4f5f7;
                    text-indent: 20px;
                }
                .goodsUnit{
                    display: flex;
                    padding: 20px;
                    border-bottom: 1px solid #f3f3f3;
                    img{
                        width: 60px;
                        align-self: center;
                    }
                    .goodsDetail{
                        margin-left: 10px;
                        width: 190px;
                        p{
                            color:gray;
                            font-size:12px;
                            line-height: 20px;
                        }
                        
                        .lalala{
                            width:80%;
                            overflow:hidden;
                            text-overflow: clip;
                            white-space:nowrap;
                        }
                        .addDec{
                            display: flex;
                            justify-content: space-between;
                            .sellPrice{
                                color:red;
                                font-size: 14px;
                                font-weight: bold;
                                margin-right: 6px;
                            }
                            .delPrice{
                                font-size: 14px;
                                color: gray;
                                margin-left: -60px;
                            }
                            .btn{
                                font-size: 20px;
                                color:gray;
                                .ivu-icon-md-add-circle:before{
                                    color:rgb(0, 110, 255);
                                }
                            }
                        }
                        
                        
                       
                    }
                }
            }
            
        }

    }
</style>