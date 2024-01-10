import{i18n as o}from"@lingui/core";import{useState as i,useEffect as T}from"react";import N from"@nbit/arco";import{I as j}from"./chunk-c41c86a9.js";import{u as ie,a as A}from"./chunk-33e5f5bc.js";import{u as ae}from"./chunk-1b3433e3.js";import{L as ne}from"./chunk-38b7cb18.js";import{b as le}from"./chunk-20806ff6.js";import{o as ce}from"./chunk-86c9a026.js";import"./chunk-20abda34.js";import{l as x}from"./chunk-75081d50.js";import{L as de}from"./chunk-6bf38136.js";import{C as me}from"./chunk-52911f54.js";import{a as ue,b as _e,g as fe,p as pe}from"./chunk-eddfc2c9.js";import{c as ge}from"./chunk-60db822c.js";import{u as he}from"./chunk-c4940547.js";import{b as be}from"./chunk-357fcbd2.js";import{e as xe,v as ye,p as Ne}from"./chunk-385bfa11.js";import{U as Ce}from"./chunk-e44b5a13.js";import{j as e,a as f}from"./chunk-ea028b12.js";import"classnames";import"./chunk-77d12848.js";import"axios";import"zustand";import"zustand/middleware";import"react-tracked";import"immer";import"store";import"./chunk-687b5088.js";import"make-plural/plurals";import"vike/client/router";import"crypto-js";import"react-lazy-load-image-component";import"@nbit/utils";import"ahooks";import"pinyin";import"js-cookie";import"./chunk-7a6de6d7.js";import"lodash";function B(){return"/messenger"}const we="login-index-module__scoped--aGj",ve={scoped:we};var E,F;const{Form:n,Input:u,Button:C,Message:w}=(F=(E=N)==null?void 0:E.default)!=null&&F.__esModule?N.default:N;let _=null;function ms(){const{setBusinessId:v,setAccessKey:I}=he(),{setUserInfo:q,setZimToken:k,setLogin:S}=ie(),[c,p]=i(0),[O,M]=i(""),[g,L]=i(""),[Ie,P]=i(""),[y,U]=i(!1),[a,G]=i("email"),[h,V]=i("passwordLogin"),[$,d]=i(!1);i("");const[K,z]=i(!1),[m]=n.useForm(),W=ae(),{redirect:b}=W.urlParsed.search,Z=()=>{z(!0)},D=()=>{z(!1)},H=s=>{M(s.countryName),L(s.countryEnCode),P(s.countryShortName),m.setFieldValue("area",s.countryName)},J=()=>{ge({}).then(s=>{if(s.isOk&&s.data){let{countryName:r,countryShortName:t,countryEnCode:l}=s.data;M(r||""),L(l||""),P(t||""),m.setFieldValue("area",r)}})},Q=()=>{const s={mobile:{validateName:["account","area","serverId"],sendRequest:X},email:{validateName:["email","serverId"],sendRequest:Y}};m.validate(s[a].validateName).then(()=>{s[a].sendRequest()}).catch(()=>{})},X=()=>{const{account:s}=m.getFieldsValue();fe({mobileNumber:s,mobileCountryCd:g,typeCd:"2"}).then(t=>{var l;t.isOk&&((l=t.data)!=null&&l.success)&&p(60)})},Y=()=>{let r={email:m.getFieldValue("email"),typeCd:"2"};pe(r).then(t=>{var l;t.isOk&&((l=t.data)!=null&&l.success)&&p(60)})},ee=()=>{U(!y)},se=async s=>{{d(!0);const r=await be(s.serverId);if(r)v(s.serverId),r&&I(r);else{d(!1),I(""),v("1"),await w.error(o._("features_users_create_account_index_sysmxmxmi8"));return}}a==="mobile"?re(s):oe(s)},R=s=>{G(s),p(0),_&&clearInterval(_)},te=()=>{V(h==="passwordLogin"?"codeLogin":"passwordLogin")},oe=async s=>{d(!0);const{isOk:r,data:t}=await ue({email:s.email,loginPassword:s.loginPassword,emailCode:s.code});d(!1),r&&(k((t==null?void 0:t.zeGoToken)||""),q({...t==null?void 0:t.userInfo}),S(!0),A(t),w.success(o._("features_users_login_index_pszpygvu5b")),b?x(b):x(B()))},re=async s=>{d(!0);const{isOk:r,data:t}=await _e({mobileCountryCd:g,mobileNumber:s.account,loginPassword:s.loginPassword,mobileTelCode:s.code});d(!1),r&&(k((t==null?void 0:t.zeGoToken)||""),q({...t==null?void 0:t.userInfo}),A(t),S(!0),w.success(o._("features_users_login_index_pszpygvu5b")),b?x(b):x(B()))};return T(()=>{J()},[]),T(()=>(c>0?_=setInterval(()=>{p(s=>s-1)},1e3):clearInterval(_),()=>{_&&clearInterval(_)}),[c]),e(Ce,{children:f("div",{className:ve.scoped,children:[e(le,{}),e("div",{className:"qcode-box",children:e("div",{className:"qcrode",children:e(ne,{className:"overflow-hidden rounded-3xl",src:`${ce}plogo.png`})})}),e(n,{form:m,layout:"vertical",onSubmit:se,autoComplete:"off",validateTrigger:"onBlur",children:f("div",{className:"login-box",children:[e("h1",{className:"text-3xl text-text_color_01 font-semibold",children:o._("features_users_login_index_yj8rlwoy9d")}),e(n.Item,{className:"list-item server-box",field:"serverId",requiredSymbol:!1,rules:[{required:!0,message:o._("features_users_create_account_index_xhrbqemwnq")}],children:e(u,{autoComplete:"off",placeholder:o._("features_users_create_account_index_xhrbqemwnq"),className:"input-box"})}),e("div",{className:"tab-box",children:f("ul",{children:[e("li",{className:a==="email"?"active":"",onClick:()=>R("email"),children:o._("features_settings_center_personal_information_index_suyk940elg")}),e("li",{className:a==="mobile"?"active":"",onClick:()=>R("mobile"),children:o._("features_settings_center_personal_information_index_4sbsiya1gg")})]})}),f("div",{className:"login-content",children:[a==="mobile"&&e(n.Item,{className:"list-item cursor-pointer",field:"area",requiredSymbol:!1,rules:[{required:!0,message:o._("features_users_create_account_index_0dlxrrysk4")}],children:e(u,{readOnly:!0,value:O,onClick:Z,suffix:e(j,{name:"icon_chat_arrow",fontSize:16,className:"text-icon_color pr-4"}),placeholder:o._("features_users_create_account_index_0dlxrrysk4"),className:"area"})}),a==="mobile"&&e(n.Item,{className:"list-item",field:"account",requiredSymbol:!1,rules:[{required:!0,message:o._("features_settings_center_bind_mobile_index_rocukuvszt")}],children:e(u,{addBefore:g?`+${g}`:"--",placeholder:o._("features_settings_center_bind_mobile_index_rocukuvszt"),className:"input-box"})}),a==="email"&&e(n.Item,{className:"list-item",field:"email",requiredSymbol:!1,rules:[xe()],children:e(u,{placeholder:o._("features_users_create_account_index_jgkp094fey"),className:"input-box"})}),h==="codeLogin"&&e(n.Item,{className:"list-item last-item",requiredSymbol:!1,field:"code",rules:[ye(c>0)],children:e(u,{placeholder:a==="email"?o._("features_settings_center_verify_identidy_index_rwtzuuhnki"):o._("features_settings_center_bind_mobile_index_avn5naqutc"),className:"input-box",addAfter:e(C,{onClick:Q,disabled:c>0,className:"getcode pr-4",type:"text",children:c>0?`${c}s`:o._("features_users_create_account_index_dlm0wqw8rw")})})}),h==="passwordLogin"&&e(n.Item,{className:"list-item last-item",requiredSymbol:!1,field:"loginPassword",rules:[Ne()],children:e(u,{type:y?"text":"password",className:"input-box",suffix:e(j,{name:y?"icon_register_open":"icon_register_hide",fontSize:22,onClick:ee,className:"password-icon pr-4 text-icon_color"}),placeholder:o._("features_users_create_account_index_uqp_bpomjo")})})]}),e("div",{className:"switch-box",onClick:te,children:e(C,{type:"default",long:!0,className:"switch-btn",children:h==="codeLogin"?o._("features_users_login_index_zdnovihqrb"):o._("features_users_login_index_xor_1rtwly")})}),e("div",{className:"w-full",children:e(C,{type:"primary",loading:$,long:!0,className:"commit-btn",htmlType:"submit",children:o._("features_users_login_index_6tiyoujrwd")})}),f("div",{className:"text-text_color_02 text-sm mt-6",children:[e("span",{children:o._("features_users_login_index_kvhniugxol")}),e(de,{href:"/register",className:"text-brand_color unline",children:o._("features_users_login_index_r_dc9gbbyo")})]})]})}),e(me,{visible:K,onClose:D,onSelect:H})]})})}export{ms as default};
