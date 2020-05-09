<template>
  <div class="productInfo">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <a href="#">国际教育服务 / International Education Service</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <!--左侧文章-->
        <div class="text">
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="article">
            <img src="../../assets/image/common/shadow.png" alt="" class="shadow">
            <div class="title">{{productInfo.title}}</div>
            <div v-html="productInfo.urls">{{productInfo.urls}}</div>
          </div>
        </div>
        <!--右侧悬浮框-->
        <div class="right">
          <float></float>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Float from '../Float'
  export default {
    name: "ProductInfo",
    data(){
      return{
        id:this.$route.params.id,   //根据路由获得该新闻的id
        productInfo:{}  //获取到的新闻信息
      }
    },
    mounted(){
      this.getProductInfo()
    },
    methods:{
      /*获取已知id的产品的信息*/
      getProductInfo(){
        this.$http.get('researchProducts/tourist/'+this.id).then(result=>{
          this.productInfo = result.data
        })
      }
    },
    components:{
      float: Float
    }
  }
</script>

<style scoped>
  .productInfo{background-color: #f5f5f5;}
  .productInfo .width{padding: 5% 8%;}

  /*导航样式*/
  .productInfo .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .productInfo .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .productInfo .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .productInfo .main_body{display: flex;justify-content: space-between;}
  .productInfo .main_body .text{width: 65%;background: url("../../assets/image/common/circle.png") bottom right no-repeat white;background-size: 80% auto;}
  .productInfo .main_body .text .article{padding: 3%;}
  .productInfo .main_body .text .article .shadow{width: 100%;}
  .productInfo .main_body .text .article .title{font-size: 30px;font-weight: bold;text-align: left;margin-top: -20px;margin-left: 3%;line-height: 50px;margin-bottom: 30px;}

  /*右侧悬浮框*/
  .productInfo .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .productInfo{min-width: 1040px;}
  }
</style>
