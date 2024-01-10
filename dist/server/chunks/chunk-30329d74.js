import{MessageType as b,jsonWriteOptions as O,isJsonObject as R,typeofJsonValue as I,reflectionMergePartial as g,UnknownFieldHandler as d,WireType as u,MESSAGE_TYPE as k}from"@protobuf-ts/runtime";import{b as _}from"./chunk-33e5f5bc.js";import{b as A}from"./chunk-c4940547.js";import D from"dayjs";var T=(r=>(r.friendDestroy="friend_destroy",r.friendAddPass="friend_add_pass",r.redPackageStatus="red_package_status",r.friendAdd="friend_add",r.userInfoModify="user_info_modify",r.friendApply="friend_apply",r.passFriendApply="pass_friend_apply",r))(T||{}),W=(r=>(r.im="im",r))(W||{}),E=(r=>(r[r.Slower=2e3]="Slower",r[r.Slow=1e3]="Slow",r[r.Market=500]="Market",r[r.Medium=300]="Medium",r[r.Fast=100]="Fast",r))(E||{});class j extends b{constructor(){super("google.protobuf.Any",[{no:1,name:"type_url",kind:"scalar",T:9},{no:2,name:"value",kind:"scalar",T:12}])}pack(e,t){return{typeUrl:this.typeNameToUrl(t.typeName),value:t.toBinary(e)}}unpack(e,t,i){if(!this.contains(e,t))throw new Error("Cannot unpack google.protobuf.Any with typeUrl '"+e.typeUrl+"' as "+t.typeName+".");return t.fromBinary(e.value,i)}contains(e,t){if(!e.typeUrl.length)return!1;let i=typeof t=="string"?t:t.typeName,n=this.typeUrlToName(e.typeUrl);return i===n}internalJsonWrite(e,t){var l;if(e.typeUrl==="")return{};let i=this.typeUrlToName(e.typeUrl),n=O(t),s=(l=n.typeRegistry)==null?void 0:l.find(o=>o.typeName===i);if(!s)throw new globalThis.Error("Unable to convert google.protobuf.Any with typeUrl '"+e.typeUrl+"' to JSON. The specified type "+i+" is not available in the type registry.");let c=s.fromBinary(e.value,{readUnknownField:!1}),a=s.internalJsonWrite(c,n);return(i.startsWith("google.protobuf.")||!R(a))&&(a={value:a}),a["@type"]=e.typeUrl,a}internalJsonRead(e,t,i){var a;if(!R(e))throw new globalThis.Error("Unable to parse google.protobuf.Any from JSON "+I(e)+".");if(typeof e["@type"]!="string"||e["@type"]=="")return this.create();let n=this.typeUrlToName(e["@type"]),s=(a=t==null?void 0:t.typeRegistry)==null?void 0:a.find(l=>l.typeName==n);if(!s)throw new globalThis.Error("Unable to parse google.protobuf.Any from JSON. The specified type "+n+" is not available in the type registry.");let c;if(n.startsWith("google.protobuf.")&&e.hasOwnProperty("value"))c=s.fromJson(e.value,t);else{let l=Object.assign({},e);delete l["@type"],c=s.fromJson(l,t)}return i===void 0&&(i=this.create()),i.typeUrl=e["@type"],i.value=s.toBinary(c),i}typeNameToUrl(e){if(!e.length)throw new Error("invalid type name: "+e);return"type.googleapis.com/"+e}typeUrlToName(e){if(!e.length)throw new Error("invalid type url: "+e);let t=e.lastIndexOf("/"),i=t>0?e.substring(t+1):e;if(!i.length)throw new Error("invalid type url: "+e);return i}create(e){const t={typeUrl:"",value:new Uint8Array(0)};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.typeUrl=e.string();break;case 2:s.value=e.bytes();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.typeUrl!==""&&t.tag(1,u.LengthDelimited).string(e.typeUrl),e.value.length&&t.tag(2,u.LengthDelimited).bytes(e.value);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const f=new j;class M extends b{constructor(){super("Request",[{no:1,name:"event",kind:"scalar",T:9},{no:2,name:"data",kind:"message",T:()=>f}])}create(e){const t={event:""};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.event=e.string();break;case 2:s.data=f.internalBinaryRead(e,e.uint32(),i,s.data);break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.event!==""&&t.tag(1,u.LengthDelimited).string(e.event),e.data&&f.internalBinaryWrite(e.data,t.tag(2,u.LengthDelimited).fork(),i).join();let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const m=new M;class x extends b{constructor(){super("LoginReq",[{no:1,name:"token",kind:"scalar",T:9}])}create(e){const t={token:""};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.token=e.string();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.token!==""&&t.tag(1,u.LengthDelimited).string(e.token);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const P=new x;class J extends b{constructor(){super("SubscribeReq",[{no:1,name:"subs",kind:"message",repeat:1,T:()=>N}])}create(e){const t={subs:[]};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.subs.push(N.internalBinaryRead(e,e.uint32(),i));break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){for(let s=0;s<e.subs.length;s++)N.internalBinaryWrite(e.subs[s],t.tag(1,u.LengthDelimited).fork(),i).join();let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const B=new J;class z extends b{constructor(){super("SubscribeReq.Body",[{no:1,name:"biz",kind:"scalar",T:9},{no:2,name:"type",kind:"scalar",T:9},{no:3,name:"base",kind:"scalar",T:9},{no:4,name:"quote",kind:"scalar",T:9},{no:5,name:"contractCode",kind:"scalar",T:9},{no:6,name:"granularity",kind:"scalar",T:9}])}create(e){const t={biz:"",type:"",base:"",quote:"",contractCode:"",granularity:""};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.biz=e.string();break;case 2:s.type=e.string();break;case 3:s.base=e.string();break;case 4:s.quote=e.string();break;case 5:s.contractCode=e.string();break;case 6:s.granularity=e.string();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.biz!==""&&t.tag(1,u.LengthDelimited).string(e.biz),e.type!==""&&t.tag(2,u.LengthDelimited).string(e.type),e.base!==""&&t.tag(3,u.LengthDelimited).string(e.base),e.quote!==""&&t.tag(4,u.LengthDelimited).string(e.quote),e.contractCode!==""&&t.tag(5,u.LengthDelimited).string(e.contractCode),e.granularity!==""&&t.tag(6,u.LengthDelimited).string(e.granularity);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const N=new z;class H extends b{constructor(){super("ConnectReq",[{no:1,name:"businessId",kind:"scalar",T:5},{no:2,name:"client",kind:"scalar",T:9},{no:3,name:"version",kind:"scalar",T:9},{no:4,name:"token",kind:"scalar",T:9},{no:5,name:"deviceId",kind:"scalar",T:9}])}create(e){const t={businessId:0,client:"",version:"",token:"",deviceId:""};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.businessId=e.int32();break;case 2:s.client=e.string();break;case 3:s.version=e.string();break;case 4:s.token=e.string();break;case 5:s.deviceId=e.string();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.businessId!==0&&t.tag(1,u.Varint).int32(e.businessId),e.client!==""&&t.tag(2,u.LengthDelimited).string(e.client),e.version!==""&&t.tag(3,u.LengthDelimited).string(e.version),e.token!==""&&t.tag(4,u.LengthDelimited).string(e.token),e.deviceId!==""&&t.tag(5,u.LengthDelimited).string(e.deviceId);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const C=new H;class V extends b{constructor(){super("PingReq",[{no:1,name:"timestamp",kind:"scalar",T:3}])}create(e){const t={timestamp:"0"};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.timestamp=e.int64().toString();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.timestamp!=="0"&&t.tag(1,u.Varint).int64(e.timestamp);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const S=new V;class G extends b{constructor(){super("Response",[{no:1,name:"biz",kind:"scalar",T:9},{no:2,name:"type",kind:"scalar",T:9},{no:3,name:"base",kind:"scalar",T:9},{no:4,name:"quote",kind:"scalar",T:9},{no:5,name:"contractCode",kind:"scalar",T:9},{no:6,name:"granularity",kind:"scalar",T:9},{no:7,name:"data",kind:"message",T:()=>f},{no:8,name:"userId",kind:"scalar",T:3}])}create(e){const t={biz:"",type:"",base:"",quote:"",contractCode:"",granularity:"",userId:"0"};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.biz=e.string();break;case 2:s.type=e.string();break;case 3:s.base=e.string();break;case 4:s.quote=e.string();break;case 5:s.contractCode=e.string();break;case 6:s.granularity=e.string();break;case 7:s.data=f.internalBinaryRead(e,e.uint32(),i,s.data);break;case 8:s.userId=e.int64().toString();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.biz!==""&&t.tag(1,u.LengthDelimited).string(e.biz),e.type!==""&&t.tag(2,u.LengthDelimited).string(e.type),e.base!==""&&t.tag(3,u.LengthDelimited).string(e.base),e.quote!==""&&t.tag(4,u.LengthDelimited).string(e.quote),e.contractCode!==""&&t.tag(5,u.LengthDelimited).string(e.contractCode),e.granularity!==""&&t.tag(6,u.LengthDelimited).string(e.granularity),e.data&&f.internalBinaryWrite(e.data,t.tag(7,u.LengthDelimited).fork(),i).join(),e.userId!=="0"&&t.tag(8,u.Varint).int64(e.userId);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const F=new G;class Q extends b{constructor(){super("CommonRsp",[{no:1,name:"code",kind:"scalar",T:5},{no:2,name:"msg",kind:"scalar",T:9}])}create(e){const t={code:0,msg:""};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.code=e.int32();break;case 2:s.msg=e.string();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.code!==0&&t.tag(1,u.Varint).int32(e.code),e.msg!==""&&t.tag(2,u.LengthDelimited).string(e.msg);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}new Q;var p=(r=>(r.login="login",r.logout="logout",r.subscribe="subscribe",r.unsubscribe="unsubscribe",r.connect="connect",r))(p||{}),v=(r=>(r[r.none=0]="none",r[r.cover=1]="cover",r[r.increment=2]="increment",r))(v||{}),q=(r=>(r[r.none=-1]="none",r))(q||{});const Y=["biz","type","contractCode","granularity"];class X extends b{constructor(){super("FriendDestroy",[{no:1,name:"uid",kind:"scalar",T:18},{no:2,name:"nickName",kind:"scalar",T:9}])}create(e){const t={uid:"0",nickName:""};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.uid=e.sint64().toString();break;case 2:s.nickName=e.string();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.uid!=="0"&&t.tag(1,u.Varint).sint64(e.uid),e.nickName!==""&&t.tag(2,u.LengthDelimited).string(e.nickName);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const Z=new X;class K extends b{constructor(){super("FriendAddPush",[{no:1,name:"uid",kind:"scalar",T:18},{no:2,name:"nickName",kind:"scalar",T:9},{no:3,name:"avatarPath",kind:"scalar",T:9}])}create(e){const t={uid:"0",nickName:"",avatarPath:""};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.uid=e.sint64().toString();break;case 2:s.nickName=e.string();break;case 3:s.avatarPath=e.string();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.uid!=="0"&&t.tag(1,u.Varint).sint64(e.uid),e.nickName!==""&&t.tag(2,u.LengthDelimited).string(e.nickName),e.avatarPath!==""&&t.tag(3,u.LengthDelimited).string(e.avatarPath);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const ee=new K;class te extends b{constructor(){super("FriendAddPassPush",[{no:1,name:"uid",kind:"scalar",T:18},{no:2,name:"nickName",kind:"scalar",T:9},{no:3,name:"avatarPath",kind:"scalar",T:9}])}create(e){const t={uid:"0",nickName:"",avatarPath:""};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.uid=e.sint64().toString();break;case 2:s.nickName=e.string();break;case 3:s.avatarPath=e.string();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.uid!=="0"&&t.tag(1,u.Varint).sint64(e.uid),e.nickName!==""&&t.tag(2,u.LengthDelimited).string(e.nickName),e.avatarPath!==""&&t.tag(3,u.LengthDelimited).string(e.avatarPath);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const ne=new te;class ie extends b{constructor(){super("UserInfoModify",[{no:1,name:"uid",kind:"scalar",T:18},{no:2,name:"nickName",kind:"scalar",T:9},{no:3,name:"avatarPath",kind:"scalar",T:9}])}create(e){const t={uid:"0",nickName:"",avatarPath:""};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.uid=e.sint64().toString();break;case 2:s.nickName=e.string();break;case 3:s.avatarPath=e.string();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.uid!=="0"&&t.tag(1,u.Varint).sint64(e.uid),e.nickName!==""&&t.tag(2,u.LengthDelimited).string(e.nickName),e.avatarPath!==""&&t.tag(3,u.LengthDelimited).string(e.avatarPath);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const se=new ie;class ae extends b{constructor(){super("RedPackageStatusPush",[{no:1,name:"packageId",kind:"scalar",T:9},{no:2,name:"packageStatus",kind:"scalar",T:18}])}create(e){const t={packageId:"",packageStatus:"0"};return globalThis.Object.defineProperty(t,k,{enumerable:!1,value:this}),e!==void 0&&g(this,t,e),t}internalBinaryRead(e,t,i,n){let s=n!=null?n:this.create(),c=e.pos+t;for(;e.pos<c;){let[a,l]=e.tag();switch(a){case 1:s.packageId=e.string();break;case 2:s.packageStatus=e.sint64().toString();break;default:let o=i.readUnknownField;if(o==="throw")throw new globalThis.Error(`Unknown field ${a} (wire type ${l}) for ${this.typeName}`);let h=e.skip(l);o!==!1&&(o===!0?d.onRead:o)(this.typeName,s,a,l,h)}}return s}internalBinaryWrite(e,t,i){e.packageId!==""&&t.tag(1,u.LengthDelimited).string(e.packageId),e.packageStatus!=="0"&&t.tag(2,u.Varint).sint64(e.packageStatus);let n=i.writeUnknownFields;return n!==!1&&(n==!0?d.onWrite:n)(this.typeName,e,t),t}}const re=new ae,oe=r=>{const e=F.fromBinary(new Uint8Array(r));return le(e)};function le(r){const{type:e,data:t,biz:i}=r||{type:void 0,data:void 0,biz:void 0};if([T.friendDestroy].includes(e)){const n=f.unpack(t,Z);return{topic:w(r),data:n}}if([T.friendApply].includes(e)){const n=f.unpack(t,ee);return{topic:w(r),data:n}}if([T.passFriendApply].includes(e)){const n=f.unpack(t,ne);return{topic:w(r),data:n}}if([T.userInfoModify].includes(e)){const n=f.unpack(t,se);return{topic:w(r),data:n}}if([T.redPackageStatus].includes(e)){const n=f.unpack(t,re);return{topic:w(r),data:n}}return{topic:null,data:null}}const ce=r=>{if(!r)return null;try{r=JSON.parse(r)}catch(e){console.warn(e)}return r},$=r=>!Array.isArray(r)||Array.isArray(r)&&r.length===0;function ue(r){const e=Object.keys(r).sort(),t={};return e.forEach(i=>{Y.includes(i)&&r[i]&&(t[i]=r[i])}),t}function w(r){return r?JSON.stringify(typeof r=="string"?r:ue(r)):""}function he(r,e,t=!1){let i=null;const n=()=>{r(),i=setTimeout(n,e)};return t&&r(),setTimeout(n,e),{cancel:()=>{clearTimeout(i)}}}function de(r,e){const t={},i=[],n=[];return r.forEach(c=>{t[c]?t[c]=t[c]+1:t[c]=1}),e.forEach(c=>{t[c]?t[c]=t[c]-1:t[c]=-1}),Object.keys(t).forEach(c=>{if(t[c]>0){i.push(c);return}t[c]<0&&n.push(c)}),{subTopics:i,unSubTopics:n}}const fe=5*1e3,L=20*1e3;class pe{constructor(e){this.defaultOpt={fail:null,success:null,debug:!1,wsUrl:"",getToken:()=>""},this.ws=null,this.heartTimer=null,this.serverTimeoutTimer=null,this.haveTheHeartTimer=null,this.reconnectCount=0,this.queue=[],this.reconnectTimer=null,this.delayConnectTime=3e3,this.topicsCBStack={},this.unSendSubTopics=[],this.unSendUnSubTopics=[],this.autoReconnect=!0,this.wsDelayTime=0,this._sendIntervalCancel=null,this.onWsDelayTimeChangeList=new Map,this.onStateChange=null,this.options={...this.defaultOpt,...e}}getDelayTime(){var e;(e=this.onWsDelayTimeChangeList)==null||e.forEach(t=>{t&&(t==null||t(this.wsDelayTime))})}onAddWsDelayTimeChange(e){var t,i;(t=this.onWsDelayTimeChangeList)!=null&&t.has(e)||(i=this.onWsDelayTimeChangeList)==null||i.set(e,e)}onDeleteWsDelayTimeChange(e){var t,i;(t=this.onWsDelayTimeChangeList)!=null&&t.has(e)&&((i=this.onWsDelayTimeChangeList)==null||i.delete(e))}onClearWsDelayTimeChange(){this.onWsDelayTimeChangeList=new Map}setOptions(e){this.options={...this.defaultOpt,...e}}async connect(){var t;if(this.log("ws[connect]"),((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN){this.log("ws[connect]: Opening");return}this.stateChange(WebSocket.CONNECTING);const e=this.options.wsUrl;this.ws=new WebSocket(e),this.ws.binaryType="arraybuffer",this.ws.onopen=()=>{this.log(new Date().toLocaleTimeString(),"ws[onopen]"),this.reconnectCount=0,this.stateChange(),this.options.success&&this.options.success(),this.sendConnect(),this.runQueue();const i=Object.keys(this.topicsCBStack);i.length>0&&this._subscribe(i),this.heartbeat(),this.haveTheHeart(),this._sendInterval()},this.ws.onmessage=i=>{var U;this.heartbeatReset();const n=oe(i.data),{topic:s,data:c}=n,a=F.fromBinary(new Uint8Array(i.data)),{type:l,data:o}=a;if(l==="ping"&&(o!=null&&o.typeUrl)){this.wsDelayTime=D().valueOf()-Number((U=f==null?void 0:f.unpack(o,S))==null?void 0:U.timestamp),this.getDelayTime();return}const h=this.topicsCBStack[s];h&&h.forEach(y=>{y.throttleType===v.none?y.callback(c):(y.throttleType===v.cover?y.cacheTrades=[c]:y.throttleType===v.increment&&y.cacheTrades.push(c),y.cacheTimer||(y.cacheTimer=setTimeout(()=>{y&&(y.callback(y.cacheTrades),y.cacheTrades=[],y.cacheTimer=null)},y.throttleTime)))})},this.ws.onerror=i=>{console.error("ws[onerror]",i),this.stateChange(),this.reconnect()},this.ws.onclose=i=>{this.log(new Date().toLocaleTimeString(),"ws[onclose]",i),this.autoReconnect&&(this.stateChange(),this.reconnect())}}heartbeat(){this.heartTimer&&clearTimeout(this.heartTimer),this.serverTimeoutTimer&&clearTimeout(this.serverTimeoutTimer),this.heartTimer=setTimeout(()=>{var t,i;this.log("ws[heartbeat timeout]"),this.log(new Date().toLocaleTimeString(),"ws[heartbeat timeout]"),this.setTrainingTimer();const e=m.create();e.event="ping",((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN&&((i=this.ws)==null||i.send(m.toBinary(e))),this.serverTimeoutTimer=setTimeout(()=>{this.log(new Date().toLocaleTimeString(),"ws[reconnect] 主动触发"),this.reconnect()},L)},L)}async sendConnect(){this.send(["connect"],p.connect)}heartbeatReset(){this.heartTimer&&clearTimeout(this.heartTimer),this.serverTimeoutTimer&&clearTimeout(this.serverTimeoutTimer),this.heartbeat()}async send(e,t){var i,n;if(((i=this.ws)==null?void 0:i.readyState)===WebSocket.OPEN){const s=this.formatSendParams(e,t);if(!s)return;try{(n=this.ws)==null||n.send(s)}catch(c){console.error(c,"error-----")}}else this.queue.push({topics:e,type:t})}_sendInterval(){if(this._sendIntervalCancel)return;const{cancel:e}=he(()=>{var t;if(((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN){if(!this.unSendSubTopics.length&&!this.unSendUnSubTopics.length)return;const{subTopics:i,unSubTopics:n}=de(this.unSendSubTopics,this.unSendUnSubTopics);i.length&&this.send(i,p.subscribe),n.length&&this.send(n,p.unsubscribe),this.unSendSubTopics=[],this.unSendUnSubTopics=[]}},300,!0);this._sendIntervalCancel=e}_subscribe(e){$(e)||this.send(e,p.subscribe)}_unsubscribe(e){$(e)||this.send(e,p.unsubscribe)}_login(){this.send([p.login],p.login)}_logout(){this.send([p.logout],p.logout)}subscribe({subs:e,callback:t,throttleType:i=v.none,throttleTime:n=q.none}){((Array.isArray(e)?e:[e])||[]).map(a=>w(a)).filter(a=>a).forEach(a=>{const l=this.topicsCBStack[a];l&&l.length>0?this.topicsCBStack[a].push({callback:t,throttleType:i,throttleTime:n,cacheTrades:[]}):(this.topicsCBStack[a]=[{callback:t,throttleType:i,throttleTime:n,cacheTrades:[]}],this.unSendSubTopics.push(a))})}unsubscribe({subs:e,callback:t}){((Array.isArray(e)?e:[e])||[]).map(s=>w(s)).filter(s=>s).forEach(s=>{if(t){const c=this.topicsCBStack[s];if(!c){this.unSendUnSubTopics.push(s);return}c.forEach((a,l)=>{a.callback===t&&(a.cacheTimer&&clearTimeout(a.cacheTimer),c.splice(l,1))}),c.length||(this.unSendUnSubTopics.push(s),delete this.topicsCBStack[s])}else this.unSendUnSubTopics.push(s),delete this.topicsCBStack[s]})}login(){return this._login()}logout(){return this._logout()}formatSendParams(e,t){var i,n,s,c;if([p.subscribe,p.unsubscribe].includes(t)){const a=e.map(h=>ce(h)).filter(h=>h),l=B.create({subs:a}),o=m.create();return o.event=t,o.data=f.pack(l,B),m.toBinary(o)}if([p.login].includes(t)){const a=(n=(i=this.options).getToken)==null?void 0:n.call(i);if(!a)return this.log("ws[login token error]",a),"";this.log("ws[login success]",a);const l=P.create({token:a}),o=m.create();return o.event=t,o.data=f.pack(l,P),m.toBinary(o)}if([p.logout].includes(t)){const a=m.create();return this.log("ws[logout]"),a.event=p.logout,m.toBinary(a)}if([p.connect].includes(t)){const a=(c=(s=this.options).getToken)==null?void 0:c.call(s),{businessId:l}=A.getState(),o=C.create({businessId:Number(l),client:"WEB",version:"",deviceId:_.getState().deviceId,token:a}),h=m.create();return h.event=t,h.data=f.pack(o,C),this.log("ws[send connect]"),m.toBinary(h)}return console.error("ws 暂不支持类型",t),""}async runQueue(){this.queue.length!==0&&(this.queue.forEach(e=>{this.send(e.topics,e.type)}),this.queue=[])}reconnect(){var e;this.log(new Date().toLocaleTimeString(),"ws[reconnect] start"),this.close(),this.log(new Date().toLocaleTimeString(),"ws[reconnect]",(e=this.ws)==null?void 0:e.readyState,this.reconnectCount),this.autoReconnect=!0,this.stateChange(),this.reconnectTimer=setTimeout(()=>{this.connect(),this.reconnectCount++},this.delayConnectTime)}reSubscribe(e){const t=[];Object.keys(this.topicsCBStack).forEach(i=>{i.includes(e)&&t.push(i)}),this._unsubscribe(t),setTimeout(()=>{this._subscribe(t)})}close(){var e;this.reconnectTimer&&clearTimeout(this.reconnectTimer),this.reconnectTimer=null,this.autoReconnect=!1,(e=this.ws)==null||e.close()}setTrainingTimer(){this.wsDelayTime=9999,this.getDelayTime()}haveTheHeart(){this.haveTheHeartTimer||(this.haveTheHeartTimer=setInterval(()=>{var i,n;const e=m.create();this.log("ws[haveTheHeart interval]"),e.event="ping";const t=S.create({timestamp:`${D().valueOf()}`});e.data=f.pack(t,S),this.log(new Date().toLocaleTimeString(),"ws[heartbeat interval]"),((i=this.ws)==null?void 0:i.readyState)===WebSocket.OPEN&&((n=this.ws)==null||n.send(m.toBinary(e)))},fe))}log(...e){this.options.debug&&console.log(new Date().toLocaleTimeString(),...e)}stateChange(e){var t,i;typeof this.onStateChange=="function"&&((t=this.ws)==null?void 0:t.readyState)!==void 0&&this.onStateChange(e!==void 0?e:(i=this.ws)==null?void 0:i.readyState)}}const ye=new pe,we=ye;export{W,T as a,v as b,E as c,we as w};