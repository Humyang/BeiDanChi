<template>
  <div id="login">
    <div  ><input v-model="username" type="text" placeholder="账号"></div>
    <div><input v-model="password" type="password" placeholder="密码"></div>
    <div>请输入验证码：{{verify_img}} <a @click.prevent="refresh_verifycode" href="#">更换</a></div>
    <div><input v-model="verifycode" type="password" placeholder="验证码"></div>
    <a @click.prevent="login" href="#" >登录</a>
    <a @click.prevent="regiest" href="#" >注册</a>
  </div>
  
</template>

<script>
// import navbar from './common/navbar'
// import card from './common/card'
// import loadmore from 'mint-loadmore';
// import drop_down from '../vendor/drop_down.js'
// import addWord from './wordAdd.vue'
import * as API from '../api/main.js'
import * as BASE from '../api/base.js'
import co from 'co'

// import hambraug from './hambraug'
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
  components:{
  },
  computed:{

  },
  methods:{
    login:function(){
      let self = this
      API.login(self.username,self.password,self.verify_img,self.verifytoken)
      .then(function(res){
        BASE.saveToken(res.token)
        self.$router.go('/word/list')
        console.log('登录成功')
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
        self.$router.go('/word/list')

      }).catch(function(err){
        console.log(err)
      })
    }
  },
  events:{
  },
  ready:function(){
    this.refresh_verifycode()
  }
  
}
</script>

<style scoped>
#wrapper{
    text-align: center;
    font-size: 28px;
}
input{

    font-size: 28px;
    /* border: 0; */
    margin-bottom: 20px;
    padding: 11px;
    margin-left: 12px;
    margin-top: 10px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
