<template>
  <div class="news">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <a href="#">财经新闻 / Financial News</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <img src="../../assets/image/common/stripe_black_long.jpg" alt="" class="stripe">
        <div class="start">
          <div class="title">
            财经新闻<i class="fa fa-angle-double-down" aria-hidden="true"></i>
          </div>
          <div class="search">
            <div class="search_input">
              <input type="text" placeholder="Search Articles ..." @keyup.enter="search()" v-model="sTitle">
              <button @click="search()"><i class="fa fa-search" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
        <div class="news_list">
          <p v-if="!newsFirst.title&&!newsList[0]" class="warn">没有符合的内容</p>
          <div class="news_box news_first" v-if="newsFirst.title" v-show="flag">
            <div class="text">
              <router-link :to="'/news/newsInfo/'+newsFirst.newsID">
                <img :src="imgCutRoot + 'news/' + newsFirst.photoName" alt="">
              </router-link>
              <div class="info">
                <div class="date">{{newsFirst.publicTime | dateFormat('yyyy-MM-dd')}}</div>
                <router-link :to="'/news/newsInfo/'+newsFirst.newsID"><h3 class="title">{{newsFirst.title}}</h3></router-link>
                <router-link :to="'/news/newsInfo/'+newsFirst.newsID"><p class="summary">{{newsFirst.synopsis}}</p></router-link>
              </div>
            </div>
          </div>
          <div class="news_box" v-if="newsList[0]" v-for="item in pageArr" :key="item.newsID">
            <div class="text">
              <router-link :to="'/news/newsInfo/'+item.newsID">
                <img :src="imgRoot + 'news/' + item.photoName" alt="">
              </router-link>
              <p class="date">{{item.publicTime | dateFormat('yyyy-MM-dd')}}</p>
              <router-link :to="'/news/newsInfo/'+item.newsID"><h3 class="title">{{item.title}}</h3></router-link>
            </div>
          </div>
        </div>
        <v-page   :total-row="totalRow"
                  @page-change="pageChange"
                  :page-size-menu="false"
                  align="center"
                  :info="false"
                  :border="false"
                  ref="page"></v-page>
      </div>
    </div>
  </div>
</template>

<script>
  import { vPage } from 'v-page'
  export default {
    name: "News",
    data(){
      return{
        newsFirst:{},   //获取到的第一个发布的新闻
        newsList:[],   //获取到的已发布的新闻列表
        totalRow:0,     //分页用到的总记录数
        /*pageSize:8,*/
        pageArr:[],    //分页后存储当页新闻记录的数组
        flag: true,    //判断是否显示第一个速递
        sTitle: ''     //搜索用的标题关键字
      }
    },
    mounted(){
      this.getNewsList()
    },
    methods: {
      /*获取新闻列表*/
      async getNewsList() {
        await this.$http.get('news/tourist/cut', {params: {state: 1, width: 356, height: 490}}).then(result => {
          this.newsFirst = result.data[0]
          this.newsList = result.data.slice(1)
          this.totalRow = ((result.data.length-8)/9+1)*10
        })
        this.$refs.page.reload()
      },

      /*分页的回调函数*/
      pageChange(pInfo){
        if(pInfo.pageNumber === 1){
          this.flag = true
          pInfo.pageSize = 7
          this.pageArr.splice(0,this.pageArr.length)
          let start = 0,end = 0
          end = start + pInfo.pageSize
          if(end>this.newsList.length) end = this.newsList.length
          for(let i = start;i< end;i++){
            this.pageArr.push(this.newsList[i])
          }
        }else if(pInfo.pageNumber === 2){
          this.flag = false
          pInfo.pageSize = 9
          this.pageArr.splice(0, this.pageArr.length);
          let start = 7, end = 0;
          end = start + pInfo.pageSize;
          if (end > this.newsList.length) end = this.newsList.length;
          for (let i = start; i < end; i++) {
            this.pageArr.push(this.newsList[i]);
          }
        }else{
          this.flag = false
          pInfo.pageSize = 9;
          this.pageArr.splice(0, this.pageArr.length);
          let start = 0, end = 0;
          start = 7 + pInfo.pageSize*(pInfo.pageNumber - 2);
          end = start + pInfo.pageSize;
          if (end > this.newsList.length) end = this.newsList.length;
          for (let i = start; i < end; i++) {
            this.pageArr.push(this.newsList[i]);
          }
        }
      },

      /*页内搜索函数*/
      async search(){
        await this.$http.get('news/title',{params:{title:this.sTitle}}).then(result=>{
          if(result.data.length!==0){
            this.newsFirst = result.data[0]
            this.newsList = result.data.splice(1)
            this.totalRow = ((result.data.length-8)/9+1)*10
            this.$refs.page.reload()
          }else{
            this.newsFirst = {}
            this.newsList = []
            this.$refs.page.reload()
          }
        })
        this.sTitle = ''
      }
    },
    components: {
      'v-page': vPage
    }
  }
