<template>
  <div class="result">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <a>搜索 / Search</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <img src="../../assets/image/common/stripe_black_long.jpg" alt="" class="stripe">
        <div class="content">
          <div class="search">
            <div class="box">
              <div class="inner">
                <input type="text" placeholder="搜索" v-model="keyword" @keyup.enter="search(keyword,range)" >
                <i class="fa fa-search" aria-hidden="true"></i>
              </div>
              <button @click="search(keyword,range)"><i class="fa fa-search" aria-hidden="true"></i></button>
              <button class="out">站外搜索</button>
            </div>
          </div>
          <div class="options">
            <!--<div class="sort">
              <p>时间排序</p>
              <div class="choice">
                <input id="dao" type="radio" value="1" v-model="sort">
                <label for="dao">倒序</label>
                <input id="zheng" type="radio" value="2" v-model="sort">
                <label for="zheng">正序</label>
              </div>
            </div>-->
            <div class="range">
              <p>时间范围</p>
              <div class="choice">
                <input id="all" type="radio" value="0" v-model="range" @click="search(keyword,'0')">
                <label for="all">全部时间</label>
                <input id="day" type="radio" value="1" v-model="range" @click="search(keyword,'1')">
                <label for="day">一天内</label>
                <input id="week" type="radio" value="2" v-model="range" @click="search(keyword,'2')">
                <label for="week">一周内</label>
                <input id="month" type="radio" value="3" v-model="range" @click="search(keyword,'3')">
                <label for="month">一月内</label>
                <input id="year" type="radio" value="4" v-model="range" @click="search(keyword,'4')">
                <label for="year">一年内</label>
              </div>
            </div>
          </div>
          <div class="cancel">
            您当前的筛选条件为<span>{{range==='0'?'全部时间':range==='1'?'一天内':range==='2'?'一周内':range==='3'?'一月内':'一年内'}}</span>
            <a @click.prevent="search(keyword,'0')">取消筛选</a>
          </div>
          <div class="result_box" v-for="item in pageArr" :key="item.newsID">
            <div v-if="item.type==1">
              <router-link :to="'/InternationalNews/newsInfo/'+item.newsID">
                <p class="title" v-html="item.title">{{item.title}}</p>
              </router-link>
              <router-link :to="'/InternationalNews/newsInfo/'+item.newsID">
                <p class="desc" v-html="item.textContent">{{item.textContent}}</p>
              </router-link>
              <div class="info">
                <router-link to="/InternationalNews" v-if="item.type==1"><span style="color: #013e75">国际新闻</span></router-link>
                <span>{{item.publicTime|dateFormat('yyyy-MM-dd')}}</span>
              </div>
            </div>

            <div v-if="item.type==2">
              <router-link :to="'/nationalNews/newsInfo/'+item.newsID">
                <p class="title" v-html="item.title">{{item.title}}</p>
              </router-link>
              <router-link :to="'/nationalNews/newsInfo/'+item.newsID">
                <p class="desc" v-html="item.textContent">{{item.textContent}}</p>
              </router-link>
              <div class="info">
                <router-link to="/nationalNews" v-if="item.type==2"><span style="color: #013e75">国内新闻</span></router-link>
                <span>{{item.publicTime|dateFormat('yyyy-MM-dd')}}</span>
              </div>
            </div>

            <div v-if="item.type==3">
              <router-link :to="'/militaryNews/newsInfo/'+item.newsID">
                <p class="title" v-html="item.title">{{item.title}}</p>
              </router-link>
              <router-link :to="'/militaryNews/newsInfo/'+item.newsID">
                <p class="desc" v-html="item.textContent">{{item.textContent}}</p>
              </router-link>
              <div class="info">
                <router-link to="/militaryNews" v-if="item.type==3"><span style="color: #013e75">军事新闻</span></router-link>
                <span>{{item.publicTime|dateFormat('yyyy-MM-dd')}}</span>
              </div>
            </div>

            <div v-if="item.type==4">
              <router-link :to="'/scienceNews/newsInfo/'+item.newsID">
                <p class="title" v-html="item.title">{{item.title}}</p>
              </router-link>
              <router-link :to="'/scienceNews/newsInfo/'+item.newsID">
                <p class="desc" v-html="item.textContent">{{item.textContent}}</p>
              </router-link>
              <div class="info">
                <router-link to="/scienceNews" v-if="item.type==4"><span style="color: #013e75">科技新闻</span></router-link>
                <span>{{item.publicTime|dateFormat('yyyy-MM-dd')}}</span>
              </div>
            </div>

            <div v-if="item.type==5">
              <router-link :to="'/financialNews/newsInfo/'+item.newsID">
                <p class="title" v-html="item.title">{{item.title}}</p>
              </router-link>
              <router-link :to="'/financialNews/newsInfo/'+item.newsID">
                <p class="desc" v-html="item.textContent">{{item.textContent}}</p>
              </router-link>
              <div class="info">
                <router-link to="/financialNews" v-if="item.type==5"><span style="color: #013e75">财经新闻</span></router-link>
                <span>{{item.publicTime|dateFormat('yyyy-MM-dd')}}</span>
              </div>
            </div>

            <div v-if="item.type==6">
              <router-link :to="'/educationNews/newsInfo/'+item.newsID">
                <p class="title" v-html="item.title">{{item.title}}</p>
              </router-link>
              <router-link :to="'/educationNews/newsInfo/'+item.newsID">
                <p class="desc" v-html="item.textContent">{{item.textContent}}</p>
              </router-link>
              <div class="info">
                <router-link to="/educationNews" v-if="item.type==6"><span style="color: #013e75">教育新闻</span></router-link>
                <span>{{item.publicTime|dateFormat('yyyy-MM-dd')}}</span>
              </div>
            </div>

            <div v-if="item.type==7">
              <router-link :to="'/sportsNews/newsInfo/'+item.newsID">
                <p class="title" v-html="item.title">{{item.title}}</p>
              </router-link>
              <router-link :to="'/sportsNews/newsInfo/'+item.newsID">
                <p class="desc" v-html="item.textContent">{{item.textContent}}</p>
              </router-link>
              <div class="info">
                <router-link to="/sportsNews" v-if="item.type==7"><span style="color: #013e75">体育新闻</span></router-link>
                <span>{{item.publicTime|dateFormat('yyyy-MM-dd')}}</span>
              </div>
            </div>

            <div v-if="item.type==8">
              <router-link :to="'/automotiveNews/newsInfo/'+item.newsID">
                <p class="title" v-html="item.title">{{item.title}}</p>
              </router-link>
              <router-link :to="'/automotiveNews/newsInfo/'+item.newsID">
                <p class="desc" v-html="item.textContent">{{item.textContent}}</p>
              </router-link>
              <div class="info">
                <router-link to="/automotiveNews" v-if="item.type==8"><span style="color: #013e75">汽车新闻</span></router-link>
                <span>{{item.publicTime|dateFormat('yyyy-MM-dd')}}</span>
              </div>
            </div>
          </div>
          <v-page   :total-row="totalRow"
                    @page-change="pageChange"
                    :page-size-menu="false"
                    align="center"
                    :info="false"
                    :border="false"
                    ref="page"
                    v-if="resultList[0]"></v-page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { vPage } from 'v-page'
  import BUS from '../../assets/js/bus'
  export default {
    name: "None",
    data(){
      return{

        range: '0',   //搜索用时间范围类型
        resultList:[],   //得到的搜索结果
        totalRow:0,   //分页用的结果总记录数
        pageSize: 5,   //分页用的每页记录数
        pageArr: [],   //分页用的当前页面记录表
        keyword: ''   //搜索的关键字
      }
    },
    methods:{

      /*根据输入框中的关键字获得搜索结果*/
      search(keyword,dateType){
        this.range = dateType
        this.$get(this.$api.module.searches + '/searchUrls?keyword=' + this.keyword + '&type=' + dateType).then(res => {
          if (res.status == 200){
            this.resultList = res.data;
            this.totalRow = res.data.length/this.pageSize*10
            if(this.$refs.page){
              this.$refs.page.reload()
            }
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

      /*分页的回调函数*/
      pageChange(pInfo){
        pInfo.pageSize = this.pageSize
        this.pageArr.splice(0, this.pageArr.length);
        let start = 0, end = 0;
        start = pInfo.pageSize*(pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.resultList.length) end = this.resultList.length;
        for (let i = start; i < end; i++) {
          this.pageArr.push(this.resultList[i]);
        }
      },
    },
    mounted () {
      this.keyword = this.$route.params.searchData;
      if (this.keyword!=''||this.keyword!=null){
        this.search(this.keyword,5)
      }
      //alert(this.keyword)
    },
    components: {
      'v-page': vPage
    }

  }
</script>

<style scoped>
  .result{background-color: #f5f5f5;}
  .result .width{padding: 5% 8%;}

  /*导航样式*/
  .result .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .result .bread a{color: white;font-size: 24px;}

  /*内容主体*/
  .result .main_body{display: flex;flex-wrap: wrap;}
  .result .stripe{width: 100%;display: block;}

  /*左侧搜索*/
  .result .main_body .content{width: 70%;}
  .result .main_body .content .search{width: 80%;padding: 3% 10%;position: relative;background-color: white;}
  .result .main_body .content .search:before{content: "";position: absolute;top: 0;left: 0;bottom: 0;width: 1%;background-color: #002e72;display: inline-block;}
  .result .main_body .content .search .box{display: flex;}
  .result .main_body .content .search .box .inner{display: inline-block; width: 70%;position: relative;}
  .result .main_body .content .search .box .inner i{position: absolute;bottom: 28%;font-size: 20px;left: 3%;}
  .result .main_body .content .search .box .inner input{height: 40px;width: 90%;border: 2px solid gainsboro;border-top-left-radius: 5px;border-bottom-left-radius: 5px;
    border-right: none;font-size: 20px;font-weight: lighter;outline: none;padding: 0 2% 0 8%;}
  .result .main_body .content .search .box button{outline:none;cursor: pointer;width: 52px;font-size: 20px;background-color: black;border: none;padding: 0 2%;color: white;}
  .result .main_body .content .search .box .out{margin-left: 9%;padding: 0;width: 12%;font-size: 18px;min-width: 93px;}

  /*左侧选项*/
  .result .main_body .content .options{font-size: 20px;padding: 2% 5%;background: url("../../assets/image/common/option_back.jpg");background-size: 100% 100%;display: flex;justify-content: start;}
  .result .main_body .content .options .sort{margin-right: 50px;}
  .result .main_body .content .options p{position: relative;padding-left: 18%;white-space:nowrap;}
  .result .main_body .content .options p:before{content: "";display: inline-block;position: absolute;top: 0;left: 0;bottom: 0;width: 12%;background-color: #013e75;}
  .result .main_body .content .options .choice{padding: 15px 20px 0 20px;}
  .result .main_body .content .options .choice input,label{cursor: pointer;}
  .result .main_body .content .options .choice label{margin-right: 20px;}

  /*左侧结果*/
  .result .main_body .content .cancel{padding: 20px;background-color: white;color: grey;}
  .result .main_body .content .cancel span{color: black;}
  .result .main_body .content .cancel a{color: #013e75;cursor: pointer;}
  .result .main_body .content .result_box{padding: 3%;width: 94%;background-color: white;box-shadow: 5px -5px 10px rgba(180, 180, 180, 0.68); transition: all ease 0.5s;}
  .result .main_body .content .result_box:hover{background-color: #f2f2f2;}
  .result .main_body .content .result_box .title{font-size: 24px;font-weight: bold;margin-bottom: 30px;}
  .result .main_body .content .result_box .desc{font-size: 18px;line-height: 30px;}
  .result .main_body .content .result_box .info{display: flex;justify-content: flex-end;margin-top: 30px;color: #013e75;}
  .result .main_body .content .result_box .info span{margin-left: 30px;font-size: 18px;}

  .result .main_body .content .options .range p:before{width: 4%;}
  .result .main_body .content .options .range p{padding-left: 6%;}
  /*.result .main_body .content .options .choice button{font-size: 18px;padding: 2px;border-radius: 5px;outline:none;font-weight: lighter;color: #7e7e7e;background-color: rgba(0,0,0,0);border: none;cursor: pointer;}*/


  /*右侧热点*/
  .result .main_body .hot{width: 30%;}
  .result .main_body .hot .list{padding: 10% 8% 15% 8%;color: white;width: 84%;background-color: #013e75;}
  .result .main_body .hot .list .title{font-size: 26px;margin-bottom: 6%;}
  .result .main_body .hot .list .keyword{font-size: 20px;margin-bottom: 2%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .result{min-width: 1040px;}
  }
</style>

<style>
  /*分页样式*/
  .result div.v-pagination.v-pagination--no-border>ul>li>a{background-color: transparent;margin-top: 50px;}
</style>
