import{r as n}from"./chunk-e9cd8943.js";import{i as s,a}from"./chunk-1d6b0b39.js";function p(e){s&&(a(e)||console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof e)));var r=n.useRef(e);r.current=n.useMemo(function(){return e},[e]);var t=n.useRef();return t.current||(t.current=function(){for(var o=[],u=0;u<arguments.length;u++)o[u]=arguments[u];return r.current.apply(this,o)}),t.current}function v(e,r){if(e===r)return!0;for(var t=0;t<e.length;t++)if(!Object.is(e[t],r[t]))return!1;return!0}function c(e){var r=n.useRef(e);return r.current=e,r}var i=function(e){s&&(a(e)||console.error("useUnmount expected parameter is a function, got ".concat(typeof e)));var r=c(e);n.useEffect(function(){return function(){r.current()}},[])};const w=i;var f=!!(typeof window<"u"&&window.document&&window.document.createElement);const g=f;export{w as a,p as b,v as d,g as i,c as u};
