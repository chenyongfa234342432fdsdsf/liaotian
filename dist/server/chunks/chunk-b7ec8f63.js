import{g as A}from"./chunk-33e5f5bc.js";import{a as y}from"./chunk-afa2f5f1.js";import{useScroll as C,usePrevious as H,useDebounceFn as P,useThrottleFn as j,useUpdateEffect as f,useRequest as w}from"ahooks";import{forwardRef as R,useRef as p,useState as S,useEffect as _}from"react";import{j as s,a as I}from"./chunk-ea028b12.js";import u from"@nbit/arco";import{L as M}from"./chunk-c04e2975.js";import k from"classnames";import{C as W}from"./chunk-b4b66d69.js";import"axios";import"./chunk-20abda34.js";import"@nbit/utils";import"zustand";import"zustand/middleware";import"react-tracked";import"immer";import"store";import"./chunk-c4940547.js";import"./chunk-77d12848.js";import"js-cookie";import"./chunk-687b5088.js";import"@lingui/core";import"make-plural/plurals";import"vike/client/router";import"./chunk-357fcbd2.js";import"./chunk-7a6de6d7.js";import"lodash";import"crypto-js";import"./chunk-61a1b424.js";import"dayjs";import"./chunk-9a1033a2.js";import"./chunk-86c9a026.js";import"react-dom";import"lottie-react";import"./chunk-13ae7681.js";import"react-dom/client";import"./chunk-8d494217.js";import"./chunk-2fc83edf.js";import"dayjs/plugin/utc.js";import"dayjs/plugin/timezone.js";import"dayjs/plugin/customParseFormat.js";import"./chunk-38b7cb18.js";import"react-lazy-load-image-component";import"./chunk-c41c86a9.js";import"./chunk-bb1e6206.js";import"./chunk-30329d74.js";import"@protobuf-ts/runtime";import"./chunk-a6cae7c5.js";import"./chunk-2cc5d128.js";function D(t,c){const{threshold:n=20}=t;let r=p(null);r=c||r;const i=C(r),l=H(i),o=i&&l?i.top<l.top:!1,a=p(0),m=p(0),d=()=>{var e;m.current=Math.max(r.current.scrollTop,0),(e=t.loadNext)==null||e.call(t)},h=()=>{var e;a.current=Math.max(r.current.scrollHeight-n,0),(e=t.loadPrev)==null||e.call(t)},{run:T}=P(()=>{const{scrollTop:e,scrollHeight:L,clientHeight:N}=r.current;e<=n&&o&&h(),L-e-N<=n&&o&&d()},{wait:30}),{run:x}=j(e=>{r.current&&(e.deltaY>0&&r.current.scrollHeight-r.current.scrollTop-r.current.clientHeight<20?d():e.deltaY<0&&r.current.scrollTop===0&&h())},{wait:1e3,trailing:!1});return f(()=>{const e=a.current;r.current.scrollTop=r.current.scrollHeight-e},[t.keepScrollAfterLoadPrevAfter]),f(()=>{const e=m.current;r.current.scrollTop=e},[t.keepScrollAfterLoadNext]),s("div",{onWheel:x,onScroll:T,className:t.className,ref:r,children:t.children})}const E=R(D);var g,v;const{Spin:b}=(v=(g=u)==null?void 0:g.default)!=null&&v.__esModule?u.default:u;function q(){const{conversations:t,updateConversations:c}=y(),n=A(),[r,i]=S(0),l=100,{run:o,loading:a}=w(async()=>{const{conversationList:m}=await n.queryConversationList({count:l,nextConversation:t.length<l?void 0:t[t.length-1]});m.length!==0&&c(m,"push")},{manual:!0});return _(()=>{if(t.length===0){o();return}t.length<l&&r<2&&(i(r+1),o())},[t]),{conversations:t,loadMore:o,loading:a}}function Wt(){const{conversations:t,loadMore:c,loading:n}=q(),r=p(null),[i,l]=S(0);return f(()=>{l(i+1)},[t]),I(E,{keepScrollAfterLoadNext:i,ref:r,className:k({"h-full":t.length===0}),loadNext:c,children:[t.map(o=>s(W,{conversation:o},o.conversationID)),n&&s("div",{className:"flex justify-center py-2",children:s(b,{})}),!n&&t.length===0&&s("div",{className:"h-full flex items-center justify-center",children:s(M,{})})]})}export{Wt as default};