<template>
  <div class="float">
    <div class="box">
      <img src="../assets/image/common/stripe_black_short.jpg" alt="" class="stripe">
      <!--搜索框-->
      <div class="search_box">
        <div class="title">搜索 / Search</div>
        <div class="search">
          <div class="search_input">
            <input type="text" placeholder="Search Articles ..." v-model="keyword" @keyup.enter="passKeyword()">
            <a @click="passKeyword()"><i class="fa fa-search" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
      <img src="../assets/image/common/stripe_black_short.jpg" alt="" class="stripe">
      <!--最新资讯-->
      <div class="news_box">
        <div class="title">热点新闻 / Hot News</div>
        <div class="news">
          <p style="text-align: center;font-size: 20px;color: grey;" v-if="!newsList[0]">暂无资讯</p>
          <router-link :to="'/news/newsInfo/'+item.newsID" v-for="item in newsList" :key="item.newsID">
            <div class="news_content">
              <div class="desc">{{item.title}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BUS from '../assets/js/bus'
  export default {
    name: "Float",
    data(){
      return{
        newsList:[], //获取到的最新动态列表
        keyword: ''//搜索框中的关键词
      }
    },
    mounted() {
      /*添加滚动条监听器，控制悬浮框的位置*/
      window.addEventListener('scroll',this.handleFloat)
      this.getNewsList()
    },
    methods:{
      /*控制悬浮框在页面中的定位*/
      handleFloat(){
        let path = this.$route.path
        if(path.indexOf('/about')!==-1||path.indexOf('/education')!==-1||path.indexOf('/join')!==-1||path.indexOf('/development')!==-1||path.indexOf('/news')!==-1){
          let float = $('.float')    //悬浮框
          let top = float.offset().top - $(window).scrollTop()  //悬浮框到窗口顶部的距离=悬浮框到正文顶部的距离-网页上部被卷起的部分
          let nav_height = $('.menu').height() //导航栏高度
          let float_height = $('.box').height()   //悬浮框高度
          let padding_height = parseFloat($('.width').css('padding-bottom'))   //页脚到内容区域之间的留白高度
          let footer_height = $('.footer').innerHeight()   //页脚的高度

          let line = footer_height+padding_height   //悬浮框不再下滑的临界点=页脚的高度+页脚到内容区域之间的留白高度

          let bottom = document.body.clientHeight-$(window).scrollTop()-float_height-nav_height  //计算悬浮框距离窗口底部的距离=总高度-网页被卷起的高度-悬浮框的高度-导航栏的高度

          if(top<=nav_height&&bottom>line){
            $('.box').css({
              "position": 'fixed',
              "top": 80,
              "width":'25.2%'
            })
          }else if(top<=80&&bottom<=line){
            $('.box').css({
              "position": 'fixed',
              "top":'auto',
              "bottom": footer_height+padding_height-(document.body.clientHeight-$(window).scrollTop()-window.innerHeight),
              "width":'25.2%'
            })
          }else{
            $('.box').css({
              "position": 'inherit',
              "width":'100%'
            })
          }
        }
      },

      /*获取最新动态的前三个*/
      getNewsList(){
        this.$http.get('/news/tourist',{params:{state:1}}).then(result=>{
          this.newsList = result.data
          if(this.newsList.length>3){
            this.newsList = this.newsList.slice(0,3)
          }
        })
      },

      /*用bus+$emit向搜索结果页面传递搜索关键词*/
      passKeyword(){
        this.$router.push({name: 'search',params:{searchData: this.keyword}})
      }
    }
  }
</script>

<style scoped>
  /*分割条*/
  .float .stripe{width: 100%;display: block;}
  /*标题*/
  .float .title{padding: 15px 30px;background-color: #013e75;color: white;letter-spacing: 1px;position: relative;}
  .float .title:before{content: '';width: 3%;position: absolute;top: 0;bottom: 0;left: 0;background-color: #1297dc;display: block;margin: 0;}

  /*搜索框*/
  .float .search_box .search{background-color: white;border: 1px solid gainsboro;border-top: none;}
  .float .search_box .search .search_input{display: flex;width: 80%;margin: 0 auto;}
  .float .search_box .search .search_input a{text-align: center;display: inline-block;padding: 15px 0;width: 20%;line-height: 20px;background-color: #21202e;color: white;cursor: pointer;outline: none;}
  .float .search_box .search .search_input input{width: 80%;border: 2px gainsboro solid;border-right: none;border-bottom-left-radius: 5px;border-top-left-radius: 5px;outline: none;}

  /*最新资讯*/
  .float .news_box .news{border: 1px solid gainsboro;border-top: none;padding: 5% 4% 10% 4%;background-color: white;}
  .float .news_box .news .news_content{border-bottom: 1px solid gainsboro;padding: 20px 0;}
  .float .news_box .news .news_content .desc{position: relative;padding-left: 60px;min-height: 40px;display: -webkit-box;-webkit-box-align: center;}
  .float .news_box .news .news_content .desc:before{content: '';display: inline-block;position: absolute;top: 0;left: 0;bottom: 0;width: 50px;background: url("../assets/image/common/triangle.png") no-repeat center;background-size: 70% auto;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    /*切换按钮字体*/
    .float .title{font-size: 16px;}

    /*搜索框字体*/
    .float .search_box .search{padding: 10%;}
    .float .search_box .search .search_input button{font-size: 14px;padding: 8px 0;}
    .float .search_box .search .search_input input{font-size: 14px;padding-left: 10px;}

    /*最新资讯字体*/
    .float .news_box .news .news_content .desc{font-size: 14px;}
  }

  @media(min-width: 1200px) {
    /*切换按钮字体*/
    .float .title{font-size: 20px;}

    /*搜索框字体*/
    .float .search_box .search{padding: 10%;}
    .float .search_box .search .search_input button{font-size: 16px;padding: 10px 0;}
    .float .search_box .search .search_input input{font-size: 16px;padding-left: 10px;}

    /*最新资讯字体*/
    .float .news_box .news .news_content .desc{font-size: 16px;}
  }

  @media(min-width: 1500px) {
    /*标题字体*/
    .float .title{font-size: 22px;}

    /*搜索框字体*/
    .float .search_box .search{padding: 10%;}
    .float .search_box .search .search_input button{font-size: 18px;padding: 12px 0;}
    .float .search_box .search .search_input input{font-size: 18px;padding-left: 15px;}

    /*最新资讯字体*/
    .float .news_box .news .news_content .desc{font-size: 16px;}
  }

  @media(min-width: 1700px) {
    /*搜索框字体*/
    .float .search_box .search{padding: 10%;}
    .float .search_box .search .search_input button{font-size: 20px;padding: 15px 0;}
    .float .search_box .search .search_input input{font-size: 20px;padding-left: 15px;}

    /*最新资讯字体*/
    .float .news_box .news .news_content .desc{font-size: 18px;}
  }
</style>
