function*wordAdd (next){
    let word = this.request.fields.word
    let describe = this.request.fields.describe

    let now_time = new Date()
    let end_time = now_time.getTime()

    let insert_obj = objectAssign({word,describe,end_time},this.login_status)
    let res = yield this.mongo
                        .db('BeiDanChi')
                        .collection('word_list')
                        .insert(insert_obj)

    this.body = {
      status:true,
      result:res.result
    }
}
module.exports = {
    wordAdd,
}