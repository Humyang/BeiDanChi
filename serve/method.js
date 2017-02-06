// 账号验证
var verifyUserName = function(username){
    return true
}
// 验证密码格式
var verfyPassword = function(password){
    return false
}
// 历史记录的添加
var historyAdd = function(object,sentence){
    var now = new Date()
    var localstring = new Date(now.toLocaleDateString()).getTime()
    var history = object
    if (typeof history === 'string') {
        try {
            history = JSON.parse(history)
        } catch (err) {

        }
    }
    if(history != undefined && typeof history === 'object'){
        if(localstring > history[history.length - 1].date){
            history.push({date:localstring,item:[sentence]})
        }
        else if(localstring === history[history.length - 1].date){
            history[history.length - 1].item.push(sentence)
        }
        else{
            history.push({date:localstring,item:[sentence]})
        }
    }else{
        
        history = []
        history.push({date:localstring,item:[sentence]})
    }
    return history
}
module.exports = {
    verifyUserName:verifyUserName,
    verfyPassword:verfyPassword,
    historyAdd:historyAdd
}
