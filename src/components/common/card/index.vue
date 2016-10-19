<template>
  <div 
    :class="size"
    class="card">
            <p>{{describe}}</p>
    <footer>
      <a href=""><img :src="img1" alt=""></a>
      <a href=""><img :src="img2" alt=""></a>
      <a href=""><img :src="img3" alt=""></a>
    </footer>
  </div>
</template>

<script>
import img1 from './images/爱心.png'
import img2 from './images/书签.png'
import img3 from './images/分享.png'
export default {
  props:{
    describe:String,
    size:{
      coerce:function(val){
        return {
          "middle":val===1,
          "small":val===0
        }
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
    // card_class_object:function(){
    //   return {
        
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 单词列表 */
.card {
    color: white;
    display: inline-block;
    /* padding: 0.2rem; */
    background-color: #009688;
    border-radius: 2px;
    overflow: hidden;
    float: left;
}

.card.middle{
    width: 145px;
    height: 150px;
    margin: 5px;
}
.card p{
    word-break: break-all;
    margin: 0;
}
.card footer{
    background-color: white;
}
.card.middle p {
    padding: 10px;
    height: 100px;
    font-size: 16px;
}
.card.middle footer {
    height: 30px;
}
.card footer a {
    display: inline-block;
    text-align: center;
}
.card.middle footer a{
    width: 50px;
    margin-top: 6px;
}
.card.middle footer a img {
    width: 18px;
    height: 18px;
}
.card.small {
    width: 60px;
    height: 70px;
    margin: 5px;
}

.card.small p {
    font-size: 10px;
    padding: 5px;
    margin: 0;
    height: 40px;
}
.card.small footer {
    height: 20px;
}

.card.small img {
    height: 12px;
}

.card.small footer a {
    width: 17px;
    text-align: center;
    margin-top: 4px;
}
</style>
