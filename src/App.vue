<template>
  <div class="layout">
    <Layout>
      <!-- 头部导航 -->
        <Header>
          <Nav></Nav>
        </Header>
        <!-- 中间部份 -->
        <Layout>
            <!-- 出口 -->
            <router-view></router-view>
        </Layout>
        <!-- 页脚 -->
        <Footer></Footer>
    </Layout>
  </div>
    
  
</template>

<script>
import Nav from './pages/Nav.vue'
import Footer from './components/Footer'

export default {
  components: {
    Nav,
    Footer
  }
}
</script>


<style lang="less">
  // 页面布局
    .layout{
      .ivu-layout{
        color: #000;
            // 头部
            .ivu-layout-header{
                height:180px;
                padding: 0;
                background-color: rgba(102, 102, 102,.8);

            }
            
            // 中间部份
            layout{
              height: 440px;
            }
            
           
        }
    }
   
</style>
