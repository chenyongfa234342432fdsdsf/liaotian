import{r as i}from"./chunk-e9cd8943.js";var d=globalThis&&globalThis.__read||function(r,e){var t=typeof Symbol=="function"&&r[Symbol.iterator];if(!t)return r;var a=t.call(r),o,u=[],l;try{for(;(e===void 0||e-- >0)&&!(o=a.next()).done;)u.push(o.value)}catch(c){l={error:c}}finally{try{o&&!o.done&&(t=a.return)&&t.call(a)}finally{if(l)throw l.error}}return u},n={};function f(r){var e=d(i.useState(),2),t=e[0],a=e[1];return i.useEffect(function(){n[r]=r in n?n[r]:0,a(n[r]),n[r]+=1},[]),typeof t=="number"?""+r+t:void 0}export{f as u};
