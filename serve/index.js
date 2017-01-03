var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors')
var mongo = require('koa-mongo')



var CONSTANT = require('./constant.js')
var objectAssign = require('object-assign')
// var CODE = CONSTANT.CODE
// var md5 = require('md5')
// var throwError = require('./error.js').throwError
var LOGIN = require('./module/login.js')
var WORD = require('./module/word.js')



app.use(cors())


// 添加单词
router.post('/word/add',LOGIN.login_check(),WORD.add)
// 获取列表（以到达显示时间）
router.post('/word/list',LOGIN.login_check(),WORD.list)
// 获取所有
router.post('/word/all',LOGIN.login_check(),WORD.all)
// 获取单个
router.post('/word/id',LOGIN.login_check(),WORD.id)
// 隐藏单词
router.post('/word/hide',LOGIN.login_check(),WORD.hide)
// 移除单词
router.post('/word/move',LOGIN.login_check(),WORD.move)
// 编辑单词
router.post('/word/alter',LOGIN.login_check(),WORD.alter)

// 验证账号重复性
router.all('/valid/username/:username',LOGIN.username_repeat)
//注册账户
router.post('/regiest',/*LOGIN.verify_code(),*/LOGIN.regiest)
//登录
router.post('/login',/*LOGIN.verify_code(),*/LOGIN.login)
//获取验证码
router.all('/verify_code',LOGIN.verifycode)

app.use(mongo())
app.use(body())
app.use(function *(next){
    try{
        yield next
    }catch (err) {
        try{
            // 业务逻辑错误
            this.body = objectAssign({status:false},JSON.parse(err.message));
        }catch(err2){
            // console.log(this)
            this.body = {
                status:false,
                msg:err.message,
                path:this.request.url
            }
        }
        console.log(err)
    }
})
app.use(router.routes()).use(router.allowedMethods());


// https://github.com/koajs/examples/blob/master/errors/app.js
// 
// this.app.emit('error', err, this);
// app.on('error', function(err) {
//     console.log('error:',err)
//     this.body={
//         status:false,
//         err
//     }
//   // if (process.env.NODE_ENV != 'test') {
//   //   console.log('sent error %s to the cloud', err.message);
//   //   console.log(err);
//   // }
// });
// app.use(function*(next){
//     console.log(next)
//     console.log(22222)
// })

app.listen(8081)

console.log("listen serve on port 8081")