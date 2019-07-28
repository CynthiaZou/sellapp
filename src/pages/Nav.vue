<template>
    <div>
        <div class="cover" :style="{background:'url('+avatar+') center center no-repeat', backgroundSize: '100%'}">
        </div>
        <div class="cover-text">
            <!-- 导航头部信息 -->
            <div class="nav_header">
                <div>
                    <img :src="avatar">
                </div>
                <div class="nav_header_content">
                    <p>
                        <img src="../assets/imgs/brand@2x.png" alt="#">
                        <span>{{ name }}</span>
                    </p>
                    <p>{{ description }} / {{ deliveryTime }}分钟送达</p>
                    <p>
                        <img src="../assets/imgs/decrease_1@2x.png" alt="#">
                        <span>{{ supports }}</span>
                    </p>
                </div>
            </div>
            <!-- 导航公告栏 -->
            <div class="nav-bulletin">
                <img src="../assets/imgs/bulletin@2x.png" alt="#">
                <span>{{ bulletin }} </span>
                <Icon type="ios-arrow-forward" />
            </div>
        </div>

        <!-- 导航容器 -->
        <div class="nav-container">
            <router-link to='/'>商品</router-link>
            <router-link to='/evaluate'>评价</router-link>
            <router-link to='/merchant'>商家</router-link>
        </div>


    </div>
</template>

<script>
// 引入封装的请求文件
import { getseller } from '../api/apis'

    export default {
        data() {
            return {
                avatar: '', //商家图片
                name: '', //商家名字
                description: '', //送餐方式
                deliveryTime: '', //送达时间
                supports: '', //活动内容
                bulletin: '', //公告

            }
        },
        async created() {
               let res = await getseller();
               let data = res.data.data;
            //    console.log(data)
                    this.avatar = data.avatar;
                    this.name = data.name;
                    this.description = data.description;
                    this.deliveryTime = data.deliveryTime;
                    this.supports = data.supports[0].description;
                    this.bulletin = data.bulletin;
        }
    }
</script>

<style lang="less" scoped>
    // 背景虚化
    .cover{
        filter:blur(8px);
        width: 100%;
        height: 150px;
        background-size:cover!important;
        position:absolute;
        left:0;
        top:0;
        &:after{
            position:absolute;
            left:0;
            top:0;
            content: '';
            background-color:#000;
            opacity: 0.5;
            z-index:1;
            width: 100%;
            height: 100%;
        }
    }
    .cover-text{
        position: relative;
    }
        
    // 导航头部
    .nav_header {
        height: 120px;
        display: flex;
        // 图片
        img{
            width: 80px;
            margin: 20px;
        }
        // 导航头部内容
        .nav_header_content{
            margin-top:20px;
            line-height: 28px;
            color: #fff;
            p:first-child {
                display: flex;
                img{
                    width: 16%;
                    height: 20px;
                    margin: 0;
                    align-self: center;
                    margin-right: 5px;
                }
                span {
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            p:last-child {
                display: flex;
                img{
                    width: 8%;
                    height: 15px;
                    margin: 0;
                    align-self: center;
                    margin-right: 6px;
                }
            }
        }
        
    }

    // 导航公告
    .nav-bulletin{
        height: 30px;
        background-color:rgba(0, 0, 0,.3);
        display: flex;
        padding-left: 10px;
        padding-right: 16px;
        color: #fff;

        img{
            width: 7%;
            height: 16px;
            align-self: center;
        }
        span{
            height: 100%;
            line-height: 30px;
            align-self: center;
            margin-left: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .ivu-icon{
            align-self: center;
        }

    }

    // 导航容器
    .nav-container {
        height: 30px;
        line-height: 30px;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        a{
            color: gray;
            font-size: 14px;
        }
    }

</style>