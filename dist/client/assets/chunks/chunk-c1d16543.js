import{r as y}from"./chunk-e9cd8943.js";var f={exports:{}},t={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a;function j(){if(a)return t;a=1;var m=y,x=Symbol.for("react.element"),c=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,R=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function u(o,r,_){var e,n={},s=null,p=null;_!==void 0&&(s=""+_),r.key!==void 0&&(s=""+r.key),r.ref!==void 0&&(p=r.ref);for(e in r)l.call(r,e)&&!d.hasOwnProperty(e)&&(n[e]=r[e]);if(o&&o.defaultProps)for(e in r=o.defaultProps,r)n[e]===void 0&&(n[e]=r[e]);return{$$typeof:x,type:o,key:s,ref:p,props:n,_owner:R.current}}return t.Fragment=c,t.jsx=u,t.jsxs=u,t}f.exports=j();var i=f.exports;const E=i.jsx,O=i.jsxs,k=i.Fragment;export{k as F,O as a,E as j};
