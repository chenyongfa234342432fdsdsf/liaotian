import{escapeInject as r}from"vike/server";import{T as i}from"../chunks/chunk-77d12848.js";import"../chunks/chunk-20abda34.js";import{b as a}from"../chunks/chunk-7a6de6d7.js";import"@nbit/utils";import"zustand";import"react-tracked";import"immer";import"zustand/middleware";const m=e=>{const{documentProps:t}=e;return a.getState(),(t||{}).title,(t||{}).description,{title:"",description:""}},v=["pageProps","documentProps","locale","routeParams","theme","layoutParams","path","host","headers","needSeo","authTo","unAuthTo","layoutProps"];async function P(e){const{title:t,description:o}=m(e);return{documentHtml:r`<!DOCTYPE html>
    <html>
      <head>
        <title>${t}</title>
        <meta name="description" content="${o}" />
        <meta charset="utf8" version='1'/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="renderer" content="webkit"/>
        <meta name="google" content="notranslate">
        <link rel="icon" href="${"https://oss.chainstar.cloud/im-web/image-plus/icon1.ico"}" type="image/x-icon" />

      </head>
      <body arco-theme=${i.light} theme-business=${`merchant-${i.light}`}>
        <div id="page-view"></div>
      </body>
    </html>`}}export{v as passToClient,P as render};
