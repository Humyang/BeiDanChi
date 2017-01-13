import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import wordList from './components/wordList.vue'
import vueTap from 'v-tap'
import wordAll from './components/wordAll.vue'
import login from './components/login.vue'
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
// install router
Vue.use(Router)
Vue.use(vueTap)
// routing
var router = new Router()

router.map({
  '/word/all':{
        component: wordAll
    },
  '/word/list':{
        component: wordList
    },
  '/login':{
        component: login
    }
  // '/word/add': {
  //   component: addWord
  // },
  // '/user/:id': {
  //   component: UserView
  // },
  // '/item/:id': {
  //   component: ItemView
  // }
})
router.redirect({
  '*': '/word/list'
})
router.beforeEach(function () {
  window.scrollTo(0, 0)
})



router.start(App, '#app')