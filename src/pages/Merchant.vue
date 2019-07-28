<template>
    <div class="merchant">
        <!-- 标题 -->
        <div class="seller">
            <Row>
                <Col span="14">
                    <p class="title">{{this.data.name}}</p>
                    <p class="star">
                        <!-- 根据 整数 来循环 -->
                        <img src="../assets/imgs/star36_on@2x.png" alt="#">
                        <!-- 根据 小数 来决定是否显示 -->
                        <img src="../assets/imgs/star36_half@2x.png" alt="#">
                        <!-- 根据 getNull函数 来循环判断显示几个空星星 -->
                        <img src="../assets/imgs/star36_off@2x.png" alt="#">
                    
                        <span>(661)&emsp;月售690单</span>
                    </p>
                </Col>
                <Col span="10">
                    <Icon type="md-heart" />
                    <p class="star  ">已收藏</p>
                </Col>
            </Row>

        </div>

        <!-- 起送 -->
        <div class="delivery">
            <Row>
                <Col span="8" class="line">
                    <p>起送价</p>
                    <p><span>{{this.data.minPrice}}</span>元</p>
                </Col>
                <Col span="8" class="line">
                    <p>商家配送</p>
                    <p><span>{{this.data.deliveryPrice}}</span>元</p>
                </Col>
                <Col span="8">
                    <p>起送价</p>
                    <p><span>{{this.data.deliveryTime}}</span>分钟</p>
                </Col>
               
            </Row>
        </div>
        <div class="blank"></div>

        <!-- 公告 -->
        <div class="notice_activity">
            <!-- 公告 -->
            <div class="notice">
                <h3>公告与活动</h3>
                <p>{{ this.data.bulletin }}</p>
            </div>

            <!-- 活动 -->
            <div class="activity">
                <div class="acti">
                    <img src="../assets/imgs/decrease_3@2x.png" alt="#">
                    <span>{{ this.data.supports[0].description}}</span>
                </div>
                <div class="acti">
                    <img src="../assets/imgs/discount_1@2x.png" alt="#">
                    <span>{{ this.data.supports[1].description}}</span>
                </div>
                <div class="acti">
                    <img src="../assets/imgs/special_1@2x.png" alt="#">
                    <span>{{ this.data.supports[2].description}}</span>
                </div>
                <div class="acti">
                    <img src="../assets/imgs/guarantee_1@2x.png" alt="#">
                    <span>{{ this.data.infos[0]}}</span>
                </div>
            </div>


        </div>
        <div class="blank"></div>

        <!-- 商家实景 -->
        <div class="shop">
            <h3>商家实景</h3>
            <div class="mer_img">
                <img :src="this.data.pics[0]" alt="#">
                <img :src="this.data.pics[1]" alt="#">
                <img :src="this.data.pics[2]" alt="#">
            </div>
        </div>
        <div class="blank"></div>

        <!-- 商家信息 -->
        <div class="mer_info">
            <h3>商家信息</h3>
            <p>{{ this.data.infos[0]}}</p>
            <p>{{ this.data.infos[1]}}</p>
            <p>{{ this.data.infos[2]}}</p>
            <p>{{ this.data.infos[3]}}</p>
        </div>



        
    </div>
</template>

<script>
import { getseller } from '../api/apis'

    export default {
        data() {
            return {
                data:[],
                // point1:4.2,

            }
        },
        async created() {
            let res = await getseller();
            this.data = res.data.data;
            console.log(this.data)
        },
        computed:{
            name(){
                return this.$store.state.name;
            }
        }

    }
</script>

<style lang="less" scoped>
    .merchant{
        height: 440px;
        overflow:scroll;
        background-color: #fff;
        &>div{
            border-top: 1px solid #f3f3f3;
        }
        // 标题
        .ivu-row{
            height:60px;
            padding-top: 10px;
            line-height: 22px;
            .ivu-col-span-14{
                text-indent: 20px;
            }
            .ivu-col-span-10{
                text-align: right;
                padding-right: 20px;
            }
            .ivu-col{
                .title{
                    font-size: 14px;
                    font-weight: bold;
                }
                .ivu-icon-md-heart:before{
                    color:red;
                    font-size:22px;
                }
            }
        }
        .star{
            color:gray;
            img{
                width: 12px;
            }
        }

        // 起送
        .delivery{
            text-align: center;
            .ivu-row{
                p:first-child{
                    color: gray;
                }
                p:last-child{
                    span{
                        font-size:16px;
                    }
                }
                .line{
                    border-right: 1px solid #f3f3f3;
                }
            }
        }

        .blank{
            height: 16px;
            background-color:#ccc;
        }

        // 公告
        .notice_activity{
            .notice{
                height: 160px;
                padding-top: 10px;
                h3{
                    text-indent: 10px;
                }
                p{
                   margin-top: 10px;
                   padding-left:20px;
                   padding-right:20px;
                   line-height: 26px;
                   color:red;
                }
    
            }
            .activity{
                // height: 400px;
                // background-color: pink;
                .acti{
                    display: flex;
                    height: 40px;
                    border-bottom: 1px solid #f3f3f3;
                    img{
                        align-self: center;
                        margin-left: 20px;
                    }
                    span{
                        align-self: center;
                        margin-left: 10px;
                    }
                }
                
            }
        }

        // 商家实景
        .shop{
            // height: 140px;
            margin-bottom: 10px;
            h3{
                line-height: 30px;
                text-indent:20px;
            }
            .mer_img{
                height:100px;
                display: flex;
                justify-content: space-evenly;
                img{
                    width: 100px;
                    height: 80px;
                    align-self: center;
                }
            }
        }

        // 商家信息
        .mer_info{
            h3{
                line-height: 30px;
                text-indent:20px;
            }
            p{
                color:gray;
                font-size: 14px;
                height: 60px;
                line-height: 20px;
                padding: 20px;
                border-bottom: 1px solid #f3f3f3;
            }
        }
    }
</style>
