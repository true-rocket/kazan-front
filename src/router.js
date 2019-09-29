import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FormConstructor from './components/FormConstructor.vue'
import Authentication from "./components/Authentication/Authentication";
import Registration from "./components/Registration";

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
      {
	  path: '/constructor',
	  name: 'constructor',
	  component: FormConstructor
      },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication,
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
