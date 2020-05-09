<template>
  <div class="home">
    <!--banner图-->
    <!--<div class="banner">
      &lt;!&ndash;banner中的简介&ndash;&gt;
      <div class="summary">
        <div class="text">
          帝工先进技术研究院（暨帝工（杭州）科技产业有限公司）是由一家由来自英国的皇家院士教授团队独立发起创建的新型研究机构。
        </div>
        <div class="button">
          <router-link to="/about">阅读更多 / Read more</router-link>
        </div>
      </div>
    </div>-->
    <div class="main_body">
      <!--最新动态标题-->
      <div class="title">热点新闻 /Hot News</div>

      <!--最新动态-->
      <div class="actives">
        <p style="text-align: center; width: 100%;font-size: 22px;color: grey;" v-if="!newsList[0]">暂无资讯</p>
        <div class="active" v-for="(item,index) in newsList" :key="index">
          <router-link :to="'/news/newsInfo/'+item.newsID"><img :src="imgRoot + 'news/' + item.photoName" alt=""></router-link>
          <div class="tag1">新闻</div>
          <div :class="['tag2',index===0?'blue':index===1?'red':'green']">News</div>
          <div class="info">
            <h2><router-link :to="'/news/newsInfo/'+item.newsID">{{item.title}}</router-link></h2>
            <p>{{item.synopsis}}</p>
          </div>
        </div>
      </div>

      <!--分割线-->
      <img src="../assets/image/common/stripe_black.jpg" alt="" class="stripe">

      <!--加入我们标题-->
      <div class="title">加入我们 / <router-link to="/join/full">查看更多</router-link></div>

      <!--加入我们-->
      <div class="join">
        <img src="../assets/image/common/join.jpg" alt="">
        <div class="jobs">
          <div class="job full">
            <div class="line"></div>
            <router-link to="/join/full">
              <div class="list">
                <b>全职职位</b>
                <p v-for="(item,index) in fullList" :key="index">{{item}}</p>
              </div>
            </router-link>
          </div>
          <div class="job part">
            <div class="line"></div>
            <router-link to="/join/part">
              <div class="list">
                <b>实习职位</b>
                <p v-for="(item,index) in partList" :key="index">{{item}}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data(){
      return{
        partList:[],
        fullList:[],
        newsList:[]
      }
    },
    mounted(){
      this.getPartList()
      this.getFullList()
      this.getNewsList()
    },
    methods:{
      /*获取实习职位的列表*/
      getPartList(){
        this.$http.get('jobs/tourist/1').then(result=>{
          this.partList = result.data.synopsis.split('&')
        })
      },

      /*获取全职职位的列表*/
      getFullList(){
        this.$http.get('jobs/tourist/2').then(result=>{
          this.fullList = result.data.synopsis.split('&')
        })
      },

      /*获取已发布最新动态的前三个*/
      getNewsList(){
        this.$http.get('/news/tourist',{params:{state:1}}).then(result=>{
          this.newsList = result.data
          if(result.data.length>3){
            this.newsList = this.newsList.slice(0,3)
          }
        })
      }
    }
  }
</script>

