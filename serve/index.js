var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()
var cors = require('koa-cors');
var mongo = require('koa-mongo')
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
    console.log(11)
    let list_index = 0
    let list_number = 20

    let list = yield this.mongo
                          .db('BeiDanChi')
                          .collection('word_list')
                          .findOne()

// this.body = yield this.mongo.db('test').collection('users').findOne();
    console.log(list)

    this.body = {
      status:true,
      list
    }

    // this.body = [
    //       {describe:'1111111',size:0},
    //       {describe:'222222222',size:1},
    //       {describe:'aaaaa',size:1},
    //       {describe:'a1acxba1aa',size:1},
    //       {describe:'aa2qwgzaaa2',size:1},
    //       {describe:'aaahjla3a',size:1},
    //       {describe:'bbq2bbs4b',size:1},
    //       {describe:'cc1caacc3c',size:1}
    //   ]
})
// router.post('/upload', body(), function * (next) {
// })
// app.use(serve('.'));

app.use(mongo())
app.use(router.routes())


app.listen(8081)

console.log("listen serve on port 8081")