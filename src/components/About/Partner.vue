<template>
  <div class="partner">
    <div class="list">
      <p v-if="!partnerList[0]" class="warn">暂无内容</p>
      <div class="partner_box" v-for="item in partnerList" :key="item.companyID">
        <a :href="item.urls" target="_blank"><img :src="imgRoot + 'company/' + item.photoName" alt=""></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "partner",
    data(){
      return{
        partnerList:[]  //获取到的合作伙伴列表
      }
    },
    mounted(){
      this.getPartnerList()
    },
    methods:{
      /*获取合作伙伴列表*/
      getPartnerList(){
        this.$http.get('companies/tourist').then(result=>{
          this.partnerList = result.data
        })
      }
    }
  }
</script>

<style scoped>
  .partner{padding: 50px 70px;}
  .partner .list{margin: 0 auto;display: flex;justify-content: start;flex-wrap: wrap;}
  .partner .list .partner_box{width: 22%;margin-bottom: 30px;margin-right: 3%;}
  .partner .list .partner_box:nth-child(4){margin-right: 0;}
  .partner .list .partner_box img{width: 100%;}
  .partner .list .warn{font-size: 22px;text-align: center;width: 100%;}
</style>
