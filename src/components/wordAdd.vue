<template>
  <div v-if="show"  class=" wrapper wordadd">
      <navbar 
      :title="calc_title()"
      :left="navbar_btn_left" 
      left_type="close"
      :right="calc_right()"
      right_type="save"
      >
      </navbar>
      <content class="container">
        <!-- 搜索框 -->
        <section class="search_wrap">
          <p>
            <input v-model="word" type="text" placeholder="新增或搜索单词" >
          </p>
        </section>
        <section class="detail_tabs">
          <ul>
            <li v-tap="tap_tabs(0)" :class="{'active':tabs_index===0}">例</li>
            <li v-tap="tap_tabs(1)" :class="{'active':tabs_index===1}">释</li>
            <li v-tap="tap_tabs(2)" :class="{'active':tabs_index===2}">史</li>
          </ul>
        </section>
        <section class="detail_wrap">
          <div v-show="tabs_index===0" >
            <textarea v-show="sentence_show" id="sentence"  v-model="sentence" name="" id="" cols="30" rows="10"></textarea>
            <div v-show="!sentence_show && mode==='edit'" class="d2">
              <p id="sentence_moveword_p">{{{moveword}}}</p>
              
              <a class="btn_prime blue" v-tap="sentence_show=true">返回</a>
            </div>
            <a v-if="mode==='edit'" class="btn_prime green" v-tap="sentence_clear">记住了</a>
            <div v-if="mode==='edit'" class="d1">
              <a class="btn_prime blue" v-tap="sentence_moveword">填空</a>
              <a class="btn_prime blue" @click="sentence_moveword_left">&lt;</a>
              <a class="btn_prime blue" v-tap="sentence_moveword_right">&gt;</a>
            </div>
          </div>
          <div v-show="tabs_index===1" >
            <textarea v-model="describe" name="" id="" cols="30" rows="10"></textarea >
          </div>
          <div v-if="tabs_index===2" class="history">
            <!-- {{{render_history}}} -->
            <template v-if="objHistory!=undefined" >
              <p v-tap="setTextarea" class="p1 green">{{movewordreal}}</p>
              <template v-for="item in objHistory | reverse" >
                <p class='p1'>{{(new Date(item.date)).toLocaleDateString()}}</p>
                <p v-tap="setMoveWordReal(subitem)"  v-for="subitem in item.item | reverse" track-by="$index" class='p2'>{{subitem}}</p>
              </template>
            </template>
            <p v-else class='p1'>EMPTY</p>
          </div>
        </section>
      </content>
  </div>
</template>

<script>
import '../css/wordadd.css'
import navbar from './common/navbar'
import card from './common/card'
import loadmore from 'mint-loadmore'
import * as API from '../api/main.js'

var method = require('../../serve/method.js')

