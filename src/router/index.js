import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("views/Login.vue")
const Home = () => import("views/Home.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 访问登录页面，直接放行
  if(to.path === '/login') return next()
  // 如果访问其他页面，验证是否带token
  const tokenStr = window.sessionStorage.getItem('token')
  // token值为空，跳转到登录页面
  if(!tokenStr) return next('/login')
  next()
})
export default router