</script>

<style scoped>
  .news{background-color: #f5f5f5;}
  .news .width{padding: 2% 8% 5% 8%;}

  /*导航样式*/
  .news .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .news .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .news .stripe{width: 100%;display: block;}

  /*标题&搜索框样式*/
    /*标题*/
  .news .main_body .start{display: flex;justify-content: space-between;}
  .news .main_body .start .title{width: 60%;padding: 10px 40px;background-color: #013e75;color: white;position: relative;}
  .news .main_body .start .title:before{content: "";width: 1%;display: inline-block;background-color: #1196e5;position: absolute;top:0;left: 0;bottom: 0;}
  .news .main_body .start .title i{margin-left: 10px;color: #1196e5;}
    /*搜索框*/
  .news .main_body .start .search{width: 30%;display: -webkit-box; -webkit-box-align:center}
  .news .main_body .start .search .search_input{display: flex;width: 80%;margin: 0 auto;}
  .news .main_body .start .search .search_input button{border: none;width: 20%;line-height: 20px;background-color: #21202e;color: white;cursor: pointer;outline: none;}
  .news .main_body .start .search .search_input input{width: 80%;border: 2px gainsboro solid;border-right: none;border-bottom-left-radius: 5px;border-top-left-radius: 5px;outline: none;}

  /*新闻列表样式*/
  .news .main_body .news_list{display: flex;justify-content: start;flex-wrap: wrap;padding: 3%;}
  .news .main_body .news_list .warn{font-size: 22px;text-align: center;width: 100%;}
  .news .main_body .news_list .news_box{width: 30%;margin-bottom: 40px;margin-right: 3%;box-shadow: 5px -5px 10px #c1c1c1;background-color: white;}
  .news .main_body .news_list .news_box .text{padding: 3% 3% 20% 3%;}
  .news .main_body .news_list .news_box .text a{width: 100%;}
  .news .main_body .news_list .news_box .text img{width: 100%;}
  .news .main_body .news_list .news_box .text .date{font-size: 20px;font-weight: bolder;color: #013e75;margin: 20px 0;}
  .news .main_body .news_list .news_box .text .title{font-size: 22px;font-weight: bold;letter-spacing: 2px;}
  .news .main_body .news_list .news_first{width: 63%;}
  .news .main_body .news_list .news_first .text{display: flex;justify-content: space-around;padding: 3%;}
  .news .main_body .news_list .news_first .text a{width: 40%;}
  .news .main_body .news_list .news_first .text img{width: 100%;}
  .news .main_body .news_list .news_first .text .info{width: 55%;padding-left: 3%;}
  .news .main_body .news_list .news_first .text .info .date{margin: 0;font-size: 20px;font-weight: bolder;color: #013e75;text-align: right;}
  .news .main_body .news_list .news_first .text .info .title{margin-top: 8%;font-size: 26px;line-height: 35px;}
  .news .main_body .news_list .news_first .text .info .summary{margin-top: 30px;font-size: 20px;color: gray;font-weight: bolder;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .news{min-width: 1040px;}

    /*标题&搜索框字体*/
    .news .main_body .start .title{font-size: 22px;}
    .news .main_body .start .search .search_input button{font-size: 14px;padding: 8px 0;}
    .news .main_body .start .search .search_input input{font-size: 14px;padding-left: 10px;}
  }

  @media(min-width: 1200px) {
    /*标题&搜索框字体*/
    .news .main_body .start .title{font-size: 24px;}
    .news .main_body .start .search .search_input button{font-size: 16px;padding: 10px 0;}
    .news .main_body .start .search .search_input input{font-size: 16px;padding-left: 10px;}
  }

  @media(min-width: 1500px) {
    /*标题&搜索框字体*/
    .news .main_body .start .title{font-size: 28px;}
    .news .main_body .start .search .search_input button{font-size: 18px;padding: 12px 0;}
    .news .main_body .start .search .search_input input{font-size: 18px;padding-left: 15px;}
  }

  @media(min-width: 1700px) {
    /*标题&搜索框字体*/
    .news .main_body .start .title{font-size: 30px;}
    .news .main_body .start .search .search_input button{font-size: 20px;padding: 15px 0;}
    .news .main_body .start .search .search_input input{font-size: 20px;padding-left: 15px;}
  }
</style>

<style>
  /*分页样式*/
  div.v-pagination.v-pagination--no-border>ul>li>a{background-color: transparent;}
</style>
