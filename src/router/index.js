import Vue from 'vue'
import Router from 'vue-router'
import home from "../components/Home";
import About from "../components/About/About";
import News from "../components/News/News";
import Direction from "../components/Development/Direction";
import Education from "../components/Education/Education";
import Join from "../components/Join/Join";
import Member from "../components/About/Member";
import Partner from "../components/About/Partner";
import Part from "../components/Join/Part";
import Full from "../components/Join/Full";
import EducationInfo from "../components/Education/EducationInfo";
import NewsInfo from "../components/News/NewsInfo";
import Result from "../components/Search/Result";
import Product from "../components/Development/Product";
import Development from "../components/Development/Development";
import Team from "../components/Development/Team";
import ProductInfo from "../components/Development/ProductInfo";


import InternationalNews from "../components/InternationalNews/News";
import InternationalNewsInfo from "../components/InternationalNews/NewsInfo";
import nationalNews from "../components/nationalNews/News";
import nationalNewsInfo from "../components/nationalNews/NewsInfo";
import militaryNews from "../components/militaryNews/News";
import militaryNewsInfo from "../components/militaryNews/NewsInfo";
import scienceNews from "../components/scienceNews/News";
import scienceNewsInfo from "../components/scienceNews/NewsInfo";
import financialNews from "../components/financialNews/News";
import financialNewsInfo from "../components/financialNews/NewsInfo";
import educationNews from "../components/educationNews/News";
import educationNewsInfo from "../components/educationNews/NewsInfo";
import sportsNews from "../components/sportsNews/News";
import sportsNewsInfo from "../components/sportsNews/NewsInfo";
import automotiveNews from "../components/automotiveNews/News";
import automotiveNewsInfo from "../components/automotiveNews/NewsInfo";
import userLogin from "../components/userLogin/index";
import userRegistered from "../components/userLogin/userRegistered";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },


    //国际新闻
    {
      path: '/InternationalNews',
      name: 'InternationalNews',
      component: InternationalNews
    },
    {
      path: '/InternationalNews/newsInfo/:id',
      name: 'InternationalNewsInfo',
      component: InternationalNewsInfo
    },
    //国内新闻
    {
      path: '/nationalNews',
      name: 'nationalNews',
      component: nationalNews
    },
    {
      path: '/nationalNews/newsInfo/:id',
      name: 'nationalNewsInfo',
      component: nationalNewsInfo
    },
    //军事新闻
    {
      path: '/militaryNews',
      name: 'militaryNews',
      component: militaryNews
    },
    {
      path: '/militaryNews/newsInfo/:id',
      name: 'militaryNewsInfo',
      component: militaryNewsInfo
    },
    //科技新闻
    {
      path: '/scienceNews',
      name: 'scienceNews',
      component: scienceNews
    },
    {
      path: '/scienceNews/newsInfo/:id',
      name: 'scienceNewsInfo',
      component: scienceNewsInfo
    },
    //财经新闻
    {
      path: '/financialNews',
      name: 'financialNews',
      component: financialNews
    },
    {
      path: '/financialNews/newsInfo/:id',
      name: 'financialNewsInfo',
      component: financialNewsInfo
    },
    //教育新闻
    {
      path: '/educationNews',
      name: 'educationNews',
      component: educationNews
    },
    {
      path: '/educationNews/newsInfo/:id',
      name: 'educationNewsInfo',
      component: educationNewsInfo
    },
    //体育新闻
    {
      path: '/sportsNews',
      name: 'sportsNews',
      component: sportsNews
    },
    {
      path: '/sportsNews/newsInfo/:id',
      name: 'sportsNewsInfo',
      component: sportsNewsInfo
    },
    //汽车新闻
    {
      path: '/automotiveNews',
      name: 'automotiveNews',
      component: automotiveNews
    },
    {
      path: '/automotiveNews/newsInfo/:id',
      name: 'automotiveNewsInfo',
      component: automotiveNewsInfo
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: userLogin
    },
    {
      path: '/userRegistered',
      name: 'userRegistered',
      component: userRegistered
    },













    {
      path: '/about',
      name: 'About',
      component: About,
      redirect: '/about/member',
      children:[
        {
          path: 'member',
          component: Member
        },
        {
          path: 'partner',
          component: Partner
        }
      ]
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/news/newsInfo/:id',
      name: 'NewsInfo',
      component: NewsInfo
    },
    {
      path: '/development',
      name: 'Development',
      component: Development
    },
    {
      path: '/development/direction',
      name: 'Direction',
      component: Direction
    },
    {
      path: '/development/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/development/productInfo/:id',
      name: "ProductInfo",
      component: ProductInfo
    },
    {
      path: '/development/team',
      name: 'Team',
      component: Team
    },
    {
      path: '/education',
      name: 'Education',
      component: Education
    },
    {
      path: '/education/educationInfo/:id',
      name: 'EducationInfo',
      component: EducationInfo
    },
    {
      path: '/join',
      name: 'Join',
      redirect: '/join/full',
      component: Join,
      children: [
        {
          path: '/join/part',
          component: Part
        },
        {
          path: '/join/full',
          component: Full
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Result
    }
  ]
})
