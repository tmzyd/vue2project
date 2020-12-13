import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'
import PublishArticle from '../components/PublishArticle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/publisharticle',
    component:PublishArticle
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  console.log('进入路由导航守卫')
  if(to.path == '/login') return next()
  console.log('页面控制')
  next()
  //next('/login')
})

export default router
