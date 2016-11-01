import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import wordList from './components/wordList.vue'

import wordAll from './components/wordAll.vue'
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/word/all':{
        component: wordAll
    },
  '/word/list':{
        component: wordList
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
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/word/list'
})

router.start(App, '#app')