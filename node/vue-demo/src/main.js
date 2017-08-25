import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import routes from './routers/';
//import ElementUI from 'element-ui';

//import 'element-ui/lib/theme-default/index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';

import store from './store';

Vue.use(Vuetify);
//Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    console.log('---------> ' + to.name);  
    next();
});

const vm = new Vue({
    router,
    el: '#app',
    store,
    template: '<App />',
    components: { App }
});
