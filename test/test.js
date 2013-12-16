var fs = require('fs'),
    should = require('should'),
    ExtendScriptStream = require('../index').ExtendScriptStream,
    ExtendScriptTransformStream = require('../index').ExtendScriptTransformStream;

describe('ExtendScriptStream test', function(){
  var jsx_stream = new ExtendScriptStream;
  
  it('ExtendScriptStream is writable stream', function(done){
    jsx_stream.writable.should.be.true;
    done();
  });

  it('write to ExtendScriptStream, get execute script result', function(done){
    var jsx = fs.createReadStream(__dirname+'/test.jsx');
    jsx.pipe(jsx_stream);
    jsx_stream.on('finish',function(){
      this.output.should.eql("extendscript done!\r");
      done();
    });
  });
});

describe('ExtendScriptTransformStream', function(){
  var  jsx_transform_stream = new ExtendScriptTransformStream;
  it('write to ExtendScriptStream, get result as stream',function(done){
    var jsx = fs.createReadStream(__dirname+'/ind_json.jsx');
    var out = fs.createWriteStream(__dirname+'/data.json');
    jsx.pipe(jsx_transform_stream).pipe(out);
    jsx_transform_stream.on('finish',function(){
      fs.readFile(__dirname+'/data.json',function(err,data){
        data.toString().should.eql('{\"text\":\"this is text\",\"bounds\":{\"x\":0,\"y\":0,\"w\":20,\"h\":20,\"target\":\"this is target\"}}');
        fs.unlink(__dirname+'/data.json');
        done();
      });
      
    });
  });
});
