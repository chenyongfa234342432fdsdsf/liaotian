import{c as Z,d as $,a as J,f as m,i as u,b as ce,s as ue}from"./chunk-d8234155.js";import{l as x,r as K}from"./chunk-e9cd8943.js";import{Z as S,I as pe,c as de,d as P,e as U,f as V,g,b,a as A,h as me}from"./chunk-d368c681.js";import{R as d,d as f,b as Q,y as ge}from"./chunk-fde55823.js";import{_ as le}from"./chunk-cf010ec4.js";import{m as y,M as _}from"./chunk-36a75920.js";import{p as E,a as j}from"./chunk-e3775f6c.js";/* empty css              */import{d as fe,g as he,p as ve,e as ye,f as _e,h as Ie}from"./chunk-b720646a.js";import{f as v}from"./chunk-ec284ae6.js";const Je=e=>d({path:"/v1/im/chat/group/create",method:"POST",data:e}),Ke=e=>d({path:"/v1/im/chat/group/addMember",method:"POST",data:e}),Me=e=>d({path:"/v1/im/chat/group/member",method:"GET",params:e}),Qe=e=>d({path:"/v1/im/chat/group/removeMember",method:"POST",data:e}),Xe=e=>d({path:"/v1/im/chat/group/addAdministrator",method:"POST",data:e}),et=e=>d({path:"/v1/im/chat/group/removeAdministrator",method:"POST",data:e}),tt=e=>d({path:"/v1/im/chat/group/administrator",method:"GET",params:e}),st=e=>d({path:"/v1/im/chat/group/deleteGroup",method:"POST",data:e}),W=e=>d({path:"/v1/im/chat/group/myGroup",method:"GET",params:e}),De=e=>d({path:"/v1/im/chat/group/exitGroup",method:"POST",data:e}),X=e=>d({path:"/v1/im/chat/group/settingUpdate",method:"POST",data:e}),at=e=>d({path:"/v1/im/chat/group/info",method:"GET",params:e}),Se=e=>d({path:"/v1/im/chat/group/modifyGroupHeadImage",method:"POST",data:e}),nt=e=>d({path:"/v1/im/chat/group/releaseAnnouncement",method:"POST",data:e}),ot=e=>d({path:"/v1/im/chat/group/getGroupAnnouncement",method:"GET",params:e});function Ce(e,t){return{addressBookList:[],setAddressBookList:async()=>{const s=await fe({}),{isOk:a,data:n}=s||{};a&&e(m(o=>{o.addressBookList=n}))},myGroupList:[],joinGroupList:[],setMyGroupList:async()=>{const s=await W({queryType:"1"}),{isOk:a,data:n}=s||{};a&&e(m(o=>{o.myGroupList=n}))},setJoinGroupList:async()=>{const s=await W({queryType:"2"}),{isOk:a,data:n}=s||{};a&&e(m(o=>{o.joinGroupList=n}))},remarkMap:{groupList:[],friendList:[]},setRemarkMap:s=>{e(m(a=>{a.remarkMap=s}))},groupMembers:{},setGroupMembers:(s,a)=>{e(m(n=>{n.groupMembers[s]=a}))},applyList:[],setApplyList:async()=>{const s=await he({}),{isOk:a,data:n}=s||{};a&&n&&e(m(o=>{o.applyList=n}))}}}const l=Z($(Ce,{name:"address-book-store"})),N=J(l);var C=(e=>(e[e.NO=1]="NO",e[e.YES=2]="YES",e))(C||{}),be=(e=>(e[e.NO=1]="NO",e[e.YES=2]="YES",e))(be||{});const G={};function L(e,t){return G[e]||(G[e]=[],f().on(e,(...s)=>{G[e].forEach(a=>{try{a(...s)}catch(n){console.error(n)}})})),G[e].push(t),()=>{const s=G[e].indexOf(t);s>-1&&G[e].splice(s,1)}}const Le=e=>d({path:"/v1/im/chat/imBlockList/block",method:"POST",data:e});function ke(){var t,s;const{globalAudioRefs:e}=ce.getState();(s=(t=e.message)==null?void 0:t.current)==null||s.play()}function F(e){const{updateMessagesByConversation:t}=p.getState();t(e.conversationID,[e],"push")}function ee(){const{messagesByConversation:e,updateMessagesByConversation:t}=p.getState();e.forEach(s=>{const a=s.messages.filter(n=>n.direction===U.Send&&n.sentStatus===V.Sending);t(s.conversationId,m(a,n=>{n.forEach(o=>{o.sentStatus=V.Failed})}),"update")})}const Ge=(e,t,s,a,n)=>f().sendMessage(e,t,s,{priority:P.Low,hasReceipt:!0,...a},{onMessageAttached:F,...n||{}}).catch(o=>(ee(),Promise.reject(o)));async function rt(e,t){we([e],t,!1),Re(e,t)}function it(e){return y().isSame(e,"day")?v(e,"HH:mm"):y().subtract(1,"day").isSame(e,"day")?u._("helper_message_0jp5jdxnde"):y().isSame(e,"year")?v(e,"MM-DD"):v(e,"YYYY-MM-DD")}function ct(e){return y().isSame(e,"day")?u._("helper_message_oxygd4ytur"):y().subtract(1,"day").isSame(e,"day")?u._("helper_message_0jp5jdxnde"):y().isSame(e,"year")?v(e,"MM-DD"):v(e,"YYYY-MM-DD")}function ut(e){return y().isSame(e,"day")?v(e,"HH:mm"):y().subtract(1,"day").isSame(e,"day")?`${u._("helper_message_0jp5jdxnde")} ${v(e,"HH:mm")}`:y().isSame(e,"year")?v(e,"MM-DD HH:mm"):v(e,"YYYY-MM-DD HH:mm")}function pt(e){return v(e,"HH:mm")}function O(e){const{userInfo:t}=Q.getState();return JSON.stringify({avatarUrl:t.avatarPath,fromNickname:t.nickName,...e})}function dt(e){let t={};try{t=JSON.parse(e.extendedData||"{}")}catch{t.fromNickname=e.conversationID}return t}function Ae(e,t=!0){var o;const s=(o=e.split(".").pop())==null?void 0:o.toLowerCase();let a=S.File;const n=t?pe:de;return Object.keys(n).forEach(i=>{n[i].includes(s)&&(a=i)}),Number(a)}let T;async function xe(e){if(!T||Date.now()-T<2e3)return;const{imConfig:t}=Q.getState(),{myGroupList:s,joinGroupList:a}=l.getState(),n=[...s,...a];e=e.filter(i=>i.direction===U.Receive);let o=e.find(i=>i.conversationType===b.Peer);o||(o=e.filter(c=>c.conversationType===b.Group).map(c=>n.find(I=>R(I.groupId,c.conversationID))).find(c=>(c==null?void 0:c.messageDisturb)===A.Notify)),t.soundSwitch===ge.yes&&o&&ke()}function mt(){p.subscribe(t=>t.imIsLogin,t=>{T=t?Date.now():0}),[g.message,g.receiveGroupMessage].forEach(t=>{L(t,(s,a)=>{const{updateMessagesByConversation:n}=p.getState(),o=a.messageList.filter(i=>![S.Command].includes(i.type));o.length!==0&&(xe(o),n(a.fromConversationID,o,"update"))})})}function gt(){L(g.messageSentStatusChanged,(e,t)=>{const{updateMessagesByConversation:s}=p.getState();t.infos.forEach(a=>{s(a.message.conversationID,[a.message],"update")})})}function lt(){L(g.messageDeleted,(e,t)=>{const{updateMessagesByConversation:s}=p.getState(),{conversationID:a,conversationType:n,isDeleteConversationAllMessage:o,messageList:i}=t;o?s(a,[],"replace"):s(a,i,"delete")})}function ft(){L(g.messageRevokeReceived,(e,t)=>{const{updateMessagesByConversation:s}=p.getState(),{messageList:a}=t;a.forEach(n=>{s(n.conversationID,a,"update")})})}function ht(){L(g.messageReceiptChanged,(e,t)=>{const{updateMessagesByConversation:s,messagesByConversation:a}=p.getState(),{infos:n}=t;n.forEach(o=>{const i=a.find(c=>c.conversationId===o.conversationID);if(!i)return;const r=i.messages.find(c=>c.messageID===o.messageID);!r||r.direction!==U.Send||s(o.conversationID,[m(r,c=>{c.receiptStatus=o.status,c.readMemberCount=o.readMemberCount,c.unreadMemberCount=o.unreadMemberCount})],"update")})})}async function we(e,t,s=!0){s&&await E(u._("helper_message_fugvl05ct4"),u._("helper_message_2vml_jf2mx"));const{updateMessagesByConversation:a}=p.getState();f().deleteMessages(e,t.conversationID,t.type,{isAlsoDeleteServerMessage:!0}),a(t.conversationID,e,"delete"),s&&_.success(u._("helper_message_oqdnd_extp"))}function te(e,t,s){const{updateMessagesByConversation:a}=p.getState();e.uploadedSize=t,e.fileSize=s,a(e.conversationID,[e],"update")}function vt(e=0){const t=new Date;return t.setHours(0,0,0,0),y(t).add(e||0,"second").format(e>=3600?"HH:mm:ss":"mm:ss")}async function Re(e,t){const s=f();switch(e.type){case S.Image:case S.Video:case S.Audio:case S.File:const a=e,n=["type","fileLocalPath","thumbnailDownloadUrl","fileDownloadUrl","fileName","fileSize","fileUID","largeImageDownloadUrl","originalImageWidth","originalImageHeight","thumbnailWidth","thumbnailHeight","largeImageWidth","largeImageHeight","videoDuration","videoFirstFrameDownloadUrl","videoFirstFrameWidth","videoFirstFrameHeight"],o={};return n.forEach(i=>{o[i]=a[i]}),a.extendedData=O({}),s.sendMediaMessage(o,t.conversationID,t.type,{priority:P.Low,hasReceipt:!0},{onMessageAttached:F,onMediaUploadingProgress:te});case S.Text:return Ge({message:e.message,type:e.type,extendedData:O({})},t.conversationID,t.type)}}let w={};const Be=x.debounce(()=>{const e=f();Object.values(w).forEach(t=>{t[0]&&e.sendMessageReceiptsRead(t,t[0].conversationID,t[0].conversationType)}),w={}},500);function yt(e){e[0]&&(w[e[0].conversationID]?w[e[0].conversationID].push(...e):w[e[0].conversationID]=e,Be())}async function se(e,t=!0){const{updateConversations:s}=p.getState(),a=f();t&&await E(u._("helper_message_fugvl05ct4"),u._("helper_message_ged1hbl6c6")),a.deleteAllMessage(e.conversationID,e.type,{isAlsoDeleteServerMessage:!0}),a.deleteConversation(e.conversationID,e.type,{isAlsoDeleteServerConversation:!0}),setTimeout(()=>{s([e],"delete")},500),t&&_.success(u._("helper_message_oqdnd_extp"))}async function _t(e){const{updateMessagesByConversation:t}=p.getState(),s=f();await E(u._("helper_message_fugvl05ct4"),u._("helper_message_cfq3xh_jii")),s.deleteAllMessage(e.conversationID,e.type,{isAlsoDeleteServerMessage:!0}),t(e.conversationID,[],"replace"),_.success(u._("helper_message_vuhq9kavrv"))}function It(e){return{pdf:"icon_chat_document_pdf",doc:"icon_chat_document_docx",docx:"icon_chat_document_docx",ppt:"icon_chat_document_pptx",xls:"icon_chat_document_excel",xlsx:"icon_chat_document_excel"}[e.split(".").pop()||""]||"icon_chat_document_other"}function Mt(e){return e<1024?`${e.toFixed(2)}KB`:e<1024*1024?`${(e/1024).toFixed(2)}MB`:`${(e/1024/1024).toFixed(2)}GB`}const Dt=[6.6,4.4,6.6,11,15.4,22,15.4,4.4,11,3.3,2.2,4.4,8.8,6.6,3.3,4.4,3.3,6.6,4.4,6.6,11,15.4,15.4,4.4,11,3.3,2.2,4.4,10,6.6,3.3,4.4,3.3,6.6,3.3,4.4,2.2];async function St(e){const t=await le(()=>import("./chunk-1ee8cdc7.js").then(h=>h.i),[]).then(h=>h.default),s=e.getWAV(),a=t.WavHeader.readHeader(s),{channels:n,sampleRate:o}=a,i=new t.Mp3Encoder(n,o,128),r=e.getChannelData(),c=[],I=r.left&&new Int16Array(r.left.buffer,0,r.left.byteLength/2),M=r.right&&new Int16Array(r.right.buffer,0,r.right.byteLength/2),k=I.length+(M?M.length:0),D=1152;for(let h=0;h<k;h+=D){const Y=I.subarray(h,h+D);let z=null,B;n===2?(z=M.subarray(h,h+D),B=i.encodeBuffer(Y,z)):B=i.encodeBuffer(Y),B.length>0&&c.push(B)}const q=i.flush();q.length>0&&c.push(q);const ie=new Blob(c,{type:"audio/mp3"});return new File([ie],`voice_${Date.now()}.mp3`,{type:"audio/mp3"})}function Ct(e,t,s={}){const a=f(),n={type:Ae(e.name),fileLocalPath:e,extendedData:O({}),...s};return a.sendMediaMessage(n,t.conversationID,t.type,{priority:P.Low,hasReceipt:!0},{onMessageAttached:F,onMediaUploadingProgress:te}).catch(o=>(ee(),Promise.reject(o)))}function Ee(e){return e.slice().sort((s,a)=>Number(s.timestamp)-Number(a.timestamp))}async function bt(e){return j({title:u._("helper_address_book_mvea4nxl3v"),content:u._("helper_address_book_qpzdtimgfi"),onCommit:async()=>{(await ye({uid:Number(e.conversationID)})).isOk&&(l.getState().setAddressBookList(),se(e,!1),_.success(u._("helper_address_book_yrjfkcujp9")))}})}async function Lt(e){return j({title:u._("features_messenger_chat_chat_header_more_czjsnjjjam"),content:u._("helper_address_book_vlc2w9p1vo"),onCommit:async()=>{(await De({groupId:e.conversationID})).isOk&&(l.getState().setJoinGroupList(),l.getState().setMyGroupList(),_.success(u._("helper_address_book_phusuk99ho")))}})}async function kt(e){const{setAddressBookList:t}=l.getState();await E(u._("features_messenger_addition_index_pngdv3umj8"),u._("helper_address_book_xoexvehwmo")),(await ve({uid:Number(e)})).isOk&&(_.success(u._("features_messenger_addition_index_t0o7celfir")),t())}async function Gt(e){return j({title:u._("helper_address_book_9rpuyg59gl"),content:u._("helper_address_book_ynwacl5mxr"),onCommit:async()=>{(await Le({quiltUid:Number(e.conversationID)})).isOk&&(se(e,!1),l.getState().setAddressBookList(),_.success(u._("helper_address_book_zeyncaae7k")))}})}async function At(){const e=await _e({}),{data:t}=e||{};t&&l.getState().setRemarkMap(t)}function R(e,t){return(e==null?void 0:e.toString())===(t==null?void 0:t.toString())}function ae(e){const{myGroupList:t,joinGroupList:s}=l.getState();return[...t,...s].find(a=>R(a.groupId,e))}function H(e){var o,i;const{remarkMap:t,addressBookList:s}=l.getState();let a="",n="";if(e.type===b.Group){const r=ae(e.conversationID);a=((o=t.groupList.find(c=>R(c.groupId,e.conversationID)))==null?void 0:o.remark)||(r==null?void 0:r.groupRemark)||(r==null?void 0:r.groupName)||e.conversationName,n=(r==null?void 0:r.headImage)||e.conversationAvatarUrl}else{const r=s.find(c=>R(c.uid,e.conversationID));a=((i=t.friendList.find(c=>R(c.uid,e.conversationID)))==null?void 0:i.remark)||(r==null?void 0:r.friendRemark)||(r==null?void 0:r.nickName)||e.conversationName,n=(r==null?void 0:r.avatarPath)||e.conversationAvatarUrl}return{...e,conversationName:a,conversationAvatarUrl:n}}function xt(e){return N(),H(e)}function wt(e){return N(),ae(e==null?void 0:e.conversationID)}function Ne(e){const{addressBookList:t,myGroupList:s,joinGroupList:a}=N(),n=e.toUpperCase();return K.useMemo(()=>({friends:t.filter(o=>{var i,r;return((i=o.nickName)==null?void 0:i.toUpperCase().includes(n))||((r=o.friendRemark)==null?void 0:r.toUpperCase().includes(n))}),groups:[...s,...a].filter(o=>{var i;return o.groupName.toUpperCase().includes(n)||((i=o.groupRemark)==null?void 0:i.toUpperCase().includes(n))})}),[t,s,a,e])}async function Oe(e){const t=await Me({groupId:e});t.data&&l.getState().setGroupMembers(e,t.data)}function ne(){const{setMyGroupList:e,setJoinGroupList:t}=l.getState();e(),t()}function Rt(){const e=[g.groupAttributesUpdated,g.groupStateChanged,g.groupNameUpdated,g.groupAvatarUrlUpdated,g.groupNoticeUpdated,g.groupMemberStateChanged,g.groupMemberInfoUpdated],{setMyGroupList:t,setJoinGroupList:s}=l.getState(),a=x.debounce(n=>{t(),s(),n&&Oe(n)},500);e.forEach(n=>{L(n,(o,i)=>{a(i==null?void 0:i.groupId)})})}function Bt(){const{currentConversation:e}=Ue(),{joinGroupList:t,myGroupList:s}=N(),a=[...t,...s].map(o=>o.groupId);return!((e==null?void 0:e.type)===b.Group&&!a.includes(e==null?void 0:e.conversationID))}function Et(e,t){return new Promise((s,a)=>{Se({groupId:e,headImage:t}).then(n=>{var o,i;n.isOk&&((o=n.data)!=null&&o.success)&&((i=f())==null||i.updateGroupAvatarUrl(t,e),s(!0)),s(!1)}).catch(n=>{a(n)})})}function Te(e){return e.slice().sort((t,s)=>t.isPinned!==s.isPinned?t.isPinned?-1:1:t.lastMessage&&s.lastMessage?Number(s.lastMessage.timestamp)-Number(t.lastMessage.timestamp):0)}async function Nt(e){const t=e.notificationStatus===A.DoNotDisturb;await f().setConversationNotificationStatus(t?A.Notify:A.DoNotDisturb,e.conversationID,e.type),X({groupId:e.conversationID,messageDisturb:t?A.Notify:A.DoNotDisturb}).then(()=>{ne()}),_.success(t?u._("helper_conversation_ilfbehxljw"):u._("helper_conversation_nyffvh3enl"))}async function Ot(e){await f().updateConversationPinnedState(!e.isPinned,e.conversationID,e.type),e.type===b.Group?X({groupId:e.conversationID,isTop:e.isPinned?C.NO:C.YES}).then(()=>{ne()}):Ie({uid:Number(e.conversationID),isTop:e.isPinned?C.NO:C.YES}).then(()=>{}),_.success(e.isPinned?u._("helper_conversation_pw8mvlwrba"):u._("helper_conversation_zzgzjhvayo"))}function oe(e){return H({conversationAvatarUrl:e.avatarPath,conversationID:e.uid.toString(),conversationName:e.friendRemark||e.nickName,type:b.Peer,notificationStatus:e.messageDisturb,isPinned:e.isTop===C.YES,unreadMessageCount:0,orderKey:0})}function re(e){return H({conversationAvatarUrl:e.headImage,conversationID:e.groupId,conversationName:e.groupName,type:b.Group,notificationStatus:e.messageDisturb,isPinned:e.isTop===C.YES,unreadMessageCount:0,orderKey:0})}function Tt({friend:e,group:t}){const{conversations:s,updateConversations:a,setCurrentConversation:n}=p.getState();let o=s.find(i=>i.conversationID===(e?e.uid.toString():t.groupId));if(o){n(o);return}o=e?oe(e):re(t),a([o],"unshift"),n(o)}function Pt(){L(g.conversationChanged,(e,t)=>{const{updateConversations:s}=p.getState();t.infoList.forEach(a=>{s([a.conversation],a.event===me.Deleted?"delete":"update")})})}function Ut(e){const{groups:t,friends:s}=Ne(e);return K.useMemo(()=>e?s.map(n=>oe(n)).concat(t.map(n=>re(n))):[],[t,s])}function jt(e){const{currentConversation:t}=p.getState();e||(e=t),e&&f().clearConversationUnreadMessageCount(e.conversationID,e.type)}function Pe(e,t){return{imUserInfo:{userID:""},setImUserInfo:s=>{e(m(a=>{a.imUserInfo=s}))},conversations:[],updateConversations:(s,a)=>{e(m(n=>{switch(a){case"push":n.conversations.push(...s);break;case"unshift":n.conversations.unshift(...s);break;case"replace":n.conversations=s;break;case"update":s.forEach(o=>{o={...o};const i=n.conversations.findIndex(r=>r.conversationID===o.conversationID);i>-1?n.conversations.splice(i,1,o):n.conversations.unshift(o)});break;case"delete":s.forEach(o=>{const i=n.conversations.findIndex(r=>r.conversationID===o.conversationID);i>-1&&n.conversations.splice(i,1)});break}if(n.conversations=Te(x.unionBy(n.conversations,o=>o.conversationID)),n.currentConversation){const o=n.conversations.find(i=>i.conversationID===n.currentConversation.conversationID);o?n.currentConversation=o:n.currentConversation=void 0}}))},imIsLogin:!1,setImIsLogin:s=>e(m(a=>{a.imIsLogin=s})),imIsOnline:!1,setImIsOnline:s=>e(m(a=>{a.imIsOnline=s})),currentConversation:void 0,setCurrentConversation:s=>e(m(a=>{a.currentConversation=s})),messagesByConversation:[],updateMessagesByConversation:(s,a,n)=>e(m(o=>{const i=x.cloneDeep(a);let r=o.messagesByConversation.find(c=>c.conversationId===s);switch(o.messagesByConversation.length>100&&o.messagesByConversation.splice(0,1),r||(r={conversationId:s,messages:[]},o.messagesByConversation.push(r)),n){case"push":r.messages.push(...i);break;case"unshift":r.messages.unshift(...i);break;case"replace":r.messages=i;break;case"update":i.forEach((c,I)=>{c={...c};function M(){return r.messages.findIndex(D=>D.messageID===c.messageID||D.localMessageID!=="0"&&D.localMessageID===c.localMessageID)}const k=M();r.messages[k],k>-1?r.messages.splice(k,1,{...c,fileLocalPath:r.messages[k].fileLocalPath}):r.messages.push(c)});break;case"delete":i.forEach(c=>{const I=r.messages.findIndex(M=>M.messageID===c.messageID);I>-1&&r.messages.splice(I,1)});break}r.messages=x.unionBy(Ee(r.messages),c=>c.messageID)})),clearAllMessagesByConversation:()=>{e(m(s=>{s.messagesByConversation=[]}))}}}const p=Z(ue($(Pe,{name:"im-store"}))),Ue=J(p);export{ae as $,at as A,p as B,Gt as C,_t as D,bt as E,Lt as F,At as G,ot as H,nt as I,X as J,Et as K,Bt as L,oe as M,re as N,Dt as O,St as P,Ct as Q,vt as R,Ge as S,O as T,we as U,Re as V,pt as W,rt as X,Ae as Y,It as Z,Mt as _,N as a,yt as a0,jt as a1,wt as a2,be as a3,L as a4,ct as a5,mt as a6,gt as a7,lt as a8,ft as a9,ht as aa,Pt as ab,Rt as ac,xt as b,Tt as c,Nt as d,se as e,it as f,l as g,Je as h,W as i,Ut as j,R as k,H as l,dt as m,ut as n,kt as o,Me as p,st as q,tt as r,Te as s,Ot as t,Ue as u,Ke as v,Qe as w,Xe as x,et as y,Oe as z};