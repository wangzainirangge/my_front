<template>
  <div class="join">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <a href="#">加入我们 / Join Us</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <!--左侧文章-->
        <div class="text">
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="border">
            <div class="header_view" v-html="joinHeader.urls">{{joinHeader.urls}}</div>
            <div class="swi">
              <router-link to="/join/full" class="button">
                <span>全职职位 / Full-Time Position</span>
                <img src="../../assets/image/common/stripe_white.png" alt="" class="dec">
              </router-link>
              <router-link to="/join/part" class="button">
                <span>实习职位 / Part-Time Position</span>
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
    name: "Join",
    data(){
      return{
        joinHeader:{}  //获取到的加入我们网页头部
      }
    },
    mounted(){
      this.getJoinHeader()
    },
    methods:{
      /*获取加入我们网页头部*/
      getJoinHeader(){
        this.$http.get('headers/tourist/2').then(result=>{
          this.joinHeader = result.data
        })
      }
    },
    components:{
      float: Float
    }
  }
</script>

<style scoped>
  .join{background-color: #f5f5f5;}
  .join .width{padding: 5% 8%;}

  /*导航样式*/
  .join .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .join .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .join .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .join .main_body{display: flex;justify-content: space-between;}
  .join .main_body .text{width: 65%;background-color: white;}
  .join .text .border{border: 1px solid gainsboro;}
  .join .text .header_view{padding: 50px;}

  /*切换按钮样式*/
  .join .text .swi{display: flex;}
  .join .text .swi .button{width: 50%;text-align: center;display: inline-block;color: #013e75;font-weight: 400;transition:  background-color ease 0.5s;border-top: 1px solid gainsboro;}
  .join .text .swi .button span{display: inline-block;padding: 15px;}
  .join .text .swi .button .dec{width: 100%;border-top: 1px solid gainsboro;display: block;}
  .join .swi .router-link-active{background-color: #013e75;border: none!important;}
  .join .swi .router-link-active span{color: white!important;font-weight: 100!important;border: none!important;margin: 1px 0;}
  .join .swi .router-link-active .dec{border: none!important;}

  /*右侧悬浮框*/
  .join .main_body .right{width: 30%;}


  /*响应式布局*/
  @media(max-width: 1199px) {
    .join{min-width: 1040px;}
    /*切换按钮字体*/
    .join .text .swi .button{font-size: 18px;}
  }

  @media(min-width: 1200px) {
    /*切换按钮字体*/
    .join .text .swi .button{font-size: 20px;}
  }

  @media(min-width: 1500px) {
    /*切换按钮字体*/
    .join .text .swi .button{font-size: 22px;}
  }

</style>
