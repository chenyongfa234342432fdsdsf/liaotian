import{u as R}from"./chunk-2bf04c59.js";import{r as l}from"./chunk-e9cd8943.js";import{a as v}from"./chunk-b745fb4d.js";import{a as S,u as L}from"./chunk-b3e26e36.js";import{u as E,g as w}from"./chunk-258ffa59.js";import{u as x}from"./chunk-dcdbe767.js";import{u as d}from"./chunk-8f68cdf3.js";import{j as H}from"./chunk-c1d16543.js";function P(t){var r=l.useRef(0),o=v(l.useState(t),2),e=o[0],i=o[1],s=l.useCallback(function(c){cancelAnimationFrame(r.current),r.current=requestAnimationFrame(function(){i(c)})},[]);return S(function(){cancelAnimationFrame(r.current)}),[e,s]}var A=function(t,r){return!Object.is(t,r)};function b(t,r){r===void 0&&(r=A);var o=l.useRef(),e=l.useRef();return r(e.current,t)&&(o.current=e.current,e.current=t),o.current}function F(t,r){r===void 0&&(r=function(){return!0});var o=v(P(),2),e=o[0],i=o[1],s=L(r);return E(function(){var c=w(t,document);if(c){var a=function(){var u;c===document?document.scrollingElement?u={left:document.scrollingElement.scrollLeft,top:document.scrollingElement.scrollTop}:u={left:Math.max(window.pageXOffset,document.documentElement.scrollLeft,document.body.scrollLeft),top:Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop)}:u={left:c.scrollLeft,top:c.scrollTop},s.current(u)&&i(u)};return a(),c.addEventListener("scroll",a),function(){c.removeEventListener("scroll",a)}}},[],t),e}function W(t,r){const{threshold:o=20}=t;let e=l.useRef(null);e=r||e;const i=F(e),s=b(i),c=i&&s?i.top<s.top:!1,a=l.useRef(0),u=l.useRef(0),f=()=>{var n;u.current=Math.max(e.current.scrollTop,0),(n=t.loadNext)==null||n.call(t)},m=()=>{var n;a.current=Math.max(e.current.scrollHeight-o,0),(n=t.loadPrev)==null||n.call(t)},{run:h}=R(()=>{const{scrollTop:n,scrollHeight:T,clientHeight:g}=e.current;n<=o&&c&&m(),T-n-g<=o&&c&&f()},{wait:30}),{run:p}=x(n=>{e.current&&(n.deltaY>0&&e.current.scrollHeight-e.current.scrollTop-e.current.clientHeight<20?f():n.deltaY<0&&e.current.scrollTop===0&&m())},{wait:1e3,trailing:!1});return d(()=>{const n=a.current;e.current.scrollTop=e.current.scrollHeight-n},[t.keepScrollAfterLoadPrevAfter]),d(()=>{const n=u.current;e.current.scrollTop=n},[t.keepScrollAfterLoadNext]),H("div",{onWheel:p,onScroll:h,className:t.className,ref:e,children:t.children})}const C=l.forwardRef(W);export{C as L};
