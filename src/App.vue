<template>
  <div id="app">
    <div class="navbar animated fadeIn">
      <div class="logo">
        <!--<div class="img">
          <img src="./assets/image/common/logo.png" alt="logo">
        </div>-->
        <div class="name">
          <h1 class="ch">新媒体展示平台</h1>
          <h1 class="en">New Media Display Platform</h1>
        </div>
      </div>
      <div class="fixed"><ul class="menu">
          <router-link to="/home"><li>首页 / Home</li></router-link>
          <router-link to="/InternationalNews"><li>国际新闻</li></router-link>
          <router-link to="/nationalNews"><li>国内新闻</li></router-link>
          <router-link to="/militaryNews"><li>军事新闻</li></router-link>
          <router-link to="/scienceNews"><li>科技新闻</li></router-link>
          <router-link to="/financialNews"><li>财经新闻</li></router-link>
          <router-link to="/educationNews"><li>教育新闻</li></router-link>
          <router-link to="/sportsNews"><li>体育新闻</li></router-link>
          <router-link to="/automotiveNews"><li>汽车新闻</li></router-link>
          <router-link to="/userLogin"><li>登陆/注册</li></router-link>
        </ul></div>
    </div>
    <router-view class="animated fadeIn change" style="margin-top: 0px"/>
    <div class="footer" style="height: 210px;margin: 0px;padding: 0px;">
      <div class="connect" style="height: 200px;margin: 0px;padding: 0px;margin-left: 100px;margin-top: 10px">
        <div class="info" style="height: 40px">
          <img src="./assets/image/common/phone.png" alt="">
          <p>15153737506</p>
        </div>
        <div class="line"></div>
        <div class="info" style="height: 40px">
          <img src="./assets/image/common/email.png" alt="">
          <p>1144523711@qq.com</p>
        </div>
        <div class="line"></div>
        <div class="info" style="height: 40px">
          <img src="./assets/image/common/location.png" alt="">
          <p>商丘师范学院信息技术学院</p>
        </div>
      </div>
      <div class="relate">
        <div class="subscribe" style="margin-right: 80px">
          <p>扫码联系作者</p>
          <div class="QTs">
            <div class="QT">
              <img src="./assets/image/common/weibo.png" alt="微博二维码">
              <p>微博二维码</p>
            </div>
            <div class="QT">
              <img src="./assets/image/common/weixin.png" alt="微信二维码">
              <p>微信二维码</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      en_flag:true,  //控制导航栏英文显示全称/缩写
    }
  },
  mounted() {
    /*窗口大小变化时调用匿名函数改变导航栏布局*/
    $(window).resize(()=>{
      this.switch()
    })

    /*页脚动画效果制作*/
    //this.handleFooter() //在mounted中直接调用一遍，防止满足动画触发条件的情况下因为滚动条没有滑动而不能触发
    //window.addEventListener('scroll',this.handleScroll)
  },
  methods:{
    /*控制导航栏英文显示全称/缩写*/
    switch(){
      let c_width = window.innerWidth   //浏览器窗口宽度
      if(c_width<1500) this.en_flag = false  //根据窗口宽度切换英文显示
      else this.en_flag = true
    },

    /*控制页脚动画的触发时机*/
    handleFooter(){
      let fTop = $(".footer").offset().top
      let wTop = $(window).scrollTop()
      let slice = fTop - $(window).innerHeight() + 50  //出现页脚的前50px内容时，触发动画效果
      if(wTop>slice){
        $(".footer .connect").addClass("animated fadeInDown")
        $(".footer .relate").addClass("animated fadeInDown")
        $(".footer .copy").addClass("animated fadeInDown")
      }
    },

    /*控制导航栏各选项在窗口顶部固定*/
    handleNavbar(){
      let navbar = $('.navbar')    //导航栏
      let top = navbar.offset().top - $(window).scrollTop()  //导航栏到窗口顶部的距离
      if(top<=-120){    //120为导航栏logo层的高度
        $('.fixed').css({
          "position": 'fixed',
          "top": 0,
        })
      }else{
        $('.fixed').css({
          "position": 'inherit',
        })
      }
    },

    handleScroll(){
      this.handleFooter()
      this.handleNavbar()
    }
  }
}
</script>

