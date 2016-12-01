var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors')
var mongo = require('koa-mongo')
var ObjectId = require('mongodb').ObjectId
var objectAssign = require('object-assign')

var CONSTANT = require('./constant.js')

var CODE = CONSTANT.CODE
var md5 = require('md5')
var throwError = require('./error.js').throwError
var LOGIN = require('./module/login.js')
var WORD = require('./module/word.js')



app.use(cors())

const QUERY_BASE = {'is_move':{$ne:true}}
// 添加单词
router.post('/word/add',body(),LOGIN.login_check(),)

// 获取列表（以到达显示时间）
router.post('/word/list',body(),LOGIN.login_check(),function *(next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number

    // 获取所有 end_time 小于当天的单词
    let now_time = new Date()
    let time = now_time.getTime()

    let query_filter = objectAssign({ "end_time":{ $lt: time }},QUERY_BASE,this.login_status)

    let list = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .find(query_filter)
                            .toArray();

    console.log('/word/list：',list)

    this.body = {
      status:true,
      list
    }
})
// 获取所有
router.post('/word/all',body(),LOGIN.login_check(),function *(next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number
    // this.login_status
    let query_filter = objectAssign(QUERY_BASE,this.login_status)

    let list = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .find(query_filter).toArray();

    console.log('/word/all：',list)

    this.body = {
      status:true,
      list
    }
})
// 获取单个
router.post('/word/id',body(),LOGIN.login_check(),function *(next){

    let id = this.request.fields.id

    let query_filter = objectAssign({'_id':ObjectId(id)},QUERY_BASE)

    let word = yield this.mongo 
                            .db('BeiDanChi')
                            .collection('word_list')
                            .findOne(query_filter);

    console.log('/word/id：',word)

    this.body = objectAssign({
      status:true},
      word)
    
})
// 隐藏单词
router.post('/word/hide',body(),function *(next){
    let id = ""
    let end_time = this.request.fields.end_time


    try{
        id = ObjectId(this.request.fields.id)
    }catch(e) {
        return this.body = {
                  status:false,
                  res:"id 类型无效"
                }
    }

    let res = yield this.mongo
            .db('BeiDanChi')
            .collection('word_list')
            .update({'_id':ObjectId(id)},
                    {'$set':{end_time}},
                    {'upsert':true});

    this.body = {
      status:true,
      res
    }
})
// 移除单词
router.post('/word/move',body(),function *(next){
    let id = ""
    let end_time = this.request.fields.end_time

    try{
        id = ObjectId(this.request.fields.id)
    }catch(e) {
        return this.body = {
                  status:false,
                  msg:"id 类型无效"
                }
    }

    let res = yield this.mongo
            .db('BeiDanChi')
            .collection('word_list')
            .update({'_id':ObjectId(id)},
                    {'$set':{end_time,is_move:true}},
                    {'upsert':true});

    this.body = {
      status:true,
      res
    }
})


// 验证账号重复性
router.all('/valid/username/:username',body(),LOGIN.username_repeat)
//注册账户
router.post('/regiest',body(),LOGIN.verify_code(),LOGIN.regiest)
//登录
router.post('/login',body(),LOGIN.verify_code(),LOGIN.login)
//获取验证码
router.all('/verify_code',LOGIN.verifycode)

app.use(mongo())
app.use(function *(next){
    try{
        yield next
    }catch (err) {
        try{
            // 业务逻辑错误
            this.body = objectAssign({status:false},JSON.parse(err.message));
        }catch(err2){

            this.body = {
                status:false,
                msg:err.message
            }
        }
        // console.log('error.code: ',err.message)
        // console.log('errmessage',err.message)
        
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