<template>
  <div class="wrapper">
      <navbar 
        title="首页" 
        :left="navbar_btn_left" 
        :right="navbar_btn_right"
      ></navbar>
      <content class="container">
        <loadmore :top-method="loadTop" >
          <!-- <section v-show="show_search" class="search_wrap">
            <p>
              <img src="./images/搜索图标.png" alt="">
              <input type="text" placeholder="过滤单词" v-model="search_text">
            </p>
          </section> -->
          <!-- <loadmore> -->
          <!-- 单词列表 -->
          <section id="word_card" class="word_card">
            <card 
            v-for="item in liste_filter" 
            :word="item.word"
            :index="$index"
            :id="item._id"
            :describe="item.describe" 
            :size="1"
            :events="hideWord()"
            ></card>
          </section>
        </loadmore>
      </content>
      <add-word :show.sync="ui.addword" :callback="addWord()"></add-word>
  </div>
</template>

<script>
import navbar from './common/navbar'
import card from './common/card'
import loadmore from 'mint-loadmore'
import drop_down from '../vendor/drop_down.js'
import addWord from './wordAdd.vue'
import * as API from '../api/main.js'
var CODE = require('../../serve/constant.js').CODE
import {pageHandle} from '../api/method.js'
// import hambraug from './hambraug'
export default {
  data () {
    return {
      search_text:'',
      show_search:false,
      lists:[
            // { 
            //   _id: '580dd51409f6d91cd4c4a372',
            //   word: 'test word',
            //   describe: 'some word on here'
            // }
      ],
      ui:{
        addword:false
      }
      ,
      events:[
      
      ]
    }
  },
  components:{
    navbar,
    card,
    loadmore,
    addWord
    // hambraug
  },
  computed:{
    // 过滤单词
    liste_filter:function(){
      // if(!this.lists){
      //   return []
      // }
      // var new_list = []
      // for (var i = this.lists.length - 1; i >= 0; i--) {
      //   if(this.lists[i].describe.indexOf(this.search_text)!=-1){
      //     new_list.push(this.lists[i])
      //   }
      // }
      return this.lists
    }
  },
  methods:{
    hideWord:function(){
      let self = this
      return [
      function(id,index){
        
        API.hideWord(id,0)
        .then(function(res){
            self.lists.splice(index,1)
        })
        .catch(function(err){
            self.$root.popup_text = err.MSG
            self.$root.show_popup = true
        })
      },
      function(id,index){

        

        API.hideWord(id,1)
        .then(function(res){
            self.lists.splice(index,1)
        })
        .catch(function(err){
            self.$root.popup_text = err.MSG
            self.$root.show_popup = true
        })

      },
      function(id,index){
        
        API.hideWord(id,2)
        .then(function(res){
            self.lists.splice(index,1)
        })
        .catch(function(err){
            self.$root.popup_text = err.MSG
            self.$root.show_popup = true
        })
      }]
    },
    addWord:function(){
      var self = this
      return function(err,res){
        self.lists.unshift(res)
        self.ui.addword = false
      }
    },
    topmethod:function(event){
      console.log(111)
    },
    loadTop:function(id){
      let self = this
      setTimeout(function() {
        self.$broadcast('onTopLoaded', id);
      }, 2000);
    },
    navbar_btn_left:function(){
      this.$root.show_hambraug = true
    },
    navbar_btn_right:function(){
      this.ui.addword = true
      // this.$router.go('/word/add')
    }
  },
  events:{
  },
  ready:function(){
    var self = this
    
    // 获取单词列表
    API.listGet(0,20)
    .then(function(res){
      self.lists = res.list
      console.log("返回数据",res)
    })
    .catch(function(err){
      self.$root.pageHandle(err)
      // self.$root.popup_text = err.MSG
      // self.$root.show_popup = true
    })
  }
}
</script>

<style>
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container { background-color: #36474F; overflow: auto; display: block; height: 100%; padding-bottom: 50px;    margin-top: 0.21rem; }
/* 下拉刷新 */
section.refresh { color: #ffffff; text-align: center; margin-top: 45px; padding-top: 5px; }
section.refresh p { margin: 10px; }
section.search_wrap {    margin-top: 0.1rem;}
section.search_wrap p { background-color: white; margin: 0 auto; width: 6.2rem; height: 20px; border-radius: 2px;padding-left: 0.4rem; }
section.search_wrap img { padding: 2px; float: left; }
section.search_wrap input[type="text"] { font-size: 14px; line-height: 20px; padding: 0; margin: 0; color: #000000; width: 5.2rem; border: 0;
    margin-left: 0.4rem;}
section.word_card { overflow: hidden;
    min-height: 9rem;
    left: 0px;
    float: left;
    width: 100%;
    margin-bottom: 0.5rem;
    margin-top: 0.2rem;
}
</style>
