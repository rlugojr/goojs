/*!
  * https://github.com/paulmillr/es6-shim
  * @license es6-shim Copyright 2013-2014 by Paul Miller (http://paulmillr.com)
  *   and contributors,  MIT License
  * es6-shim: v0.22.2
  * see https://github.com/paulmillr/es6-shim/blob/0.22.2/LICENSE
  * Details and documentation:
  * https://github.com/paulmillr/es6-shim/
  */
(function(e,t){if(typeof define==="function"&&define.amd){define(t)}else if(typeof exports==="object"){module.exports=t()}else{e.returnExports=t()}})(this,function(){"use strict";var e=function(e){try{e()}catch(t){return false}return true};var t=function(e,t){try{var r=function(){e.apply(this,arguments)};if(!r.__proto__){return false}Object.setPrototypeOf(r,e);r.prototype=Object.create(e.prototype,{constructor:{value:e}});return t(r)}catch(n){return false}};var r=function(){try{Object.defineProperty({},"x",{});return true}catch(e){return false}};var n=function(){var e=false;if(String.prototype.startsWith){try{"/a/".startsWith(/a/)}catch(t){e=true}}return e};var o=new Function("return this;");var i=o();var a=i.isFinite;var u=!!Object.defineProperty&&r();var s=n();var f=Function.call.bind(String.prototype.indexOf);var c=Function.call.bind(Object.prototype.toString);var l=Function.call.bind(Object.prototype.hasOwnProperty);var h;var p=function(){};var v=i.Symbol||{};var y={string:function(e){return c(e)==="[object String]"},regex:function(e){return c(e)==="[object RegExp]"},symbol:function(e){return typeof i.Symbol==="function"&&typeof e==="symbol"}};var b=function(e,t,r,n){if(!n&&t in e){return}if(u){Object.defineProperty(e,t,{configurable:true,enumerable:false,writable:true,value:r})}else{e[t]=r}};var d={getter:function(e,t,r){if(!u){throw new TypeError("getters require true ES5 support")}Object.defineProperty(e,t,{configurable:true,enumerable:false,get:r})},proxy:function(e,t,r){if(!u){throw new TypeError("getters require true ES5 support")}var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,{configurable:n.configurable,enumerable:n.enumerable,get:function o(){return e[t]},set:function i(r){e[t]=r}})},redefine:function(e,t,r){if(u){var n=Object.getOwnPropertyDescriptor(e,t);n.value=r;Object.defineProperty(e,t,n)}else{e[t]=r}}};var g=function(e,t){Object.keys(t).forEach(function(r){var n=t[r];b(e,r,n,false)})};var m=Object.create||function(e,t){function r(){}r.prototype=e;var n=new r;if(typeof t!=="undefined"){g(n,t)}return n};var w=y.symbol(v.iterator)?v.iterator:"_es6-shim iterator_";if(i.Set&&typeof(new i.Set)["@@iterator"]==="function"){w="@@iterator"}var j=function(e,t){if(!t){t=function n(){return this}}var r={};r[w]=t;g(e,r);if(!e[w]&&y.symbol(w)){e[w]=t}};var I=function Y(e){var t=c(e);var r=t==="[object Arguments]";if(!r){r=t!=="[object Array]"&&e!==null&&typeof e==="object"&&typeof e.length==="number"&&e.length>=0&&c(e.callee)==="[object Function]"}return r};var O={CheckObjectCoercible:function(e,t){if(e==null){throw new TypeError(t||"Cannot call method on "+e)}return e},TypeIsObject:function(e){return e!=null&&Object(e)===e},ToObject:function(e,t){return Object(O.CheckObjectCoercible(e,t))},IsCallable:function(e){return typeof e==="function"&&c(e)==="[object Function]"},ToInt32:function(e){return O.ToNumber(e)>>0},ToUint32:function(e){return O.ToNumber(e)>>>0},ToNumber:function(e){if(c(e)==="[object Symbol]"){throw new TypeError("Cannot convert a Symbol value to a number")}return+e},ToInteger:function(e){var t=O.ToNumber(e);if(Number.isNaN(t)){return 0}if(t===0||!Number.isFinite(t)){return t}return(t>0?1:-1)*Math.floor(Math.abs(t))},ToLength:function(e){var t=O.ToInteger(e);if(t<=0){return 0}if(t>Number.MAX_SAFE_INTEGER){return Number.MAX_SAFE_INTEGER}return t},SameValue:function(e,t){if(e===t){if(e===0){return 1/e===1/t}return true}return Number.isNaN(e)&&Number.isNaN(t)},SameValueZero:function(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)},IsIterable:function(e){return O.TypeIsObject(e)&&(typeof e[w]!=="undefined"||I(e))},GetIterator:function(e){if(I(e)){return new h(e,"value")}var t=e[w];if(!O.IsCallable(t)){throw new TypeError("value is not an iterable")}var r=t.call(e);if(!O.TypeIsObject(r)){throw new TypeError("bad iterator")}return r},IteratorNext:function(e){var t=arguments.length>1?e.next(arguments[1]):e.next();if(!O.TypeIsObject(t)){throw new TypeError("bad iterator")}return t},Construct:function(e,t){var r;if(O.IsCallable(e["@@create"])){r=e["@@create"]()}else{r=m(e.prototype||null)}g(r,{_es6construct:true});var n=e.apply(r,t);return O.TypeIsObject(n)?n:r}};var _=function(e){if(!O.TypeIsObject(e)){throw new TypeError("bad object")}if(!e._es6construct){if(e.constructor&&O.IsCallable(e.constructor["@@create"])){e=e.constructor["@@create"](e)}g(e,{_es6construct:true})}return e};var T=function(){function e(e){var t=Math.floor(e),r=e-t;if(r<.5){return t}if(r>.5){return t+1}return t%2?t+1:t}function t(t,r,n){var o=(1<<r-1)-1,i,a,u,s,f,c,l;if(t!==t){a=(1<<r)-1;u=Math.pow(2,n-1);i=0}else if(t===Infinity||t===-Infinity){a=(1<<r)-1;u=0;i=t<0?1:0}else if(t===0){a=0;u=0;i=1/t===-Infinity?1:0}else{i=t<0;t=Math.abs(t);if(t>=Math.pow(2,1-o)){a=Math.min(Math.floor(Math.log(t)/Math.LN2),1023);u=e(t/Math.pow(2,a)*Math.pow(2,n));if(u/Math.pow(2,n)>=2){a=a+1;u=1}if(a>o){a=(1<<r)-1;u=0}else{a=a+o;u=u-Math.pow(2,n)}}else{a=0;u=e(t/Math.pow(2,1-o-n))}}f=[];for(s=n;s;s-=1){f.push(u%2?1:0);u=Math.floor(u/2)}for(s=r;s;s-=1){f.push(a%2?1:0);a=Math.floor(a/2)}f.push(i?1:0);f.reverse();c=f.join("");l=[];while(c.length){l.push(parseInt(c.slice(0,8),2));c=c.slice(8)}return l}function r(e,t,r){var n=[],o,i,a,u,s,f,c,l;for(o=e.length;o;o-=1){a=e[o-1];for(i=8;i;i-=1){n.push(a%2?1:0);a=a>>1}}n.reverse();u=n.join("");s=(1<<t-1)-1;f=parseInt(u.slice(0,1),2)?-1:1;c=parseInt(u.slice(1,1+t),2);l=parseInt(u.slice(1+t),2);if(c===(1<<t)-1){return l!==0?NaN:f*Infinity}else if(c>0){return f*Math.pow(2,c-s)*(1+l/Math.pow(2,r))}else if(l!==0){return f*Math.pow(2,-(s-1))*(l/Math.pow(2,r))}else{return f<0?-0:0}}function n(e){return r(e,11,52)}function o(e){return t(e,11,52)}function i(e){return r(e,8,23)}function a(e){return t(e,8,23)}var u={toFloat32:function(e){return i(a(e))}};if(typeof Float32Array!=="undefined"){var s=new Float32Array(1);u.toFloat32=function(e){s[0]=e;return s[0]}}return u}();g(String,{fromCodePoint:function et(e){var t=[];var r;for(var n=0,o=arguments.length;n<o;n++){r=Number(arguments[n]);if(!O.SameValue(r,O.ToInteger(r))||r<0||r>1114111){throw new RangeError("Invalid code point "+r)}if(r<65536){t.push(String.fromCharCode(r))}else{r-=65536;t.push(String.fromCharCode((r>>10)+55296));t.push(String.fromCharCode(r%1024+56320))}}return t.join("")},raw:function tt(e){var t=O.ToObject(e,"bad callSite");var r=t.raw;var n=O.ToObject(r,"bad raw value");var o=n.length;var i=O.ToLength(o);if(i<=0){return""}var a=[];var u=0;var s,f,c,l;while(u<i){s=String(u);f=n[s];c=String(f);a.push(c);if(u+1>=i){break}f=u+1<arguments.length?arguments[u+1]:"";l=String(f);a.push(l);u++}return a.join("")}});if(String.fromCodePoint.length!==1){var N=Function.apply.bind(String.fromCodePoint);b(String,"fromCodePoint",function rt(e){return N(this,arguments)},true)}var M={repeat:function(){var e=function(t,r){if(r<1){return""}if(r%2){return e(t,r-1)+t}var n=e(t,r/2);return n+n};return function(t){var r=String(O.CheckObjectCoercible(this));t=O.ToInteger(t);if(t<0||t===Infinity){throw new RangeError("Invalid String#repeat value")}return e(r,t)}}(),startsWith:function(e){var t=String(O.CheckObjectCoercible(this));if(y.regex(e)){throw new TypeError('Cannot call method "startsWith" with a regex')}e=String(e);var r=arguments.length>1?arguments[1]:void 0;var n=Math.max(O.ToInteger(r),0);return t.slice(n,n+e.length)===e},endsWith:function(e){var t=String(O.CheckObjectCoercible(this));if(y.regex(e)){throw new TypeError('Cannot call method "endsWith" with a regex')}e=String(e);var r=t.length;var n=arguments.length>1?arguments[1]:void 0;var o=typeof n==="undefined"?r:O.ToInteger(n);var i=Math.min(Math.max(o,0),r);return t.slice(i-e.length,i)===e},includes:function nt(e){var t=arguments.length>1?arguments[1]:void 0;return f(this,e,t)!==-1},codePointAt:function(e){var t=String(O.CheckObjectCoercible(this));var r=O.ToInteger(e);var n=t.length;if(r>=0&&r<n){var o=t.charCodeAt(r);var i=r+1===n;if(o<55296||o>56319||i){return o}var a=t.charCodeAt(r+1);if(a<56320||a>57343){return o}return(o-55296)*1024+(a-56320)+65536}}};g(String.prototype,M);var S="\x85".trim().length!==1;if(S){delete String.prototype.trim;var E=["	\n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003","\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028","\u2029\ufeff"].join("");var x=new RegExp("(^["+E+"]+)|(["+E+"]+$)","g");g(String.prototype,{trim:function(){if(typeof this==="undefined"||this===null){throw new TypeError("can't convert "+this+" to object")}return String(this).replace(x,"")}})}var C=function(e){this._s=String(O.CheckObjectCoercible(e));this._i=0};C.prototype.next=function(){var e=this._s,t=this._i;if(typeof e==="undefined"||t>=e.length){this._s=void 0;return{value:void 0,done:true}}var r=e.charCodeAt(t),n,o;if(r<55296||r>56319||t+1===e.length){o=1}else{n=e.charCodeAt(t+1);o=n<56320||n>57343?1:2}this._i=t+o;return{value:e.substr(t,o),done:false}};j(C.prototype);j(String.prototype,function(){return new C(this)});if(!s){g(String.prototype,{startsWith:M.startsWith,endsWith:M.endsWith})}var k={from:function(e){var t=arguments.length>1?arguments[1]:void 0;var r=O.ToObject(e,"bad iterable");if(typeof t!=="undefined"&&!O.IsCallable(t)){throw new TypeError("Array.from: when provided, the second argument must be a function")}var n=arguments.length>2;var o=n?arguments[2]:void 0;var i=O.IsIterable(r);var a;var u,s,f;if(i){s=0;u=O.IsCallable(this)?Object(new this):[];var c=i?O.GetIterator(r):null;var l;do{l=O.IteratorNext(c);if(!l.done){f=l.value;if(t){u[s]=n?t.call(o,f,s):t(f,s)}else{u[s]=f}s+=1}}while(!l.done);a=s}else{a=O.ToLength(r.length);u=O.IsCallable(this)?Object(new this(a)):new Array(a);for(s=0;s<a;++s){f=r[s];if(t){u[s]=n?t.call(o,f,s):t(f,s)}else{u[s]=f}}}u.length=a;return u},of:function(){return Array.from(arguments)}};g(Array,k);var P=function(){try{return Array.from({length:-1}).length===0}catch(e){return false}};if(!P()){b(Array,"from",k.from,true)}h=function(e,t){this.i=0;this.array=e;this.kind=t};g(h.prototype,{next:function(){var e=this.i,t=this.array;if(!(this instanceof h)){throw new TypeError("Not an ArrayIterator")}if(typeof t!=="undefined"){var r=O.ToLength(t.length);for(;e<r;e++){var n=this.kind;var o;if(n==="key"){o=e}else if(n==="value"){o=t[e]}else if(n==="entry"){o=[e,t[e]]}this.i=e+1;return{value:o,done:false}}}this.array=void 0;return{value:void 0,done:true}}});j(h.prototype);var A={copyWithin:function(e,t){var r=arguments[2];var n=O.ToObject(this);var o=O.ToLength(n.length);e=O.ToInteger(e);t=O.ToInteger(t);var i=e<0?Math.max(o+e,0):Math.min(e,o);var a=t<0?Math.max(o+t,0):Math.min(t,o);r=typeof r==="undefined"?o:O.ToInteger(r);var u=r<0?Math.max(o+r,0):Math.min(r,o);var s=Math.min(u-a,o-i);var f=1;if(a<i&&i<a+s){f=-1;a+=s-1;i+=s-1}while(s>0){if(l(n,a)){n[i]=n[a]}else{delete n[a]}a+=f;i+=f;s-=1}return n},fill:function(e){var t=arguments.length>1?arguments[1]:void 0;var r=arguments.length>2?arguments[2]:void 0;var n=O.ToObject(this);var o=O.ToLength(n.length);t=O.ToInteger(typeof t==="undefined"?0:t);r=O.ToInteger(typeof r==="undefined"?o:r);var i=t<0?Math.max(o+t,0):Math.min(t,o);var a=r<0?o+r:r;for(var u=i;u<o&&u<a;++u){n[u]=e}return n},find:function ot(e){var t=O.ToObject(this);var r=O.ToLength(t.length);if(!O.IsCallable(e)){throw new TypeError("Array#find: predicate must be a function")}var n=arguments.length>1?arguments[1]:null;for(var o=0,i;o<r;o++){i=t[o];if(n){if(e.call(n,i,o,t)){return i}}else if(e(i,o,t)){return i}}},findIndex:function it(e){var t=O.ToObject(this);var r=O.ToLength(t.length);if(!O.IsCallable(e)){throw new TypeError("Array#findIndex: predicate must be a function")}var n=arguments.length>1?arguments[1]:null;for(var o=0;o<r;o++){if(n){if(e.call(n,t[o],o,t)){return o}}else if(e(t[o],o,t)){return o}}return-1},keys:function(){return new h(this,"key")},values:function(){return new h(this,"value")},entries:function(){return new h(this,"entry")}};if(Array.prototype.keys&&!O.IsCallable([1].keys().next)){delete Array.prototype.keys}if(Array.prototype.entries&&!O.IsCallable([1].entries().next)){delete Array.prototype.entries}if(Array.prototype.keys&&Array.prototype.entries&&!Array.prototype.values&&Array.prototype[w]){g(Array.prototype,{values:Array.prototype[w]});if(y.symbol(v.unscopables)){Array.prototype[v.unscopables].values=true}}g(Array.prototype,A);j(Array.prototype,function(){return this.values()});if(Object.getPrototypeOf){j(Object.getPrototypeOf([].values()))}var R=Math.pow(2,53)-1;g(Number,{MAX_SAFE_INTEGER:R,MIN_SAFE_INTEGER:-R,EPSILON:2.220446049250313e-16,parseInt:i.parseInt,parseFloat:i.parseFloat,isFinite:function(e){return typeof e==="number"&&a(e)},isInteger:function(e){return Number.isFinite(e)&&O.ToInteger(e)===e},isSafeInteger:function(e){return Number.isInteger(e)&&Math.abs(e)<=Number.MAX_SAFE_INTEGER},isNaN:function(e){return e!==e}});if(![,1].find(function(e,t){return t===0})){b(Array.prototype,"find",A.find,true)}if([,1].findIndex(function(e,t){return t===0})!==0){b(Array.prototype,"findIndex",A.findIndex,true)}if(u){g(Object,{assign:function(e,t){if(!O.TypeIsObject(e)){throw new TypeError("target must be an object")}return Array.prototype.reduce.call(arguments,function(e,t){return Object.keys(Object(t)).reduce(function(e,r){e[r]=t[r];return e},e)})},is:function(e,t){return O.SameValue(e,t)},setPrototypeOf:function(e,t){var r;var n=function(e,t){if(!O.TypeIsObject(e)){throw new TypeError("cannot set prototype on a non-object")}if(!(t===null||O.TypeIsObject(t))){throw new TypeError("can only set prototype to an object or null"+t)}};var o=function(e,t){n(e,t);r.call(e,t);return e};try{r=e.getOwnPropertyDescriptor(e.prototype,t).set;r.call({},null)}catch(i){if(e.prototype!=={}[t]){return}r=function(e){this[t]=e};o.polyfill=o(o({},null),e.prototype)instanceof e}return o}(Object,"__proto__")})}if(Object.setPrototypeOf&&Object.getPrototypeOf&&Object.getPrototypeOf(Object.setPrototypeOf({},null))!==null&&Object.getPrototypeOf(Object.create(null))===null){(function(){var e=Object.create(null);var t=Object.getPrototypeOf,r=Object.setPrototypeOf;Object.getPrototypeOf=function(r){var n=t(r);return n===e?null:n};Object.setPrototypeOf=function(t,n){if(n===null){n=e}return r(t,n)};Object.setPrototypeOf.polyfill=false})()}try{Object.keys("foo")}catch(F){var z=Object.keys;Object.keys=function(e){return z(O.ToObject(e))}}if(!RegExp.prototype.flags&&u){var D=function at(){if(!O.TypeIsObject(this)){throw new TypeError("Method called on incompatible type: must be an object.")}var e="";if(this.global){e+="g"}if(this.ignoreCase){e+="i"}if(this.multiline){e+="m"}if(this.unicode){e+="u"}if(this.sticky){e+="y"}return e};d.getter(RegExp.prototype,"flags",D)}var G=function(){try{return String(new RegExp(/a/g,"i"))==="/a/i"}catch(e){return false}}();if(!G&&u){var L=RegExp;var W=function ut(e,t){if(y.regex(e)&&y.string(t)){return new ut(e.source,t)}return new L(e,t)};b(W,"toString",L.toString.bind(L),true);if(Object.setPrototypeOf){Object.setPrototypeOf(L,W)}Object.getOwnPropertyNames(L).forEach(function(e){if(e==="$input"){return}if(e in p){return}d.proxy(L,e,W)});W.prototype=L.prototype;d.redefine(L.prototype,"constructor",W);RegExp=W;d.redefine(i,"RegExp",W)}var V={acosh:function(e){e=Number(e);if(Number.isNaN(e)||e<1){return NaN}if(e===1){return 0}if(e===Infinity){return e}return Math.log(e+Math.sqrt(e*e-1))},asinh:function(e){e=Number(e);if(e===0||!a(e)){return e}return e<0?-Math.asinh(-e):Math.log(e+Math.sqrt(e*e+1))},atanh:function(e){e=Number(e);if(Number.isNaN(e)||e<-1||e>1){return NaN}if(e===-1){return-Infinity}if(e===1){return Infinity}if(e===0){return e}return.5*Math.log((1+e)/(1-e))},cbrt:function(e){e=Number(e);if(e===0){return e}var t=e<0,r;if(t){e=-e}r=Math.pow(e,1/3);return t?-r:r},clz32:function(e){e=Number(e);var t=O.ToUint32(e);if(t===0){return 32}return 32-t.toString(2).length},cosh:function(e){e=Number(e);if(e===0){return 1}if(Number.isNaN(e)){return NaN}if(!a(e)){return Infinity}if(e<0){e=-e}if(e>21){return Math.exp(e)/2}return(Math.exp(e)+Math.exp(-e))/2},expm1:function(e){e=Number(e);if(e===-Infinity){return-1}if(!a(e)||e===0){return e}return Math.exp(e)-1},hypot:function(e,t){var r=false;var n=true;var o=false;var i=[];Array.prototype.every.call(arguments,function(e){var t=Number(e);if(Number.isNaN(t)){r=true}else if(t===Infinity||t===-Infinity){o=true}else if(t!==0){n=false}if(o){return false}else if(!r){i.push(Math.abs(t))}return true});if(o){return Infinity}if(r){return NaN}if(n){return 0}i.sort(function(e,t){return t-e});var a=i[0];var u=i.map(function(e){return e/a});var s=u.reduce(function(e,t){return e+t*t},0);return a*Math.sqrt(s)},log2:function(e){return Math.log(e)*Math.LOG2E},log10:function(e){return Math.log(e)*Math.LOG10E},log1p:function(e){e=Number(e);if(e<-1||Number.isNaN(e)){return NaN}if(e===0||e===Infinity){return e}if(e===-1){return-Infinity}var t=0;var r=50;if(e<0||e>1){return Math.log(1+e)}for(var n=1;n<r;n++){if(n%2===0){t-=Math.pow(e,n)/n}else{t+=Math.pow(e,n)/n}}return t},sign:function(e){var t=+e;if(t===0){return t}if(Number.isNaN(t)){return t}return t<0?-1:1},sinh:function(e){e=Number(e);if(!a(e)||e===0){return e}return(Math.exp(e)-Math.exp(-e))/2},tanh:function(e){e=Number(e);if(Number.isNaN(e)||e===0){return e}if(e===Infinity){return 1}if(e===-Infinity){return-1}return(Math.exp(e)-Math.exp(-e))/(Math.exp(e)+Math.exp(-e))},trunc:function(e){var t=Number(e);return t<0?-Math.floor(-t):Math.floor(t)},imul:function(e,t){e=O.ToUint32(e);t=O.ToUint32(t);var r=e>>>16&65535;var n=e&65535;var o=t>>>16&65535;var i=t&65535;return n*i+(r*i+n*o<<16>>>0)|0},fround:function(e){if(e===0||e===Infinity||e===-Infinity||Number.isNaN(e)){return e}var t=Number(e);return T.toFloat32(t)}};g(Math,V);if(Math.imul(4294967295,5)!==-5){Math.imul=V.imul}var q=function(){var e,t;O.IsPromise=function(e){if(!O.TypeIsObject(e)){return false}if(!e._promiseConstructor){return false}if(typeof e._status==="undefined"){return false}return true};var r=function(e){if(!O.IsCallable(e)){throw new TypeError("bad promise constructor")}var t=this;var r=function(e,r){t.resolve=e;t.reject=r};t.promise=O.Construct(e,[r]);if(!t.promise._es6construct){throw new TypeError("bad promise constructor")}if(!(O.IsCallable(t.resolve)&&O.IsCallable(t.reject))){throw new TypeError("bad promise constructor")}};var n=i.setTimeout;var o;if(typeof window!=="undefined"&&O.IsCallable(window.postMessage)){o=function(){var e=[];var t="zero-timeout-message";var r=function(r){e.push(r);window.postMessage(t,"*")};var n=function(r){if(r.source===window&&r.data===t){r.stopPropagation();if(e.length===0){return}var n=e.shift();n()}};window.addEventListener("message",n,true);return r}}var a=function(){var e=i.Promise;return e&&e.resolve&&function(t){return e.resolve().then(t)}};var u=O.IsCallable(i.setImmediate)?i.setImmediate.bind(i):typeof process==="object"&&process.nextTick?process.nextTick:a()||(O.IsCallable(o)?o():function(e){n(e,0)});var s=function(e,t){if(!O.TypeIsObject(e)){return false}var r=t.resolve;var n=t.reject;try{var o=e.then;if(!O.IsCallable(o)){return false}o.call(e,r,n)}catch(i){n(i)}return true};var f=function(e,t){e.forEach(function(e){u(function(){var r=e.handler;var n=e.capability;var o=n.resolve;var i=n.reject;try{var a=r(t);if(a===n.promise){throw new TypeError("self resolution")}var u=s(a,n);if(!u){o(a)}}catch(f){i(f)}})})};var c=function(e,t,n){return function(o){if(o===e){return n(new TypeError("self resolution"))}var i=e._promiseConstructor;var a=new r(i);var u=s(o,a);if(u){return a.promise.then(t,n)}else{return t(o)}}};e=function(e){var t=this;t=_(t);if(!t._promiseConstructor){throw new TypeError("bad promise")}if(typeof t._status!=="undefined"){throw new TypeError("promise already initialized")}if(!O.IsCallable(e)){throw new TypeError("not a valid resolver")}t._status="unresolved";t._resolveReactions=[];t._rejectReactions=[];var r=function(e){if(t._status!=="unresolved"){return}var r=t._resolveReactions;t._result=e;t._resolveReactions=void 0;t._rejectReactions=void 0;t._status="has-resolution";f(r,e)};var n=function(e){if(t._status!=="unresolved"){return}var r=t._rejectReactions;t._result=e;t._resolveReactions=void 0;t._rejectReactions=void 0;t._status="has-rejection";f(r,e)};try{e(r,n)}catch(o){n(o)}return t};t=e.prototype;var l=function(e,t,r,n){var o=false;return function(i){if(o){return}o=true;t[e]=i;if(--n.count===0){var a=r.resolve;a(t)}}};g(e,{"@@create":function(e){var r=this;var n=r.prototype||t;e=e||m(n);g(e,{_status:void 0,_result:void 0,_resolveReactions:void 0,_rejectReactions:void 0,_promiseConstructor:void 0});e._promiseConstructor=r;return e},all:function h(e){var t=this;var n=new r(t);var o=n.resolve;var i=n.reject;try{if(!O.IsIterable(e)){throw new TypeError("bad iterable")}var a=O.GetIterator(e);var u=[],s={count:1};for(var f=0;;f++){var c=O.IteratorNext(a);if(c.done){break}var h=t.resolve(c.value);var p=l(f,u,n,s);s.count++;h.then(p,n.reject)}if(--s.count===0){o(u)}}catch(v){i(v)}return n.promise},race:function p(e){var t=this;var n=new r(t);var o=n.resolve;var i=n.reject;try{if(!O.IsIterable(e)){throw new TypeError("bad iterable")}var a=O.GetIterator(e);while(true){var u=O.IteratorNext(a);if(u.done){break}var s=t.resolve(u.value);s.then(o,i)}}catch(f){i(f)}return n.promise},reject:function v(e){var t=this;var n=new r(t);var o=n.reject;o(e);return n.promise},resolve:function y(e){var t=this;if(O.IsPromise(e)){var n=e._promiseConstructor;if(n===t){return e}}var o=new r(t);var i=o.resolve;i(e);return o.promise}});g(t,{"catch":function(e){return this.then(void 0,e)},then:function b(e,t){var n=this;if(!O.IsPromise(n)){throw new TypeError("not a promise")}var o=this.constructor;var i=new r(o);if(!O.IsCallable(t)){t=function(e){throw e}}if(!O.IsCallable(e)){e=function(e){return e}}var a=c(n,e,t);var u={capability:i,handler:a};var s={capability:i,handler:t};switch(n._status){case"unresolved":n._resolveReactions.push(u);n._rejectReactions.push(s);break;case"has-resolution":f([u],n._result);break;case"has-rejection":f([s],n._result);break;default:throw new TypeError("unexpected")}return i.promise}});return e}();if(i.Promise){delete i.Promise.accept;delete i.Promise.defer;delete i.Promise.prototype.chain}g(i,{Promise:q});var Z=t(i.Promise,function(e){return e.resolve(42)instanceof e});var U=function(){try{i.Promise.reject(42).then(null,5).then(null,p);return true}catch(e){return false}}();var X=function(){try{Promise.call(3,p)}catch(e){return true}return false}();if(!Z||!U||!X){Promise=q;b(i,"Promise",q,true)}var $=function(e){var t=Object.keys(e.reduce(function(e,t){e[t]=true;return e},{}));return e.join(":")===t.join(":")};var B=$(["z","a","bb"]);var H=$(["z",1,"a","3",2]);if(u){var J=function st(e){if(!B){return null}var t=typeof e;if(t==="string"){return"$"+e}else if(t==="number"){if(!H){return"n"+e}return e}return null};var K=function ft(){return Object.create?Object.create(null):{}};var Q={Map:function(){var e={};function t(e,t){this.key=e;this.value=t;this.next=null;this.prev=null}t.prototype.isRemoved=function(){return this.key===e};function r(e,t){this.head=e._head;this.i=this.head;this.kind=t}r.prototype={next:function(){var e=this.i,t=this.kind,r=this.head,n;if(typeof this.i==="undefined"){return{value:void 0,done:true}}while(e.isRemoved()&&e!==r){e=e.prev}while(e.next!==r){e=e.next;if(!e.isRemoved()){if(t==="key"){n=e.key}else if(t==="value"){n=e.value}else{n=[e.key,e.value]}this.i=e;return{value:n,done:false}}}this.i=void 0;return{value:void 0,done:true}}};j(r.prototype);function n(e){var r=this;if(!O.TypeIsObject(r)){throw new TypeError("Map does not accept arguments when called as a function")}r=_(r);if(!r._es6map){throw new TypeError("bad map")}var n=new t(null,null);n.next=n.prev=n;g(r,{_head:n,_storage:K(),_size:0});if(typeof e!=="undefined"&&e!==null){var o=O.GetIterator(e);var i=r.set;if(!O.IsCallable(i)){throw new TypeError("bad map")}while(true){var a=O.IteratorNext(o);if(a.done){break}var u=a.value;if(!O.TypeIsObject(u)){throw new TypeError("expected iterable of pairs")}i.call(r,u[0],u[1])}}return r}var o=n.prototype;g(n,{"@@create":function(e){var t=this;var r=t.prototype||o;e=e||m(r);g(e,{_es6map:true});return e}});d.getter(n.prototype,"size",function(){if(typeof this._size==="undefined"){throw new TypeError("size method called on incompatible Map")}return this._size});g(n.prototype,{get:function(e){var t=J(e);if(t!==null){var r=this._storage[t];if(r){return r.value}else{return}}var n=this._head,o=n;while((o=o.next)!==n){if(O.SameValueZero(o.key,e)){return o.value}}},has:function(e){var t=J(e);if(t!==null){return typeof this._storage[t]!=="undefined"}var r=this._head,n=r;while((n=n.next)!==r){if(O.SameValueZero(n.key,e)){return true}}return false},set:function(e,r){var n=this._head,o=n,i;var a=J(e);if(a!==null){if(typeof this._storage[a]!=="undefined"){this._storage[a].value=r;return this}else{i=this._storage[a]=new t(e,r);o=n.prev}}while((o=o.next)!==n){if(O.SameValueZero(o.key,e)){o.value=r;return this}}i=i||new t(e,r);if(O.SameValue(-0,e)){i.key=+0}i.next=this._head;i.prev=this._head.prev;i.prev.next=i;i.next.prev=i;this._size+=1;return this},"delete":function(t){var r=this._head,n=r;var o=J(t);if(o!==null){if(typeof this._storage[o]==="undefined"){return false}n=this._storage[o].prev;delete this._storage[o]}while((n=n.next)!==r){if(O.SameValueZero(n.key,t)){n.key=n.value=e;n.prev.next=n.next;n.next.prev=n.prev;this._size-=1;return true}}return false},clear:function(){this._size=0;this._storage=K();var t=this._head,r=t,n=r.next;while((r=n)!==t){r.key=r.value=e;n=r.next;r.next=r.prev=t}t.next=t.prev=t},keys:function(){return new r(this,"key")},values:function(){return new r(this,"value")},entries:function(){return new r(this,"key+value")},forEach:function(e){var t=arguments.length>1?arguments[1]:null;var r=this.entries();for(var n=r.next();!n.done;n=r.next()){if(t){e.call(t,n.value[1],n.value[0],this)}else{e(n.value[1],n.value[0],this)}}}});j(n.prototype,function(){return this.entries()});return n}(),Set:function(){var e=function n(e){var t=this;if(!O.TypeIsObject(t)){throw new TypeError("Set does not accept arguments when called as a function")}t=_(t);if(!t._es6set){throw new TypeError("bad set")}g(t,{"[[SetData]]":null,_storage:K()});if(typeof e!=="undefined"&&e!==null){var r=O.GetIterator(e);var n=t.add;if(!O.IsCallable(n)){throw new TypeError("bad set")}while(true){var o=O.IteratorNext(r);if(o.done){break}var i=o.value;n.call(t,i)}}return t};var t=e.prototype;g(e,{"@@create":function(e){var r=this;var n=r.prototype||t;e=e||m(n);g(e,{_es6set:true});return e}});var r=function o(e){if(!e["[[SetData]]"]){var t=e["[[SetData]]"]=new Q.Map;Object.keys(e._storage).forEach(function(e){if(e.charCodeAt(0)===36){e=e.slice(1)}else if(e.charAt(0)==="n"){e=+e.slice(1)}else{e=+e}t.set(e,e)});e._storage=null}};d.getter(e.prototype,"size",function(){if(typeof this._storage==="undefined"){throw new TypeError("size method called on incompatible Set")}r(this);return this["[[SetData]]"].size});g(e.prototype,{has:function(e){var t;if(this._storage&&(t=J(e))!==null){return!!this._storage[t]}r(this);return this["[[SetData]]"].has(e)},add:function(e){var t;if(this._storage&&(t=J(e))!==null){this._storage[t]=true;return this}r(this);this["[[SetData]]"].set(e,e);return this},"delete":function(e){var t;if(this._storage&&(t=J(e))!==null){var n=l(this._storage,t);return delete this._storage[t]&&n}r(this);return this["[[SetData]]"]["delete"](e)},clear:function(){if(this._storage){this._storage=K()}else{this["[[SetData]]"].clear()}},values:function(){r(this);return this["[[SetData]]"].values()},entries:function(){r(this);return this["[[SetData]]"].entries()},forEach:function(e){var t=arguments.length>1?arguments[1]:null;var n=this;r(n);this["[[SetData]]"].forEach(function(r,o){if(t){e.call(t,o,o,n)}else{e(o,o,n)}})}});b(e,"keys",e.values,true);j(e.prototype,function(){return this.values()});return e}()};g(i,Q);if(i.Map||i.Set){if(typeof i.Map.prototype.clear!=="function"||(new i.Set).size!==0||(new i.Map).size!==0||typeof i.Map.prototype.keys!=="function"||typeof i.Set.prototype.keys!=="function"||typeof i.Map.prototype.forEach!=="function"||typeof i.Set.prototype.forEach!=="function"||e(i.Map)||e(i.Set)||!t(i.Map,function(e){var t=new e([]);t.set(42,42);return t instanceof e})){i.Map=Q.Map;i.Set=Q.Set}}if(i.Set.prototype.keys!==i.Set.prototype.values){b(i.Set.prototype,"keys",i.Set.prototype.values,true)}j(Object.getPrototypeOf((new i.Map).keys()));j(Object.getPrototypeOf((new i.Set).keys()))}return i});
//# sourceMappingURL=es6-shim.map