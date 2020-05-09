<template>
  <div class="about">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <a href="#">关于我们 / About Us</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <!--左侧文章-->
        <div class="text">
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="header_view" v-html="aboutHeader.urls">{{aboutHeader.urls}}</div>
          <div class="border">
            <div class="swi">
              <router-link to="/about/member" class="button">
                <span>成员 / Members</span>
                <img src="../../assets/image/common/stripe_white.png" alt="" class="dec">
              </router-link>
              <router-link to="/about/partner" class="button">
                <span>合作伙伴 / Partners</span>
                <img src="../../assets/image/common/stripe_white.png" alt="" class="dec">
              </router-link>
            </div>
            <router-view></router-view>
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
    name: "About",
    data(){
      return{
        aboutHeader:{}  //获取到的关于我们网页头部
      }
    },
    mounted(){
      this.getAboutHeader()
    },
    methods:{
      /*获取关于我们页面的网页头部*/
      getAboutHeader(){
        this.$http.get('headers/tourist/1').then(result=>{
          this.aboutHeader = result.data
        })
      }
    },
    components:{   //注册悬浮框组件
      float: Float
    }
  }
</script>

<style scoped>
  .about{background-color: #f5f5f5;}
  .about .width{padding: 5% 8%;}
  /*导航样式*/
  .about .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .about .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .about .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .about .main_body{display: flex;justify-content: space-between;}
  .about .main_body .text{width: 65%;background-color: white;}
  .about .main_body .text .header_view{margin-top: -10px;}


  /*切换按钮样式*/
  .about .text .swi{display: flex;}
  .about .text .swi .button{width: 50%;text-align: center;display: inline-block;color: #013e75;font-weight: 400;transition:  background-color ease 0.5s;border-top: 1px solid gainsboro;}
  .about .text .swi .button span{display: inline-block;padding: 15px;}
  .about .text .swi .button .dec{width: 100%;border-top: 1px solid gainsboro;display: block;}
  .about .swi .router-link-active{background-color: #013e75;border: none!important;}
  .about .swi .router-link-active span{color: white!important;font-weight: 100!important;border: none!important;margin: 1px 0;}
  .about .swi .router-link-active .dec{border: none!important;}

  /*右侧悬浮框*/
  .about .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .about{min-width: 1040px;}
    /*切换按钮字体*/
    .about .text .swi .button{font-size: 18px;}
  }

  @media(min-width: 1200px) {
    /*切换按钮字体*/
    .about .text .swi .button{font-size: 20px;}
  }

  @media(min-width: 1500px) {
    /*切换按钮字体*/
    .about .text .swi .button{font-size: 22px;}
  }

</style>
