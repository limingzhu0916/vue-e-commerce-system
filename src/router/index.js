import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("views/Login.vue")
const Home = () => import("views/home/Home.vue")
const Welcome = () => import("views/home/childComps/Welcome.vue")
const User = () => import("views/users/User.vue")
const Right = () => import("views/power/Right.vue")
const Roles = () => import("views/power/Roles.vue")
const Cate = () => import("views/goods/Cate.vue")
const GoodsParams = () => import("views/goods/GoodsParams.vue")
const GoodsList = () => import("views/goods/GoodsList.vue")
const Add = () => import("views/goods/childComps/Add.vue")
const Order = () => import("views/order/Order.vue")
const Report = () => import("views/report/Report.vue")

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
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: User
      },
      {
        path: '/rights',
        component: Right
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Cate
      },
      {
        path: '/params',
        component: GoodsParams
      },
      {
        path: '/goods',
        component: GoodsList,
      },
      {
        path: '/goods/add',
        component: Add
      },
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/reports',
        component: Report
      }
    ]
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