<style scoped>
  /*banner样式*/
  .home .banner{width: 100%;height: 90vh;background-image: url("../assets/image/common/banner.gif");background-size: 100% 100%;}
  .home .banner .summary{width: 50%;position: relative;top: 20%;left: 15%;}
  .home .banner .summary .text{transition: all ease 0.5s; float: left; text-align: left;padding: 20px;background-color: rgba(18, 4, 1, 0.8);color: white;line-height: 30px;font-size: 18px;}
  .home .banner .summary .button{float:left; width: 80%;}
  .home .banner .summary .button a{display: inline-block;padding: 15px 85px 15px 25px;background-color: #191919;text-align: center;color: white;letter-spacing: 1px;position: relative;text-decoration: none;line-height: 20px;}
  .home .banner .summary .button a:after{content: "\F054";font-family: FontAwesome;position: absolute;top: 0;bottom: 0;right: 0;padding-top: inherit;padding-bottom: inherit;text-align: center;background-color: #1295db;width: 50px;}

  /*最近动态*/
  .home .main_body{padding: 30px 10% 50px 10%;}
  .home .main_body .title{font-size: 28px;font-weight: bold;margin-bottom: 40px;}
  .home .main_body .title a{font-size: 16px;font-weight: lighter;color: #1295db;}
  .home .main_body .actives{display: flex;justify-content: space-between;}
  .home .main_body .actives .active{width: 32%;border: 1px solid gray;box-shadow: 0 0 5px rgba(128, 128, 128, 0.56);}
  .home .main_body .active img{width: 100%;}
  .home .main_body .active .tag1{width: 70px;height: 30px;background-color: white;border-bottom: 1px solid gray;display: inline-block;line-height: 30px;text-align: center;position: relative;}
  .home .main_body .active .tag1:after{content: "";display: inline-block;float: right;right: -16px;position: absolute;border-left: 16px solid white;border-bottom: 30px solid transparent;}
  .home .main_body .active .tag2{width: 60px;height: 31px;display: inline-block;margin-left: 10px;line-height: 30px;position: relative;text-align: center;color: white;}
  .home .main_body .active .blue{background-color: #016eaf;border-color:#016eaf;}
  .home .main_body .active .red{background-color: #a40000;border-color: #a40000;}
  .home .main_body .active .green{background-color: #007131;border-color: #007131;}
  .home .main_body .active .tag2:before{content: "";display: inline-block;float: left;left: -16px;position: absolute;border-right: 16px solid;border-color:inherit;border-top: 31px solid transparent;}
  .home .main_body .active .tag2:after{content: "";display: inline-block;float: right;right: -18px;position: absolute;border-left: 18px solid;border-color:inherit;border-bottom: 31px solid transparent;}
  .home .main_body .active .info{padding: 20px 30px;}
  .home .main_body .active .info h2{font-weight: bold;}
  .home .main_body .active .info p{margin: 10px 0 20px 0;line-height: 30px;font-weight: normal;}

  /*分隔条样式*/
  .home .stripe{width: 100%;margin: 60px 0;}

  /*加入我们样式*/
  .home .join>img{width: 100%;}
  .home .join .jobs{display: flex;justify-content: space-between;}
  .home .join .jobs .job{width: 48%;margin-top: 30px;}
  .home .join .jobs .job .line{width: 45%;height: 20px;background-color: #1196db;}
  .home .join .jobs .job .list{padding: 20px;border: 1px solid gray;box-shadow:  0 0 3px rgba(128, 128, 128, 0.44);margin-top: 30px;transition: all ease 0.5s;}
  .home .join .jobs .part .list{display: flex;flex-wrap: wrap;justify-content: start;}
  .home .join .jobs .job .list:hover{box-shadow: 0 0 30px rgba(128, 128, 128, 0.32);}
  .home .join .jobs .job .list b{font-size: 20px;font-weight: bold;margin-bottom: 20px;display: inline-block;width: 100%;}
  .home .join .jobs .job .list p{font-size: 18px;margin-bottom: 15px;}
  .home .join .jobs .part p{width: 50%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    /*banner中文字宽度*/
    .home .banner .summary .text{min-width: 620px;}
    .home{min-width: 1040px;}

    /*最新动态字体大小*/
    .home .main_body .actives{min-width: 830px;}
    .home .main_body .active .info h2{font-size: 18px;line-height: 30px;}
    .home .main_body .active .info p{font-size: 16px;}
  }

  @media(min-width: 1200px) {
    /*banner中文字宽度*/
    .home .banner .summary .text{width: 90%;}

    /*最新动态字体大小*/
    .home .main_body .active .info h2{font-size: 18px;line-height: 30px;}
    .home .main_body .active .info p{font-size: 16px;}

  }

  @media(min-width: 1500px) {
    /*banner中文字宽度*/
    .home .banner .summary .text{width: 80%;}

    /*最新动态字体大小*/
    .home .main_body .active .info h2{font-size: 22px;line-height: 40px;}
    .home .main_body .active .info p{font-size: 18px;}
  }

  @media(min-width: 1700px) {
    /*banner中文字宽度*/
    .home .banner .summary .text{width: 70%;}

    /*最新动态字体大小*/
    .home .main_body .active .info h2{font-size: 22px;line-height: 40px;}
    .home .main_body .active .info p{font-size: 18px;}
  }
</style>
