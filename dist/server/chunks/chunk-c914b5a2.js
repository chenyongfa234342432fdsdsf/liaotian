import{i18n as p}from"@lingui/core";import{useState as u,useRef as L,useEffect as k}from"react";import{I as R}from"./chunk-c41c86a9.js";import{l as G}from"./chunk-75081d50.js";import M from"classnames";import{d as z,g as E}from"./chunk-afa2f5f1.js";import{g as J}from"./chunk-33e5f5bc.js";import{Z as K}from"./chunk-61a1b424.js";import P from"dayjs";import{useThrottleFn as Q}from"ahooks";import{create as U}from"zustand";import{createTrackedSelector as X}from"react-tracked";import T from"immer";import{devtools as Y}from"zustand/middleware";import{L as A}from"./chunk-c04e2975.js";import{L as H}from"./chunk-bbab396b.js";import{A as oo}from"./chunk-a28ca130.js";import{C as ro}from"./chunk-a6cae7c5.js";import{C as so}from"./chunk-bb1e6206.js";import{a as i,j as r}from"./chunk-ea028b12.js";import"@nbit/arco";import"./chunk-77d12848.js";import"./chunk-c4940547.js";import"js-cookie";import"store";import"./chunk-20abda34.js";import"@nbit/utils";import"./chunk-86c9a026.js";import"vike/client/router";import"./chunk-357fcbd2.js";import"./chunk-7a6de6d7.js";import"lodash";import"axios";import"./chunk-687b5088.js";import"make-plural/plurals";import"./chunk-9a1033a2.js";import"react-dom";import"lottie-react";import"./chunk-13ae7681.js";import"react-dom/client";import"./chunk-8d494217.js";import"./chunk-2fc83edf.js";import"dayjs/plugin/utc.js";import"dayjs/plugin/timezone.js";import"dayjs/plugin/customParseFormat.js";import"crypto-js";import"./chunk-38b7cb18.js";import"react-lazy-load-image-component";import"./chunk-30329d74.js";import"@protobuf-ts/runtime";import"./chunk-2cc5d128.js";function eo(c,m){return{joinWidth:0,foundWidth:0,setJoinWidth:d=>{c(T(n=>{n.joinWidth=d}))},setFoundWidth:d=>{c(T(n=>{n.foundWidth=d}))}}}const no=U(Y(eo,{name:"my-group"})),q=X(no),to={"my-group":"my-group-index-module__my-group--NdF"},ao={"group-com":"group-component-index-module__group-com--R8k"};function D(c){const{crewName:m,right:d,line:n=!0,img:h,icon:f="icon_address_book_new_friend",number:y,messageDisturb:l=!1,message:b,time:v}=c,{joinWidth:g,foundWidth:_}=q();return i("div",{className:ao["group-com"],children:[i("div",{className:"nav-item",children:[r("div",{className:"nav-item-left",children:r("div",{className:"nav-ico-box",children:r(ro,{size:48,src:h,isGroup:!0})})}),i("div",{className:"nav-item-right",children:[i("div",{className:"right-top",children:[r("div",{children:i("div",{className:"group-name",children:[m,i("span",{className:"group-number",children:["(",y,")"]})]})}),r("div",{children:v})]}),i("div",{className:"right-bottom",children:[r("div",{className:M("w",(g===399||_===399)&&"message2",(g===479||_===479)&&"message3"),children:r(so,{message:b})}),r("div",{children:l&&r(R,{name:"icon_chat_do_not_disturb"})})]})]})]}),n&&r("div",{className:"line"})]})}function ar(){const c=J(),{setJoinWidth:m,setFoundWidth:d}=q(),[n,h]=u(1),[f,y]=u(),[l,b]=u(),[v,g]=u([]),[_,F]=u(0),[I,x]=u(!1),j=L(null),S=L(null),W=o=>{o==null||o.forEach(e=>{c.queryConversation(e.groupId,K.Group).then(s=>{var C;let N=s.conversation.lastMessage,B=(C=s.conversation.lastMessage)==null?void 0:C.timestamp,V=P(B).format("HH:mm");g($=>[...$,{groupId:e.groupId,lastMessage:N,timeStamp:V}])}).catch(()=>{g(s=>[...s,{groupId:e.groupId,lastMessage:null,timeStamp:null}])})})},O=async()=>{x(!0);const o=await E({queryType:"1"}),{isOk:e,data:s}=o||{};e&&(x(!1),y(s),W(s))},t=f==null?void 0:f.map(o=>{const e=v.find(s=>o.groupId===s.groupId?s:null);return{...o,...e}}),Z=async()=>{const o=await E({queryType:"2"}),{isOk:e,data:s}=o||{};e&&(b(s),W(s))},a=l==null?void 0:l.map(o=>{const e=v.find(s=>o.groupId===s.groupId?s:null);return{...o,...e}});k(()=>{O(),Z()},[]),k(()=>{var s,N;const o=(s=j.current)==null?void 0:s.clientWidth,e=(N=S.current)==null?void 0:N.clientWidth;m(o),d(e)},[n,_]);const{run:w}=Q(()=>{F(window.innerWidth)},{wait:500});return k(()=>(window.addEventListener("resize",w),()=>{window.removeEventListener("resize",w)}),[]),i("div",{className:to["my-group"],children:[r(oo,{titleText:p._("features_select_contact_index_ursogloihf")}),i("div",{className:"nav-item",onClick:()=>{G("/group/add-member")},children:[r("div",{className:"nav-ico-box",children:r(R,{name:"icon_address_book_group",fontSize:28,className:"icon-color"})}),r("div",{className:"nav-text",children:p._("features_messenger_my_group_index_bcypcolpmt")})]}),i("div",{className:"group-tabs",children:[r("div",{className:M("has-found-join",n===1&&"has-found-join-activate"),onClick:()=>{h(1)},children:p._("features_select_contact_group_iykozky04y")}),r("div",{className:M("has-found-join",n===2&&"has-found-join-activate"),onClick:()=>{h(2)},children:p._("features_select_contact_group_f2v65kjlnm")})]}),I?r("div",{className:"flex justify-center mt-40",children:r(H,{})}):r("div",{className:"found-list group-list",style:{display:n===1&&(t!=null&&t.length)?"block":"none"},children:t==null?void 0:t.map((o,e)=>r("div",{ref:S,onClick:()=>{z({group:o})},children:r(D,{crewName:o==null?void 0:o.groupName,messageDisturb:(o==null?void 0:o.messageDisturb)===2,number:o==null?void 0:o.number,time:o==null?void 0:o.timeStamp,message:o==null?void 0:o.lastMessage,img:o==null?void 0:o.headImage,line:t.length-1!==e})},o==null?void 0:o.groupId))}),I?null:!(t!=null&&t.length)&&n===1&&r(A,{text:p._("features_messenger_my_group_index_ezj8ubt9up")}),r("div",{className:"join-list group-list",style:{display:n===2&&(a!=null&&a.length)?"block":"none"},children:a==null?void 0:a.map((o,e)=>r("div",{ref:j,onClick:()=>{z({group:o})},children:r(D,{crewName:o==null?void 0:o.groupName,messageDisturb:(o==null?void 0:o.messageDisturb)===2,number:o==null?void 0:o.number,time:o==null?void 0:o.timeStamp,message:o==null?void 0:o.lastMessage,img:o==null?void 0:o.headImage,line:a.length-1!==e},o==null?void 0:o.groupId)},o==null?void 0:o.groupId))}),I?null:!(a!=null&&a.length)&&n===2&&r(A,{text:p._("features_messenger_my_group_index_7ha404uvph")})]})}export{ar as default};