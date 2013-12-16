var Writable = require('stream').Writable,
    Transform = require('stream').Transform,
    util = require('util'),
    fakestk = require('fakestk');

util.inherits(ExtendScriptStream, Writable);

// Writable Stream
function ExtendScriptStream(){
  Writable.call(this);
};

ExtendScriptStream.prototype._write = function(data,encoding,done){
  var self = this;
  fakestk.run(data, function(err,result){
    if(err) return done(err);
    if(result!==''){
      self.output = result;
      done();
    }
  });
};

exports.ExtendScriptStream = ExtendScriptStream;

// Transform Stream

util.inherits(ExtendScriptTransformStream, Transform);

function ExtendScriptTransformStream(){
  Transform.call(this);
};

ExtendScriptTransformStream.prototype._transform = function(chunk,encoding,done){
  var self = this;
  fakestk.run(chunk+'',function(err,result){
    if(err) return done(err);
    self.push(new Buffer(result,'utf8'));
    done();
  });
};

exports.ExtendScriptTransformStream = ExtendScriptTransformStream;
