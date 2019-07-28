<template>

 <table class="shopcar">
    <thead>
        <tr>
            <th width="120px">商品</th>
            <th width="120px">价格</th>
            <th width="120px">数量</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="v in shopcarFoods">
            <td>{{v.name}}</td>
            <td>{{v.price}}元</td>
            <td class="btn">
                <Icon  v-show="v.num > 0" @click="clickFoodDec(v.id)" type="ios-remove-circle-outline" />
                <span v-show="v.num > 0" >&nbsp;{{v.num}}&nbsp;</span>
                <Icon @click="clickFoodAdd(v.id)" type="md-add-circle" />
            </td>
        </tr>
        
    </tbody>
</table>
   
</template>

<script>
    export default {
        computed: {
            // 初始化食品数组
            shopcarFoods() {
                return this.$store.getters.shopcarFoods;
            }
        },
        methods: {
            // 点击食品减少
            clickFoodDec(id) {
                this.$store.commit({
                    type: 'changeFoodNum',
                    id,
                    num: -1
                })
            },
            // 点击食品添加
            clickFoodAdd(id) {
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
    .shopcar{
        text-align: center;
        color:#000;
        border-collapse: collapse;
        background-color:rgba(0, 110, 255,.2);
        tr{
            th{
                font-size:14px;
                border-bottom: 1px solid #ccc;
                height: 30px;
            }
            td{
                border-bottom: 1px dashed #ccc;
                height: 30px;
            }
        }
        .btn{
            font-size: 18px;
            color:gray;
            .ivu-icon-md-add-circle:before{
                color:rgb(0, 110, 255);
            }
        }
    }
</style>