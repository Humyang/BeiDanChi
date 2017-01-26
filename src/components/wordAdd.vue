<template>
  <div v-show="show"  class=" wrapper wordadd">
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
            <textarea v-model="sentence" name="" id="" cols="30" rows="10"></textarea>
            <a class="btn_prime green" v-tap="sentence_clear">清空</a>
          </div>
          <div v-show="tabs_index===1" >
            <textarea v-model="describe" name="" id="" cols="30" rows="10"></textarea >
          </div>
          <div v-if="tabs_index===2">
            {{{render_history}}}
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
export default {
  props:{
    show:false,
    callback:Function,
    word:undefined,
    data:{default:function(){return {history:""}}},
    describe:"",
    _id:"",
    mode:{default:"add"},
    index:0,
    nvabarBtnRight:Function,
    sentence:undefined,
    history:undefined
  },
  components:{
    navbar
  },
  computed:{
    render_history:function(){
      let data = [{date:1485360000000,item:['aaaaaaaaaaaaa','bbbbbbbbbbbbbbb','ccccccccccccc']},
                  {date:1485360000000,item:['aaaaaaaaaaaaa','bbbbbbbbbbbbbbb','ccccccccccccc']},
                 ]
      return '<p>123123123</p>'
    }
  },
  methods:{
    sentence_clear:function(){
      let self = this
      API
      .word_sentence_clear(this._id,this.sentence)
      .then(function(res){
        self.sentence = ""
      })
      .catch(function(res){
        self.$root.popup_text = err.MSG
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
    },
    addword:function(){
      let self = this
      // 添加单词
      API
      .wordAdd(this.word,this.sentence,self.describe)
      .then(function(res){
        self.callback(null,{_id:res._id,word:self.word,sentence:self.sentence,describe:self.describe})
        self.word = ""
        self.describe = ""
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
        self.callback(null,{_id:res._id,index:self.index,word:self.word,sentence:self.sentence,describe:self.describe})
        // self.word = ""
        // self.describe = ""
        // self.sentence = ""
        // self.history = ""
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
      tabs_index:0
      // word:this.prop_word||"1234",
      // describe:this.prop_describe||"1234"
    }
  },
  ready:function(){
  }
  
}
</script>
