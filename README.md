## ExtendScriptStream

a result of Adobe ExtendScript(JSX) to Writable/Transform stream.

## Usage

    $ npm install extendscript-stream

then

### ExtendScriptStream

``` js
// Writable stream
var jsx_stream = new ExtendScriptStream;
var jsx = fs.createReadStream('./test.jsx');
jsx.pipe(jsx_stream);
jsx_stream.on('finish',function(){
  console.log(this.output);
});
```

### ExtendScriptTransformStream

ReadableStream => ExtendScriptTransformStream => [JSONStream](https://github.com/dominictarr/JSONStream)

ind_json.jsx

``` js
#target InDesign-7.0

JSON=new Object();JSON.stringify=function(e){var e=e;var c={}.hasOwnProperty?true:false;var d=function(i){return i<10?"0"+i:i};var a={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function b(i){if(/["\\\x00-\x1f]/.test(i)){return'"'+i.replace(/([\x00-\x1f\\"])/g,function(k,j){var l=a[j];if(l){return l}return j})+'"'}return'"'+i+'"'}function f(q){var m=["["],j,p,k=q.length,n;for(p=0;p<k;p+=1){n=q[p];switch(typeof n){case"undefined":case"function":case"unknown":break;default:if(j){m.push(",")}m.push(n==null?"null":JSON.parse(n));j=true}}m.push("]");return m.join("")}function h(i){return'"'+i.getFullYear()+"-"+d(i.getMonth()+1)+"-"+d(i.getDate())+"T"+d(i.getHours())+":"+d(i.getMinutes())+":"+d(i.getSeconds())+'"'}function g(n){if(typeof n=="undefined"||n===null){return"null"}else{if(n instanceof Date){return h(n)}else{if(typeof n=="string"){return b(n)}else{if(typeof n=="number"){return isFinite(n)?String(n):"null"}else{if(typeof n=="boolean"){return String(n)}else{if(n instanceof Array){return f(n)}else{var k=["{"],j,m,l;for(m in n){l=n[m];switch(typeof l){case"undefined":case"function":case"unknown":break;default:if(j){k.push(",")}k.push(g(m),":",l===null?"null":g(l));j=true}}k.push("}");return k.join("")}}}}}}}return g(e)};JSON.parse=function(json){return eval("("+json+")")};

var data = {
  "text": "this is text",
  "bounds": {
    "x": 0,
    "y": 0,
    "w": 20,
    "h": 20,
    "target": "this is target"
  }
};

var json = JSON.stringify(data);
$.write(json);
```

run script

``` js
var fs = require('fs'),
    ExtendScriptTransformStream = require('extendscript-stream').ExtendScriptTransformStream,
    JSONStream = require('JSONStream');
 
var jsx = fs.createReadStream('./ind_json.jsx');
var ests = new ExtendScriptTransformStream;
var jst = JSONStream.parse('bounds.target');
 
jsx.pipe(ests).pipe(jst);
jst.on('data',function(data){
  // ExtendScript to Nodejs!!
  console.log(data);
});
```
