import{i as Cr}from"./chunk-d8234155.js";/* empty css              */import"./chunk-23179642.js";import{I as Ze}from"./chunk-1a70223d.js";import{c as ze}from"./chunk-99b8f121.js";import{I as Me}from"./chunk-d80cdd1c.js";import{r as f,R as V}from"./chunk-e9cd8943.js";import{I as _r,u as Nr}from"./chunk-24e4639c.js";import{u as Er}from"./chunk-79739c92.js";import{u as Or}from"./chunk-8f68cdf3.js";import{r as Ir}from"./chunk-0feb7138.js";import{H as Sr}from"./chunk-93e6d3ec.js";import{u as Pr,j as Tr,k as Ue,s as jr,l as Rr}from"./chunk-ff689da6.js";import{c as Mr}from"./chunk-5af0d2a0.js";import{l as qe}from"./chunk-ba3e3861.js";import{j as c,a as oe,F as er}from"./chunk-c1d16543.js";import{C as ye,u as rr,c as G,o as tr,I as nr,_ as ir,r as ar,i as or,h as fe,g as kr,t as Ar,n as ke}from"./chunk-36a75920.js";import{T as Ee,a as Dr,b as Lr,u as sr}from"./chunk-cd3d6459.js";import{I as $r}from"./chunk-260fa0dc.js";import{R as lr}from"./chunk-c1540bb6.js";import{u as Vr}from"./chunk-b4d6f2f0.js";import{t as Fr}from"./chunk-ec38f500.js";import{u as je}from"./chunk-01660bad.js";import{d as Hr}from"./chunk-fde55823.js";import{C as Br}from"./chunk-a406d0a9.js";import"./chunk-d4125093.js";import"./chunk-cf010ec4.js";import"./chunk-b745fb4d.js";import"./chunk-2bf04c59.js";import"./chunk-5dde6c82.js";import"./chunk-38ad52ab.js";import"./chunk-b3e26e36.js";import"./chunk-1d6b0b39.js";import"./chunk-d368c681.js";import"./chunk-e3775f6c.js";import"./chunk-61229905.js";import"./chunk-5f195378.js";import"./chunk-634a8a63.js";import"./chunk-09d047a9.js";import"./chunk-acb1a683.js";import"./chunk-6b5946cf.js";import"./chunk-b720646a.js";import"./chunk-ec284ae6.js";import"./chunk-3a21c360.js";import"./chunk-01f7121e.js";import"./chunk-77df718a.js";/* empty css              */import"./chunk-78c1d4c8.js";import"./chunk-cfcc25a6.js";import"./chunk-e9c2c122.js";import"./chunk-86e4740a.js";import"./chunk-faa47c2c.js";import"./chunk-41250ec8.js";var Oe=globalThis&&globalThis.__assign||function(){return Oe=Object.assign||function(e){for(var i,r=1,t=arguments.length;r<t;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},Oe.apply(this,arguments)},Wr=globalThis&&globalThis.__rest||function(e,i){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&i.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)i.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r},zr={position:"top",trigger:"hover",unmountOnExit:!0};function Ur(e,i){var r,t=f.useContext(ye),n=t.getPrefixCls,a=t.componentConfig,o=t.rtl,s=rr(e,zr,a==null?void 0:a.Popover),u=s.style,l=s.className,d=s.children,y=s.position,w=s.getPopupContainer,v=s.trigger,N=s.defaultPopupVisible,j=s.popupVisible,S=s.triggerProps,O=s.unmountOnExit,R=s.onVisibleChange,_=s.content,P=s.title,F=Wr(s,["style","className","children","position","getPopupContainer","trigger","defaultPopupVisible","popupVisible","triggerProps","unmountOnExit","onVisibleChange","content","title"]),p=n("popover");return c(Ee,{...Oe({},F,{ref:i,style:Oe({maxWidth:350},u),className:l,prefixCls:p,getPopupContainer:w,position:y,trigger:v,content:oe("div",{className:G(p+"-inner",(r={},r[p+"-inner-rtl"]=o,r)),children:[P?c("div",{className:p+"-title",children:P}):null,c("div",{className:p+"-inner-content",children:_})]}),popupHoverStay:!0,unmountOnExit:O,triggerProps:S,defaultPopupVisible:N,onVisibleChange:R||(S?S.onVisibleChange:void 0),childrenPrefix:p},"popupVisible"in s?{popupVisible:j}:{}),children:typeof d=="string"?c("span",{children:d}):d})}var cr=f.forwardRef(Ur);cr.displayName="Popover";const qr=cr;var Ae=globalThis&&globalThis.__assign||function(){return Ae=Object.assign||function(e){for(var i,r=1,t=arguments.length;r<t;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},Ae.apply(this,arguments)};function Gr(e,i){var r,t,n=f.useContext(ye).getPrefixCls,a=e.className,o=e.type,s=o===void 0?"line":o,u=e.count,l=u===void 0?2:u,d=e.activeIndex,y=d===void 0?0:d,w=e.position,v=w===void 0?"bottom":w,N=e.trigger,j=N===void 0?"click":N,S=e.onSelectIndex,O=n("carousel-indicator"),R=[];if(s==="slider"){var _=100/l;R.push(c("span",{style:{width:_+"%",left:y*_+"%"},className:G(O+"-item",O+"-item-active")},0))}else for(var P=0;P<l;P++)R.push(c("span",{"data-index":P,className:G(O+"-item",(r={},r[O+"-item-active"]=P===y,r))},P));var F=(t={ref:i,className:G(O,O+"-"+s,O+"-"+v,a)},t[j==="click"?"onClick":"onMouseEnter"]=function(p){if(p.preventDefault(),s==="slider"){var A=p.nativeEvent.offsetX,K=p.currentTarget.clientWidth;if(p.target===p.currentTarget){var m=~~(A/K*l);m!==y&&S(m)}}else{var D=p.target.getAttribute("data-index");D&&+D!==y&&S(+D)}},t);return c("div",{...Ae({},F),children:R})}var Kr=V.forwardRef(Gr);const Xr=Kr;function Yr(e,i){var r,t=e.className,n=e.direction,a=e.showArrow,o=e.prev,s=e.next,u=e.icons,l=f.useContext(ye).getPrefixCls,d=l("carousel"),y=G(d+"-arrow",(r={},r[d+"-arrow-hover"]=a==="hover",r),t),w=u&&u.hasOwnProperty("prev")?u.prev:n==="horizontal"?c(Dr,{}):c(_r,{}),v=u&&u.hasOwnProperty("next")?u.next:n==="horizontal"?c(Lr,{}):c($r,{});return oe("div",{ref:i,className:y,children:[c("div",{className:d+"-arrow-"+(n==="vertical"?"top":"left"),onClick:o,children:w}),c("div",{className:d+"-arrow-"+(n==="vertical"?"bottom":"right"),onClick:s,children:v})]})}var ur=V.forwardRef(Yr);ur.defaultProps={direction:"horizontal",showArrow:"always"};const Jr=ur;function Qr(e,i){var r=f.useRef(null),t=f.useRef(),n=function(){i!==null&&(r.current=setInterval(function(){t.current()},i))},a=function(){r.current&&clearInterval(r.current)},o=function(){a(),n()};return f.useEffect(function(){t.current=e},[e]),f.useEffect(function(){return n(),a},[i]),o}var De=globalThis&&globalThis.__assign||function(){return De=Object.assign||function(e){for(var i,r=1,t=arguments.length;r<t;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},De.apply(this,arguments)},Zr=globalThis&&globalThis.__rest||function(e,i){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&i.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)i.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r},we=globalThis&&globalThis.__read||function(e,i){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var t=r.call(e),n,a=[],o;try{for(;(i===void 0||i-- >0)&&!(n=t.next()).done;)a.push(n.value)}catch(s){o={error:s}}finally{try{n&&!n.done&&(r=t.return)&&r.call(t)}finally{if(o)throw o.error}}return a},et=3e3,rt={animation:"slide",indicatorType:"dot",indicatorPosition:"bottom",direction:"horizontal",showArrow:"always",trigger:"click",moveSpeed:500,timingFunc:"cubic-bezier(0.34, 0.69, 0.1, 1)"};function tt(e,i){var r,t,n=f.useContext(ye),a=n.getPrefixCls,o=n.componentConfig,s=n.rtl,u=rr(e,rt,o==null?void 0:o.Carousel),l=u.style,d=u.className,y=u.children,w=u.currentIndex,v=u.animation,N=u.trigger,j=u.direction,S=u.moveSpeed,O=u.timingFunc,R=u.indicatorType,_=u.indicatorPosition,P=u.indicatorClassName,F=u.showArrow,p=u.miniRender,A=u.arrowClassName,K=u.carousel,m=u.icons,D=u.onChange,Z=Zr(u,["style","className","children","currentIndex","animation","trigger","direction","moveSpeed","timingFunc","indicatorType","indicatorPosition","indicatorClassName","showArrow","miniRender","arrowClassName","carousel","icons","onChange"]),b=u.autoPlay;b&&u.autoPlaySpeed&&(b={interval:u.autoPlaySpeed});var H=V.Children.toArray(y).filter(function(C){return V.isValidElement(C)}),X=H.length,z=f.useRef(null),re=f.useRef(null),te=f.useRef(null),ne=we(f.useState(typeof w=="number"?ae(w):0),2),de=ne[0],M=ne[1],se=we(f.useState(de),2),pe=se[0],xe=se[1],le=we(f.useState(!1),2),be=le[0],ve=le[1],g=we(f.useState(!1),2),k=g[0],h=g[1],x=we(f.useState(null),2),I=x[0],Y=x[1],B=we(f.useState({sliderWrapper:null,indicatorWrapper:null}),2),W=B[0],ie=B[1],L=typeof w=="number"?ae(w):de,ce=ae(L-1),Ce=ae(L+1),Se=typeof b=="object"&&b.interval?b.interval:et;f.useEffect(function(){return function(){return te.current&&clearTimeout(te.current)}},[]),f.useEffect(function(){J({targetIndex:L})},[L]);var Pe=Qr(function(){J({targetIndex:Ce})},b&&!be&&X>1?Se:null);f.useImperativeHandle(K,function(){return{dom:z.current,goto:function(C){var T=C.index,$=C.isNegative,Q=C.isManual,ee=C.resetAutoPlayInterval;J({targetIndex:ae(T),isNegative:$,isManual:Q,resetAutoPlayInterval:ee})}}});function ae(C){var T=+C;return typeof T=="number"&&!isNaN(T)?(T+X)%X:C}function J(C){var T=C.targetIndex,$=C.isNegative,Q=$===void 0?!1:$,ee=C.isManual,ue=ee===void 0?!1:ee,me=C.resetAutoPlayInterval,he=me===void 0?!1:me;!k&&T!==L&&(h(!0),M(T),xe(de),Y(Q?"negative":"positive"),D&&D(T,L,ue),b&&he&&Pe(),te.current=setTimeout(function(){h(!1),te.current=null},S))}function Te(){if(v==="card"){if(re.current){var C=re.current.children[0];if(!C)return;var T=re.current.clientWidth,$=C.clientWidth,Q=(T-$)/2,ee=200,ue=T/2,me=$,he=ue+50>=me?ee*4:ee*ue/(me-ue);ie({sliderWrapper:{perspective:he},indicatorWrapper:{width:"auto",left:Q,right:Q}})}}else ie({sliderWrapper:null,indicatorWrapper:null})}var U=a("carousel"),gr=G(U,U+"-indicator-position-"+_,(r={},r[U+"-rtl"]=s,r),d),yr=Object.assign({},b&&(typeof b!="object"||b.hoverToPause!==!1)?{onMouseEnter:function(){return ve(!0)},onMouseLeave:function(){return ve(!1)}}:null);return c(lr,{onResize:Te,children:oe("div",{...De({ref:function(C){i=C,z.current=i},className:gr,style:l},tr(Z,["autoplay","autoPlaySpeed"]),yr),children:[c("div",{ref:re,style:W.sliderWrapper,className:G(U+"-"+v,U+"-"+j,(t={},t[U+"-negative"]=I==="negative",t)),children:H.map(function(C,T){var $,Q=T===L,ee=T===ce,ue=T===Ce,me=!p||Q||ee||ue;if(!me)return null;var he=C.props,br=he.style,wr=he.className,We=he.onClick;return V.cloneElement(C,{"aria-hidden":!Q,style:Object.assign({transitionTimingFunction:O,transitionDuration:S+"ms",animationTimingFunction:O,animationDuration:S+"ms"},br),className:G(wr,($={},$[U+"-item-prev"]=ee,$[U+"-item-next"]=ue,$[U+"-item-current"]=Q,$[U+"-item-slide-in"]=v==="slide"&&I&&k&&Q,$[U+"-item-slide-out"]=v==="slide"&&I&&k&&T===pe,$)),onClick:function(xr){We&&We(xr),J({targetIndex:T,isNegative:T===ce,isManual:!0})}})})}),R!=="never"&&X>1&&c("div",{style:W.indicatorWrapper,className:G(U+"-indicator-wrapper",U+"-indicator-wrapper-"+_),children:c(Xr,{className:P,type:R,count:X,activeIndex:L,position:_,trigger:N,onSelectIndex:function(C){return J({targetIndex:C,isNegative:C<L,isManual:!0})}})}),F!=="never"&&X>1&&c(Jr,{className:A,direction:j,showArrow:F,icons:m,prev:function(){return J({targetIndex:ce,isNegative:!0,isManual:!0})},next:function(){return J({targetIndex:Ce,isManual:!0})}})]})})}var fr=V.forwardRef(tt);fr.displayName="Carousel";const nt=fr;function it(e,i){var r=f.useContext(ye).getPrefixCls,t=r("typography"),n=e.className,a=e.style,o=e.children,s=G(t,n);return c("article",{ref:i,style:a,className:s,children:o})}var dr=f.forwardRef(it);dr.displayName="Typography";const at=dr;var ot=globalThis&&globalThis.__awaiter||function(e,i,r,t){function n(a){return a instanceof r?a:new r(function(o){o(a)})}return new(r||(r=Promise))(function(a,o){function s(d){try{l(t.next(d))}catch(y){o(y)}}function u(d){try{l(t.throw(d))}catch(y){o(y)}}function l(d){d.done?a(d.value):n(d.value).then(s,u)}l((t=t.apply(e,i||[])).next())})},st=globalThis&&globalThis.__generator||function(e,i){var r={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},t,n,a,o;return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(l){return function(d){return u([l,d])}}function u(l){if(t)throw new TypeError("Generator is already executing.");for(;r;)try{if(t=1,n&&(a=l[0]&2?n.return:l[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,l[1])).done)return a;switch(n=0,a&&(l=[l[0]&2,a.value]),l[0]){case 0:case 1:a=l;break;case 4:return r.label++,{value:l[1],done:!1};case 5:r.label++,n=l[1],l=[0];continue;case 7:l=r.ops.pop(),r.trys.pop();continue;default:if(a=r.trys,!(a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){r=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){r.label=l[1];break}if(l[0]===6&&r.label<a[1]){r.label=a[1],a=l;break}if(a&&r.label<a[2]){r.label=a[2],r.ops.push(l);break}a[2]&&r.ops.pop(),r.trys.pop();continue}l=i.call(e,r)}catch(d){l=[6,d],n=0}finally{t=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}};function lt(e){return ot(this,void 0,void 0,function(){var i,r,t,n,a;return st(this,function(o){switch(o.label){case 0:if(!(navigator.clipboard&&navigator.clipboard.writeText))return[3,4];o.label=1;case 1:return o.trys.push([1,3,,4]),[4,navigator.clipboard.writeText(e)];case 2:return o.sent(),[2];case 3:return i=o.sent(),console.error(i!=null?i:new DOMException("The request is not allowed","NotAllowedError")),[3,4];case 4:r=document.createElement("span"),r.textContent=e,r.style.whiteSpace="pre",document.body.appendChild(r),t=window.getSelection(),n=window.document.createRange(),t.removeAllRanges(),n.selectNode(r),t.addRange(n),a=!1;try{a=window.document.execCommand("copy")}catch(s){console.log("error",s)}return t.removeAllRanges(),window.document.body.removeChild(r),[2,a?Promise.resolve():Promise.reject(new DOMException("The request is not allowed","NotAllowedError"))]}})})}function Ge(e,i){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);i&&(t=t.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),r.push.apply(r,t)}return r}function Ke(e){for(var i=1;i<arguments.length;i++){var r=arguments[i]!=null?arguments[i]:{};i%2?Ge(Object(r),!0).forEach(function(t){ir(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ge(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function ct(e,i){var r=f.useContext(nr),t=r.prefixCls,n=t===void 0?"arco":t,a=e.spin,o=e.className,s=Ke(Ke({"aria-hidden":!0,focusable:!1,ref:i},e),{},{className:"".concat(o?o+" ":"").concat(n,"-icon ").concat(n,"-icon-copy")});return a&&(s.className="".concat(s.className," ").concat(n,"-icon-loading")),delete s.spin,delete s.isIcon,c("svg",{fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48",...s,children:c("path",{d:"M20 6h18a2 2 0 0 1 2 2v22M8 16v24c0 1.105.891 2 1.996 2h20.007A1.99 1.99 0 0 0 32 40.008V15.997A1.997 1.997 0 0 0 30 14H10a2 2 0 0 0-2 2Z"})})}var Fe=V.forwardRef(ct);Fe.defaultProps={isIcon:!0};Fe.displayName="IconCopy";const ut=Fe;function Xe(e,i){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);i&&(t=t.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),r.push.apply(r,t)}return r}function Ye(e){for(var i=1;i<arguments.length;i++){var r=arguments[i]!=null?arguments[i]:{};i%2?Xe(Object(r),!0).forEach(function(t){ir(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Xe(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function ft(e,i){var r=f.useContext(nr),t=r.prefixCls,n=t===void 0?"arco":t,a=e.spin,o=e.className,s=Ye(Ye({"aria-hidden":!0,focusable:!1,ref:i},e),{},{className:"".concat(o?o+" ":"").concat(n,"-icon ").concat(n,"-icon-edit")});return a&&(s.className="".concat(s.className," ").concat(n,"-icon-loading")),delete s.spin,delete s.isIcon,c("svg",{fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48",...s,children:c("path",{d:"m30.48 19.038 5.733-5.734a1 1 0 0 0 0-1.414l-5.586-5.586a1 1 0 0 0-1.414 0l-5.734 5.734m7 7L15.763 33.754a1 1 0 0 1-.59.286l-6.048.708a1 1 0 0 1-1.113-1.069l.477-6.31a1 1 0 0 1 .29-.631l14.7-14.7m7 7-7-7M6 42h36"})})}var He=V.forwardRef(ft);He.defaultProps={isIcon:!0};He.displayName="IconEdit";const dt=He;var Je=function(e){return ar(e)||or(e)};function Ne(e){var i=[""];return V.Children.forEach(e,function(r){var t=i.length-1,n=i[t];Je(r)&&Je(n)?i[t]=""+n+r:r&&r.props&&r.props.children&&i.push(Ne(r.props.children))}),i.join("")}var pt=globalThis&&globalThis.__read||function(e,i){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var t=r.call(e),n,a=[],o;try{for(;(i===void 0||i-- >0)&&!(n=t.next()).done;)a.push(n.value)}catch(s){o={error:s}}finally{try{n&&!n.done&&(r=t.return)&&r.call(t)}finally{if(o)throw o.error}}return a};function vt(e){var i=e.children,r=e.copyable,t=e.editable,n=e.ellipsis,a=e.expanding,o=e.setEditing,s=e.onClickExpand,u=e.forceShowExpand,l=e.isEllipsis,d=e.currentContext,y=d===void 0?{}:d,w=y.getPrefixCls,v=y.locale,N=w("typography"),j=pt(f.useState(!1),2),S=j[0],O=j[1],R=f.useRef(null),_=fe(r)?r:{},P=fe(n)?n:{},F=fe(t)?t:{},p=kr(P.expandNodes)?P.expandNodes:[v.Typography.fold,v.Typography.unfold];f.useEffect(function(){return function(){clearTimeout(R.current),R.current=null}},[]);function A(b){if(!S){var H=_.text!==void 0?_.text:Ne(i);lt(H),O(!0),_.onCopy&&_.onCopy(H,b),R.current=setTimeout(function(){O(!1)},3e3)}}var K=_.tooltips||[v.Typography.copy,v.Typography.copied],m=r&&c(Ee,{content:S?K[1]:K[0],children:c("span",{className:S?N+"-operation-copied":N+"-operation-copy",onClick:A,children:S?c(Ar,{}):_.icon||c(ut,{})})}),D=t&&c(Ee,{content:v.Typography.edit,children:c("span",{className:N+"-operation-edit",onClick:function(b){F.onStart&&F.onStart(Ne(i),b),o(!0)},children:c(dt,{})})}),Z=u||P.expandable&&l?c("a",{className:N+"-operation-expand",onClick:s,children:a?p[0]:p[1]}):null;return oe(er,{children:[Z,D,m]})}function mt(e){var i=e.prefixCls,r=e.children,t=e.setEditing,n=e.editableConfig,a=G(i+"-typography",i+"-edit-content"),o=Ne(r),s=f.useRef(null);f.useEffect(function(){if(s.current&&s.current.focus&&s.current.focus(),s.current&&s.current.dom){var y=s.current.dom.value.length;s.current.dom.setSelectionRange(y,y)}},[]);function u(){t(!1),n.onEnd&&n.onEnd(o)}function l(y){n.onChange&&n.onChange(y)}function d(){u()}return c("div",{className:a,children:c(Ze.TextArea,{onBlur:d,ref:s,value:o,autoSize:!0,onChange:l,onPressEnter:u})})}var ht=globalThis&&globalThis.__read||function(e,i){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var t=r.call(e),n,a=[],o;try{for(;(i===void 0||i-- >0)&&!(n=t.next()).done;)a.push(n.value)}catch(s){o={error:s}}finally{try{n&&!n.done&&(r=t.return)&&r.call(t)}finally{if(o)throw o.error}}return a},gt=function(e,i){if(typeof window<"u"&&window.CSS&&window.CSS.supports)return ke(i)?window.CSS.supports(e):window.CSS.supports(e,i);if(typeof document<"u"&&document.createElement){var r=document.createElement("div");return r.setAttribute("style",e+":"+i+";"),typeof r.style[e]<"u"}return!1},yt={display:" -webkit-box","-webkit-line-clamp":2},bt=function(){return Object.entries(yt).every(function(e){var i=ht(e,2),r=i[0],t=i[1];return gt(r,t)})};function pr(e){var i=e.cssEllipsis,r=e.ellipsisStr,t=r===void 0?"...":r,n=e.suffix,a=e.rows,o=f.useMemo(function(){return!i||a>1&&!bt()?!1:t==="..."&&!n},[t,i,a,n]),s={textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"},u={textOverflow:"ellipsis",whiteSpace:"normal",overflow:"hidden",WebkitLineClamp:""+e.rows,WebkitBoxOrient:"vertical",display:"-webkit-box"};return{simpleEllipsis:o,ellipsisStyle:o?e.rows>1?u:s:{}}}var ge=globalThis&&globalThis.__assign||function(){return ge=Object.assign||function(e){for(var i,r=1,t=arguments.length;r<t;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},ge.apply(this,arguments)},_e=globalThis&&globalThis.__read||function(e,i){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var t=r.call(e),n,a=[],o;try{for(;(i===void 0||i-- >0)&&!(n=t.next()).done;)a.push(n.value)}catch(s){o={error:s}}finally{try{n&&!n.done&&(r=t.return)&&r.call(t)}finally{if(o)throw o.error}}return a},wt="hxj",E;(function(e){e[e.INIT=0]="INIT",e[e.BEFORE_MEASURE=1]="BEFORE_MEASURE",e[e.MEASURING=2]="MEASURING",e[e.MEASURE_END=3]="MEASURE_END",e[e.NO_NEED_ELLIPSIS=4]="NO_NEED_ELLIPSIS"})(E||(E={}));function xt(e){var i=e.children,r=e.rows,t=r===void 0?1:r,n=e.width,a=e.expanding,o=e.renderMeasureContent,s=e.simpleEllipsis,u=e.onEllipsis,l=e.suffix,d=e.expandNodes,y=e.expandable,w=e.ellipsisStr,v=f.useRef(),N=f.useRef(),j=_e(f.useState([0,0,0]),2),S=j[0],O=j[1],R=_e(f.useState(0),2),_=R[0],P=R[1],F=_e(f.useState(E.NO_NEED_ELLIPSIS),2),p=F[0],A=F[1],K=_e(S,3),m=K[0],D=K[1],Z=K[2],b=_e(f.useState(!1),2),H=b[0],X=b[1],z=f.useMemo(function(){return V.Children.toArray(i)},[i]),re=f.useRef(0),te=pr({rows:t,cssEllipsis:!0}).ellipsisStyle;sr(function(){u&&u(H)},[H]);var ne=function(h){return ar(h)||or(h)},de=function(h){var x=0;return h.forEach(function(I){ne?x+=String(I).length:x+=1}),x},M=f.useMemo(function(){return de(z)},[z]),se=Fr(function(h){return O(h)}),pe=function(h){var x=[],I=0;if(h>=M)return z;for(var Y in z){var B=z[Y];if(I>=h)return x;var W=ne(B)?String(B).length:1;if(W>h-I)return x.push(String(B).slice(0,h-I)),I=h,x;I+=W,x.push(B)}return x},xe=function(){var h,x;if(_){if(p===E.INIT){var I=t*_,Y=(h=N.current)===null||h===void 0?void 0:h.offsetHeight,B=Y>I;!B||s||a?(A(E.MEASURE_END),X(B),O([0,M,M])):(X(!0),A(E.BEFORE_MEASURE))}else if(p===E.BEFORE_MEASURE){var W=v==null?void 0:v.current.offsetWidth,ie=t*n;if(W>t*n){var L=Math.max(ie/W-.1,0),ce=Math.min(ie/W+.1,1),Ce=Math.floor(L*M),Se=Math.ceil(ce*M),Pe=Math.floor((Ce+Se)/2);re.current=Pe}A(E.MEASURING)}else if(p===E.MEASURING)if(m!==Z-1){var Y=(x=N.current)===null||x===void 0?void 0:x.offsetHeight,I=t*_,ae=m,J=Z;Y<=I?ae=D:J=D;var Te=Math.floor((J+ae)/2);se([ae,Te,J])}else se([m,m,m]),A(E.MEASURE_END)}};je(function(){e.rows&&n?(O([0,Math.floor(M/2),M]),A(E.INIT)):A(E.NO_NEED_ELLIPSIS)},[M,s,a,n,l,d,y,w,e.rows]),je(function(){if(v.current&&p===E.INIT){var h=v.current.offsetHeight;P(h)}},[p]),je(function(){xe()},[p,D,m,Z,_]);var le={zIndex:-999,position:"fixed",opacity:0,padding:0,margin:0},be=ge({whiteSpace:"nowrap"},le),ve=s?ge({textOverflow:"clip"},le):le,g;if(p===E.INIT||p===E.BEFORE_MEASURE)g=oe("div",{children:[c("div",{ref:v,style:be,children:p===E.INIT?wt:o(i,!1)}),c("div",{ref:N,style:ge({width:n},ve),children:o(i,H)})]}),g=g.props.children;else if(p===E.MEASURING){var k=ge({height:_*t,width:n},te);g=oe("div",{children:[c("div",{ref:N,style:ge({width:n},ve),children:o(pe(D),H)}),c("div",{style:k,children:pe(re.current)})]}),g=g.props.children}else p===E.MEASURE_END?g=o(pe(D),H):p===E.NO_NEED_ELLIPSIS&&(g=o(i,!1));return{ellipsisNode:g,isEllipsis:H,measureStatus:p}}var q=globalThis&&globalThis.__assign||function(){return q=Object.assign||function(e){for(var i,r=1,t=arguments.length;r<t;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},q.apply(this,arguments)},Ct=globalThis&&globalThis.__rest||function(e,i){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&i.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)i.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r},Re=globalThis&&globalThis.__read||function(e,i){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var t=r.call(e),n,a=[],o;try{for(;(i===void 0||i-- >0)&&!(n=t.next()).done;)a.push(n.value)}catch(s){o={error:s}}finally{try{n&&!n.done&&(r=t.return)&&r.call(t)}finally{if(o)throw o.error}}return a};function _t(e,i){var r=e.type,t=e.bold,n=e.disabled,a=e.mark,o=e.underline,s=e.delete,u=e.code,l=[],d=[];return r&&d.push(i+"-"+r),n&&d.push(i+"-disabled"),t&&l.push("b"),o&&l.push("u"),s&&l.push("del"),u&&l.push("code"),a&&l.push("mark"),{component:l,className:d}}function Be(e){var i=e.componentType,r=e.style,t=e.className,n=e.children,a=e.editable,o=e.ellipsis,s=e.heading,u=e.blockquote,l=Ct(e,["componentType","style","className","children","editable","ellipsis","heading","blockquote"]),d=f.useContext(ye),y=d.getPrefixCls,w=d.rtl,v=y("typography"),N=_t(e,v),j=N.component,S=N.className,O=Re(f.useState(!1),2),R=O[0],_=O[1],P=Re(f.useState(0),2),F=P[0],p=P[1],A=fe(a)?a:{},K="editing"in A?A.editing:R,m=o?q({rows:1,ellipsisStr:"...",cssEllipsis:!1},fe(o)?o:{}):{},D=m.wrapper||V.Fragment,Z=Re(Vr(!1,{defaultValue:m.defaultExpanded,value:m.expanded}),2),b=Z[0],H=Z[1],X=pr(m),z=X.simpleEllipsis,re=X.ellipsisStyle,te=function(g,k){var h=ke(m.ellipsisStr)?"...":m.ellipsisStr,x=!ke(m.suffix)&&m.suffix;return oe(D,{children:[g,k&&!b&&!z?h:"",x,xe(k)]})},ne=xt(q(q({},m),{children:n,expanding:b,width:F,renderMeasureContent:te,simpleEllipsis:z||b})),de=ne.ellipsisNode,M=ne.isEllipsis,se=ne.measureStatus,pe=function(g){var k=(g==null?void 0:g[0]).contentRect;if(k){var h=j.includes("code")?k.width-18:k.width,x=z&&m.rows===1?[E.NO_NEED_ELLIPSIS]:[E.NO_NEED_ELLIPSIS,E.MEASURE_END];x.includes(se)&&p(h)}};function xe(g){return c(er,{children:c(vt,{...q({},e,{setEditing:_,onClickExpand:le,expanding:b,isEllipsis:g,currentContext:d})})})}function le(g){H(!b),e.onClickExpand&&e.onClickExpand(g),m.onExpand&&m.onExpand(!b,g)}sr(function(){m.onEllipsis&&m.onEllipsis(M)},[M]);function be(g,k,h,x){x===void 0&&(x={});var I=g;return k.forEach(function(Y,B){var W=B===0?x:{},ie=fe(h.mark)&&h.mark.color?q({style:{backgroundColor:h.mark.color}},W):q({},W);I=V.createElement(Y,q({},ie),I)}),I}function ve(){var g,k=Ne(V.Children.toArray(n)),h=m.showTooltip,x=fe(m.showTooltip)&&m.showTooltip.type==="popover"?"popover":"tooltip",I=fe(m.showTooltip)?m.showTooltip.props||{}:{},Y=x==="popover"?qr:Ee,B=M&&!h&&!b?{title:k}:{},W=q({style:r},B),ie=M&&h&&!b,L;i==="Paragraph"?L=u?"blockquote":"div":i==="Title"?L="h"+s:i==="Text"&&(L=o?"div":"span");var ce=c(lr,{onResize:pe,children:c(L,{...q({className:G(v,S,(g={},g[v+"-rtl"]=w,g),t)},W,tr(l,["spacing","type","close","bold","disabled","mark","underline","delete","code","copyable","isEllipsis","expanding","onClickExpand","setEditing","forceShowExpand"])),children:z&&se!==E.INIT&&!b&&M?be(te(c("span",{style:re,children:n}),M),j.length?j:["span"],e,{className:v+"-simple-ellipsis"}):be(de,j,e)})});return ie?c(Y,{...q({content:k},I),children:c("span",{children:ce})}):ce}return K?c(mt,{...q({},e,{prefixCls:v,setEditing:_,editableConfig:A})}):ve()}var Le=globalThis&&globalThis.__assign||function(){return Le=Object.assign||function(e){for(var i,r=1,t=arguments.length;r<t;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},Le.apply(this,arguments)},Nt=globalThis&&globalThis.__rest||function(e,i){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&i.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)i.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};function vr(e){var i=e.heading,r=i===void 0?1:i,t=Nt(e,["heading"]);return V.createElement(Be,Le({heading:r},t,{componentType:"Title"}))}vr.displayName="Title";var $e=globalThis&&globalThis.__assign||function(){return $e=Object.assign||function(e){for(var i,r=1,t=arguments.length;r<t;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},$e.apply(this,arguments)};function mr(e){return V.createElement(Be,$e({},e,{componentType:"Text"}))}mr.displayName="Text";var Ve=globalThis&&globalThis.__assign||function(){return Ve=Object.assign||function(e){for(var i,r=1,t=arguments.length;r<t;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},Ve.apply(this,arguments)};function hr(e){var i=e.spacing,r=i===void 0?"default":i,t=e.className,n=f.useContext(ye).getPrefixCls,a=n("typography"),o=r==="close"?G(a+"-spacing-close",t):t;return c(Be,{...Ve({},e,{componentType:"Paragraph",className:o})})}hr.displayName="Paragraph";var Ie=at;Ie.Title=vr;Ie.Text=mr;Ie.Paragraph=hr;const Et=Ie;const Ot={"announcement-carousel":"announcement-carousel-index-module__announcement-carousel---h2"};function It(){const[e,i]=f.useState([]);return f.useEffect(()=>{Mr({}).then(r=>{r.isOk&&r.data&&i(r.data.lampList||[])})},[]),oe("div",{className:Ot["announcement-carousel"],children:[c("div",{className:"icon-chat-speaker ",children:c(Me,{className:"text-[8px]",name:"icon_chat_speaker"})}),c("div",{className:"w-[100%] ",children:c(nt,{direction:"vertical",autoPlay:!0,showArrow:"never",indicatorType:"never",children:e==null?void 0:e.map((r,t)=>c(Et.Paragraph,{ellipsis:!0,children:c("div",{className:"text-brand_color cursor-pointer",onClick:()=>qe(`/announcement-center#${r.id}/${r.parentId}`),children:r.name})},t))})}),c(Me,{className:"text-sm ml-2",name:"icon_chat_announcement",onClick:()=>qe("/announcement-center")})]})}const Qe={"search-wrapper":"search-index-module__search-wrapper--quM","list-wrapper":"search-index-module__list-wrapper--O3K"};function St(e){const{conversations:i}=Pr(),[r,t]=f.useState([]),n=Hr(),a=Tr(e),{run:o,loading:s}=Er(async()=>{if(!e){t([]);return}const l=await n.searchLocalConversations({totalConversationCount:200,keywords:[e],conversationMessageCount:10,messageTypes:[],subMessageTypes:[],senderUserIDs:[],startTime:0,endTime:0});t(l.conversationSearchInfoList)},{manual:!0});return Or(()=>{o()},[e]),{conversationList:f.useMemo(()=>{if(!e)return[];const l=r.map(w=>({...i.find(N=>N.conversationID===w.conversationID)})),d=a.filter(w=>!l.find(v=>Ue(v.conversationID,w.conversationID))).map(w=>({...i.find(N=>Ue(N.conversationID,w.conversationID))||{},...w})),y=[...l,...d];return jr(y).map(w=>Rr(w))},[i,r,e]),loadMore:o,loading:s}}function Pt({children:e}){const i=document.querySelector(`#${Sr}`);return i?Ir.createPortal(e,i):null}function Tn(){const[e,i]=f.useState(""),r=Nr(e,{wait:300}),{conversationList:t}=St(r),[n,a]=f.useState(!1);return oe("div",{className:ze(Qe["search-wrapper"]),children:[c(Ze,{onFocus:()=>a(!0),onBlur:()=>a(!1),onChange:i,allowClear:!0,className:"with-search",placeholder:Cr._("features_group_components_search_input_index_tq98cmscdb"),prefix:c(Me,{name:"icon_chat_search",className:"text-icon_color text-xl/5"})}),c("div",{className:ze({hidden:t.length>0}),children:c(It,{})}),t.length>0&&c(Pt,{children:c("div",{className:Qe["list-wrapper"],children:t.map(o=>c(Br,{keyword:e,conversation:o},o.conversationID))})})]})}export{Tn as default};
