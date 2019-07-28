<template>
    <div class="evaluate">
        <!-- 第一部份-星星评价部份 -->
        <div class="star">
            <Row>
                <Col class="left_star" span="10" >
                    <h1 style="color:#f60">{{ this.data.score }} </h1>
                    <p class="bolder">综合评分</p>
                    <p style="color:gray;font-size:12px">高于周边商家{{ this.data.rankRate }}%</p>
                </Col>
                <Col class="right_star" span="14">
                    <p>
                        <span class="bolder" >服务态度&emsp;</span>
                        <!-- 4.2分 -->
                        <span class="mid-star">
                            <!-- 根据 整数 来循环 -->
                            <img v-for="i in getInt1" src="../assets/imgs/star36_on@2x.png" alt="#">
                            <!-- 根据 小数 来决定是否显示 -->
                            <img v-show="getFloat1" src="../assets/imgs/star36_half@2x.png" alt="#">
                            <!-- 根据 getNull函数 来循环判断显示几个空星星 -->
                            <img v-for="i in getNull1" src="../assets/imgs/star36_off@2x.png" alt="#">
                        </span>
                        <span style="color:#f60; margin-left:6px;">{{ this.data.score }}</span>
                    </p>
                    <p>
                        <span class="bolder" >配送速度&emsp;</span>
                        <!-- 4.1分 -->
                        <span class="mid-star">
                           <!-- 根据 整数 来循环 -->
                            <img v-for="i in getInt2" src="../assets/imgs/star36_on@2x.png" alt="#">
                            <!-- 根据 小数 来决定是否显示 -->
                            <img v-show="getFloat2" src="../assets/imgs/star36_half@2x.png" alt="#">
                            <!-- 根据 getNull函数 来循环判断显示几个空星星 -->
                            <img v-for="i in getNull2" src="../assets/imgs/star36_off@2x.png" alt="#">
                        </span>
                        <span style="color:#f60; margin-left:6px;">{{ this.data.serviceScore }}</span>
                    </p>
                    <p>
                        <span class="bolder" >送达时间&emsp;</span>
                        <span style="color:gray;font-size:12px">{{this.data.deliveryTime}}分钟</span>
                    </p>
                </Col>
            </Row>
        </div>

        <!-- 第二部分 -->
        <div>
            <div class="blank"></div>
            <div class="box">
                <Tag color="primary">全部&nbsp;<small>57</small></Tag>
                <Tag color="blue">满意&nbsp;<small>27</small></Tag>
                <Tag color="default">不满意&nbsp;<small>30</small></Tag>
            </div>
        </div>

        <!-- 第三部分 -->
        <div class="remark">
            <Button shape="circle" icon="md-checkmark"></Button>
            只看有内容的评价
        </div>

        <!-- 第四部份 -->
        <div class="comment" v-for="m in rat_data">
            <!-- 上 -->
            <div class="avatar">
                <img :src="m.avatar">
                <div class="middle">
                    <p class="user">{{ m.username }}</p>
                    <p class="com_star">
                        <img v-for="i in getInt3(m.score)" src="../assets/imgs/star24_on@2x.png">
                        <img v-for="i in getNull3(m.score)" src="../assets/imgs/star24_off@2x.png">
                        <span style="color:gray;margin-left:6px">{{m.deliveryTime}}分钟送达</span>
                    </p>
                </div>
                <div class="usertime" style="color:gray;margin-left:10px">{{m.rateTime}}</div>
            </div>
            <!-- 中 -->
            <p class="words">{{m.text}}</p>
            <!-- 下 -->
            <div class="zane">
                <Icon type="md-thumbs-up" />
                <Poptip word-wrap width="100" >
                    <Button>哈哈哈哈</Button>
                    <Button>哈哈哈哈</Button>
                    <Button>哈哈哈哈</Button>
                </Poptip>
            </div>
        </div>


    </div>
</template>

