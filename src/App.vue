<template>
  <div id="wrapper">
    <router-view
      class="view animated"
      
      :transition="transition_type?'slide_go':'slide_back'"

      ></router-view>
    <hambraug :is_show.sync="show_hambraug"></hambraug>
    <div class="popup">
      <div v-show="show_popup" transition="fade" class="animated content">
          <p class="text">
            {{popup_text}}
          </p>
        <footer @click="show_popup=false">
          <p>确&nbsp;&nbsp;定</p>
        </footer>
      </div>
      <div v-show="show_popup" @click="show_popup=false" class="zhezhao"></div>
    </div>
  </div>
</template>
<!-- keep-alive -->
<script>
// import Hello from './components/Hello'
import navbar from './components/common/navbar'
import hambraug from './components/hambraug'
// import Index from './components/wordList'
import './css/common.css'
import './css/animal.css'
export default {
  data:function(){
    return {
      popup_text:"",
      show_popup:false,
      show_hambraug:false,
      transition_type:true
    }
  },
  components: {
    navbar,
    hambraug
  }
}
</script>
<style scrope>
  div.view{
    animation-duration: 0.5s;
  }
</style>
<style>
#wrapper{
  height: 100%
}
#wrapper .view{
  width: 100%
}
.popup .text{
  font-size: 0.28rem;
  text-align: center;
}

</style>
