function _(t){return t!=null&&typeof t=="object"&&t.nodeType===1}function E(t,e){return e&&t==="hidden"?!1:t!=="visible"&&t!=="clip"}function K(t,e){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var i=getComputedStyle(t,null);return E(i.overflowY,e)||E(i.overflowX,e)}return!1}function N(t,e,i,n,r,a,s,p){return a<t&&s>e||a>t&&s<e?0:a<=t&&p<=i||s>=e&&p>=i?a-t-n:s>e&&p<i||a<t&&p>i?s-e+r:0}const S=function(t,e){var i=e.scrollMode,n=e.block,r=e.inline,a=e.boundary,s=e.skipOverflowHiddenElements,p=typeof a=="function"?a:function(et){return et!==a};if(!_(t))throw new TypeError("Invalid target");for(var Z=document.scrollingElement||document.documentElement,W=[],o=t;_(o)&&p(o);){if(o=o.parentNode,o===Z){W.push(o);break}o===document.body&&K(o)&&!K(document.documentElement)||K(o,s)&&W.push(o)}for(var x=window.visualViewport?visualViewport.width:innerWidth,y=window.visualViewport?visualViewport.height:innerHeight,O=window.scrollX||pageXOffset,M=window.scrollY||pageYOffset,w=t.getBoundingClientRect(),g=w.height,H=w.width,j=w.top,B=w.right,P=w.bottom,I=w.left,f=n==="start"||n==="nearest"?j:n==="end"?P:j+g/2,c=r==="center"?I+H/2:r==="end"?B:I,U=[],l=0;l<W.length;l++){var u=W[l],m=u.getBoundingClientRect(),C=m.height,F=m.width,b=m.top,G=m.right,J=m.bottom,V=m.left;if(i==="if-needed"&&j>=0&&I>=0&&P<=y&&B<=x&&j>=b&&P<=J&&I>=V&&B<=G)return U;var q=getComputedStyle(u),T=parseInt(q.borderLeftWidth,10),X=parseInt(q.borderTopWidth,10),Y=parseInt(q.borderRightWidth,10),R=parseInt(q.borderBottomWidth,10),h=0,v=0,D="offsetWidth"in u?u.offsetWidth-u.clientWidth-T-Y:0,L="offsetHeight"in u?u.offsetHeight-u.clientHeight-X-R:0;if(Z===u)n==="start"?h=f:n==="end"?h=f-y:n==="nearest"?h=N(M,M+y,y,X,R,M+f,M+f+g,g):h=f-y/2,r==="start"?v=c:r==="center"?v=c-x/2:r==="end"?v=c-x:v=N(O,O+x,x,T,Y,O+c,O+c+H,H),h=Math.max(0,h+M),v=Math.max(0,v+O);else{n==="start"?h=f-b-X:n==="end"?h=f-J+R+L:n==="nearest"?h=N(b,J,C,X,R+L,f,f+g,g):h=f-(b+C/2)+L/2,r==="start"?v=c-V-T:r==="center"?v=c-(V+F/2)+D/2:r==="end"?v=c-G+Y+D:v=N(V,G,F,T,Y+D,c,c+H,H);var $=u.scrollLeft,z=u.scrollTop;h=Math.max(0,Math.min(z+h,u.scrollHeight-C+L)),v=Math.max(0,Math.min($+v,u.scrollWidth-F+D)),f+=z-h,c+=$-v}U.push({el:u,top:h,left:v})}return U};function tt(t){return t===Object(t)&&Object.keys(t).length!==0}function nt(t,e){e===void 0&&(e="auto");var i="scrollBehavior"in document.body.style;t.forEach(function(n){var r=n.el,a=n.top,s=n.left;r.scroll&&i?r.scroll({top:a,left:s,behavior:e}):(r.scrollTop=a,r.scrollLeft=s)})}function it(t){return t===!1?{block:"end",inline:"nearest"}:tt(t)?t:{block:"start",inline:"nearest"}}function st(t,e){var i=!t.ownerDocument.documentElement.contains(t);if(tt(e)&&typeof e.behavior=="function")return e.behavior(i?[]:S(t,e));if(!i){var n=it(e);return nt(S(t,n),n.behavior)}}var A=globalThis&&globalThis.__assign||function(){return A=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++){e=arguments[i];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},A.apply(this,arguments)},ut=["xxl","xl","lg","md","sm","xs"],Q={xs:"(max-width: 575px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1600px)"},d=[],rt=-1,k={},at={matchHandlers:{},dispatch:function(t,e){return k=t,d.length<1?!1:(d.forEach(function(i){i.func(k,e)}),!0)},subscribe:function(t){d.length===0&&this.register();var e=(++rt).toString();return d.push({token:e,func:t}),t(k,null),e},unsubscribe:function(t){d=d.filter(function(e){return e.token!==t}),d.length===0&&this.unregister()},unregister:function(){var t=this;Object.keys(Q).forEach(function(e){var i=Q[e],n=t.matchHandlers[i];n&&n.mql&&n.listener&&n.mql.removeListener(n.listener)})},register:function(){var t=this;Object.keys(Q).forEach(function(e){var i=Q[e],n=function(a){var s,p=a.matches;t.dispatch(A(A({},k),(s={},s[e]=p,s)),e)},r=window.matchMedia(i);r.addListener(n),t.matchHandlers[i]={mql:r,listener:n},n(r)})}};const ht=at;export{ht as R,ut as a,Q as r,st as s};