<script>
// 引入请求文件
import { getseller, getratings } from '../api/apis'

    export default {
        data(){
            return {
                data:[], //数据源数组
                rat_data: [],
                point1: 4.2,
                point2: 4.1,
                totalPoint: 5,
                // score: 0
            }
        },
        async created() {
            // 请求商家 数据
            let res = await getseller();
            this.data = res.data.data;
            
            // 请求评价 数据
            let rat_res = await getratings();
            this.rat_data = rat_res.data.data;
            // console.log(this.rat_data)
        },
        methods: {
            // 取整星星
             // 取整星星
             getInt3(e) {
                return Math.floor(e)
                
            },
           
            // 获取用户评价的 空星星
            getNull3(e) {
                // 取差值 
                let count3 = this.totalPoint - e;
                // 对差值取小数
                let countFloat3 = count3 - Math.floor(count3);
                // 判断
                return countFloat3 > 0.5 ? Math.ceil(count3) : Math.floor(count3)
            },
           
        },
       
        computed: { // 计算属性不能传参，若需要传参就在methods里面定义计算函数
            // 取整数
            getInt1() {
                return Math.floor(this.point1);
            },
            getInt2() {
                return Math.floor(this.point2);
            },
           
            
            // 取小数
            getFloat1() {
                let num1 = this.point1 - Math.floor(this.point1);
                return num1 >= 0.5;
            },
            getFloat2() {
                let num2 = this.point2 - Math.floor(this.point2);
                return num2 >= 0.5;
            },
            
            // 取空星星
            getNull1() {
                // 取差值 
                let count1 = this.totalPoint - this.point1;
                // 对差值取小数
                let countFloat1 = count1 - Math.floor(count1);
                // 判断
                return countFloat1 > 0.5 ? Math.ceil(count1) : Math.floor(count1)
            },
            getNull2() {
                // 取差值 
                let count2 = this.totalPoint - this.point2;
                // 对差值取小数
                let countFloat2 = count2 - Math.floor(count2);
                // 判断
                return countFloat2 > 0.5 ? Math.ceil(count2) : Math.floor(count2)
            },
            
        },
        
    }
</script>

<style lang="less" scoped>
    .evaluate{
        height: 440px;
        background-color: #fff;
        overflow:scroll;
       
        // 第一部份-星星评价部份
        .star{
            height:90px;
            line-height:90px;
            .bolder{
                font-weight: bold;
            }
            .left_star{
                text-align: center;
                line-height: 20px;
                border-right: 1px solid #f3f3f3;
                h1{
                    line-height: 36px;
                }
            }
            .right_star{
                padding-top: 6px;
                line-height: 24px;
                text-indent: 20px;
                .mid-star{
                    img{
                        width: 14px;
                        margin-right: 4px;
                    }
                }
            }
        }

        // 第二部份
        .blank{
            height:16px;
            background-color: #f3f3f3;
        }
        .box{
            height: 50px;
            display: flex;
            justify-content: flex-start;
            .ivu-tag-checked{
                height:30px;
                align-self: center;
                margin-left: 10px;
                line-height: 30px;
                border:none;
            }
        }

        // 第三部份
        .remark{
            height:40px;
            line-height: 40px;
            color: gray;
            text-indent: 10px;
            border-top: 1px solid #f3f3f3;
            border-bottom: 1px solid #f3f3f3;
            .ivu-btn{
                background-color: #ccc;
                color:#fff;
                width: 24px;
                height: 24px;
                line-height: 24px;
                .ivu-icon-md-checkmark {
                    font-size:12px;
                    
                }
            }
        }

        // 第四部份
        .comment{
            height: 130px;
            line-height: 20px;
            padding-top: 10px;
            border-bottom: 1px solid #f3f3f3;
            // 上
            .avatar{
                display: flex;
                justify-content: space-between;
                // align-items: center;
                &>img{
                    width: 30px;
                    align-self: center;
                    margin-left: 10px;
                }
                .middle{
                    margin-left: -50px;
                    .com_star{
                        &>img{
                            width: 12px;
                            margin-right: 2px;
                        }
                    }
                }
                .usertime{
                    margin-right: 20px;
                }
            }
            // 中
            .words{
                padding-left: 50px;
                padding-right: 20px;
            }
            // 下
            .zane{
                padding-left: 50px;
                margin-top: 4px;
                .ivu-icon{
                    font-size:20px;
                    color:blue;
                }
                .ivu-poptip{
                    .ivu-btn{
                        margin-left: 6px;
                        padding: 2px 10px 3px;

                    }
                }
            }
        }

}
</style>