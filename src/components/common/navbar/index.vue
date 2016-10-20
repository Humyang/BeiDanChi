<template>
  <header class="nav_bar">
      <div class="_btn left">
        <p @click.prevent="left">
          <img v-if="left_type==='hambraug'" :src="img_url2" alt="">
          <img v-if="left_type==='back'" :src="img_url3" alt="">
        </p>
      </div>
      <div class="text">
        <p>{{title}}</p>
      </div>
      <div class="_btn right">
        <p @click.prevent="right">
          <img v-if="right_type==='add'" :src="img_url" alt="">
          <span v-if="right_type==='done'">完成</span>
        </p>
      </div>
  </header>
</template>

<script>
import img_url from './images/添加按钮.png'
import img_url2 from './images/汉堡菜单.png'
import img_url3 from './images/返回按钮.png'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header.nav_bar { background-color: #E0E0E0; position: relative; position: fixed; top: 0; opacity: 1; z-index: 9; width: 100% }
._btn { width: 1.2rem; right: 0; }
header.nav_bar div { float: left; }
header.nav_bar div.text { width: 4rem; left: 1.5rem; }
header.nav_bar div p{text-align: center;}
header.nav_bar div p.left { text-align: left; }
header.nav_bar div p.left img { display: inline-block; }
header.nav_bar div p { margin: 0; font-size: 0.3rem; padding: 0.24rem 0; }
header.nav_bar div p.right span { font-size: 0.3rem;display: block; }
</style>
