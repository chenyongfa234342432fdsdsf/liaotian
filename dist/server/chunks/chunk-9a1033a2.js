import{i18n as a}from"@lingui/core";import l from"@nbit/arco";import"./chunk-86c9a026.js";import"./chunk-20abda34.js";import"react-dom";import"classnames";import"./chunk-357fcbd2.js";import"axios";import"lottie-react";import"react";import{j as s}from"./chunk-ea028b12.js";import"./chunk-13ae7681.js";import{createRoot as b}from"react-dom/client";function u(n,{destroyOnRouteChange:r=!0}={}){const t=document.createElement("div");document.body.appendChild(t);let o=b(t);const e=()=>{o.unmount(),t.remove(),window.removeEventListener("popstate",e)};r&&window.addEventListener("popstate",e),o.render(n(e))}const v="pop-box-index-module__popbox--vKK",h={popbox:v};var d,m;const{Modal:w}=(m=(d=l)==null?void 0:d.default)!=null&&m.__esModule?l.default:l;function _({visible:n,title:r=a._("helper_message_fugvl05ct4"),content:t,onClose:o,onCommit:e,okText:i=a._("components_pop_box_index_xjmp7i51ci"),cancelText:c=a._("features_group_components_comfirm_btn_pop_index_2sr1guu0iy"),...p}){const f=()=>o==null?void 0:o(),x=()=>e==null?void 0:e();return s(w,{className:h.popbox,closable:!1,title:s("div",{style:{textAlign:"left"},children:r}),visible:n,onCancel:f,onOk:x,okText:i,cancelText:c,...p,children:s("p",{children:t})})}async function A(n,r,t={}){return new Promise((o,e)=>{u(i=>s(_,{onClose:()=>{i(),e()},...t,onCommit:()=>{i(),o({})},visible:!0,title:n,content:s("span",{className:"text-base",children:r})}))})}async function I({onCommit:n,content:r,...t}){return new Promise((o,e)=>{u(i=>s(_,{content:s("span",{className:"text-base",children:r}),onClose:()=>{e(),i()},...t,onCommit:async()=>{await(n==null?void 0:n()),i(),o({})},visible:!0}))})}export{_ as P,I as a,A as p};
