<template>
  <div class="newsInfo">
    <div class="width">
      <!--bread-->
      <div class="bread">
        <router-link to="/home">首页</router-link>
        >
        <router-link to="/militaryNews">军事新闻 / Military News</router-link>
      </div>

      <!--内容主体-->
      <div class="main_body">
        <!--左侧文章-->
        <div class="text">
          <img src="../../assets/image/common/stripe_black.jpg" alt="" class="stripe">
          <div class="article">
            <img src="../../assets/image/common/shadow.png" alt="" class="shadow">
            <div class="title">{{newsInfo.title}}</div>
            <div class="date" style="margin-left: 70%;margin-bottom: 20px;">发布时间:{{newsInfo.pushTime|dateFormat('yyyy-MM-dd')}}</div>
            <div v-html="newsInfo.msgTXT">{{newsInfo.msgTXT}}</div>
          </div>
        </div>
        <!--右侧悬浮框-->
        <div class="right">
          <float></float>
        </div>
      </div>
      <div style="margin-left: 580px;margin-top: 20px"  v-if="star==0">
        <el-button type="text" @click="clickLeaveMessage()">新闻留言<i class="el-icon-chat-dot-round"></i></el-button>
        <el-button type="text" @click="clickPush(1)">推荐文章<i class="el-icon-star-off"></i></el-button>
      </div>
      <div style="margin-left: 580px;margin-top: 20px"  v-if="star==1">
        <el-button type="text" @click="clickLeaveMessage()">新闻留言<i class="el-icon-chat-dot-round"></i></el-button>
        <el-button type="text" @click="clickPush(0)">取消推荐<i class="el-icon-star-on"></i></el-button>
      </div>
    </div>
    <el-dialog
      title="请留言"
      :visible.sync="editFlag"
      :before-close="cancelassetForm"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :modal-append-to-body='false'
      width="40%"
      center>
      <div style="width: 100%;min-height: 100px">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          :rows="3"
          v-model="commentsData.content"
          maxlength="200"
          show-word-limit>
        </el-input>
        <el-button type="primary" style="margin-top: 20px;margin-left: 400px" @click="btnSubmit()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Float from '../Float'
  export default {
    name: "NewsInfo",
    data(){
      return{
        IP: '',
        editFlag: false,
        star: '0',
        id:this.$route.params.id,   //根据路由获得该新闻的id
        newsInfo:{},  //获取到的新闻信息
        requestData: {
          newsId: '',
          userId: '',
          type: '',
          userIP: ''
        },
        commentsData: {
          newsID: '',
          useID: '',
          content: '',
          createIP: ''
        }
      }
    },
    mounted(){
      this.ready();
      this.getNewsInfo()
    },
    methods:{

      ready:function(){
        //获取本地IP地址
        //js 引入 <!-- 获取本机ip  -->
        //<script src="http://pv.sohu.com/cityjson?ie=utf-8">
        var cip = returnCitySN["cip"];
        //给vuedata对象里的字段赋值
        this.IP = cip

        let userID = this.getCookie("userID");
        if(userID==''||userID==0){
          this.requestData.userId = 0;
        }else {
          this.requestData.userId = userID;
          this.$get(this.$api.module.operationLikesViews + '/getStartNum?userId=' + userID + "&newsID=" +this.id).then(res => {
            if (res.status == 200){
              this.star = res.data;
            } else {
              this.$message({
                message: '获取数据失败！',
                type: 'error'
              });
            }
          })
        }
        this.requestData.newsId = this.id;
        this.requestData.userIP = this.IP;
        this.requestData.type = 1;
        this.$post(this.$api.module.operationLikesViews,this.requestData).then(res => {})
      },

      /*获取已知id的新闻的信息*/
      getNewsInfo(){
        this.$get(this.$api.module.operationNews + '/' + this.id).then(res => {
          if (res.status == 200){
            this.newsInfo = res.data;
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
      clickPush(v){
        if (this.requestData.userId==0||this.requestData.userId=='') {
          this.$message({
            message: '请登录账号！',
            type: 'warning'
          });
          this.setCookie('newsRouter','/militaryNews/newsInfo/'+this.id,1);
          this.$router.push({name: 'userLogin'})
        }else {
          this.requestData.type = 2;
          this.$post(this.$api.module.operationLikesViews,this.requestData).then(res => {
            if (res.status == 200){
              this.star = v;
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
            } else {
              this.$message({
                message: '操作失败！',
                type: 'error'
              });
            }
          })
        }
      },
      clickLeaveMessage(){
        if (this.requestData.userId==0||this.requestData.userId=='') {
          this.$message({
            message: '请登录账号！',
            type: 'warning'
          });
          this.setCookie('newsRouter','/militaryNews/newsInfo/'+this.id,1);
          this.$router.push({name: 'userLogin'})
        }else {
          this.editFlag = true;
        }
      },
      clearDate(){
        this.requestData = {
          newsId: '',
          userId: '',
          type: '',
          userIP: ''
        }
      },
      cancelassetForm(){
        this.editFlag = false;
        this.commentsData = {
          newsID: '',
          useID: '',
          content: '',
          createIP: ''
        }
      },
      btnSubmit(){
        this.commentsData.newsID = this.requestData.newsId;
        this.commentsData.useID = this.requestData.userId;
        this.commentsData.createIP = this.requestData.userIP;
        this.$post(this.$api.module.operationNewsComments,this.commentsData).then(res => {
          if (res.status == 200){
            this.$message({
              message: '留言成功！',
              type: 'success'
            });
            this.requestData.type = 3;
            this.$post(this.$api.module.operationLikesViews,this.requestData).then(res => {
              if (res.status == 200){
              } else {
                this.$message({
                  message: '操作失败！',
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '操作失败！',
              type: 'error'
            });
          }
        })
        this.cancelassetForm();
      },
      // 获取电脑ip
      getUserIP (onNewIP) {
        let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        let pc = new MyPeerConnection({
          iceServers: []
        });
        let noop = () => {
        };
        let localIPs = {};
        let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
        let iterateIP = (ip) => {
          if (!localIPs[ip]) {onNewIP(ip);}
          localIPs[ip] = true;
        };
        pc.createDataChannel('');
        pc.createOffer().then((sdp) => {
          sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) {return;}
            line.match(ipRegex).forEach(iterateIP);
          });
          pc.setLocalDescription(sdp, noop, noop);
        }).catch((reason) => {
          console.log(reason);
        });
        pc.onicecandidate = (ice) => {
          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) {return;}
          ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
      }
    },
    components:{
      float: Float
    },
    watch:{
      /*每当路由变化时，刷新页面信息*/
      "$route.path":function (newVal) {
        this.id = this.$route.params.id
        this.newsInfo = {}
        this.getNewsInfo()
      }
    }
  }
</script>

<style scoped>
  .newsInfo{background-color: #f5f5f5;}
  .newsInfo .width{padding: 5% 8%;}

  /*导航样式*/
  .newsInfo .bread{padding: 30px;background-color: #013e75;color: white;font-size: 24px;}
  .newsInfo .bread a{color: white;font-size: 24px;}

  /*分隔条样式*/
  .newsInfo .stripe{width: 100%;display: block;}

  /*左侧文章*/
  .newsInfo .main_body{display: flex;justify-content: space-between;}
  .newsInfo .main_body .text{width: 65%;background: url("../../assets/image/common/circle.png") bottom right no-repeat white;background-size: 80% auto;}
  .newsInfo .main_body .text .article{padding: 3%;}
  .newsInfo .main_body .text .article .shadow{width: 100%;}
  .newsInfo .main_body .text .article .title{font-size: 30px;font-weight: bold;text-align: left;margin-top: -20px;margin-left: 3%;line-height: 50px;margin-bottom: 30px;}

  /*右侧悬浮框*/
  .newsInfo .main_body .right{width: 30%;}

  /*响应式布局*/
  @media(max-width: 1199px) {
    .newsInfo{min-width: 1040px;}
  }
</style>
