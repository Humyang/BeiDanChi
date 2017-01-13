<template>
  <header class="nav_bar">
      <div class="_btn left">
        <p v-tap.prevent="back">
          <img v-if="left_type==='hambraug'" :src="img_url2" alt="">
          <img v-if="left_type==='back'" :src="img_url3" alt="">
          <span v-if="left_type==='close'" >关闭</span>
        </p>
      </div>
      <div class="text">
        <p>{{title}}</p>
      </div>
      <div class="_btn right">
        <p v-tap.prevent="go">
          <img v-if="right_type==='add'" :src="img_url" alt="">
          <span v-if="right_type==='done'">完成</span>
          <!-- <span v-if="right_type==='add'">添加</span> -->
          <span v-if="right_type==='save'">保存</span>
        </p>
      </div>
  </header>
</template>

<script>
import img_url from './images/添加按钮.png'
import img_url2 from './images/汉堡菜单.png'
import img_url3 from './images/返回按钮.png'

import './navbar.css'

export default {
  props: { 
    title: String,
    left:Function,
    left_type:{
      default:"hambraug"
    },
    right:Function,
    right_type:{
      default:"add"
    }
  },
  methods:{
    go:function(){
      this.$root.transition_type = true
      this.right()
    },
    back:function(){
      this.$root.transition_type = false
      this.left()
    }
  },
  data () {
    return {
      msg: 'Hello World!',
      img_url,
      img_url2,
      img_url3
    }
  }
}
</script>

