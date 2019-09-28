import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FormConstructor from './components/FormConstructor.vue'
import FieldConstructor from './components/FieldConstructor.vue';


Vue.use(Router)

export default new Router({
  routes: [
      {
	  path: '/constructor',
	  name: 'constructor',
	  component: FormConstructor
      },
      {
	  path: '/new-field',
	  name: 'new-field',
	  component: FieldConstructor
      },
      {
	  path: '/',
	  name: 'home',
	  component: Home
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
