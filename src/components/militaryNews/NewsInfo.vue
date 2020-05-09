<template>
  <div class="newsInfo">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <router-link to="/news">军事新闻 / Military News</router-link>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <!--左侧文章-->
        <div class="text">
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="article">
            <img src="../../assets/image/common/shadow.png" alt="" class="shadow">
            <div class="title">{{newsInfo.title}}</div>
            <div class="date" style="margin-left: 3%;margin-bottom: 20px;">{{'发布时间: ' + newsInfo.publicTime|dateFormat('yyyy-MM-dd')}}</div>
            <div v-html="newsInfo.urls">{{newsInfo.urls}}</div>
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
    name: "NewsInfo",
    data(){
      return{
        id:this.$route.params.id,   //根据路由获得该新闻的id
        newsInfo:{}  //获取到的新闻信息
      }
    },
    mounted(){
      this.getNewsInfo()
    },
    methods:{
      /*获取已知id的新闻的信息*/
      getNewsInfo(){
        this.$http.get('news/tourist/'+this.id).then(result=>{
          console.log(result.data)
          this.newsInfo = result.data
        })
      }
    },
    components:{
      float: Float
    },
    watch:{
      /*每当路由变化时，刷新页面信息*/
      "$route.path":function (newVal) {
        this.id = this.$route.params.id
        this.newsInfo = {}
        this.getNewsInfo()
      }
    }
  }
</script>

<style scoped>
  .newsInfo{background-color: #f5f5f5;}
  .newsInfo .width{padding: 5% 8%;}

  /*导航样式*/
  .newsInfo .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .newsInfo .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .newsInfo .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .newsInfo .main_body{display: flex;justify-content: space-between;}
  .newsInfo .main_body .text{width: 65%;background: url("../../assets/image/common/circle.png") bottom right no-repeat white;background-size: 80% auto;}
  .newsInfo .main_body .text .article{padding: 3%;}
  .newsInfo .main_body .text .article .shadow{width: 100%;}
  .newsInfo .main_body .text .article .title{font-size: 30px;font-weight: bold;text-align: left;margin-top: -20px;margin-left: 3%;line-height: 50px;margin-bottom: 30px;}

  /*右侧悬浮框*/
  .newsInfo .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .newsInfo{min-width: 1040px;}
  }
</style>
