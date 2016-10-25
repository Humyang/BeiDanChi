<template>
  <div id="wrapper">
    <router-view
      class="view animated"
      keep-alive
      :transition="transition_type?'slide_go':'slide_back'"

      ></router-view>
    <hambraug :is_show.sync="show_hambraug"></hambraug>
  </div>
</template>

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
/* html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
} */
</style>
