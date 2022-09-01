import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',

    component: () => import('@/views/Main.vue'),
    children: [
      // // // {path:'',name:'home',component:()=>import('@/')},
      // { path: 'home', name: 'home', component: () => import('@/views/Home/index.vue') },
      // { path: 'user', name: 'user', component: () => import('@/views/User/User.vue') },
      // { path: 'mall', name: 'mall', component: () => import('@/views/Mall/Mall.vue') },
      // { path: 'page1', name: 'page1', component: () => import('@/views/Other/pageOne.vue') },
      // { path: 'page2', name: 'page2', component: () => import('@/views/Other/pageTwo.vue') },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: "*",
    name: 'not-found',
    component: () => import('@/views/NotFound/NotFound.vue')
  },
]


const router = new VueRouter({
  routes
})

//防止重复点击一个路由后台报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}






export default router
