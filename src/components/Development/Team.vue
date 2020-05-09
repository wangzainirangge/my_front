<template>
  <div class="team">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <a href="#">关于我们 / About Us</a>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <!--左侧文章-->
        <div class="text">
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="header_view" v-html="aboutHeader.urls">{{aboutHeader.urls}}</div>
          <div class="members">
            <div class="member" v-for="item in memberList" :key="item.memberID">
              <h3>{{item.memberName}}</h3>
              <p>{{item.urls}}</p>
              <div class="dec">
                <div class="stripe">
                  <img src="../../assets/image/common/stripe_blue.jpg" alt="">
                </div>
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
    name: "Team",
    data(){
      return{
        aboutHeader:{},  //获取到的关于我们网页头部
        memberList:[]   //获取到的团队成员列表
      }
    },
    mounted(){
      this.getTeamHeader()
      this.getMemberList()
    },
    methods:{
      /*获取关于我们页面的网页头部*/
      getTeamHeader(){
        this.$http.get('headers/4').then(result=>{
          this.aboutHeader = result.data
        })
      },
      /*获取成员列表*/
      getMemberList(){
        this.$http.get('members/tourist',{params:{type:2}}).then(result=>{
          this.memberList = result.data
        })
      }
    },
    components:{   //注册悬浮框组件
      float: Float
    }
  }
</script>

<style scoped>
  .team{background-color: #f5f5f5;}
  .team .width{padding: 5% 8%;}
  /*导航样式*/
  .team .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .team .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .team .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .team .main_body{display: flex;justify-content: space-between;}
  .team .main_body .text{width: 65%;background-color: white;}
  .team .main_body .text .header_view{margin-top: -10px;}
  .team .main_body .text .members{padding: 3% 5%;}
  .team .main_body .text .members .member {margin-bottom: 50px;}
  .team .main_body .text .members .member h3{font-size: 30px;margin-bottom: 20px;}
  .team .main_body .text .members .member p{font-size: 18px;line-height: 30px;}
  .team .main_body .text .members .member .dec{width: 100%;border-bottom: 1px solid gainsboro;margin-top: 20px;height: 6px;}
  .team .main_body .text .members .member .dec .stripe{width: 55%;float: right;}
  .team .main_body .text .members .member .dec .stripe img{width: 100%;float: right;height: 6px;}


  /*右侧悬浮框*/
  .team .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .team{min-width: 1040px;}
  }
</style>