<style>
  /*整个网站的默认字体*/
  #app{
    font-family: "微软雅黑" , "Arial" ,sans-serif;
    font-weight: lighter;
    color: black;
    font-size: 16px;
    cursor: default;
  }
  a{color: black;text-decoration: none;}

  /*清除所有元素的内外边距*/
  *{margin: 0;padding: 0;}

  /*设置导航菜单的选中样式*/
  .router-link-active li{background-color: #002248;border-color: #1295db!important;}

  /*导航栏样式*/
  .navbar{width: 100%;height: 180px;background-color: #002e72;position: relative;z-index: 999;}
  .navbar .logo{width: 40%;height: 80px;margin: 0 5%;padding-top: 20px;display: flex;justify-content: space-between;}
  .navbar .logo .img{width: 30%;}
  .navbar .logo .img img{width: 100%;}
  .navbar .logo .name{width: 65%;}
  .navbar .logo .name .ch{color: white;font-weight: bolder;transition: all ease 0.5s;}
  .navbar .logo .name .en{color: white;font-weight: lighter;margin-top: 6px;white-space:nowrap;transition: all ease 0.5s;}
  .navbar .fixed{width: 100%;background-color: #002e72;}
  .navbar .menu{margin: 0 auto;display: flex;justify-content: space-between;list-style: none;}
  .navbar .menu>a{text-decoration: none;position: relative;}
  .navbar .menu>a>li{color: white;height: 74px;border-bottom: 6px #002e72 solid;display: -webkit-box; -webkit-box-align:center;padding: 0 15px;transition: all ease 0.5s;}
  .navbar .menu>a:hover>li{background-color: #002248;border-color: #1295db!important;}
  .navbar .menu>a>li .en{width: 130px;display: inline-block;font-size: 12px;line-height: 12px;vertical-align: bottom;}

  .navbar .menu>a ul{list-style: none;display: none;position: absolute;background-color: #003e74;width: 100%;box-shadow: 0 0 10px rgba(0, 0, 0, 0.53);}
  .navbar .menu>a ul a>li{background-color: #003e74;color: white;font-size: 16px;border-bottom: 1px solid white!important;padding: 6%;}
  .navbar .menu>a ul a:last-child>li{border-bottom: none!important;}
  .navbar .menu>a:hover ul{display: flex; flex-direction: column;}

  /*页脚左边联系方式*/
  .footer{background-color: #002248;display: flex;justify-content: space-between;flex-wrap: wrap;background-image: url("./assets/image/common/footer_back.jpg");position: relative;}
  .footer .connect,.relate{width: 45%;}
  .footer .connect .info p,img{display: inline-block;vertical-align: middle;}
  .footer .connect p{margin-left: 10px;color: #fffffd;}
  .footer .connect .line{width: 20%;height: 1px;background-color: #bfbfbf;}

  /*页脚右边合作伙伴和关注我们*/
  .footer .relate{width: 45%;color: #fffeff;}
  .footer .relate .partner{display: flex;justify-content: space-between;}
  .footer .relate .partner p{font-size: 24px;font-weight: bolder;display: inline-block;}
  .footer .relate .partner>a{width: 40%;display: inline-block;}
  .footer .relate .partner img{width: 100%;}
  .footer .relate .partner .imgs{width: 40%;display: flex;justify-content: space-between;flex-direction: column;}
  .footer .relate .partner .imgs img{width: 100%;}
  .footer .relate .subscribe{margin-top: 40px;}
  .footer .relate .subscribe>p{text-align: right;font-weight: bolder;margin-bottom: 20px;}
  .footer .relate .subscribe .QTs{display: flex;justify-content: flex-end;}
  .footer .relate .subscribe .QTs .QT{width: 16%;margin-left: 40px;}
  .footer .relate .subscribe .QTs .QT img{background-color: darksalmon;width: 100%;}
  .footer .relate .subscribe .QTs .QT>p{text-align: center;margin-top: 5px;}

  /*页脚下方版权*/
  .footer .copy{width: 100%;text-align: center;color: #fffffd;}
  .footer .copy p{margin-bottom: 10px;}
  .footer .copy hr{border:1px #bfbfbf solid;border-bottom: none;}

  /*动画效果*/
  .footer .fadeInDown{animation-duration: 1.5s;}  /*页头页脚*/
  #app>.fadeIn{animation-duration: 0.5s;}  /*切换内容*/

  /*响应式布局*/
  @media(max-width: 1199px) {
    /*导航栏*/
    .navbar{min-width: 1040px;}
    .navbar .menu{width: 80%;min-width: 865px;}
    .navbar .menu li{font-size: 14px;}
    .navbar .logo .name .ch{font-size: 26px;}
    .navbar .logo .name .en{font-size: 18px;}


    /*页脚联系方式的文字样式*/
    .footer{min-width: 980px;padding: 0px 30px 0px 30px;}
    .footer .connect p{max-width: 370px;line-height: 20px;font-size: 14px;}
    .footer .connect .line{margin: 10px 0 10px 65px;}
    .footer .relate .partner p{font-size: 18px;}
    .footer .relate .subscribe>p{font-size: 18px;}
    .footer .relate .subscribe .QTs .QT>p{font-size: 14px;}
    .footer .copy hr{margin: 30px auto 20px auto;}
  }

  @media(min-width: 1200px) {
    /*导航栏*/
    .navbar .menu{width: 75%;}
    .navbar .menu li{font-size: 14px;}
    .navbar .logo .name .ch{font-size: 26px;}
    .navbar .logo .name .en{font-size: 18px;}


    /*页脚联系方式的文字样式*/
    .footer{padding: 50px 100px 20px 100px;}
    .footer .connect p{max-width: 370px;line-height: 20px;font-size: 14px;}
    .footer .connect .line{margin: 10px 0 10px 65px;}
    .footer .relate .partner p{font-size: 18px;}
    .footer .relate .subscribe>p{font-size: 18px;}
    .footer .relate .subscribe .QTs .QT>p{font-size: 14px;}
    .footer .copy hr{margin: 30px auto 20px auto;}
  }

  @media(min-width: 1500px) {
    /*导航栏*/
    .navbar .menu{width: 85%;}
    .navbar .menu li{font-size: 18px;}
    .navbar .logo .name .ch{font-size: 32px;}
    .navbar .logo .name .en{font-size: 22px;}

    /*页脚联系方式的文字样式*/
    .footer{padding: 80px 100px 20px 100px;}
    .footer .connect p{max-width: 500px;line-height: 22px;font-size: 16px;}
    .footer .connect .line{margin: 15px 0 15px 65px;}
    .footer .relate .partner p{font-size: 24px;}
    .footer .relate .subscribe>p{font-size: 22px;}
    .footer .relate .subscribe .QTs .QT>p{font-size: 16px;}
    .footer .copy hr{margin: 50px auto 30px auto;}
  }

  @media(min-width: 1700px) {
    /*导航栏*/
    .navbar .menu{width: 75%;}
    .navbar .menu li{font-size: 18px;}
    .navbar .logo .name .ch{font-size: 32px;}
    .navbar .logo .name .en{font-size: 22px;}

    /*页脚联系方式的文字样式*/
    .footer{padding: 100px 100px 20px 100px;}
    .footer .connect p{max-width: 550px;line-height: 28px;}
    .footer .connect .line{margin: 20px 0 20px 65px;}
    .footer .relate .partner p{font-size: 24px;}
    .footer .relate .subscribe>p{font-size: 22px;}
    .footer .relate .subscribe .QTs .QT>p{font-size: 16px;}
    .footer .copy hr{margin: 50px auto 30px auto;}
  }



</style>