export default {
  props:{
    show:false,
    callback:Function,
    word:undefined,
    describe:"",
    _id:"",
    mode:{default:"add"},
    index:0,
    nvabarBtnRight:Function,
    sentence:undefined,
    history:"",
    movewordreal:""
  },
  components:{
    navbar
  },
  computed:{
    objHistory:function(){
      let history = {}
      try{
        history = JSON.parse(this.history)
      }catch(err){
        return undefined
      }
      console.log(history)
      return history
    },
    render_history:function(){
      let history = {}
      try{
        history = JSON.parse(this.history)
      }catch(err){
        return "<p class='p1'>EMPTY</p>"
      }
      // let history = JSON.parse(this.history)
      if(typeof history != 'object'){
        return "<p class='p1'>EMPTY</p>"
      }
      let data = history
      let result = ""
      for (let i = data.length - 1; i >= 0; i--) {
          let today = new Date(data[i].date)

          result += `<p class='p1'>${today.toLocaleDateString()}</p>`
          for (var c = data[i].item.length - 1; c >= 0; c--) {
              result += `<p class='p2'>${data[i].item[c]}</p>`
          }
      }
      return result
    }
  },
  methods:{
    setTextarea:function(){
      this.sentence = this.movewordreal
    },
    setMoveWordReal:function(sentence){
      // self.sentence = ""
      let self = this
      API
      .set_move_word_real(this._id,sentence)
      .then(function(){
        self.movewordreal = sentence
      })
      .catch(function(err){
        console.log(err)
        self.$root.popup_text = err
        self.$root.show_popup = true
      })
    },
    sentence_moveword_left:function(){
      document.getElementById("sentence").focus();
      // setTimeout(function() {
        // var textarea = document.getElementById("sentence")
        // textarea.focus()
        // textarea.setAttribute('selectionStart', 5)
        // console.log(123)
      // }, 2000);
      
      // textarea.selectionStart = 5
      
    },
    sentence_moveword_right:function(){

    },
    sentence_moveword:function(){
      let history = {}
      try{
        history = JSON.parse(this.history)
      }catch(err){
        return "<p class='p1'>EMPTY</p>"
      }
      // 取正确句子
      
      let sentence = ""
      if(this.movewordreal != "" && this.movewordreal != undefined)
      {
        sentence = this.movewordreal
      }else{
        let history_last = ""
        history_last = history[history.length-1]
        sentence = history_last.item[history_last.item.length-1]
      }

      
      
      // split word
      let sentences = sentence.split(' ')
      var random = Math.round((sentences.length * 0.6))
      var randomArray = []
      
      for (let i = random - 1; i >= 0; i--) {

          let number = 0
          do {
            number = Math.round(Math.random()*(sentences.length-1))
          }while(randomArray.indexOf(number) != -1)

          randomArray.push(number)

          console.log(randomArray)
          let repalce_str = "" 
          for (let i = sentences[number].length - 1; i >= 0; i--) {
            repalce_str += "_"
          }
          sentences[number] = {length:sentences[number].length,type:"REPLACE_STR"}
      }

      let result = ""
      for (var i = 0; i < sentences.length; i++) {
        if(typeof sentences[i] === 'object'){
          result = result + ` <input class="moveword${sentences[i].length}" type="text" name="" value=""> `
        }else{
          result = result + ` <span>${sentences[i]}</span> ` 
        } 
      }
      this.sentence_show = false
      this.moveword = result
    },
    sentence_clear:function(){
      let self = this
      let sentence = ""
      if(this.sentence_show){
        sentence = self.sentence
      }else{
        var element = document.getElementById('sentence_moveword_p')
        for (var i = 0; i < element.children.length; i++) {
            let sub_el = element.children[i]
            if(sub_el.tagName === 'SPAN'){
              sentence = sentence + sub_el.textContent + " "
            }
            if(sub_el.tagName === 'INPUT'){
              let sub_el_value = ""
              if(sub_el.value===""){
                sub_el_value = "___"
              }else{
                sub_el_value = sub_el.value
              }
              sentence = sentence + sub_el_value + " "
            }
        }
      }
      // console.log(sentence)
      self.history = JSON.stringify(method.historyAdd(self.history,sentence))
      self.sentence = ""
      API
      .word_sentence_clear(this._id,sentence)
      .catch(function(err){
        console.log(err)
        self.$root.popup_text = err
        self.$root.show_popup = true
      })
    },
    calc_title:function(){
      console.log(2332323)
      // return "123"
      return this.mode==='add'?'添加新词':'编辑单词'
    },
    calc_right:function(){
      return this.mode==='add'?this.addword:this.editword
    },
    navbar_btn_left:function(){
      this.show = false
      this.word = ""
      this.describe = ""
      this.sentence = ""
    },
    addword:function(){
      let self = this
      // 添加单词
      API
      .wordAdd(this.word,this.sentence,self.describe)
      .then(function(res){
        self.callback(null,
          {_id:res._id,
          word:self.word,
          sentence:self.sentence,
          describe:self.describe})
        self.word = ""
        self.describe = ""
        self.sentence = ""
      })
      .catch(function(err){
        self.$root.popup_text = err.MSG
        self.$root.show_popup = true
      })
    },
    editword:function(){
      let self = this
      let id = this._id || ""
      let word = this.word || ""
      let sentence = this.sentence || ""
      let describe = this.describe || ""
      // 添加单词
      API
      .alterWord(id,word,sentence,describe)
      .then(function(res){
        self.callback(null,{_id:res._id,
          index:self.index,
          word:self.word,
          sentence:self.sentence,
          describe:self.describe,
          movewordreal:self.movewordreal
        })
      })
      .catch(function(err){
        self.$root.popup_text = err.MSG
        self.$root.show_popup = true
      })
    },
    tap_tabs:function(index){
      this.tabs_index = index
    }
  },
  events:{
  },
  data () {
    return {
      tabs_index:0,
      st_selection_index:0,
      st_focus:false,
      moveword:"",
      sentence_show:true
      // word:this.prop_word||"1234",
      // describe:this.prop_describe||"1234"
    }
  },
  ready:function(){
  }
  
}
</script>
