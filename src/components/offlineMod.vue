<template>
  <div v-show="show" transition="slide_right" class="animated wrapper">
      <navbar 
      title="离线模式" 
      :left="navbar_btn_left" 
      left_type="back"
      :right="navbar_btn_right"
      right_type="done"
      >
      </navbar>
      <content class="container">
        <p>离线模式预计放在第二版本完成</p>
        <p>将来只要预先加载数据，即可增加和删除单词，等待下次联网的时候同步数据</p>
        <p>预计使用 localstorage 实现</p>
      </content>
  </div>
  <!-- <hambraug :show.sync="show_hambraug"></hambraug> -->
</template>

<script>
import navbar from './common/navbar'
import card from './common/card'
import loadmore from 'mint-loadmore';
// import hambraug from './hambraug'
import * as API from '../api/main.js'
export default {
  props:{
    show:false
  },
  components:{
    navbar
  },
  computed:{
  },
  methods:{
    navbar_btn_left:function(){
      this.show = false
      // history.back()
    },
    navbar_btn_right:function(){
      let self = this
      // 添加单词
      API.wordAdd(this.word,this.describe,function(err,res){
        if(err){
          console.log("添加失败：",err)
        }else{
          console.log("添加成功")
          // self.$router.go('/word/list')

        }
        self.show = false
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
