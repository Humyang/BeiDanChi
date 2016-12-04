function throwError(obj,msg){
    obj.MSG = obj.MSG + msg
    throw new Error(JSON.stringify(obj))
}
module.exports = {
    throwError
}