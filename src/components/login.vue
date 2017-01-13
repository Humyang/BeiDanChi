<template>
  <div id="login">
    <div class="input"><input v-model="username" type="text" placeholder="账号"></div>
    <div><input v-model="password" type="password" placeholder="密码"></div>
    <!-- <div>请输入验证码：{{verify_img}} <a v-tap.prevent="refresh_verifycode" href="#">更换</a></div>
    <div><input v-model="verifycode" type="password" placeholder="验证码"></div> -->
    <a class="btn_" v-tap.prevent="login" href="#" >登录</a>
    <a class="btn_" v-tap.prevent="regiest" href="#" >注册</a>
  </div>
  
</template>

<script>
import '../css/login.css'
import * as API from '../api/main.js'
import * as BASE from '../api/base.js'
import co from 'co'
import {pageHandle} from '../api/method.js'
export default {
  data () {
    return {
      username:'',
      password:'',
      verifycode:'',
      verify_img:'',
      verifytoken:''
    }
  },
  methods:{
    login:function(){
      let self = this
      API.login(self.username,self.password,self.verify_img,self.verifytoken)
      .then(function(res){
        BASE.saveToken(res.token)
        console.log(BASE.getUsername())
        self.$root.username = BASE.getUsername()

        self.$router.go('/word/list')
        console.log('登录成功')
      }).catch(function(err){
        console.log(err)
        self.$root.popup_text = err.MSG
        self.$root.show_popup = true
      })
    },
    refresh_verifycode:function(){
      var self = this
      API.verify_code()
      .then(function(verifycode){
        self.verifytoken = verifycode.token
        self.verify_img = verifycode.verify_code
      })
    },
    regiest:function(){
      var self = this
      co(function*(){
        let regiest = yield API.regiest( self.username,
                                          self.password,
                                          self.verify_img,
                                          self.verifytoken)
        console.log('注册成功')
        console.log('登录中')
        // temp_token 用于注册后立即登录的验证码
        let login =yield API.login(self.username,self.password,regiest.temp_verifycode,regiest.temp_token)
        BASE.saveToken(login.token)
        self.$root.username = BASE.getUsername()
        self.$router.go('/word/list')

      }).catch(function(err){
        self.$root.popup_text = err.MSG
        self.$root.show_popup = true
      })
    }
  },
  events:{
  },
  ready:function(){
    localStorage.clear()
    this.refresh_verifycode()
  }
  
}
</script>