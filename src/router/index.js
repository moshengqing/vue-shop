import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(Router)

const route =  new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login,
      
    },
    {
      path:'/home',
      component:Home,
      
    },
  ]
})
route.beforeEach((to,from,next)=>{
  //用户直接访问登录页，直接放行
   if(to.path === '/login') return next();
   //判断是否登录
   const tokenStr = window.sessionStorage.getItem('token');
   if(!tokenStr) return next('/login');
   next()
   console.log(next)
})
export default route;
