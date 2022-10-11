import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'

Vue.use(VueRouter)

const requireAuth = (to, from, next) =>{
  const isAuth = localStorage.getItem('token')
  const signinPath = `/sign-in?rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : next(signinPath)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ship-list',
    name: 'ShipList',
    component: () => import('../views/ShipList.vue')
  },
  {
    path: '/ship-data/:shipid',
    name: 'ShipData',
    component: () => import('../views/ShipData.vue'),
    children: [{
      path: 'data-view/:viewid',
      name: 'DataView',
      component: () => import('../components/DataView.vue'),
    }]
  },
  {
    path: '/sign-in',
    component: SignIn
  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
