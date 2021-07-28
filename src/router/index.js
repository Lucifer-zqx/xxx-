import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '../views/Msite/Msite.vue'
import Search from '../views/Search/Search.vue'
import Order from '../views/Order/Order.vue'
import Profile from '../views/Profile/Profile.vue'
import Login from '../views/Login/Login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/msite',
      component:Msite,
      meta:{isShow:true}
    },
    {
      path:'/search',
      component:Search,
      meta:{isShow:true}
    },
    {
      path:'/order',
      component:Order,
      meta:{isShow:true}
    },
    {
      path:'/profile',
      component:Profile,
      meta:{isShow:true}
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:"/",
      redirect:'/msite'
    }
  ]
})
