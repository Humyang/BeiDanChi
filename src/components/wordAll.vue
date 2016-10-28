<template>
  <div class="wrapper">
      <navbar title="所有单词" :left="navbar_btn_left" :right="navbar_btn_right"></navbar>
      <content class="container">
        <loadmore :top-method="loadTop" >
          <section id="word_card" class="word_card">
            <card 
            v-for="item in liste_filter" 
            :word="item.word"
            :id="item._id"
            :describe="item.describe" 
            :size="1"
            :events="events"
            ></card>
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
            // { 
            //   _id: '580dd51409f6d91cd4c4a372',
            //   word: 'test word',
            //   describe: 'some word on here'
            // }
      ],
      events:[
      function(id){
        API.hideWord(id,0,function(err,res){
            console.log("隐藏单词，结果：")
            if(err){
                console.log("some error：",err)
                return false
            }
            console.log("success",res)
        })
      },
      function(id){
        API.hideWord(id,1,function(err,res){
            console.log("隐藏单词，结果：")
            if(err){
                console.log("some error：",err)
                return false
            }
            console.log("success",res)
        })
      },
      function(id){
        API.hideWord(id,2,function(err,res){
            console.log("隐藏单词，结果：")
            if(err){
                console.log("some error：",err)
                return false
            }
            console.log("success",res)
        })
      }
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
    
  },
  events:{
  },
  ready:function(){
    var self = this

    // 获取单词列表
    API.listGet(0,20,function(err,res){
      if(err){

      }

      self.lists = res.list
      console.log("返回数据",res)
    })
  }
  
}
</script>


