import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'


/*
const requireAuth = () => (from, to, next) => {
  // console.log({from, to, next})
  if (store.getters.isAuthenticated){
    console.log('로그인 됨')
    return next()
  }
  next(`/login?returnPath=${from.name}`)
}
*/

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter : (from, to, next) => {
      // console.log({from, to, next})
      if (store.getters.isAuthenticated){
        console.log('로그인 됨')
        return next()
      }
      next(`/login`)
    }
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
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter : (from, to, next) => {
      if(!(store.getters.isAuthenticated)){
        console.log('로그인 안됨')
        return next()
      }
      console.log('로그인 됨')
      next(`/`)
    }
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('../views/Join.vue')
  },
  {
    path: '/challenge/:id',
    component: () => import('../views/Challenge.vue')
  },
  {
    path: '/edit-profile',
    name: 'Edit Profile',
    component: () => import('../views/EditProfile.vue'),
    beforeEnter : (from, to, next) => {
      // console.log({from, to, next})
      if (store.getters.isAuthenticated){
        console.log('로그인 됨')
        return next()
      }
      next(`/login`)
    }
  },
  {
    path: '/create-challenge',
    name: 'CreateChallenge',
    component: () => import('../views/CreateChallenge.vue')
    // beforeEnter : Auth 단계 설정
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
