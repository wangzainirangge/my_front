<template>
  <div class="educationInfo">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <a href="#">国际教育服务 / International Education Service</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <!--左侧文章-->
        <div class="text">
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="article">
            <p class="title">{{educationInfo.title}}</p>
            <p class="desc" v-html="educationInfo.urls">{{educationInfo.urls}}</p>
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
    name: "EducationInfo",
    data(){
      return{
        id:this.$route.params.id,
        educationInfo:{},
      }
    },
    mounted(){
      this.getEducationInfo()
    },
    methods:{
      /*根据id获取该教育文章的内容*/
      getEducationInfo(){
        this.$http.get('educations/tourist/'+this.id).then(result=>{
          this.educationInfo = result.data
        })
      }
    },
    components:{
      float: Float
    }
  }
</script>

<style scoped>
  .educationInfo{background-color: #f5f5f5;}
  .educationInfo .width{padding: 5% 8%;}

  /*导航样式*/
  .educationInfo .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .educationInfo .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .educationInfo .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .educationInfo .main_body{display: flex;justify-content: space-between;}
  .educationInfo .main_body .text{width: 65%;}
  .educationInfo .main_body .text .article{box-shadow: 0 0 5px gainsboro;background-color: white;padding: 40px;}
  .educationInfo .main_body .text .article .title{font-size: 24px;font-weight: bold;margin-bottom: 40px;}
  .educationInfo .main_body .text .article .desc{font-size: 18px;}

  /*右侧悬浮框*/
  .educationInfo .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .educationInfo{min-width: 1040px;}
  }
</style>
