<template>
  <div class="news">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <a href="#">科技新闻 / Science News</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <img src="../../assets/image/common/stripe_black_long.jpg" alt="" class="stripe">
        <div class="start">
          <div class="title">
            国际新闻<i class="fa fa-angle-double-down" aria-hidden="true"></i>
          </div>
          <div class="search">
            <div class="search_input">
              <input type="text" placeholder="Search Articles ..." v-model="keyword" @keyup.enter="passKeyword()">
              <button @click="passKeyword()"><i class="fa fa-search" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
        <div class="news_list">
          <p v-if="newsList !== undefined && newsList ==0" class="warn">没有符合的内容</p>
          <div class="news_box" style="height: 450px" v-for="item in newsList" :key="item.newsID">
            <div class="text">
              <router-link :to="'/scienceNews/newsInfo/'+item.newsID">
                <img :src="require('../../../../img/' + item.photoUrl)" alt="">
              </router-link>
              <p class="date">{{item.pushTime | dateFormat('yyyy-MM-dd')}}</p>
              <router-link :to="'/scienceNews/newsInfo/'+item.newsID"><h3 class="title">{{item.title}}</h3></router-link>
            </div>
          </div>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
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
        pageNo: 1,
        pageSize:9,
        total: 0,
        flag: true,    //判断是否显示第一个速递
        sTitle: ''     //搜索用的标题关键字
      }
    },
    mounted(){
      this.getNewsList()
    },
    methods: {
      /*获取新闻列表*/
      getNewsList(){
        this.$get(this.$api.module.operationNews + '?status=1&type=4&pageSize=' + this.pageSize + "&pageNo=" + this.pageNo).then(res => {
          if (res.status == 200){
            this.newsList = res.data;
            this.total = res.page.totalNum;
            this.$message({
              message: '获取数据成功！',
              type: 'success'
            });
          } else {
            this.$message({
              message: '获取数据失败！',
              type: 'error'
            });
          }
        })
      },
      handleSizeChange(val){
        this.pageSize = val;
        this.getNewsList();
      },
      handleCurrentChange(){
        this.getNewsList();
      },
      passKeyword(){
        this.$router.push({name: 'search',params:{searchData: this.keyword}})
      }
    },
    components: {
      'v-page': vPage
    }
  }
</script>

<style scoped>

  .el-pagination {
    text-align: center;
  }

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
