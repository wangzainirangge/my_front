// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'animate.css'  //引入Animate制作动效
import 'font-awesome/css/font-awesome.min.css'  //引入font-awesome图标库
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import api from './api/index'
import { get, post, patch, put, drop} from './api/auto/request'

Vue.prototype.$api = api // 封装了直接用
// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$drop = drop
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://47.104.234.120:8080/dg_project/" //全局配置根路径
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'  //全局配置请求方式
Vue.prototype.imgRoot = 'http://47.104.234.120:8080/assets/iiat/'
Vue.prototype.imgCutRoot = 'http://47.104.234.120:8080/assets/cutIiat/'

/*定义格式化日期的全局过滤器
* value:日期
* fmt:日期格式
* 调用格式:{{date || dateFormat('format')}}*/
Vue.filter('dateFormat', function (value, fmt) {
  let getDate = new Date(value);
  let o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt;
})


/*定义限制字数的全局过滤器
* text：文本
* length：限制字数
* suffix：截取文字后添加的后缀*/
Vue.filter('textLength', function (text,length, suffix) {
  return text.substring(0,length) + suffix
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

