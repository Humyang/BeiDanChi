<template>
  <div style="height:100%;" class="hambraug">
    <section v-show="is_show" transition="slide" class="animated humbrag">
        <content >
        <!-- 头部账户信息 -->
          <header>
            <!-- 头像 -->
            <section class="header">
              <img src="../assets/images/头像.png" alt="">
            </section>
            <!-- 登录帐号 -->
            <footer>
              <p>{{username}}</p>
              <a href="#" class="more"><img src="../assets/images/展开按钮.png" alt=""></a>
            </footer>
          </header>
          <!-- 菜单 -->
          <ul>
            <li 
              @click="hidden"
              v-link="{ path: '/word/list', activeClass: 'active' }" ><img src="../assets/images/汉堡菜单.png" alt="">首页</li>
            <li 
              @click="hidden"
              v-link="{ path: '/word/all', activeClass: 'active' }" ><img src="../assets/images/汉堡菜单.png" height="12" width="17" alt="">所有单词</li>
            <li 
              @click="hidden"
              v-link="{ path: '/word/add', activeClass: 'active' }" ><img src="../assets/images/汉堡菜单.png" height="12" width="17" alt="">离线模式（未实现）</li>
            <li 
              @click="hidden"
              v-link="{ path: '/login', activeClass: 'active' }" ><img src="../assets/images/汉堡菜单.png" alt="">退出登录</li>
          </ul>
        </content>
    </section>
    <div
          v-show="is_show"
          @click="hidden"
          class="zhezhao">
    </div>
  </div>
</template>

<script>
import '../css/animal.css'
import '../css/hambraug.css'

export default {
  props:{
    is_show:false,
    username:''
  },
  data () {
    return {
      index:0
    }
  },
  methods: {

    go:function(index,path){
      console.log(this.$router)
      this.index = index
      this.is_show = false
      this.$router.go(path)
    },
    hidden:function(){
      this.is_show = false
    }
  },
  computed:{
    // active:function(){
    //     switch(this.$router._currentRoute.path){
    //       case '/word/list':
    //       return 0
    //       break;
    //       case '/word/add':
    //       return 1
    //       break;          
    //     }
    // },
  },
  ready:function(){
    // console.log(getUsername())
    // console.log(localStorage)
    // console.log("123:",this.$root.username)
    // this.username = this.$root.App_info.username
    // this.username=this.$root.username
  }

}
</script>

