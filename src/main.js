import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueCookie from 'vue-cookie'
import Vuetify from "vuetify";
import('../node_modules/vuetify/dist/vuetify.min.css')
Vue.use(VueCookie);
Vue.use(Vuetify);
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
