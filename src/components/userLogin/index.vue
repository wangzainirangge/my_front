<template>
  <div>
    <div class="ptSt">
      <div style="width: 100%;height: 50px;background-color: #ddede0;margin-bottom: 40px">
        <el-row style="margin-bottom: 30px;margin-top: 5px">
          <el-col :span="24" style="text-align: center;font-size: 24px;margin-top: 10px">
            用户登陆
          </el-col>
        </el-row>
      </div>
      <el-row style="margin-bottom: 30px;margin-top: 5px">
        <el-col :span="6" style="text-align: right;font-size: 18px;margin-top: 8px">
          用户名&nbsp;&nbsp;&nbsp;&nbsp;
        </el-col>
        <el-col :span="12" style="font-size: 24px;">
          <el-input v-model="registeredData.username" placeholder="请输入用户名"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 30px;margin-top: 5px">
        <el-col :span="6" style="text-align: right;font-size: 18px;margin-top: 8px">
          密码&nbsp;&nbsp;&nbsp;&nbsp;
        </el-col>
        <el-col :span="12" style="font-size: 24px;">
          <el-input placeholder="请输入密码" v-model="registeredData.password" show-password></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 20px;margin-top: 5px;">
        <el-col :span="6" style="text-align: right;font-size: 18px;margin-top: 8px">
          验证码&nbsp;&nbsp;&nbsp;&nbsp;
        </el-col>
        <el-col :span="6">
          <el-input v-model="form.code" placeholder="请输入验证码"  style="width:150px;float:left"></el-input>
        </el-col>
        <el-col :span="6">
          <div @click="refreshCode">
            <Sidentify :identifyCode="identifyCode" />
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 30px;margin-top: 5px">
        <el-col :span="10" style="text-align: right;font-size: 18px;margin-top: 8px">
          <el-button type="primary" @click="clickSubmitBtn()">登陆</el-button>
        </el-col>
        <el-col :span="6" style="text-align: right;font-size: 18px;margin-top: 8px">
          <el-button type="primary" @click="clickRegisteredBtn()">注册</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Sidentify from "./SIdentify";
  export default {
    name: "index",
    components: {
      Sidentify
    },
    data () {
      return {
        saveIP: [],
        userData: {},
        registeredData:{
          username: '',
          password: '',
          registeredIP: ''
        },
        identifyCodes: "1234567890",
        identifyCode: "",
        form: {
          code: ''
        }
      }
    },
    methods: {
      clickSubmitBtn(){
        this.registeredData.registeredIP = this.saveIP[0];
        if(this.identifyCode===this.form.code){
          this.$post(this.$api.module.operationUser + "/login",this.registeredData).then(res => {
            if (res.status == 200){
              this.userData = res.data;
              //this.setCookie('manageID',this.resultData.manageID,1);
              this.refreshCode();
              this.$message({
                message: '登陆成功！',
                type: 'success'
              });
            } else {
              this.$message({
                message: '登陆失败,请检查账号或密码是否正确！',
                type: 'error'
              });
            }
          })
        }else {
          this.$message.error('验证码输入错误，请重新输入！');
          this.form.code = '';
          this.refreshCode();
        }
      },
      clickRegisteredBtn(){
        this.$router.push("/userRegistered")
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },

      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        this.registeredData = {
          username: '',
          password: '',
        };
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
        console.log(this.identifyCode);
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
    mounted () {
      this.refreshCode();
      this.getUserIP((ip) => {
        this.ip = ip;
        console.log(ip);
        this.saveIP.push(ip)
      });
    }
  }
</script>

<style scoped>
  .ptSt{
    width: calc(100% - 700px);
    height: 400px;
    /*background-color: pink;*/
    margin-left: 350px;
    /*border: 1px solid #c0c0c0;*/
    border-radius: 15px;
    box-shadow:0px 0px  2px 1px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    margin-top: 80px;
  }
</style>
