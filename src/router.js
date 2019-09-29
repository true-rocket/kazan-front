import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FormConstructor from './components/FormConstructor.vue'
import FieldConstructor from './components/FieldConstructor.vue';
import ScenarioConstructor from './components/ScenarioConstructor.vue';
import Authentication from "./components/Authentication/Authentication";
import Registration from "./components/Registration";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
	{
	    path: '/scenario',
	    name: 'scenario',
	    component: ScenarioConstructor
	},
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
	    path: '/login',
	    name: 'Authentication',
	    component: Authentication,
	},
	{
	    path: '/registration',
	    name: 'registration',
	    component: Registration
	}
    ]
})
