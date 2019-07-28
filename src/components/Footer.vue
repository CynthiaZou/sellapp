<template>
<!-- 购物车条 -->
        <Row class="footer">
            <Col class="leftFooter" span="18">
                 <Poptip placement="right-start" width="370">
                     <!-- 要点击的组件 -->
                     <img :src="getfoodsSrc" />
                    <div class="api" slot="content">
                        <!-- 装你要弹出来的内容  ==> 出口-->
                        <Shopcar />
                    </div>
                </Poptip>
                <label style="padding-left:40px;">总价格: &yen;<span style="font-size:18px">{{ getTotalPrice }}</span>&nbsp;|
                &nbsp;<small>另需配送费4元</small></label>
            </Col>
            <Col :class="[shopcarFoods.length > 0 ? 'bluer' : 'rightFooter']" span="6">
                <label v-show="shopcarFoods.length == 0">&yen;20起送</label>
                <label v-show="shopcarFoods.length > 0">结&nbsp;算</label>
            </Col>
        </Row>
</template>

<script>
import Shopcar from '../pages/Shopcar'

    export default {
        components: {
            Shopcar,
        },
       
        computed: {
            getfoodsSrc() {
                // 根据购物车数量来决定显示哪张图片
                if(this.$store.getters.shopcarFoods.length > 0) {
                    return require('../assets/imgs/shopcar_on.png')
                }
                return require('../assets/imgs/shopcar_off.png')

            },
            // 获取总价格
            getTotalPrice() {
                let total = 0;
                for(let v of this.$store.getters.shopcarFoods) {
                    total += v.num * v.price
                }
            return total;
            },
            // 初始化食品数组
            shopcarFoods() {
                return this.$store.getters.shopcarFoods;
            }
        }
    }
</script>

<style lang="less">
     // 尾部
        .footer{
            height: 47px;
            line-height: 47px;
            padding: 0;
            font-size: 14px;
            color: #ccc;
            text-align: center;
            .leftFooter{
                background-color:  rgba(0, 0, 0,.8);
                position: relative;
                .ivu-poptip{
                    .ivu-poptip-rel{
                        img{
                            width: 50px;
                            height: 50px;
                            position: absolute;
                            top: -38px;
                            left: -20px;
                        }
                    }
                    .ivu-poptip-popper{
                            position: absolute;
                            top: -150px!important;
                            left: 2px;
                            height: 150px;
                            overflow: auto;
                            margin: 0;
                            padding: 0;
                            .ivu-poptip-content{
                                .ivu-poptip-arrow{
                                    left:32px;
                                }
                            }
                    }
                }
            }
            .rightFooter{
                background-color: rgba(0, 0, 0,.6);
                font-size: 16px;
            }
            .bluer{
                background-color: rgb(0, 110, 255);
                font-size: 16px;
            }
        }
</style>