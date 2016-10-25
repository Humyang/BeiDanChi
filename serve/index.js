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
    let list_index = 0
    let list_number = 20

    let list =yield this.mongo .db('BeiDanChi')
                          .collection('word_list')
                          .find({}).toArray();

    console.log('list',list)

    this.body = {
      status:true,
      list
    }
})

app.use(mongo())
app.use(router.routes())


app.listen(8081)

console.log("listen serve on port 8081")