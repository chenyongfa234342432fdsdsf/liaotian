import n from"@nbit/arco";import"../chunks/chunk-20abda34.js";import c,{useState as u,useEffect as h}from"react";import{j as r,a as s}from"../chunks/chunk-ea028b12.js";import*as d from"@sentry/react";import"@nbit/utils";var i,a;const{Spin:f}=(a=(i=n)==null?void 0:i.default)!=null&&a.__esModule?n.default:n;function m({children:o,hasLoading:t=!1,spinProps:e={}}){const[p,l]=u(!1);return h(()=>{l(!0)},[]),p&&t?r(f,{}):null}class S extends c.Component{constructor(t){super(t),this.state={error:null,errorInfo:null}}componentDidCatch(t,e){this.setState({error:t,errorInfo:e}),d.captureException(t)}render(){return this.state.errorInfo?s("div",{children:[r("h2",{children:"Something went wrong."}),s("details",{style:{whiteSpace:"pre-wrap"},children:[this.state.error&&this.state.error.toString(),r("br",{}),this.state.errorInfo.componentStack]})]}):this.props.children}}const g=c.lazy(()=>import("../chunks/chunk-5bed3c60.js"));function _(){return r(m,{children:r(S,{children:r(g,{})})})}async function j(o){return{pageContext:{pageProps:{},layoutParams:{}}}}export{_ as Page,j as onBeforeRender};