<template>
  <div class="development">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <a href="#">跨境研发 / Cross-border Research&Development</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <!--左侧文章-->
        <div class="text">
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="header_view" v-html="devHeader.urls">{{devHeader.urls}}</div>
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="module">
            <div class="title">研究方向 / Research Direction <router-link to="/development/direction">查看更多</router-link></div>
            <div class="list">
              <div class="direction" v-for="item in directionList" :key="item.id">
                <img :src="imgRoot + 'researchDirection/' + item.photoName" alt="">
                <div class="dec"></div>
                <p>{{item.title}}</p>
              </div>
            </div>
          </div>
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="module">
            <div class="title">产品展示 / Product Exhibition <router-link to="/development/product">查看更多</router-link></div>
            <div class="list">
              <div class="direction" v-for="item in productList" :key="item.id">
                <router-link :to="'/development/productInfo/'+item.id"><img :src="imgRoot + 'researchProduct/' + item.photoName" alt=""></router-link>
                <div class="dec"></div>
                <router-link :to="'/development/productInfo/'+item.id"><p>{{item.title}}</p></router-link>
              </div>
            </div>
          </div>
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="module">
            <div class="title">团队介绍 / Team Introduction <router-link to="/development/team">查看更多</router-link></div>
            <div class="list">
              <div class="img">
                <img :src="imgRoot + 'teamCover/' + teamCover.photoName" alt="">
              </div>
              <div class="desc">{{teamCover.synopsis}}</div>
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
  import Float from '../Float'
  export default {
    name: "Development",
    data(){
      return{
        devHeader:{},  //获取到的关于我们网页头部
        directionList: [],  //获取到的研究方向数组
        productList:[],  //获取到的产品数组
        teamCover:{}   //获取到的团队介绍对象
      }
    },
    mounted(){
      this.getDevHeader()
      this.getDirectionList()
      this.getProductList()
      this.getTeamCover()
    },
    methods:{
      /*获取页面的网页头部*/
      getDevHeader(){
        this.$http.get('headers/tourist/3').then(result=>{
          this.devHeader = result.data
        })
      },

      /*获取研究方向列表的前三个*/
      getDirectionList(){
        this.$http.get('researchDirections/tourist',{params:{state:1}}).then(result=>{
          if(result.data.length>=3){
            this.directionList = result.data.slice(0,3)
          }else{
            this.directionList = result.data
          }
        })
      },

      /*获取产品列表的前三个*/
      getProductList(){
        this.$http.get('researchProducts/tourist',{params:{state:1}}).then(result=>{
          if(result.data.length>=3){
            this.productList = result.data.slice(0,3)
          }else{
            this.productList = result.data
          }
        })
      },

      /*获取团队介绍的内容*/
      getTeamCover(){
        this.$http.get('teamCovers/tourist/1').then(result=>{
          this.teamCover = result.data
        })
      }
    },
    components:{   //注册悬浮框组件
      float: Float
    }
  }
</script>

<style scoped>
  .development{background-color: #f5f5f5;}
  .development .width{padding: 5% 8%;}
  /*导航样式*/
  .development .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .development .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .development .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .development .main_body{display: flex;justify-content: space-between;}
  .development .main_body .text{width: 65%;}
  .development .main_body .text .header_view{margin-top: -10px;background-color: white;}
  .development .main_body .text .module{background-color: white;box-shadow: 0 0 5px gainsboro;margin-bottom: 50px;}
  .development .main_body .text .module:last-child{margin-bottom: 0;}
  .development .main_body .text .module .title{padding: 2%;font-size: 24px;font-weight: bold;border-bottom: 2px solid #c3c3c3;}
  .development .main_body .text .module .title a{font-size: 16px;font-weight: lighter;color: #1295db;margin-left: 50px;}
  .development .main_body .text .module .list{align-items: center;padding: 3%;display: flex;justify-content: flex-start;}
  .development .main_body .text .module:last-child .list{justify-content: space-around;padding: 5%;}
  .development .main_body .text .module .list .direction{width: 32%;margin-right: 2%;}
  .development .main_body .text .module .list .direction:last-child{margin-right: 0;}
  .development .main_body .text .module .list .direction img{width: 100%;}
  .development .main_body .text .module .list .direction .dec{width: 40%;height: 6px;background-color: #1295dd;border-radius: 5px;margin: 15px 0;}
  .development .main_body .text .module .list .direction p{font-weight: bolder;font-size: 18px;}

  .development .main_body .text .module .list>.img{width: 30%;background-color: darksalmon;}
  .development .main_body .text .module .list>.img img{width: 100%;}
  .development .main_body .text .module .list>.desc{width:60%;font-size: 18px;}

  /*右侧悬浮框*/
  .development .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .development{min-width: 1040px;}
  }
</style>
