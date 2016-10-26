var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors');
var mongo = require('koa-mongo')
var ObjectId = require('mongodb').ObjectId
app.use(cors());

// 添加单词
router.post('/word/add',body(),function * (next){
    let word = this.request.fields.word
    let describe = this.request.fields.describe
    let res = yield this.mongo
                        .db('BeiDanChi')
                        .collection('word_list')
                        .insert({word,describe})
    // console.log(res)
    // let res = yield this.mongo
    //         .db('BeiDanChi')
    //         .collection('store')
    //         .update({'app_id':10000},
    //                 {'$set':{app_id:10000,list:list}},
    //                 {'upsert':true});

    this.body = res.result
})


// 获取列表
router.post('/word/list',function *(next){
    let page_index = this.request.fields.page_index
    let page_number = this.request.fields.page_number

    let list =yield this.mongo .db('BeiDanChi')
                          .collection('word_list')
                          .find({}).toArray();

    console.log('list',list)

    this.body = {
      status:true,
      list
    }
})
// 获取列表
router.post('/word/hide',body(),function *(next){
    console.log(this.request.fields)
    let id = this.request.fields.id
    let end_time = this.request.fields.end_time

    // let list =yield this.mongo
    //                         .db('BeiDanChi')
    //                         .collection('word_list')
    //                         .find({}).toArray();

    let res = yield this.mongo
            .db('BeiDanChi')
            .collection('word_list')
            .update({'_id':ObjectId(id)},
                    {'$set':{end_time}},
                    {'upsert':true});

    // console.log('list',list)

    this.body = {
      status:true,
      res
    }
})
app.use(mongo())
app.use(router.routes())


app.listen(8081)

console.log("listen serve on port 8081")