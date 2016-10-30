<template>
  <div class="wrapper">
      <navbar 
      title="新词" 
      :left="navbar_btn_left" 
      left_type="back"
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
import loadmore from 'mint-loadmore';
// import hambraug from './hambraug'
import * as API from '../api/main.js'
export default {
  components:{
    navbar
  },
  computed:{
  },
  methods:{
    navbar_btn_left:function(){
      history.back()
    },
    navbar_btn_right:function(){
      let self = this
      // 添加单词
      API.wordAdd(this.word,this.describe,function(err,res){
        if(err){
          console.log("添加失败：",err)
        }else{
          console.log("添加成功")
          self.$router.go('/word/list')
        }
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


.container { background-color: #36474F; overflow: auto; display: block;height: 100%; padding-bottom: 50px;}

/* 搜索框 */
.search_wrap { margin-top: 1rem; }
.search_wrap p { background-color: white; margin: 0 auto; width: 6.2rem; height: 45px;border-radius: 2px; }
.search_wrap img { padding: 14px; float: left; }
.search_wrap input[type="text"] { font-size: 14px; line-height: 45px; padding: 0; margin: 0; color: #000000;width: 5.2rem; border: 0;}


.detail_tabs ul { overflow: hidden; background-color: #00BBD3; border-radius: 1px; }
section.detail_tabs { margin-top: 10px; }
.detail_tabs ul li { font-size: 18px; float: left; width: 2.13rem; text-align: center; color: white; padding: 15px 0; }
.detail_tabs li.active { border-bottom: 2px solid #FFFF8C; }

.describe textarea { width: 6.3rem; border: 0; margin: 0; padding: 0; background-color: #36474f; border-bottom: 2px solid #80CBC4; margin-left: 5px; color: white; font-size: 16px; }
section.detail_container.describe { margin-top: 40px; }

</style>
