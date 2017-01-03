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
            <li class="active">释</li>
            <li>例</li>
            <li>史</li>
          </ul>
        </section>
        <section class="detail_wrap">
          <textarea v-model="describe" name="" id="" cols="30" rows="10"></textarea>
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
    describe:undefined,
    _id:"",
    mode:{default:"add"},
    nvabarBtnRight:Function
  },
  components:{
    navbar
  },
  computed:{
    
  },
  methods:{
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
      .wordAdd(this.word,this.describe)
      .then(function(res){
        self.callback(null,{_id:res._id,word:self.word,describe:self.describe})
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
      // 添加单词
      API
      .alterWord(this._id,this.word,this.describe)
      .then(function(res){
        self.callback(null,{_id:res._id,word:self.word,describe:self.describe})
        self.word = ""
        self.describe = ""
      })
      .catch(function(err){
        self.$root.popup_text = err.MSG
        self.$root.show_popup = true
      })
    }
  },
  events:{
  },
  data () {
    return {
      // word:this.prop_word||"1234",
      // describe:this.prop_describe||"1234"
    }
  },
  ready:function(){
  }
  
}
</script>
