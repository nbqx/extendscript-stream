var fs = require('fs'),
    ExtendScriptTransformStream = require(__dirname+'/../index').ExtendScriptTransformStream,
    JSONStream = require('JSONStream');

var jsx = fs.createReadStream(__dirname+'/ind_json.jsx');
var ests = new ExtendScriptTransformStream;
var jst = JSONStream.parse('bounds.target');

jsx.pipe(ests).pipe(jst);
jst.on('data',function(data){
  console.log(data);
});
