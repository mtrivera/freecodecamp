import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource';
import Hello from '../components/Hello'
import listCampers from '../components/listCampers'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/top-100-all-time',
      name: 'All Time',
      component: listCampers
    }
  ]
})