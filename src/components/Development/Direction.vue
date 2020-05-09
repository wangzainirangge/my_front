<template>
  <div class="direction">
    <div class="width">
        <!--bread-->
        <div class="bread">
          <router-link to="/home">首页</router-link>
          >
          <a href="#">研究方向 / Research Direction</a>
        </div>

        <!--内容主体-->
        <div class="main_body">
          <!--左侧文章-->
          <div class="text">
            <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
            <p v-if="!directionList[0]" class="warn">暂无内容</p>
            <div class="block" v-for="item in directionList" :key="item.directionID">
              <p class="title">{{item.title}}</p>
              <div class="viewer" v-html="item.urls">{{item.urls}}</div>
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
    name: "Direction",
    data(){
      return{
        directionList:[]  //获取到的研究方向列表
      }
    },
    mounted(){
      this.getDirectionList()
    },
    methods:{
      /*获取研究方向列表*/
      getDirectionList(){
        this.$http.get('researchDirections/tourist',{params:{state:1}}).then(result=>{
          this.directionList = result.data
        })
      }
    },
    components:{   //注册悬浮框组件
      float: Float
    }
  }
</script>

<style scoped>
  .direction{background-color: #f5f5f5;}
  .direction .width{padding: 5% 8%;}
  /*导航样式*/
  .direction .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .direction .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .direction .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .direction .main_body{display: flex;justify-content: space-between;}
  .direction .main_body .text{width: 65%;}
  .direction .main_body .text .warn{margin-top: 20px;font-size: 20px;}
  .direction .main_body .text .block{box-shadow: 3px 3px 10px gainsboro;padding: 3%;background-color: white;margin-bottom: 30px;}
  .direction .main_body .text .block .title{font-size: 24px;font-weight: bold;margin-bottom: 40px;}


  /*右侧悬浮框*/
  .direction .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .direction{min-width: 1040px;}
  }
</style>
