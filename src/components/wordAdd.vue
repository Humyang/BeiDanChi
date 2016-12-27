<template>
  <div v-show="show"  class=" wrapper wordadd">
      <navbar 
      title="新词" 
      :left="navbar_btn_left" 
      left_type="close"
      :right="navbar_btn_right"
      right_type="done"
      >
      </navbar>
      <content class="container">
        <!-- 搜索框 -->
        <section class="search_wrap">
          <p>
            <!-- <img src="./images/搜索图标.png" alt=""> -->
            <input v-model="word" type="text" placeholder="新增或搜索单词" v-model="search_text">
          </p>
        </section>
        <section class="detail_tabs">
          <ul>
            <li class="active">释</li>
            <li>例</li>
            <li>史</li>
          </ul>
        </section>
        <section class="detail_container describe">
          <textarea v-model="describe" name="" id="" cols="30" rows="10"></textarea>
        </section>
      </content>
  </div>
  <!-- <hambraug :show.sync="show_hambraug"></hambraug> -->
</template>

<script>
import navbar from './common/navbar'
import card from './common/card'
import loadmore from 'mint-loadmore'
// import hambraug from './hambraug'
import * as API from '../api/main.js'
import '../css/wordadd.css'
export default {
  props:{
    show:false,
    callback:Function
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
    navbar_btn_right:function(){
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
    // var container = document.getElementsByClassName("container")[0];
    // container.scrollTop=50;
    // console.log(container.scrollTop)
  }
  
}
</script>
