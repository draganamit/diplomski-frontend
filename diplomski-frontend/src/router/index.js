import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import CategoryView from '@/views/CategoryView.vue'
import UserView from '@/views/UserView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import ProductDescriptionView from '@/views/ProductDescriptionView.vue'
import OrderView from '@/views/OrderView.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ReportView from '@/views/ReportView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView
  },
  {
    path:'/category',
    name: 'category',
    component: CategoryView
  },
  {
    path: '/users',
    name: 'users',
    component: UserView
  },
  {
    path: '/userprofile',
    name: 'userprofile',
    component: UserProfileView
  },
  {
    path: '/productdescription',
    name: 'productdescription',
    component: ProductDescriptionView
  },
  {
    path: '/orderproduct',
    name: 'orderproduct',
    component: OrderView
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: ForgotPassword
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
