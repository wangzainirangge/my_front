<template>
  <div class="education">
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
          <div class="type" v-for="item in moduleList" :key="item.educationTypeID" >
            <div class="title">{{item.title}}</div>
            <div class="list">
              <div class="project" v-for="i in item.educationList" :key="i.educationID" >
                <router-link :to="'/education/educationInfo/'+i.educationID"><img :src="imgRoot + 'education/' + i.photoName" alt=""></router-link>
                <div class="dec"></div>
                <router-link :to="'/education/educationInfo/'+i.educationID"><p>{{i.title}}</p></router-link>
              </div>
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
    name: "Education",
    data(){
      return{
        moduleList:[],    //获取到的教育模块列表
      }
    },
    mounted(){
      this.getModuleList()
    },
    methods:{
      /*获取教育模块列表*/
      getModuleList(){
       this.$http.get('educations/tourist/type').then(result=>{
          this.moduleList = result.data

          /*获取每个教育模块中的内容列表*/
          result.data.forEach(item=>{
            this.$http.get('educations/tourist',{params:{state:1,type:item.type}}).then(result=>{
              this.$set(item,'educationList',result.data)   //使用$set新增节点，否则无法触发视图更新
            })
          })
        })
      },
    },
    components:{
      float: Float
    }
  }
</script>

<style scoped>
  .education{background-color: #f5f5f5;}
  .education .width{padding: 5% 8%;}

  /*导航样式*/
  .education .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .education .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .education .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .education .main_body{display: flex;justify-content: space-between;}
  .education .main_body .text{width: 65%;}
  .education .main_body .text .type{background-color: white;box-shadow: 0 0 7px gainsboro;margin-bottom: 30px;}
  .education .main_body .text .type:last-child{margin-bottom: 0;}
  .education .main_body .text .type .title{padding: 20px;font-size: 24px;font-weight: bold;border-bottom: 1px solid gainsboro;}
  .education .main_body .text .type .list{padding: 30px 20px 50px 20px;display: flex;justify-content: flex-start;}
  .education .main_body .text .type .list .project{width: 32%;margin-right: 2%;}
  .education .main_body .text .type .list .project:last-child{margin-right: 0;}
  .education .main_body .text .type .list .project img{width: 100%;}
  .education .main_body .text .type .list .project .dec{width: 40%;height: 6px;background-color: #1295dd;border-radius: 5px;margin: 15px 0;}
  .education .main_body .text .type .list .project p{font-weight: bolder;font-size: 18px;}

  /*右侧悬浮框*/
  .education .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .education{min-width: 1040px;}
  }
</style>
