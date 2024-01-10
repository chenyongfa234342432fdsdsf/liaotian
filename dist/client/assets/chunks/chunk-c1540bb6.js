import{R as b}from"./chunk-e9cd8943.js";import{r as _}from"./chunk-0feb7138.js";var y=function(){if(typeof Map<"u")return Map;function n(e,t){var r=-1;return e.some(function(i,o){return i[0]===t?(r=o,!0):!1}),r}return function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(t){var r=n(this.__entries__,t),i=this.__entries__[r];return i&&i[1]},e.prototype.set=function(t,r){var i=n(this.__entries__,t);~i?this.__entries__[i][1]=r:this.__entries__.push([t,r])},e.prototype.delete=function(t){var r=this.__entries__,i=n(r,t);~i&&r.splice(i,1)},e.prototype.has=function(t){return!!~n(this.__entries__,t)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,r){r===void 0&&(r=null);for(var i=0,o=this.__entries__;i<o.length;i++){var s=o[i];t.call(r,s[1],s[0])}},e}()}(),v=typeof window<"u"&&typeof document<"u"&&window.document===document,f=function(){return typeof global<"u"&&global.Math===Math?global:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()}(),R=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(f):function(n){return setTimeout(function(){return n(Date.now())},1e3/60)}}(),z=2;function M(n,e){var t=!1,r=!1,i=0;function o(){t&&(t=!1,n()),r&&a()}function s(){R(o)}function a(){var c=Date.now();if(t){if(c-i<z)return;r=!0}else t=!0,r=!1,setTimeout(s,e);i=c}return a}var x=20,A=["top","right","bottom","left","width","height","size","weight"],T=typeof MutationObserver<"u",C=function(){function n(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=M(this.refresh.bind(this),x)}return n.prototype.addObserver=function(e){~this.observers_.indexOf(e)||this.observers_.push(e),this.connected_||this.connect_()},n.prototype.removeObserver=function(e){var t=this.observers_,r=t.indexOf(e);~r&&t.splice(r,1),!t.length&&this.connected_&&this.disconnect_()},n.prototype.refresh=function(){var e=this.updateObservers_();e&&this.refresh()},n.prototype.updateObservers_=function(){var e=this.observers_.filter(function(t){return t.gatherActive(),t.hasActive()});return e.forEach(function(t){return t.broadcastActive()}),e.length>0},n.prototype.connect_=function(){!v||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),T?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},n.prototype.disconnect_=function(){!v||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},n.prototype.onTransitionEnd_=function(e){var t=e.propertyName,r=t===void 0?"":t,i=A.some(function(o){return!!~r.indexOf(o)});i&&this.refresh()},n.getInstance=function(){return this.instance_||(this.instance_=new n),this.instance_},n.instance_=null,n}(),O=function(n,e){for(var t=0,r=Object.keys(e);t<r.length;t++){var i=r[t];Object.defineProperty(n,i,{value:e[i],enumerable:!1,writable:!1,configurable:!0})}return n},u=function(n){var e=n&&n.ownerDocument&&n.ownerDocument.defaultView;return e||f},w=d(0,0,0,0);function h(n){return parseFloat(n)||0}function m(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];return e.reduce(function(r,i){var o=n["border-"+i+"-width"];return r+h(o)},0)}function D(n){for(var e=["top","right","bottom","left"],t={},r=0,i=e;r<i.length;r++){var o=i[r],s=n["padding-"+o];t[o]=h(s)}return t}function S(n){var e=n.getBBox();return d(0,0,e.width,e.height)}function P(n){var e=n.clientWidth,t=n.clientHeight;if(!e&&!t)return w;var r=u(n).getComputedStyle(n),i=D(r),o=i.left+i.right,s=i.top+i.bottom,a=h(r.width),c=h(r.height);if(r.boxSizing==="border-box"&&(Math.round(a+o)!==e&&(a-=m(r,"left","right")+o),Math.round(c+s)!==t&&(c-=m(r,"top","bottom")+s)),!G(n)){var l=Math.round(a+o)-e,p=Math.round(c+s)-t;Math.abs(l)!==1&&(a-=l),Math.abs(p)!==1&&(c-=p)}return d(i.left,i.top,a,c)}var j=function(){return typeof SVGGraphicsElement<"u"?function(n){return n instanceof u(n).SVGGraphicsElement}:function(n){return n instanceof u(n).SVGElement&&typeof n.getBBox=="function"}}();function G(n){return n===u(n).document.documentElement}function L(n){return v?j(n)?S(n):P(n):w}function W(n){var e=n.x,t=n.y,r=n.width,i=n.height,o=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,s=Object.create(o.prototype);return O(s,{x:e,y:t,width:r,height:i,top:t,right:e+r,bottom:i+t,left:e}),s}function d(n,e,t,r){return{x:n,y:e,width:t,height:r}}var F=function(){function n(e){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=d(0,0,0,0),this.target=e}return n.prototype.isActive=function(){var e=L(this.target);return this.contentRect_=e,e.width!==this.broadcastWidth||e.height!==this.broadcastHeight},n.prototype.broadcastRect=function(){var e=this.contentRect_;return this.broadcastWidth=e.width,this.broadcastHeight=e.height,e},n}(),H=function(){function n(e,t){var r=W(t);O(this,{target:e,contentRect:r})}return n}(),V=function(){function n(e,t,r){if(this.activeObservations_=[],this.observations_=new y,typeof e!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=e,this.controller_=t,this.callbackCtx_=r}return n.prototype.observe=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(e instanceof u(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)||(t.set(e,new F(e)),this.controller_.addObserver(this),this.controller_.refresh())}},n.prototype.unobserve=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(e instanceof u(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)&&(t.delete(e),t.size||this.controller_.removeObserver(this))}},n.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},n.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach(function(t){t.isActive()&&e.activeObservations_.push(t)})},n.prototype.broadcastActive=function(){if(this.hasActive()){var e=this.callbackCtx_,t=this.activeObservations_.map(function(r){return new H(r.target,r.broadcastRect())});this.callback_.call(e,t,e),this.clearActive()}},n.prototype.clearActive=function(){this.activeObservations_.splice(0)},n.prototype.hasActive=function(){return this.activeObservations_.length>0},n}(),g=typeof WeakMap<"u"?new WeakMap:new y,E=function(){function n(e){if(!(this instanceof n))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var t=C.getInstance(),r=new V(e,t,this);g.set(this,r)}return n}();["observe","unobserve","disconnect"].forEach(function(n){E.prototype[n]=function(){var e;return(e=g.get(this))[n].apply(e,arguments)}});var k=function(){return typeof f.ResizeObserver<"u"?f.ResizeObserver:E}(),q=globalThis&&globalThis.__extends||function(){var n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,i){r.__proto__=i}||function(r,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(r[o]=i[o])},n(e,t)};return function(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");n(e,t);function r(){this.constructor=e}e.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}}(),B=function(n){q(e,n);function e(){var t=n!==null&&n.apply(this,arguments)||this;return t.componentWillUnmount=function(){t.resizeObserver&&t.destroyResizeObserver()},t.createResizeObserver=function(){t.resizeObserver=new k(function(r){var i=t.props.onResize;i&&i(r)}),t.resizeObserver.observe(_.findDOMNode(t))},t.destroyResizeObserver=function(){t.resizeObserver&&t.resizeObserver.disconnect(),t.resizeObserver=null},t}return e.prototype.componentDidMount=function(){b.isValidElement(this.props.children)?this.createResizeObserver():console.warn("The children of ResizeObserver is invalid.")},e.prototype.componentDidUpdate=function(){!this.resizeObserver&&_.findDOMNode(this)&&this.createResizeObserver()},e.prototype.render=function(){return this.props.children},e}(b.Component);const $=B;export{$ as R,k as i};
