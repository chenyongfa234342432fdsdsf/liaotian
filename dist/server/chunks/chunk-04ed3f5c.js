import{i18n as g}from"@lingui/core";import b from"pinyin";import{l as F}from"./chunk-75081d50.js";import{useState as u,useEffect as j,Fragment as T}from"react";import{b as D}from"./chunk-7cc161e2.js";import{I as S}from"./chunk-c41c86a9.js";import{u as A,N as R,C as w}from"./chunk-c6ff2ce0.js";import B from"classnames";import{N as G}from"./chunk-4bfa64b6.js";import{L as M}from"./chunk-bbab396b.js";import{L as U}from"./chunk-c04e2975.js";import y from"@nbit/arco";import{j as t,a as h}from"./chunk-ea028b12.js";import"vike/client/router";import"./chunk-357fcbd2.js";import"@nbit/utils";import"./chunk-7a6de6d7.js";import"zustand";import"react-tracked";import"immer";import"zustand/middleware";import"lodash";import"./chunk-c4940547.js";import"./chunk-77d12848.js";import"js-cookie";import"store";import"./chunk-20abda34.js";import"axios";import"./chunk-687b5088.js";import"make-plural/plurals";import"./chunk-33e5f5bc.js";import"crypto-js";import"./chunk-86c9a026.js";import"react-highlight-words";import"./chunk-a6cae7c5.js";import"./chunk-61a1b424.js";import"./chunk-38b7cb18.js";import"react-lazy-load-image-component";import"react-dom";import"ahooks";import"lottie-react";import"./chunk-13ae7681.js";const z={"address-book":"search-friend-index-module__address-book--CcQ"},Q={"search-input":"search-input-index-module__search-input--4uj"};var I,L;const{Input:Y}=(L=(I=y)==null?void 0:I.default)!=null&&L.__esModule?y.default:y;function Z({searchValue:n,setSearchValue:p}){return t(Y,{prefix:t(S,{name:"icon_chat_search"}),className:Q["search-input"],type:"text",value:n,placeholder:g._("features_group_components_search_input_index_tq98cmscdb"),onChange:e=>{p(e)},suffix:n.length&&t(S,{name:"icon_chat_delete",onClick:()=>{p("")}})})}function q(n,p){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZ#",c=Object.keys(n)[0],d=Object.keys(p)[0],N=e.includes(c)?e.indexOf(c):e.length,m=e.includes(d)?e.indexOf(d):e.length;return N-m}const H=1;function Re(){const[n,p]=u(""),[e,c]=u([]),[d,N]=u([]),{groupSelectedList:m,setGroupSelectedList:k}=A(),[x,v]=u(!1);function C(r){const s=r.reduce((o,i)=>{let a=((i==null?void 0:i.friendRemark)||(i==null?void 0:i.nickName)||"")[0];const f=b(a,{style:b.STYLE_FIRST_LETTER})[0][0].toUpperCase();return/^[A-Za-z]/.test(f)?a=f:a="#",o[a]||(o[a]=[]),o[a].push({...i,isChecked:!1}),o},{});return Object.keys(s).map(o=>({[o]:s[o]}))}return j(()=>{const r=d.filter(s=>{var o,i;return(i=(o=s.nickName)==null?void 0:o.toLowerCase())!=null&&i.includes(n.toLowerCase())?s:null});c(C(n===""?d:r))},[n]),j(()=>{v(!0),k([]),D({}).then(r=>{var s;r.isOk&&r.data&&(c((s=C(r.data))==null?void 0:s.sort(q)),N(r.data)),v(!1)}).catch(()=>{v(!1)})},[]),h("div",{className:z["address-book"],children:[t(R,{titleText:g._("features_group_components_search_friend_index_bo7tiepivf")}),h("div",{className:"scroll-show",children:[t("div",{className:"pl-4 mt-4 mb-6 pr-4",children:t(Z,{searchValue:n,setSearchValue:p})}),h("div",{className:"address-book-list",children:[!(e!=null&&e.length)&&!x&&(n?t(G,{name:"no_search_result",footerText:g._("features_group_components_search_friend_index_eppdggih18")}):t(U,{})),x?t("div",{className:"flex justify-center",children:t(M,{})}):e==null?void 0:e.map((r,s)=>t("div",{children:Object.keys(r).map(o=>{var i;return h("div",{children:[t("div",{className:"group-letter",children:o}),(i=r[o])==null?void 0:i.map((l,a)=>t(T,{children:t(w,{line:!(s===e.length-1&&a===r[o].length-1),friendInfo:l,searchValue:n,isSelect:!!m.filter(_=>l.uid===_.uid).length,selectClick:_=>{const{friendInfo:f,isSelect:E}=_;k(E?[...m,f]:m.filter(O=>f.uid!==O.uid))}},a)},l==null?void 0:l.uid))]},o)})},s))]})]}),t("div",{className:"people-people-box",children:e!=null&&e.length&&!x?t("div",{className:"people-people",children:g._({id:"features_group_components_search_friend_index_pol3ckrodh",values:{0:m.length}})}):null}),m.length>=H&&t("div",{className:B("jump"),onClick:()=>{F("/group/create")},children:t(S,{name:"icon_set_next_step",fontSize:46})})]})}export{Re as default};