import{i as o}from"./chunk-d8234155.js";import{r as s}from"./chunk-e9cd8943.js";/* empty css              */import{B as y}from"./chunk-23179642.js";import{u as G,n as J,o as D}from"./chunk-fde55823.js";import{S as N}from"./chunk-86e4740a.js";import{I as F}from"./chunk-d80cdd1c.js";import{l as p}from"./chunk-ba3e3861.js";import{C as K}from"./chunk-cb1a8670.js";import{p as Q}from"./chunk-e3775f6c.js";import{U as W}from"./chunk-1051dbf9.js";import{g as X}from"./chunk-41ff5c14.js";import{U as Y}from"./chunk-18733530.js";import{j as t,a}from"./chunk-c1d16543.js";import{M as Z}from"./chunk-36a75920.js";import"./chunk-cf010ec4.js";import"./chunk-09d047a9.js";import"./chunk-acb1a683.js";import"./chunk-634a8a63.js";import"./chunk-5dde6c82.js";import"./chunk-38ad52ab.js";import"./chunk-99b8f121.js";import"./chunk-f3e99ce8.js";import"./chunk-61229905.js";import"./chunk-0feb7138.js";import"./chunk-b745fb4d.js";import"./chunk-b4d6f2f0.js";import"./chunk-1a70223d.js";import"./chunk-01660bad.js";import"./chunk-d4125093.js";import"./chunk-c1540bb6.js";import"./chunk-5212edba.js";import"./chunk-5f195378.js";import"./chunk-6b5946cf.js";import"./chunk-cd3d6459.js";import"./chunk-ec38f500.js";import"./chunk-3a21c360.js";import"./chunk-01f7121e.js";import"./chunk-77df718a.js";import"./chunk-260fa0dc.js";/* empty css              */import"./chunk-46a6e698.js";import"./chunk-faa47c2c.js";const ee="set-information-index-module__scoped--PLt",te={scoped:ee};function Fe(){const{userInfo:i,setUserInfo:f}=G(),[oe,v]=s.useState(""),[l,I]=s.useState(""),[h,S]=s.useState(1),[x,se]=s.useState(!1),[m,k]=s.useState(""),[c,b]=s.useState(0),[u,w]=s.useState(""),[U,q]=s.useState(i.bindCountry||""),[d,M]=s.useState(i.mobileCountryCd||""),[j,z]=s.useState(i.regCountryCd||""),[A,g]=s.useState(!1),E=e=>{v(e),C({avatarPath:e})},O=e=>{I(e.target.value)},C=e=>{J(e).then(n=>{var r;if(n.isOk&&((r=n.data)!=null&&r.success)){const _={...i,...e};f(_)}})},T=()=>{C({nickName:l}),i.mobileNumber?p("/messenger"):S(2)},B=()=>{g(!0)},V=()=>{g(!1)},L=e=>{q(e.countryName),M(e.countryEnCode),z(e.countryShortName)},H=()=>{if(!m){Z.error(o._("features_settings_center_bind_mobile_index_0ra0n8jymv"));return}P()},P=()=>{X({mobileNumber:m,mobileCountryCd:d,typeCd:"1"}).then(n=>{var r;n.isOk&&((r=n.data)!=null&&r.success)&&b(60)})},R=async()=>{await Q(o._("helper_message_fugvl05ct4"),o._("features_users_set_information_index_x1gw1yxzgn"),{okText:o._("components_i18n_select_modal_index_cl__sphiqv")}),p("/messenger")};s.useEffect(()=>{let e=null;return c>0?e=setInterval(()=>{b(n=>n-1)},1e3):clearInterval(e),()=>{e&&clearInterval(e)}},[c]);const $=()=>{D({regCountryCd:j,mobileCountryCd:d,mobileNumber:m,mobileCode:u}).then(n=>{var r;if(n.isOk&&((r=n.data)!=null&&r.success)){const _={...i,mobileNumber:m,mobileCountryCd:u};f(_),p("/messenger")}})};return t(Y,{children:a("div",{className:te.scoped,children:[h===1&&a("div",{className:"information",children:[t("h1",{className:"text-3xl text-text_color_01 font-semibold",children:o._("features_users_set_information_index_gbh7pkzybl")}),t("div",{className:"upload-head",children:t(W,{size:82,padding:40,onHeadImgChange:E,containerClassName:"info-box"})}),a("div",{className:"enter-box",children:[t("input",{type:"text",className:"enter-input",value:l,onChange:O,maxLength:10,placeholder:o._("features_users_set_information_index_4_gowgaube")}),l&&a("span",{className:"max-num",children:[o._("features_users_set_information_index_0olrpyuok9"),10-l.length<0?0:10-l.length,o._("features_users_set_information_index_h9v_zt0h8q")]})]}),t(N,{loading:x,className:"w-full",children:t(y,{type:"primary",long:!0,className:"commit-btn",disabled:!l,onClick:T,children:o._("features_users_set_information_index_fpqbqymc5f")})})]}),h===2&&a("div",{className:"information",children:[t("h1",{className:"text-3xl text-text_color_01 font-semibold",children:o._("features_settings_center_account_security_index_b_vtomrwck")}),a("div",{className:"login-content mt-8",children:[a("div",{className:"list-item cursor-pointer",onClick:B,children:[t("input",{type:"text",value:U,className:"area",readOnly:!0,placeholder:o._("features_users_create_account_index_0dlxrrysk4")}),t(F,{name:"icon_chat_arrow",fontSize:16,className:"text-icon_color pr-4"})]}),a("div",{className:"list-item",children:[t("span",{className:"area-code",children:d?`+${d}`:"--"}),t("input",{type:"text",value:m,placeholder:o._("features_settings_center_bind_mobile_index_rocukuvszt"),className:"input-box",onChange:e=>k(e.target.value)})]}),a("div",{className:"list-item last-item",children:[t("input",{type:"text",value:u,placeholder:o._("features_settings_center_bind_mobile_index_avn5naqutc"),className:"input-box",onChange:e=>w(e.target.value)}),t("button",{onClick:H,disabled:c>0,className:"getcode pr-4",type:"button",children:c>0?`${c}s`:o._("features_users_create_account_index_dlm0wqw8rw")})]})]}),t(N,{loading:x,className:"w-full",children:t(y,{type:"primary",long:!0,className:"commit-btn",disabled:!m||!u||!d,onClick:$,children:o._("components_i18n_select_modal_index_cl__sphiqv")})}),t("div",{className:"text-text_color_02 text-sm mt-6 w-full justify-start",onClick:R,children:t("span",{className:"underline text-brand_color",children:o._("features_users_set_information_index_jedfqvgubj")})})]}),t(K,{visible:A,onClose:V,onSelect:L})]})})}export{Fe as default};
