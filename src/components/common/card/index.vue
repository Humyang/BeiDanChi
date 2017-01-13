<template>
  <div 
    :class="size"
    class="card">
    <p v-tap.prevent="wordclick(id,index,word,describe)">
    {{word}}
    <br/>
    {{describe}}
    </p>
    <footer>
      <a v-tap.prevent="events[0](id,index)" href=""><img :src="img1" alt=""></a>
      <a v-tap.prevent="events[1](id,index)" href=""><img :src="img2" alt=""></a>
      <a v-tap.prevent="events[2](id,index)" href=""><img :src="img3" alt=""></a>
    </footer>
  </div>
</template>

<script>
import img1 from './images/爱心.png'
import img2 from './images/书签.png'
import img3 from './images/分享.png'
import './card.css'
export default {
  props:{
    id:"",
    index:"",
    describe:"",
    word:"",
    wordclick:Function,
    size:{
      coerce:function(val){
        return {
          "middle":val===1,
          "small":val===0
        }
      }
    },
    events:{
      default:function(){
        return [function(){},function(){},function(){}]
      }
    }
  },
  data () {
    return {
      img1,
      img2,
      img3
    }
  },
  computed:{
  }
}
</script>


