import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入mock
import '@/API/mock.js'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  //使用store
  store.commit('getToken')
  let token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' });
  } else if (token && to.name === 'login') {
    //如果登录了还去登录页会强行进入首页
    next({ name: 'home' });


  } else {
    //sessionStorage有值说明登录了
    next()
  }


})

new Vue({
  router,
  store,
  render: h => h(App),
  //防止登录后刷新界面路由消失(因为路由是点击登录后动态加载)
  created() {
    store.commit('addMenu', router)
  }

}).$mount('#app')
