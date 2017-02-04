<template>
  <div class="wrapper wordlist">
      <navbar 
        title="首页" 
        :left="navbar_btn_left" 
        :right="navbar_btn_right"
      ></navbar>
      <content class="container">
        <loadmore :top-method="loadTop" >
          <section id="word_card" class="word_card">
            <card 
            v-for="item in liste_filter" 
            :word="item.word"
            :index="$index"
            :id="item._id"
            :wordclick="wordclick()"
            :sentence="item.sentence"
            :size="1"
            :events="hideWord()"
            ></card>
          </section>
        </loadmore>
      </content>
      <add-word :show.sync="ui.addword" :callback="addWord()"></add-word>
      <add-word :show.sync="ui.editword"
                :callback="editWord()"
                :_id="edit.id"
                :index="edit.index"
                :word="edit.word"
                :describe="edit.describe"
                :sentence="edit.sentence"
                :history="edit.history"
                mode="edit"></add-word>
  </div>
</template>


<script>
import '../css/wordlist.css'
import navbar from './common/navbar'
import card from './common/card'
import loadmore from 'mint-loadmore'
import drop_down from '../vendor/drop_down.js'
import addWord from './wordAdd.vue'
import * as API from '../api/main.js'
var CODE = require('../../serve/constant.js').CODE
import {pageHandle} from '../api/method.js'
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
        addword:false,
        editword:false
      }
      ,
      events:[
      
      ],
      edit:{
        id:"",
        index:0,
        word:"",
        describe:"",
        sentence:"",
        history:""
      }
    }
  },
  components:{
    navbar,
    card,
    loadmore,
    addWord
  },
  computed:{
    // 过滤单词
    liste_filter:function(){
      return this.lists
    }
  },
  methods:{
    wordclick:function(){
      console.log(2222)
      let self = this
      return function(id,index){
        let item = self.lists[index]

        self.edit = Object.assign({},{
          id:id,
          word:item.word,
          sentence:item.sentence,
          describe:item.describe,
          history:﻿JSON.stringify(item.history),
          index:index
        })
        self.ui.editword = true
      }
    },
    editWord:function(){
      var self = this
      return function(err,res){
        // id,index,word,describe,
        self.lists[res.index].word=res.word
        self.lists[res.index].describe=res.describe
        self.lists[res.index].sentence=res.sentence
        self.ui.editword = false
      }
    },
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
    })
  }
}
</script>
