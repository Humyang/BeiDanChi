var app = require('koa')()
var serve = require('koa-static');
app.use(serve('../dist'));
app.listen(80);
console.log('listening on port 80');