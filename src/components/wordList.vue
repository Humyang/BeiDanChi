<template>
  <div class="wrapper">
      <navbar title="首页" :left="navbar_btn_left" :right="navbar_btn_right"></navbar>
      <content class="container">
        <loadmore :top-method="loadTop" >
          <section v-show="show_search" class="search_wrap">
            <p>
              <img src="./images/搜索图标.png" alt="">
              <input type="text" placeholder="过滤单词" v-model="search_text">
            </p>
          </section>
          <!-- <loadmore> -->
          <!-- 单词列表 -->
          <section id="word_card" class="word_card">
            <card v-for="item in liste_filter" :describe="item.describe" :size="item.size"></card>
          </section>
        </loadmore>
      </content>
    </div>
</template>

<script>
import navbar from './common/navbar'
import card from './common/card'
import loadmore from 'mint-loadmore';
import drop_down from '../vendor/drop_down.js'

import * as API from '../api/main.js'
// import hambraug from './hambraug'
export default {
  data () {
    return {
      search_text:'',
      show_search:false,
      lists:[
          // {describe:'1111111',size:0},
          // {describe:'222222222',size:1},
          // {describe:'aaaaa',size:1},
          // {describe:'a1acxba1aa',size:1},
          // {describe:'aa2qwgzaaa2',size:1},
          // {describe:'aaahjla3a',size:1},
          // {describe:'bbq2bbs4b',size:1},
          // {describe:'cc1caacc3c',size:1}
      ]
    }
  },
  components:{
    navbar,
    card,
    loadmore,
    // hambraug
  },
  computed:{
    liste_filter:function(){
      console.log(this.lists)
      if(!this.lists){
        return []
      }
      var new_list = []
      for (var i = this.lists.length - 1; i >= 0; i--) {
        if(this.lists[i].describe.indexOf(this.search_text)!=-1){
          new_list.push(this.lists[i])
        }
      }
      return new_list
    }
  },
  methods:{
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
      this.$router.go('/word/add')
    }
  },
  events:{
  },
  ready:function(){
    var self = this
    drop_down.listen("word_card",function(){
      self.show_search = true
      // console.log(true)
    })
    // 获取单词列表
    API.listGet(0,20,function(err,res){
      if(err){

      }
      self.lists = JSON.parse(res)
      console.log("返回数据",res)
    })
  }
  
}
</script>

<style>
  .mint-loadmore-top {
    font-size: 16px;
    color: white;
    text-align: center;
    padding: 14px 0;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container { background-color: #36474F; overflow: auto; display: block; height: 100%; padding-bottom: 50px;    margin-top: 0.21rem; }
/* 下拉刷新 */
section.refresh { color: #ffffff; text-align: center; margin-top: 45px; padding-top: 5px; }
section.refresh p { margin: 10px; }
section.search_wrap {    margin-top: 0.1rem;}
section.search_wrap p { background-color: white; margin: 0 auto; width: 6.2rem; height: 45px; border-radius: 2px; }
section.search_wrap img { padding: 14px; float: left; }
section.search_wrap input[type="text"] { font-size: 14px; line-height: 45px; padding: 0; margin: 0; color: #000000; width: 5.2rem; border: 0;}
section.word_card { overflow: hidden;  }
/*.detail_tabs li { font-size: 18px;float: left; width: 2.13rem; text-align: center; color: white; padding: 15px 0; }
.detail_tabs ul { overflow: hidden; background-color: #00BBD3;border-radius: 1px; }
section.detail_tabs { margin-top: 10px; }
.describe textarea { width: 6.3rem; border: 0; margin: 0; padding: 0; background-color: #36474f; border-bottom: 2px solid #80CBC4; margin-left: 5px; color: white; font-size: 16px; }
section.detail_container.describe { margin-top: 40px; }
.detail_tabs li.active { border-bottom: 2px solid #FFFF8C; }*/

</style>
