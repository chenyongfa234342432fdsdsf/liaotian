import{r as f,R as p}from"./chunk-e9cd8943.js";import{I as w,_ as y}from"./chunk-36a75920.js";import{j as s}from"./chunk-c1d16543.js";import{E as m,A as h,a as _,b as O,c as b}from"./chunk-b4d6f2f0.js";var g=globalThis&&globalThis.__read||function(o,r){var e=typeof Symbol=="function"&&o[Symbol.iterator];if(!e)return o;var n=e.call(o),t,c=[],i;try{for(;(r===void 0||r-- >0)&&!(t=n.next()).done;)c.push(t.value)}catch(a){i={error:a}}finally{try{t&&!t.done&&(e=n.return)&&e.call(n)}finally{if(i)throw i.error}}return c};function A(o){var r=g(f.useState({value:o,resolve:function(t){}}),2),e=r[0],n=r[1];return f.useEffect(function(){e.resolve(e.value)},[e]),[e.value,function(t){return new Promise(function(c){n(function(i){var a=t;return typeof t=="function"&&(a=t(i.value)),{value:a,resolve:c}})})}]}function d(o,r){var e=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);r&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable})),e.push.apply(e,n)}return e}function v(o){for(var r=1;r<arguments.length;r++){var e=arguments[r]!=null?arguments[r]:{};r%2?d(Object(e),!0).forEach(function(n){y(o,n,e[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(e)):d(Object(e)).forEach(function(n){Object.defineProperty(o,n,Object.getOwnPropertyDescriptor(e,n))})}return o}function x(o,r){var e=f.useContext(w),n=e.prefixCls,t=n===void 0?"arco":n,c=o.spin,i=o.className,a=v(v({"aria-hidden":!0,focusable:!1,ref:r},o),{},{className:"".concat(i?i+" ":"").concat(t,"-icon ").concat(t,"-icon-down")});return c&&(a.className="".concat(a.className," ").concat(t,"-icon-loading")),delete a.spin,delete a.isIcon,s("svg",{fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48",...a,children:s("path",{d:"M39.6 17.443 24.043 33 8.487 17.443"})})}var u=p.forwardRef(x);u.defaultProps={isIcon:!0};u.displayName="IconDown";const E=u;function I(){var o=f.useCallback(function(r){return{onKeyDown:function(e){var n,t,c,i,a,l=e.keyCode||e.which;l===m.code&&((n=r.onPressEnter)===null||n===void 0||n.call(r,e)),l===h.code&&((t=r.onArrowDown)===null||t===void 0||t.call(r,e)),l===_.code&&((c=r.onArrowLeft)===null||c===void 0||c.call(r,e)),l===O.code&&((i=r.onArrowRight)===null||i===void 0||i.call(r,e)),l===b.code&&((a=r.onArrowUp)===null||a===void 0||a.call(r,e))}}},[]);return o}var j=globalThis&&globalThis.__read||function(o,r){var e=typeof Symbol=="function"&&o[Symbol.iterator];if(!e)return o;var n=e.call(o),t,c=[],i;try{for(;(r===void 0||r-- >0)&&!(t=n.next()).done;)c.push(t.value)}catch(a){i={error:a}}finally{try{t&&!t.done&&(e=n.return)&&e.call(n)}finally{if(i)throw i.error}}return c};function N(){var o=j(f.useReducer(function(e){return e+1},0),2),r=o[1];return r}export{E as I,N as a,I as b,A as u};
