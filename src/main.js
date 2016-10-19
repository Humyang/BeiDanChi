import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import word_list from './components/Index.vue'
import add_word from './components/add_word.vue'
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
  '/word_list':{
        component: word_list
    },
  '/add_word': {
    component: add_word
  },
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
  '*': '/word_list'
})

router.start(App, '#app')