import{i18n as a}from"@lingui/core";import i from"@nbit/arco";import{u as S,N as k,C}from"./chunk-c6ff2ce0.js";import{useState as p}from"react";import{b as G,c as y,d as j}from"./chunk-afa2f5f1.js";import{l as L}from"./chunk-75081d50.js";import{U as M}from"./chunk-3e9e38b0.js";import{j as e,a as n}from"./chunk-ea028b12.js";import{I as w}from"./chunk-c41c86a9.js";import"zustand";import"immer";import"zustand/middleware";import"react-tracked";import"react-highlight-words";import"classnames";import"./chunk-a6cae7c5.js";import"./chunk-61a1b424.js";import"lodash";import"./chunk-33e5f5bc.js";import"axios";import"./chunk-20abda34.js";import"@nbit/utils";import"store";import"./chunk-c4940547.js";import"./chunk-77d12848.js";import"js-cookie";import"./chunk-687b5088.js";import"make-plural/plurals";import"vike/client/router";import"./chunk-357fcbd2.js";import"./chunk-7a6de6d7.js";import"crypto-js";import"dayjs";import"./chunk-9a1033a2.js";import"./chunk-86c9a026.js";import"react-dom";import"lottie-react";import"./chunk-13ae7681.js";import"react-dom/client";import"./chunk-8d494217.js";import"./chunk-2fc83edf.js";import"dayjs/plugin/utc.js";import"dayjs/plugin/timezone.js";import"dayjs/plugin/customParseFormat.js";import"./chunk-0e7315a4.js";import"@aws-sdk/client-s3";import"react-easy-crop";const U={"img-box":"group-img-upload-index-module__img-box--hmO"};function A({onHeadImgChange:r}){return e("div",{className:U["img-box"],children:e(M,{onHeadImgChange:r})})}const B={"crate-group":"create-group-index-module__crate-group--MU4"},D={"confirm-btn":"confirm-btn-index-module__confirm-btn--PIN"};var d,l;const{Spin:H}=(l=(d=i)==null?void 0:d.default)!=null&&l.__esModule?i.default:i;function O({clickFunc:r,isLoading:s}){return e("div",{className:D["confirm-btn"],onClick:()=>{s||r()},children:e(H,{loading:s,children:e(w,{name:"icon_set_confirm"})})})}var _,g;const{Input:$,Message:q}=(g=(_=i)==null?void 0:_.default)!=null&&g.__esModule?i.default:i;function Be(){const[r,s]=p(""),[c,f]=p(""),{groupSelectedList:m}=S(),{setAddressBookList:z,setMyGroupList:h,setJoinGroupList:x}=G.getState(),[N,u]=p(!1),b=async()=>{u(!0);const o=m.reduce((v,I)=>[...v,I.uid],[]),t=await y({groupName:r,headImage:c,member:o});u(!1),t.isOk&&t.data&&(L("/messenger"),x(),h(),q.success(a._("features_group_create_group_index_vngubrgasg")),j({group:{groupName:r,headImage:c,groupId:t.data.groupId,messageDisturb:1}}))};return n("div",{className:B["crate-group"],children:[e(k,{titleText:a._("features_group_create_group_index_klqpjyuhzi")}),n("div",{className:"group-info",children:[e("div",{className:"bg-card_bg_color_03 -mt-8 pt-8",children:e(A,{onHeadImgChange:o=>f(o)})}),e("div",{className:"group-name-text",children:a._("features_group_create_group_index_7hraoetkc6")}),e($,{className:"group-name-input",placeholder:a._("features_group_create_group_index_knk6ua2wn0"),onChange:o=>s(o)}),e("div",{className:"px-4 bg-card_bg_color_03",children:e("div",{className:"separate-line1"})}),e("div",{className:"separate-line"}),e("div",{className:"separate-line2"}),n("div",{className:"selected-list",children:[e("p",{className:"mb-3 text-text_color_02",children:a._("features_group_create_group_index_hppnv4p8ie")}),e("div",{children:m.map((o,t)=>e(C,{line:t!==m.length-1,friendInfo:o,isShowSelected:!1},t))})]}),r&&e(O,{isLoading:N,clickFunc:b})]})]})}export{Be as default};