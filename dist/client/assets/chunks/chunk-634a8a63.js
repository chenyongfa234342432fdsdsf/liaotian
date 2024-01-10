import{c as Ve,d as We,a as Xe,f as Ge,b as Ye,e as Ze}from"./chunk-d8234155.js";import{g as Qe,e as er,d as rr,n as tr,h as nr}from"./chunk-e9cd8943.js";import{a as ar}from"./chunk-09d047a9.js";import{j as sr,b as E,k as ir,m as or}from"./chunk-acb1a683.js";function ur(r){return{layoutProps:{},setLayoutProps:e=>r(()=>e?{layoutProps:e}:{}),columnsDataByCd:{},setColumnsDataByCd:e=>r(Ge(t=>{t.columnsDataByCd=e}))}}const Ue=Ve(We(ur,{name:"layout-store"})),jt=Xe(Ue);function cr(r,e,t){return{webTitle:e||(r==null?void 0:r.webTitle)||"",description:t||(r==null?void 0:r.description)||"",author:(r==null?void 0:r.author)||"",keywords:(r==null?void 0:r.keywords)||"",copyright:(r==null?void 0:r.copyright)||"",webUrl:(r==null?void 0:r.webUrl)||"",businessName:(r==null?void 0:r.businessName)||"",imgWebIcon:(r==null?void 0:r.imgWebIcon)||"",webShareCoverUrl:(r==null?void 0:r.shareCoverUrl)||""}}var Z={exports:{}},qe=function(e,t){return function(){for(var n=new Array(arguments.length),s=0;s<n.length;s++)n[s]=arguments[s];return e.apply(t,n)}},fr=qe,C=Object.prototype.toString;function Q(r){return C.call(r)==="[object Array]"}function G(r){return typeof r>"u"}function lr(r){return r!==null&&!G(r)&&r.constructor!==null&&!G(r.constructor)&&typeof r.constructor.isBuffer=="function"&&r.constructor.isBuffer(r)}function dr(r){return C.call(r)==="[object ArrayBuffer]"}function hr(r){return typeof FormData<"u"&&r instanceof FormData}function mr(r){var e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(r):e=r&&r.buffer&&r.buffer instanceof ArrayBuffer,e}function pr(r){return typeof r=="string"}function vr(r){return typeof r=="number"}function Ne(r){return r!==null&&typeof r=="object"}function k(r){if(C.call(r)!=="[object Object]")return!1;var e=Object.getPrototypeOf(r);return e===null||e===Object.prototype}function br(r){return C.call(r)==="[object Date]"}function gr(r){return C.call(r)==="[object File]"}function wr(r){return C.call(r)==="[object Blob]"}function je(r){return C.call(r)==="[object Function]"}function Er(r){return Ne(r)&&je(r.pipe)}function Cr(r){return typeof URLSearchParams<"u"&&r instanceof URLSearchParams}function yr(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")}function Sr(){return typeof navigator<"u"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window<"u"&&typeof document<"u"}function ee(r,e){if(!(r===null||typeof r>"u"))if(typeof r!="object"&&(r=[r]),Q(r))for(var t=0,a=r.length;t<a;t++)e.call(null,r[t],t,r);else for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.call(null,r[n],n,r)}function Y(){var r={};function e(n,s){k(r[s])&&k(n)?r[s]=Y(r[s],n):k(n)?r[s]=Y({},n):Q(n)?r[s]=n.slice():r[s]=n}for(var t=0,a=arguments.length;t<a;t++)ee(arguments[t],e);return r}function xr(r,e,t){return ee(e,function(n,s){t&&typeof n=="function"?r[s]=fr(n,t):r[s]=n}),r}function Rr(r){return r.charCodeAt(0)===65279&&(r=r.slice(1)),r}var v={isArray:Q,isArrayBuffer:dr,isBuffer:lr,isFormData:hr,isArrayBufferView:mr,isString:pr,isNumber:vr,isObject:Ne,isPlainObject:k,isUndefined:G,isDate:br,isFile:gr,isBlob:wr,isFunction:je,isStream:Er,isURLSearchParams:Cr,isStandardBrowserEnv:Sr,forEach:ee,merge:Y,extend:xr,trim:yr,stripBOM:Rr},y=v;function ie(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Be=function(e,t,a){if(!t)return e;var n;if(a)n=a(t);else if(y.isURLSearchParams(t))n=t.toString();else{var s=[];y.forEach(t,function(l,i){l===null||typeof l>"u"||(y.isArray(l)?i=i+"[]":l=[l],y.forEach(l,function(h){y.isDate(h)?h=h.toISOString():y.isObject(h)&&(h=JSON.stringify(h)),s.push(ie(i)+"="+ie(h))}))}),n=s.join("&")}if(n){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+n}return e},Ar=v;function q(){this.handlers=[]}q.prototype.use=function(e,t,a){return this.handlers.push({fulfilled:e,rejected:t,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1};q.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};q.prototype.forEach=function(e){Ar.forEach(this.handlers,function(a){a!==null&&e(a)})};var Tr=q,Or=v,kr=function(e,t){Or.forEach(e,function(n,s){s!==t&&s.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[s])})},Le=function(e,t,a,n,s){return e.config=t,a&&(e.code=a),e.request=n,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},B,oe;function De(){if(oe)return B;oe=1;var r=Le;return B=function(t,a,n,s,o){var u=new Error(t);return r(u,a,n,s,o)},B}var L,ue;function Ur(){if(ue)return L;ue=1;var r=De();return L=function(t,a,n){var s=n.config.validateStatus;!n.status||!s||s(n.status)?t(n):a(r("Request failed with status code "+n.status,n.config,null,n.request,n))},L}var D,ce;function qr(){if(ce)return D;ce=1;var r=v;return D=r.isStandardBrowserEnv()?function(){return{write:function(a,n,s,o,u,l){var i=[];i.push(a+"="+encodeURIComponent(n)),r.isNumber(s)&&i.push("expires="+new Date(s).toGMTString()),r.isString(o)&&i.push("path="+o),r.isString(u)&&i.push("domain="+u),l===!0&&i.push("secure"),document.cookie=i.join("; ")},read:function(a){var n=document.cookie.match(new RegExp("(^|;\\s*)("+a+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(a){this.write(a,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),D}var $,fe;function Nr(){return fe||(fe=1,$=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}),$}var I,le;function jr(){return le||(le=1,I=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}),I}var F,de;function Br(){if(de)return F;de=1;var r=Nr(),e=jr();return F=function(a,n){return a&&!r(n)?e(a,n):n},F}var H,he;function Lr(){if(he)return H;he=1;var r=v,e=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return H=function(a){var n={},s,o,u;return a&&r.forEach(a.split(`
`),function(i){if(u=i.indexOf(":"),s=r.trim(i.substr(0,u)).toLowerCase(),o=r.trim(i.substr(u+1)),s){if(n[s]&&e.indexOf(s)>=0)return;s==="set-cookie"?n[s]=(n[s]?n[s]:[]).concat([o]):n[s]=n[s]?n[s]+", "+o:o}}),n},H}var M,me;function Dr(){if(me)return M;me=1;var r=v;return M=r.isStandardBrowserEnv()?function(){var t=/(msie|trident)/i.test(navigator.userAgent),a=document.createElement("a"),n;function s(o){var u=o;return t&&(a.setAttribute("href",u),u=a.href),a.setAttribute("href",u),{href:a.href,protocol:a.protocol?a.protocol.replace(/:$/,""):"",host:a.host,search:a.search?a.search.replace(/^\?/,""):"",hash:a.hash?a.hash.replace(/^#/,""):"",hostname:a.hostname,port:a.port,pathname:a.pathname.charAt(0)==="/"?a.pathname:"/"+a.pathname}}return n=s(window.location.href),function(u){var l=r.isString(u)?s(u):u;return l.protocol===n.protocol&&l.host===n.host}}():function(){return function(){return!0}}(),M}var _,pe;function ve(){if(pe)return _;pe=1;var r=v,e=Ur(),t=qr(),a=Be,n=Br(),s=Lr(),o=Dr(),u=De();return _=function(i){return new Promise(function(h,d){var f=i.data,R=i.headers,A=i.responseType;r.isFormData(f)&&delete R["Content-Type"];var c=new XMLHttpRequest;if(i.auth){var ze=i.auth.username||"",Pe=i.auth.password?unescape(encodeURIComponent(i.auth.password)):"";R.Authorization="Basic "+btoa(ze+":"+Pe)}var ne=n(i.baseURL,i.url);c.open(i.method.toUpperCase(),a(ne,i.params,i.paramsSerializer),!0),c.timeout=i.timeout;function ae(){if(c){var w="getAllResponseHeaders"in c?s(c.getAllResponseHeaders()):null,g=!A||A==="text"||A==="json"?c.responseText:c.response,T={data:g,status:c.status,statusText:c.statusText,headers:w,config:i,request:c};e(h,d,T),c=null}}if("onloadend"in c?c.onloadend=ae:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(ae)},c.onabort=function(){c&&(d(u("Request aborted",i,"ECONNABORTED",c)),c=null)},c.onerror=function(){d(u("Network Error",i,null,c)),c=null},c.ontimeout=function(){var g="timeout of "+i.timeout+"ms exceeded";i.timeoutErrorMessage&&(g=i.timeoutErrorMessage),d(u(g,i,i.transitional&&i.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",c)),c=null},r.isStandardBrowserEnv()){var se=(i.withCredentials||o(ne))&&i.xsrfCookieName?t.read(i.xsrfCookieName):void 0;se&&(R[i.xsrfHeaderName]=se)}"setRequestHeader"in c&&r.forEach(R,function(g,T){typeof f>"u"&&T.toLowerCase()==="content-type"?delete R[T]:c.setRequestHeader(T,g)}),r.isUndefined(i.withCredentials)||(c.withCredentials=!!i.withCredentials),A&&A!=="json"&&(c.responseType=i.responseType),typeof i.onDownloadProgress=="function"&&c.addEventListener("progress",i.onDownloadProgress),typeof i.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",i.onUploadProgress),i.cancelToken&&i.cancelToken.promise.then(function(g){c&&(c.abort(),d(g),c=null)}),f||(f=null),c.send(f)})},_}var p=v,be=kr,$r=Le,Ir={"Content-Type":"application/x-www-form-urlencoded"};function ge(r,e){!p.isUndefined(r)&&p.isUndefined(r["Content-Type"])&&(r["Content-Type"]=e)}function Fr(){var r;return(typeof XMLHttpRequest<"u"||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]")&&(r=ve()),r}var N={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:Fr(),transformRequest:[function(e,t){return be(t,"Accept"),be(t,"Content-Type"),p.isFormData(e)||p.isArrayBuffer(e)||p.isBuffer(e)||p.isStream(e)||p.isFile(e)||p.isBlob(e)?e:p.isArrayBufferView(e)?e.buffer:p.isURLSearchParams(e)?(ge(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):p.isObject(e)||t&&t["Content-Type"]==="application/json"?(ge(t,"application/json"),JSON.stringify(e)):e}],transformResponse:[function(e){var t=this.transitional,a=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,s=!a&&this.responseType==="json";if(s||n&&p.isString(e)&&e.length)try{return JSON.parse(e)}catch(o){if(s)throw o.name==="SyntaxError"?$r(o,this,"E_JSON_PARSE"):o}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};N.headers={common:{Accept:"application/json, text/plain, */*"}};p.forEach(["delete","get","head"],function(e){N.headers[e]={}});p.forEach(["post","put","patch"],function(e){N.headers[e]=p.merge(Ir)});var re=N,Hr=v,Mr=re,_r=function(e,t,a){var n=this||Mr;return Hr.forEach(a,function(o){e=o.call(n,e,t)}),e},J,we;function $e(){return we||(we=1,J=function(e){return!!(e&&e.__CANCEL__)}),J}var Ee=v,K=_r,Jr=$e(),Kr=re;function z(r){r.cancelToken&&r.cancelToken.throwIfRequested()}var zr=function(e){z(e),e.headers=e.headers||{},e.data=K.call(e,e.data,e.headers,e.transformRequest),e.headers=Ee.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),Ee.forEach(["delete","get","head","post","put","patch","common"],function(n){delete e.headers[n]});var t=e.adapter||Kr.adapter;return t(e).then(function(n){return z(e),n.data=K.call(e,n.data,n.headers,e.transformResponse),n},function(n){return Jr(n)||(z(e),n&&n.response&&(n.response.data=K.call(e,n.response.data,n.response.headers,e.transformResponse))),Promise.reject(n)})},m=v,Ie=function(e,t){t=t||{};var a={},n=["url","method","data"],s=["headers","auth","proxy","params"],o=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],u=["validateStatus"];function l(d,f){return m.isPlainObject(d)&&m.isPlainObject(f)?m.merge(d,f):m.isPlainObject(f)?m.merge({},f):m.isArray(f)?f.slice():f}function i(d){m.isUndefined(t[d])?m.isUndefined(e[d])||(a[d]=l(void 0,e[d])):a[d]=l(e[d],t[d])}m.forEach(n,function(f){m.isUndefined(t[f])||(a[f]=l(void 0,t[f]))}),m.forEach(s,i),m.forEach(o,function(f){m.isUndefined(t[f])?m.isUndefined(e[f])||(a[f]=l(void 0,e[f])):a[f]=l(void 0,t[f])}),m.forEach(u,function(f){f in t?a[f]=l(e[f],t[f]):f in e&&(a[f]=l(void 0,e[f]))});var x=n.concat(s).concat(o).concat(u),h=Object.keys(e).concat(Object.keys(t)).filter(function(f){return x.indexOf(f)===-1});return m.forEach(h,i),a};const Pr="axios",Vr="0.21.3",Wr="Promise based HTTP client for the browser and node.js",Xr="index.js",Gr={test:"grunt test",start:"node ./sandbox/server.js",build:"NODE_ENV=production grunt build",preversion:"npm test",version:"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",postversion:"git push && git push --tags",examples:"node ./examples/server.js",coveralls:"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",fix:"eslint --fix lib/**/*.js"},Yr={type:"git",url:"https://github.com/axios/axios.git"},Zr=["xhr","http","ajax","promise","node"],Qr="Matt Zabriskie",et="MIT",rt={url:"https://github.com/axios/axios/issues"},tt="https://axios-http.com",nt={coveralls:"^3.0.0","es6-promise":"^4.2.4",grunt:"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1",karma:"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2",minimist:"^1.2.0",mocha:"^8.2.1",sinon:"^4.5.0","terser-webpack-plugin":"^4.2.3",typescript:"^4.0.5","url-search-params":"^0.10.0",webpack:"^4.44.2","webpack-dev-server":"^3.11.0"},at={"./lib/adapters/http.js":"./lib/adapters/xhr.js"},st="dist/axios.min.js",it="dist/axios.min.js",ot="./index.d.ts",ut={"follow-redirects":"^1.14.0"},ct=[{path:"./dist/axios.min.js",threshold:"5kB"}],ft={name:Pr,version:Vr,description:Wr,main:Xr,scripts:Gr,repository:Yr,keywords:Zr,author:Qr,license:et,bugs:rt,homepage:tt,devDependencies:nt,browser:at,jsdelivr:st,unpkg:it,typings:ot,dependencies:ut,bundlesize:ct};var Fe=ft,te={};["object","boolean","number","function","string","symbol"].forEach(function(r,e){te[r]=function(a){return typeof a===r||"a"+(e<1?"n ":" ")+r}});var Ce={},lt=Fe.version.split(".");function He(r,e){for(var t=e?e.split("."):lt,a=r.split("."),n=0;n<3;n++){if(t[n]>a[n])return!0;if(t[n]<a[n])return!1}return!1}te.transitional=function(e,t,a){var n=t&&He(t);function s(o,u){return"[Axios v"+Fe.version+"] Transitional option '"+o+"'"+u+(a?". "+a:"")}return function(o,u,l){if(e===!1)throw new Error(s(u," has been removed in "+t));return n&&!Ce[u]&&(Ce[u]=!0,console.warn(s(u," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(o,u,l):!0}};function dt(r,e,t){if(typeof r!="object")throw new TypeError("options must be an object");for(var a=Object.keys(r),n=a.length;n-- >0;){var s=a[n],o=e[s];if(o){var u=r[s],l=u===void 0||o(u,s,r);if(l!==!0)throw new TypeError("option "+s+" must be "+l);continue}if(t!==!0)throw Error("Unknown option "+s)}}var ht={isOlderVersion:He,assertOptions:dt,validators:te},Me=v,mt=Be,ye=Tr,Se=zr,j=Ie,_e=ht,S=_e.validators;function O(r){this.defaults=r,this.interceptors={request:new ye,response:new ye}}O.prototype.request=function(e){typeof e=="string"?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=j(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;t!==void 0&&_e.assertOptions(t,{silentJSONParsing:S.transitional(S.boolean,"1.0.0"),forcedJSONParsing:S.transitional(S.boolean,"1.0.0"),clarifyTimeoutError:S.transitional(S.boolean,"1.0.0")},!1);var a=[],n=!0;this.interceptors.request.forEach(function(d){typeof d.runWhen=="function"&&d.runWhen(e)===!1||(n=n&&d.synchronous,a.unshift(d.fulfilled,d.rejected))});var s=[];this.interceptors.response.forEach(function(d){s.push(d.fulfilled,d.rejected)});var o;if(!n){var u=[Se,void 0];for(Array.prototype.unshift.apply(u,a),u=u.concat(s),o=Promise.resolve(e);u.length;)o=o.then(u.shift(),u.shift());return o}for(var l=e;a.length;){var i=a.shift(),x=a.shift();try{l=i(l)}catch(h){x(h);break}}try{o=Se(l)}catch(h){return Promise.reject(h)}for(;s.length;)o=o.then(s.shift(),s.shift());return o};O.prototype.getUri=function(e){return e=j(this.defaults,e),mt(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")};Me.forEach(["delete","get","head","options"],function(e){O.prototype[e]=function(t,a){return this.request(j(a||{},{method:e,url:t,data:(a||{}).data}))}});Me.forEach(["post","put","patch"],function(e){O.prototype[e]=function(t,a,n){return this.request(j(n||{},{method:e,url:t,data:a}))}});var pt=O,P,xe;function Je(){if(xe)return P;xe=1;function r(e){this.message=e}return r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,P=r,P}var V,Re;function vt(){if(Re)return V;Re=1;var r=Je();function e(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var a;this.promise=new Promise(function(o){a=o});var n=this;t(function(o){n.reason||(n.reason=new r(o),a(n.reason))})}return e.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},e.source=function(){var a,n=new e(function(o){a=o});return{token:n,cancel:a}},V=e,V}var W,Ae;function bt(){return Ae||(Ae=1,W=function(e){return function(a){return e.apply(null,a)}}),W}var X,Te;function gt(){return Te||(Te=1,X=function(e){return typeof e=="object"&&e.isAxiosError===!0}),X}var Oe=v,wt=qe,U=pt,Et=Ie,Ct=re;function Ke(r){var e=new U(r),t=wt(U.prototype.request,e);return Oe.extend(t,U.prototype,e),Oe.extend(t,e),t}var b=Ke(Ct);b.Axios=U;b.create=function(e){return Ke(Et(b.defaults,e))};b.Cancel=Je();b.CancelToken=vt();b.isCancel=$e();b.all=function(e){return Promise.all(e)};b.spread=bt();b.isAxiosError=gt();Z.exports=b;Z.exports.default=b;var yt=Z.exports,St=yt;const xt=Qe(St),{getEnvS3Url:Rt,S3UrlNameEnum:At,ExtTypesEnum:ke,EnvTypesEnum:Tt,getEnvSecretS3KeyConfig:Bt}=er;async function Ot(r,e){const t=Rt(e,r,At.dnsConfig,e===Tt.production?ke.im:ke.default);return xt.get(t).then(a=>a.data).catch(a=>{console.error(a),console.error("动态获取不同商户、环境下的 s3 相关地址错误，请检查 businessId 是否正确"),console.error(`businessId: ${r}`),console.error(t),typeof window>"u"&&process.exit(1)})}sr();async function Lt(r,{keepScrollPosition:e=!1,overwriteLastHistoryEntry:t=!1}={}){E(ir(),"The navigate() function can be called only on the client-side",{showStackTrace:!0});const a="navigate() works only with Client Routing, see https://vike.dev/navigate";E(or(),a,{showStackTrace:!0}),E(r,"[navigate(url)] Missing argument url",{showStackTrace:!0}),E(typeof r=="string","[navigate(url)] Argument url should be a string",{showStackTrace:!0}),E(typeof e=="boolean","[navigate(url, { keepScrollPosition })] Argument keepScrollPosition should be a boolean",{showStackTrace:!0}),E(typeof t=="boolean","[navigate(url, { overwriteLastHistoryEntry })] Argument overwriteLastHistoryEntry should be a boolean",{showStackTrace:!0}),E(r.startsWith("/"),"[navigate(url)] Argument url should start with a leading /",{showStackTrace:!0}),await ar({scrollTarget:e?"preserve-scroll":"scroll-to-top-or-hash",urlOriginal:r,overwriteLastHistoryEntry:t,isBackwardNavigation:!1})}const Dt=r=>/^([a-z]+:\/\/|\/\/)/i.test(r);function $t(){console.log(`version: ${nr}`)}function It(){const{layoutProps:r}=Ue.getState();return cr(r).businessName}function Ft(){return Ye.getState().theme===Ze.light?"_white":"_black"}async function Ht(r){return Ot(r,tr).then(async e=>{var n,s;const t=await rr();return((n=e==null?void 0:e.ACCESS_KEY)==null?void 0:n[t.toLowerCase()])||((s=e==null?void 0:e.ACCESS_KEY)==null?void 0:s.web)}).catch(e=>!1)}export{Ht as a,Ft as b,xt as c,Ue as d,It as g,Dt as i,$t as l,Lt as n,jt as u};