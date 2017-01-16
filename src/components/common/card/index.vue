<template>
  <div 
    :class="size"
    class="card">
    <p v-tap="wordclick(id,index,word,sentence,describe)">
    {{word}}
    <br/>
    {{describe}}
    </p>
    <footer>
      <a v-tap="events[0](id,index)" href=""><img :src="img1" alt=""></a>
      <a v-tap="events[1](id,index)" href=""><img :src="img2" alt=""></a>
      <a v-tap="events[2](id,index)" href=""><img :src="img3" alt=""></a>
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
    sentence:"",
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


