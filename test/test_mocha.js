var expected = 0;
var actual = 0;

function assert(expr, msg) {
  if (!expr) throw new Error(msg || 'assertion failed');
  actual++;
}

function expect(n) {
  expected = n;
}

function reset() {
  expected = 0;
  actual = 0;
}

function check() {
  console.log('111')
  if (!expected || expected == actual) return;
  var err = new Error('expected ' + expected + ' assertions, got ' + actual);
  this.currentTest.emit('error', err);
}

//在开始测试前设置初始值
beforeEach(reset);
//每个测试（it 方法）完成（执行 done 之后）后检测期望是否符合预期
afterEach(check);  

describe('something', function(){
  it('should work', function(done){
    //设置期望值为 2
    expect(2);

    setTimeout(function(){
      //每次 assert，实际值会 +1
      assert('wahoo')
    }, 50);

    setTimeout(function(){
      assert('hey')
    }, 50);
    setTimeout(function(){
      assert('hey')
    }, 50);
    setTimeout(function(){
      assert('hey')
    }, 50);
    // setTimeout(function(){
    //   assert(null,'some erro ')
    // }, 500);
    setTimeout(function(){
      //调用 done
      done();
    }, 1000);
  })
  it('should work1', function(done){
    //设置期望值为 2
    expect(2);

    setTimeout(function(){
      //每次 assert，实际值会 +1
      assert('wahoo')
    }, 50);

    setTimeout(function(){
      assert('hey')
    }, 50);
    setTimeout(function(){
      assert('hey')
    }, 50);
    setTimeout(function(){
      assert('hey')
    }, 50);
    // setTimeout(function(){
    //   assert(null,'some erro ')
    // }, 500);
    setTimeout(function(){
      //调用 done
      done();
    }, 1000);
  })
})
describe('something2', function(){
  it('should work', function(done){
    expect(2);

    setTimeout(function(){
      assert('wahoo')
    }, 50);

    setTimeout(function(){
      assert('hey')
    }, 150);
    // setTimeout(function(){
    //   assert(null,'some erro ')
    // }, 500);
    setTimeout(function(){
      done();
    }, 1000);
  })
})