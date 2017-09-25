<template>
  <div 
    class="card">
    <div v-tap="wordclick(id,index)">
      <p class="title">{{word}}</p>
      <p class="preview">例句：{{sentence}}</p>
    </div>
    <footer>
      <a v-tap="events[0](id,index)" >1~10 天</a>
      <a class="middleBtn" v-tap="events[1](id,index)" >10~100 天</a>
      <a v-tap="events[2](id,index)" >9999 天</a>
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
    history:"",
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


