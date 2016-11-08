export const timeFormat = function(timestamp){
    console.log('timestamp',timestamp)

    if(timestamp!=undefined){
        let cueent_time = new Date()
        let time = new Date(timestamp) 
        if(cueent_time.getTime() > time){
            return true
        }
        return time.toLocaleDateString() +" "+ time.toLocaleTimeString()
    }

    return "unkonw"
}
// 账号验证
export const verifyUserName = function(username){
    return true
}
// 验证密码格式
export const verfyPassword = function(password){
    return false
}
