function throwError(obj){
    throw new Error(JSON.stringify(obj))
}
module.exports = {
    throwError
}