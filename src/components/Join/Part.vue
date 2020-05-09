<template>
  <div class="part">
    <div v-html="partInfo.urls">{{partInfo.urls}}</div>
  </div>
</template>

<script>
  export default {
    name: "Part",
    data(){
      return{
        partInfo:{}
      }
    },
    mounted() {
      this.getPartInfo()
    },
    methods:{
      /*获取实习职位的信息*/
      getPartInfo(){
        this.$http.get('jobs/tourist/1').then(result=>{
          this.partInfo = result.data
        })
      }
    }
  }
</script>

<style scoped>
  .part{padding: 40px 30px;}
</style>
