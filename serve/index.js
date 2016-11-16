var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors')
var mongo = require('koa-mongo')
var ObjectId = require('mongodb').ObjectId
var objectAssign = require('object-assign')
var uid = require('uid')
var DAY = require('./constant.js').DAY
var md5 = require('md5')


var verifyUserName = require('./method.js').verifyUserName


app.use(cors())


// 添加单词
router.post('/word/add',body(),function * (next){
    let word = this.request.fields.word
    let describe = this.request.fields.describe

    let now_time = new Date()
    let end_time = now_time.getTime()

    let res = yield this.mongo
                        .db('BeiDanChi')
                        .collection('word_list')
                        .insert({word,describe,end_time})

    this.body = {
      status:true,
      result:res.result
    }
})

const QUERY_BASE = {'is_move':{$ne:true}}

// 获取列表（以到达显示时间）
router.post('/word/list',body(),function *(next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number

    // 获取所有 end_time 小于当天的单词
    let now_time = new Date()
    let time = now_time.getTime()

    let query_filter = objectAssign({ "end_time":{ $lt: time }},QUERY_BASE)

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
router.post('/word/all',body(),function *(next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number
    let query_filter = objectAssign(QUERY_BASE)

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
router.post('/word/id',body(),function *(next){

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

// var validate_username = function (username){
//         let self = this
//         let query_filter = {
//             username
//         }
//         function * plugin (next) {
//             let res = yield self.mongo 
//                             .db('BeiDanChi')
//                             .collection('user')
//                             .findOne(query_filter)

//             console.log("验证用户名",res)
//         }
        



//         // yield * next


// }

// 验证账号重复性
router.all('/valid/username/:username',body(),function *(next){
    let _username = yield username_repeat(this,this.params.username)
    console.log('_username：',_username)
    if(_username!=null){
        throw new Error('账号重复');
    }
    this.body = {
        status:true
    }
})
// 密码加密
function encryptPassword(password,salt){
    return md5(md5(password+salt))
}
//检查重复用户名
function* username_repeat(self,username){

    let username_query_filter = {
        username
    }

    let res = yield self.mongo 
                    .db('BeiDanChi')
                    .collection('user')
                    .findOne(username_query_filter)

    // console.log('res:',res)

    return res
}
//注册账户
router.post('/regiest',body(),function *(next){

    let fields = this.request.fields
    
    //验证码检查
    verify_code(this,fields.token,fields.verify_code)


    // 验证账号格式
    if(!verifyUserName(fields.username)){
        throw new Error('账号格式不符合要求');
    }
    // 验证密码格式
    // 验证账号重复性

    let _username = yield username_repeat(this,fields.username)

    console.log('_username：',_username)
    if(_username!=null){
        throw new Error('账号重复');
    }

    let salt = md5(Math.random()*1000000)
    let password = encryptPassword(fields.password,salt)

    let data = {
        username:fields.username,
        password,
        salt
        // 弹性添加其它字段
    }
    // 写入数据库
    let _inset_res = yield this.mongo
                    .db('BeiDanChi')
                    .collection('user')
                    .insert(data)

    console.log('inset_res：',_inset_res)
    // 响应
    this.body = {
      status:true,
      res:_inset_res
    }
})
function* verify_code(self,token,verify_code){
    let query_filter = {
        token,
        verify_code
    }
    let _vc = yield this.mongo 
                        .db('BeiDanChi')
                        .collection('token')
                        .findOne(query_filter);
    // 验证验证码
    if(_vc==null || _vc.verify_code != fields.verify_code){
        throw new Error('验证码错误')
    }
    return true
}
//登录
router.post('/login',body(),function *(next){
    let fields = this.request.fields
    //验证码
    verify_code(this,fields.token,fields.verify_code)

    //获取 salt
    let salt = yield this.mongo
                        .db('BeiDanChi')
                        .collection('user')
                        .findOne({username:fields.username})
    console.log('salt，',salt)
    console.log('encryptPassword',encryptPassword(fields.password,salt.salt))
    //验证账号密码
    let _usm_pwd_filter = {
        username:fields.username,
        password:encryptPassword(fields.password,salt.salt)
    }
    let _usm_pwd = yield this.mongo 
                        .db('BeiDanChi')
                        .collection('user')
                        .findOne(_usm_pwd_filter);
    console.log('_usm_pwd，',_usm_pwd)
    if(_usm_pwd === null){
        throw new Error('账号密码错误')
    }

    //token 写入有效状态
    let new_token = uid(40)
    let _token_stauts = {
        username:fields.username,
        status:true,
        token:new_token,
        device:fields.device
    }
    //使旧 token 失效
    let _update_res = yield this.mongo.db('BeiDanChi')
                                .collection('logined_token')
                                .update({
                                        username:fields.username,
                                        device:fields.device
                                    })

    let _insert_res = yield this.mongo
                    .db('BeiDanChi')
                    .collection('logined_token')
                    .insert(_token_stauts)
    console.log('_insert_res',_insert_res)

    // //登录成功
    this.body = {
      status:true,
      token:new_token
    }
})
//获取验证码
router.all('/verify_code',function *(next){

    // 生成 Token
    let token = uid(40)
    
    // 生成 验证码
    let verify_code = "123456"
    // 验证码转换为 base64 图片
    // Token，verify_code 存入数据库

    let now = new Date()
    let create_time = now.getTime()
    let expire_time = create_time + DAY*1
    let data = {
        token,
        verify_code,
        create_time,
        expire_time,
        is_verify:false
    }

    let res = yield this.mongo
                    .db('BeiDanChi')
                    .collection('token')
                    .insert(data)

    this.body = {
      status:true,
      result:res.result,
      token,
      verify_code
    }
})

app.use(mongo())
app.use(function *(next){

    try{
        yield next
    }catch (err) {
    this.body = {
        status:false,
        msg:err.message
    };

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