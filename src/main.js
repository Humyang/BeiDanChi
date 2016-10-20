import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import word_list from './components/workList.vue'
import add_word from './components/wordAdd.vue'
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
  '/word_add': {
    component: wordAdd
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