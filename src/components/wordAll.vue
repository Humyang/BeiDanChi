<template>
  <div class="wrapper">
      <navbar title="所有单词" :left="navbar_btn_left" :right="navbar_btn_right"></navbar>
      <content class="container">
        <loadmore :top-method="loadTop" >
          <section id="word_card" class="word_card">
            <div 
            v-for="item in lists"
            @click="setItem(item)" 
            class="list">
              <p class="p1">{{item.word}}</p>
              <p class="p2">{{item.describe}}</p>

              <p v-if="item.end_time === 'now'" class="p3 green">显示中</p>
              <p v-else class="p3">隐藏至：{{item.end_time}}</p>
              
              <template v-if="item.show">
                <p class="line"></p>
                <footer>
                  <a @click.prevent="" class="a1" href="">编辑</a>
                  <a @click.prevent="moveItem(item,$index)" class="a2" href="">删除</a>
                </footer>
              </template>
            </div>
          </section>
        </loadmore>
      </content>
  </div>

</template>

<script>
import navbar from './common/navbar'
import loadmore from 'mint-loadmore'

import * as API from '../api/main.js'
export default {
  data () {
    return {
      lists:[
            // { 
            //   _id: '580dd51409f6d91cd4c4a372',
            //   word: 'test word',
            //   describe: 'some word on here'
            // }
      ]
    }
  },
  components:{
    navbar,
    loadmore,
  },
  computed:{
    
  },
  methods:{
    // 移除 item
    moveItem:function(item,index){
      let self = this
      console.log("移除单词，结果：")
      API.moveWord(item._id)
      .then(function(res){
          self.lists = [...self.lists.slice(0, index),
                        ...self.lists.slice(index + 1)
                      ]
          console.log("success",res)
      }).catch(function(err){
          console.log("some error：",err)
          self.$root.popup_text = err
          self.$root.show_popup = true
      })
    },
    setItem:function(item){
      for (var i = this.lists.length - 1; i >= 0; i--) {
          this.lists[i].show = false
      }
      item.show = true
      // console.log(item)
    },
    navbar_btn_left:function(){
      this.$root.show_hambraug = true
    },
    navbar_btn_right:function(){
    },
    loadTop:function(id){
      let self = this
      setTimeout(function() {
        self.$broadcast('onTopLoaded', id);
      }, 2000)
    }
  },
  events:{
  },
  ready:function(){
    var self = this
    API.listGetAll(0,20)
    .then(function(res){
        for (var i = res.list.length - 1; i >= 0; i--) {
          res.list[i].show = false
        }
        self.lists = res.list
    })
    .catch(function(err){
        self.$root.popup_text = err
        self.$root.show_popup = true
    })
  }
  
}
</script>

<style scrope>
.list {
  overflow: hidden;
  background-color: white;
  margin-bottom: 0.1rem;
}
.list {
    border-radius: 5px;
    padding: 0 0.3rem;
}
.list p{
    padding:0;
    margin:0;
    overflow: hidden;
}
.list p.p1 {
    font-size: 0.48rem;
    margin: 0.05rem 0;
}
.list p.p2 {
    font-size: 0.28rem;
    margin: 0.05rem 0;
    margin-bottom:0.2rem;
    color: #949494;
}
.list p.p3 {
    color: #ffbda9;
    text-align: right;
    margin-bottom: 0.15rem;
}
.list p.p3.green{
  color:green;
}
footer {overflow: hidden;margin: 0.12rem 0;}
footer a {
    width: 50%;
    display: block;
    float: left;
    text-align: center;
    /*font-size: 0.28rem;*/
    color:#009688;
    text-decoration: none;
}

p.line {
    height: 0.02rem;
    width: 150%;
    background-color: #bfbaba;
    overflow: hidden;
    /* position: absolute; */
    margin-left: -0.3rem;
}
</style>

