<template>
  <div class="product">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <a href="#">产品展示 / Product Exhibition</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <!--左侧文章-->
        <div class="text">
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="first">
            <img :src="imgRoot + 'researchProduct/' + productFirst.photoName" alt="">
            <div class="info">
              <p class="title">{{productFirst.title}}</p>
              <p class="desc">{{productFirst.synopsis}}</p>
            </div>
          </div>
          <div class="products clearfix">
            <p class="title">产品列表</p>
            <hr>
            <div class="list">
              <p v-if="!productFirst[0]">暂无产品</p>
              <div class="product_box" v-for="item in pageArr" :key="item.id">
                <div class="img">
                  <img :src="imgRoot + 'researchProduct/' + item.photoName" alt="">
                </div>
                <div class="info">
                  <p class="name">{{item.title}}</p>
                  <p class="desc">{{item.synopsis}}</p>
                  <a href="#" class="link">了解更多 <i class="fa fa-caret-right" aria-hidden="true"></i></a>
                </div>
              </div>
              <v-page   :total-row="totalRow"
                        @page-change="pageChange"
                        :page-size-menu="false"
                        align="center"
                        :info="false"
                        :border="false"
                        ref="page"
                        :first="false"
                        :last="false"
                        v-if="productList[0]"></v-page>
            </div>
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
  import { vPage } from 'v-page'
  import Float from '../Float'
  export default {
    name: "Product",
    data(){
      return{
        productList:[],  //获取到的产品列表（从第二个开始）
        productFirst: {},  //获取到的第一个产品
        totalRow: 0,
        pageSize: 3,
        pageArr:[]
      }
    },
    mounted(){
      this.getProductList()
    },
    methods:{
      /*获取产品列表*/
      async getProductList(){
        await this.$http.get('researchProducts/tourist',{params:{state:1}}).then(result=>{
          this.productFirst = result.data[0]
          this.productList = result.data.slice(1)
          this.totalRow = result.data.length/this.pageSize*10
        })
        this.$refs.page.reload()
      },

      /*分页插件的回调函数*/
      pageChange(pInfo){
        this.pageArr.splice(0, this.pageArr.length);
        let start = 0, end = 0;
        start = this.pageSize*(pInfo.pageNumber - 1);
        end = start + this.pageSize;
        if (end > this.productList.length) end = this.productList.length;
        for (let i = start; i < end; i++) {
          this.pageArr.push(this.productList[i]);
        }
      }
    },
    components:{   //注册悬浮框组件
      float: Float,
      'v-page': vPage
    }
  }
</script>

<style scoped>
  .product{background-color: #f5f5f5;}
  .product .width{padding: 5% 8%;}
  /*导航样式*/
  .product .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .product .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .product .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .product .main_body{display: flex;justify-content: space-between;}
  .product .main_body .text{width: 65%;}
  .product .main_body .text .first{width: 100%;position: relative;box-shadow: 0 0 5px gainsboro;}
  .product .main_body .text .first>img{width: 100%;}
  .product .main_body .text .first .info{background-color: rgba(255,255,255,0.5);position: absolute;bottom: 0;padding: 1% 3% 1% 6%;width: 91%;}
  .product .main_body .text .first .info:before{content: "";display: inline-block;position: absolute;left: 0;bottom: 0;top: 0;background-color: #003e74;width: 2%;}
  .product .main_body .text .first .info .title{font-size: 24px;font-weight: bold;margin-bottom: 7px;}
  .product .main_body .text .first .info .desc{line-height: 30px;}

  .product .main_body .text .products{box-shadow: 0 0 5px gainsboro;background-color: white;margin-top: 30px;padding: 2% 3%;}
  .product .main_body .text .products .title{font-size: 24px;font-weight: bold;margin-bottom: 20px;}
  .product .main_body .text .products .list{margin: 20px 0;}
  .product .main_body .text .products .list .product_box{background-color: white;display: flex;margin-bottom: 40px;}
  .product .main_body .text .products .list .product_box .img{width: 30%;}
  .product .main_body .text .products .list .product_box .img img{width: 100%;}
  .product .main_body .text .products .list .product_box .info{width: 66%;padding: 2%;position: relative;}
  .product .main_body .text .products .list .product_box .info .name{font-size: 22px; font-weight: bolder;margin-bottom: 20px;}
  .product .main_body .text .products .list .product_box .info .desc{line-height: 30px;}
  .product .main_body .text .products .list .product_box .info .link{float: right;color: grey;position: absolute;bottom: 10%; right: 4%;}

  /*右侧悬浮框*/
  .product .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .product{min-width: 1040px;}
  }
</style>

<!--分页样式-->
<style>
  .product div.v-pagination>ul>li.active>a{background-color: transparent;}
</style>
