import{i18n as r}from"@lingui/core";import{en as h,zh as n}from"make-plural/plurals";import"./chunk-20abda34.js";import"./chunk-c4940547.js";var l=(e=>(e["zh-CN"]="zh-CN",e["zh-HK"]="zh-HK",e["en-US"]="en-US",e))(l||{});const o=Object.values(l),m={"en-US":"English","zh-CN":"简体中文","zh-HK":"繁體中文"};o.map(e=>`/${e}`);l["en-US"];r.loadLocaleData({[l["en-US"]]:{plurals:h},[l["zh-CN"]]:{plurals:n},[l["zh-HK"]]:{plurals:n}});l["en-US"];function p(e){let t=[];return e.forEach(a=>{const s=t.length-1;o.includes(t[s])&&o.includes(a)?t.splice(s,s,a):t.push(a)}),t}function L(e){const t=p(e.split("/"));let a,s;const c=t[1];return o.includes(c)?(a=c,s=`/${t.slice(2).join("/")}`):(a=null,s=e),{locale:a,urlWithoutLocale:s}}const U=e=>{if(!e)return;if(/^http/.test(e))return e.charAt(0)==="/"?e:`/${e}`;let t=e;return o.forEach(a=>{if(e.includes(a)){const s=e[0]==="/"?RegExp(`^/${a}`,"i"):RegExp(`^${a}`,"i");t=e.replace(s,"")}}),t.charAt(0)==="/"?t:`/${t}`};export{l as I,m as a,L as e,U as r};
