import m from"@nbit/arco";import{useEffect as p,useState as _,lazy as f}from"react";import{u as h,a as g}from"./chunk-afa2f5f1.js";import{W as b,a as v,w as y,b as x,c as S}from"./chunk-30329d74.js";import{u as k}from"./chunk-33e5f5bc.js";import{L as N}from"./chunk-6bf38136.js";import{I as T}from"./chunk-c41c86a9.js";import{l as w}from"./chunk-75081d50.js";import{C as A}from"./chunk-a6cae7c5.js";import{g as E}from"./chunk-53514b52.js";import{a as n,j as s,F as I}from"./chunk-ea028b12.js";const j="home_search_conversations_id",C={"setting-bar-wrapper":"setting-bar-index-module__setting-bar-wrapper--y5W"};function M(){const{userInfo:o}=k(),{applyList:r,setApplyList:a}=h(),i=[{path:"/messenger/address-book",icon:"icon_chat_address_book"},{path:"/settings-center",icon:"icon_chat_set"}],c=()=>{w("/personal-information?redirect=/messenger")},l=3,t=r==null?void 0:r.filter(e=>e.applyStatus===1&&E(e.applyTime)<l&&!e.initiativeAdd?e:null);return p(()=>{a()},[]),n("div",{className:C["setting-bar-wrapper"],children:[s("div",{onClick:c,children:s(A,{src:o.avatarPath,className:"cursor-pointer",size:40})}),s("div",{className:"flex items-center",children:i.map(e=>n(N,{className:"mr-6 last:mr-0 relative",href:e.path,children:[e.path==="/messenger/address-book"&&!!t.length&&s("div",{className:"tips-apply-number",children:t==null?void 0:t.length}),s(T,{className:"text-xl text-icon_color hover:text-brand_color",name:e.icon})]},e.icon))})]})}const W={"messenger-wrapper":"messenger-index-module__messenger-wrapper--VuQ"};var d,u;const{Spin:z}=(u=(d=m)==null?void 0:d.default)!=null&&u.__esModule?m.default:m,O=f(()=>import("./chunk-b7ec8f63.js")),H=f(()=>import("./chunk-e82f8cfc.js"));function L(){const{imIsLogin:o}=g(),{setApplyList:r}=h(),[a,i]=_([]);return p(()=>{const c={biz:b.im,type:v.friendApply},l=t=>{i(e=>[...e,...t])};y.subscribe({subs:c,callback:l,throttleType:x.increment,throttleTime:S.Market})},[]),p(()=>{r()},[a]),n("div",{className:W["messenger-wrapper"],children:[s(M,{}),o?n(I,{children:[s(H,{}),s("div",{id:j,className:"relative flex-1 overflow-y-auto",children:s(O,{})})]}):s("div",{className:"flex flex-1 justify-center items-center h-full",children:s(z,{})})]})}const J=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));export{j as H,J as i};