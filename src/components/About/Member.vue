<template>
  <div class="member">
    <div class="president" v-for="item in memberList" :key="item.memberID">
      <h3>{{item.memberName}}</h3>
      <p>{{item.urls}}</p>
      <div class="dec">
        <div class="stripe">
          <img src="../../assets/image/common/stripe_blue.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "member",
    data(){
      return{
        memberList:[],   //获取的成员列表
      }
    },
    mounted(){
      this.getMemberList()
    },
    methods:{
      /*获取成员列表*/
      getMemberList(){
        this.$http.get('members/tourist',{params:{type:1}}).then(result=>{
          console.log(result.data)
          this.memberList = result.data
        })
      }
    },

  }
</script>

<style scoped>
  .member{padding: 50px 70px;}
  .member .president{margin-bottom: 50px;}
  .member .president h3{font-size: 30px;margin-bottom: 20px;}
  .member .president p{font-size: 18px;line-height: 30px;}
  .member .president .dec{width: 100%;border-bottom: 1px solid gainsboro;margin-top: 20px;height: 6px;}
  .member .president .dec .stripe{width: 55%;float: right;}
  .member .president .dec .stripe img{width: 100%;float: right;height: 6px;}
</style>
