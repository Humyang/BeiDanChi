<template>
  <div v-show="show"  class=" wrapper wordadd">
      <navbar 
      title="新词" 
      :left="navbar_btn_left" 
      left_type="close"
      :right="mode==='add'?addword:editword"
      right_type="done"
      >
      </navbar>
      <content class="container">
        <!-- 搜索框 -->
        <section class="search_wrap">
          <p>
            <input v-model="word" value="prop_word" type="text" placeholder="新增或搜索单词" >
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
          <textarea v-model="describe" value="detail" name="" id="" cols="30" rows="10"></textarea>
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
    prop_word:"",
    detail:"",
    _id:"",
    mode:"add",
    nvabarBtnRight:Function
  },
  components:{
    navbar
  },
  computed:{
  },
  methods:{
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
    }
  },
  events:{
  },
  data () {
    return {
      word:"",
      describe:""
    }
  },
  ready:function(){
  }
  
}
</script>
