<template>
  <div>
    <section v-show="show" transition="slide" class="animated humbrag">
        <content >
        <!-- 头部账户信息 -->
          <header>
            <!-- 头像 -->
            <section class="header">
              <img src="../assets/images/头像.png" alt="">
            </section>
            <!-- 登录帐号 -->
            <footer>
              <p>jessebutchman@gmail.com</p>
              <a href="#" class="more"><img src="../assets/images/展开按钮.png" alt=""></a>
            </footer>
          </header>
          <!-- 菜单 -->
          <ul>
            <li class="active"><img src="../assets/images/汉堡菜单.png" alt="">首页</li>
            <li><img src="../assets/images/汉堡菜单.png" height="12" width="17" alt="">设置</li>
            <li><img src="../assets/images/汉堡菜单.png" alt="">退出登录</li>
          </ul>
        </content>
    </section>
    <div
          v-show="show"
          transition="fade"
          @click="hidden"
          class="animated zhezhao">
    </div>
  </div>
</template>

<script>
import '../css/animal.css'
export default {
  props:{
    show:{
      default:false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    hidden:function(){
      this.show = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section.humbrag {
    height: 100%;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 268px;
    animation-duration: 0.5s;
}
.zhezhao{
    background-color: black;
    opacity: 0.4;
    height: 100%;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 9;
    animation-duration: 0.5s;
}
.humbrag content {
    height: 100%;
    width: 268px;
    background-color: white;
    display: block;
}
/* 头像部分 */
.humbrag header {
    height: 150px;
    background-color: #616161;
    overflow: hidden;
    /* border: 1px solid #333; */
    display: block;
}

section.header {
    display: inline-block;
    width: 56px;
    height: 56px;
    border-radius: 40px;
    /* background-color: white; */
    text-align: center;
    overflow: hidden;
    border: 0;
    margin: 35px;
}
footer p {
    margin: 0;
    padding: 0;
    color: white;
    /* margin: 5px; */
    /* display: block; */
}

footer {
    /* margin: 5px; */
    display: block;
    /* margin-bottom: 150px; */
    margin-top: -5px;
    margin-left: 20px;
}
a.more {
    float: right;
    margin-top: -16px;
    margin-right: 10px;
    display: block;
}
.humbrag ul {
    font-size: 14px;
    margin-top: 20px;
}
.humbrag li {
    padding: 10px 0;
}
.humbrag li.active {
    color: #4285F4;
}
.humbrag li img {
    /* margin-top: 4px; */
    vertical-align: -4px;
    margin: 0 30px;
}
</style>
