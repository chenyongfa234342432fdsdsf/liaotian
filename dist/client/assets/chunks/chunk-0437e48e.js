import{c as N,s as S,a as k,f as m}from"./chunk-d8234155.js";import{H as C}from"./chunk-e7397446.js";import{I as d}from"./chunk-d80cdd1c.js";import{c}from"./chunk-99b8f121.js";import{C as w}from"./chunk-faa47c2c.js";import{b as x}from"./chunk-d368c681.js";import{a as o,j as e}from"./chunk-c1d16543.js";function _(r,i){return{groupSelectedList:[],setGroupSelectedList:s=>{r(m(t=>{t.groupSelectedList=s}))},groupOperateMark:"",setGroupOperateMark:s=>{r(m(t=>{t.groupOperateMark=s}))}}}const b=N(S(_)),W=k(b),G="crew-component-index-module__crew--bB2",I={crew:G};function z(r){const{friendInfo:i,right:s,searchValue:t="",line:h=!0,isShowSelected:p=!0,selectClick:n,isSelect:l,disabled:a}=r,{avatarPath:u,nickName:g,friendRemark:f,type:v}=i;return o("div",{className:I.crew,children:[o("div",{className:"nav-item",onClick:()=>{a||n&&n({friendInfo:i,isSelect:!l})},children:[o("div",{className:"nav-item-left",children:[p&&e("div",{className:"select-icon",children:l?e(d,{className:c("selected-icon",{disabled:a}),name:"icon_chat_selected"}):e(d,{className:c("not-selected-icon",{disabled:a}),name:"icon_chat_not_selected"})}),e("div",{className:c("nav-ico-box",{disabled:a}),children:e(w,{size:48,src:u,isGroup:v===x.Group})}),e("div",{className:c("nav-text",{disabled:a}),children:e(C,{caseSensitive:!1,highlightClassName:"highlighted",searchWords:[t],autoEscape:!0,textToHighlight:f||g||""})})]}),e("div",{className:"nav-item-right",children:s})]}),h&&e("div",{className:"line"})]})}export{z as C,b as g,W as u};