import{g as w,p as y,a as I,b as $,o as D}from"./parse.152a8531.js";import{o,d as n,t as a,_ as x,k as L,r as m,e as l,F as p,f as g,b as i,g as t,n as P,w as s,a as u}from"./index.2d9f812a.js";const C={class:"transition select-none px-2 hover:bg-sky-400/60 border border-slate-700"},N={__name:"tableHeader",props:["text"],setup(c){const d=c;return(f,_)=>(o(),n("th",C,a(d.text),1))}},T={},B={class:"px-2 border border-slate-700"};function V(c,d){return o(),n("td",B,[L(c.$slots,"default")])}const r=x(T,[["render",V]]);const F={class:"border border-slate-300 bg-slate-500/60 w-full text-sm"},H={class:"table-auto border-collapse w-full"},S={class:"text-left"},j={class:"border border-slate-700 bg-sky-300/20"},z={class:"w-full transition text-left underline decoration-1 underline-offset-2 decoration-dashed hover:text-slate-800"},E=["alt","src"],R=["href"],U={__name:"list",setup(c){const d=[{title:"ID",class:"w-12"},{title:"Name"},{title:"Topic"},{title:"Link"},{title:"Date"}],f=w(y).sort((_,b)=>_.globalId-b.globalId);return(_,b)=>{const k=m("Popper"),v=m("router-link");return o(),n("div",F,[l("table",H,[l("thead",S,[l("tr",j,[(o(),n(p,null,g(d,e=>t(N,{text:e.title,class:P(e.class)},null,8,["text","class"])),64))])]),l("tbody",null,[(o(!0),n(p,null,g(i(f),e=>(o(),n("tr",{key:e.globalId,class:"group even:bg-slate-500/80"},[t(r,{class:"text-right font-mono"},{default:s(()=>[u(a(e.globalId),1)]),_:2},1024),t(r,null,{default:s(()=>[t(k,{class:"w-full","offset-distance":"2"},{content:s(()=>{var h;return[l("img",{class:"w-48 h-60 rounded-sm",alt:(h=e==null?void 0:e.alt)!=null?h:e.title,ref_for:!0,ref:"image",src:i(I)(e.source)},null,8,E)]}),default:s(()=>[l("button",z,a(e.title),1)]),_:2},1024)]),_:2},1024),t(r,null,{default:s(()=>[t(v,{class:"transition underline underline-offset-2 hover:text-slate-800",to:`/topic/${e.topicID}`},{default:s(()=>[u(a(e.topic),1)]),_:2},1032,["to"])]),_:2},1024),t(r,null,{default:s(()=>[l("a",{class:"transition underline underline-offset-2 hover:text-slate-800",href:e.link,target:"_blank"},a(i($)(e.link)),9,R)]),_:2},1024),t(r,{class:"font-mono"},{default:s(()=>[u(a(i(D)(e.date)),1)]),_:2},1024)]))),128))])])])}}},G=x(U,[["__scopeId","data-v-b95ed424"]]);export{G as default};