import{create as g}from"zustand";import{subscribeWithSelector as y}from"zustand/middleware";import{createTrackedSelector as p}from"react-tracked";import{a as c,T as a,C as d}from"./chunk-77d12848.js";import T from"js-cookie";import n from"store";import{b as u}from"./chunk-20abda34.js";import k from"immer";const r=(e,s,t)=>{T.set(e,s,{expires:t})};function A(e){r("theme",e,365)}function M(e){r("locale",e,365)}function F(e){r("token",e,365)}function J(){r("token","",0)}const h="AUTH_TOKEN";function X(e){n.set(h,e)}function Y(){return n.get(h)}const l="themeCache",I="themeTypeCache";function K(){return n.get(l)}function w(e){return n.set(l,e)}function O(e){return n.set(I,e)}const f="mergeModeCache";function R(e){return n.set(f,e)}function S(){return n.get(f)}const b="businessId";function V(e){return n.set(b,e)}function $(){return n.get(b)||u}const C="accessKey";function E(e){return n.set(C,e)}function B(){return n.get(C)}const v=K(),x=void 0,D=S(),G=$(),L=B();function N(e,s){return{maintenanceMode:{triggerCheck:!1,isMaintenance:!1},setMaintenanceMode:({triggerCheck:t,isMaintenance:o})=>e(k(m=>{t&&(m.maintenanceMode.triggerCheck=t),o&&(m.maintenanceMode.isMaintenance=o)})),themeOption:v||c.light,theme:a.light,setTheme:t=>{e({theme:t})},themeType:d.default,setThemeType:t=>e(o=>(O(t),t===d.okx&&o.setTheme(c.light),{themeType:t})),setThemeOption:t=>e(o=>(w(t),{themeOption:t})),locale:x,setLocale:t=>e(()=>t?{locale:t}:{}),secretKey:null,setSecretKey:t=>e(()=>t?{secretKey:t}:{}),isMergeMode:D||!1,setMergeMode:t=>e(()=>(R(t),{isMergeMode:t})),businessId:G||u,setBusinessId:t=>e(()=>{const o=t||u;return V(o),{businessId:o}}),accessKey:L||null,setAccessKey:t=>e(()=>{const o=t;return E(o),{accessKey:o}}),wsDelayTime:0,setwsDelayTime:t=>e(()=>({wsDelayTime:t})),c2cModeInfo:{},setC2cModeInfo:t=>e(()=>({c2cModeInfo:t})),globalAudioRefs:{message:null,call:null,videoCall:null},setGlobalAudioRefs:(t,o)=>e(()=>({globalAudioRefs:{...s().globalAudioRefs,[t]:o}})),globalVoiceAndVideoRef:null,setGlobalVoiceAndVideoRef:t=>e(()=>({globalVoiceAndVideoRef:t}))}}const i=g(y(N));i.subscribe(e=>e.themeType,e=>{typeof window<"u"&&document.body.setAttribute("theme-type",e)});function Q(e){const{setTheme:s}=i.getState();typeof window<"u"&&(e!==c.system?(document.body.setAttribute("arco-theme",e),s(e),document.body.setAttribute("theme-business",`merchant-${e}`)):window.matchMedia("(prefers-color-scheme: dark)").matches?(document.body.setAttribute("arco-theme",c.dark),s(a.dark),document.body.setAttribute("theme-business",`merchant-${c.dark}`)):(document.body.setAttribute("arco-theme",c.light),s(a.light),document.body.setAttribute("theme-business",`merchant-${c.light}`)),A(e))}i.subscribe(e=>e.themeOption,e=>Q(e));i.subscribe(e=>e.locale,e=>{typeof window<"u"&&M(e)});const Z=p(i);export{X as a,i as b,Y as g,J as r,F as s,Z as u};