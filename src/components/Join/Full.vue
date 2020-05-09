<template>
  <div class="full">
    <div v-html="fullInfo.urls">{{fullInfo.urls}}</div>
  </div>
</template>

<script>
  export default {
    name: "Full",
    data(){
      return{
        fullInfo:{}
      }
    },
    mounted(){
      this.getFullInfo()
    },
    methods:{
      /*获取全职职位的信息*/
      getFullInfo(){
        this.$http.get('jobs/tourist/2').then(result=>{
          this.fullInfo = result.data
        })
      }
    }
  }
</script>

<style scoped>
  .full{padding: 40px 30px;}
</style>
