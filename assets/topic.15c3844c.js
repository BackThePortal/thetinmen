import{h as f,o as i,d as l,e as t,b as n,t as c,l as x,u as w,i as y,j as b,m as k,r as $,g as B,w as C,F as N,f as D,a as p,c as S}from"./index.2d9f812a.js";import{b as V,a as j,o as z,p as g}from"./parse.152a8531.js";const R={class:"transition duration-500 relative group overflow-hidden rounded-lg border-2 border-transparent hover:border-slate-300 hover:scale-105"},T=["alt","src"],U={class:"transform-gpu subpixel-antialiased transition-all duration-500 absolute bottom-1/2 font-semibold px-3 w-32 sm:w-48 md:w-64 xl:w-96 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl z-50 text-slate-200 opacity-0 sm:group-hover:opacity-80"},F={class:"font-light"},L=t("br",null,null,-1),P={class:"transform-gpu subpixel-antialiased transition-all duration-500 absolute bottom-1/2 text-sm sm:text-xs md:text-sm lg:text-base sm:translate-y-16 w-32 sm:w-48 md:w-64 xl:w-96 text-center z-50 opacity-0 group-hover:opacity-80 flex flex-col items-center align-top content-start gap-1"},E=["href"],I=["href"],q={__name:"post",props:["data","id"],setup(a){return f(V(a.data.link)),(r,u)=>{var m,o;return i(),l("div",R,[t("div",null,[t("img",{alt:(o=(m=a.data)==null?void 0:m.alt)!=null?o:a.data.title,ref:"image",src:n(j)(a.data.source),class:"select-none z-0 transition duration-500 rounded-lg w-32 h-40 sm:w-48 sm:h-60 md:w-64 md:h-80 xl:w-96 xl:h-120 shadow-md group-hover:brightness-50 contrast-more:group-hover:brightness-[.15] group-hover:blur-md group-hover:saturate-50"},null,8,T),t("div",U,[t("span",F,c(n(z)(a.data.date)),1),L,t("span",null,c(a.data.title),1)]),t("div",P,[t("a",{href:a.data.link,target:"_blank",class:"transition-all text-slate-200 hover:font-semibold underline underline-offset-2 hover:decoration-2 hover:bg-slate-300/30 active:bg-slate-300/60 pt-0-5 pb-1 px-2 rounded w-fit"},"See post",8,E),a.data.blog&&a.data.blog!==""?(i(),l("a",{key:0,href:a.data.blog,target:"_blank",class:"transition-all text-slate-200 hover:font-semibold underline underline-offset-2 hover:decoration-2 hover:bg-slate-300/30 active:bg-slate-300/60 pt-0-5 pb-1 px-2 rounded w-fit"},"See blog entry",8,I)):x("",!0)])])])}}},A={class:"mt-12 mb-4 w-full text-center"},G=p("\u2190 Back to topics"),H={class:"container mx-auto border border-slate-300 rounded-2xl p-3"},J={class:"font-bold border-b border-slate-300 mb-1"},K={key:0,class:"font-normal border-b border-slate-300 pb-1"},M={class:"text-center text-slate-700 mt-4"},O=p(" Sorted by "),Q=t("span",{class:""},"Date",-1),W=p(", "),X={class:"flex flex-row flex-wrap gap-4 select-none justify-center my-4"},tt={__name:"topic",setup(a){const h=w(),r=y({type:0,order:"descending"}),u=f(h.params.id),m=[{name:"Date",functions:{ascending:(e,s)=>e.date-s.date,descending:(e,s)=>s.date-e.date}},{name:"Name",functions:{ascending:(e,s)=>e.title-s.title,descending:(e,s)=>s.title-e.title}}],o=b(()=>g.slice()[u.value-1]),_=b(()=>g.slice()[u.value-1].posts.sort(m[r.type].functions[r.order]));return k((e,s)=>{e.params.id!==s.params.id&&typeof e.params.id=="number"&&(u.value=e.params.id)}),(e,s)=>{const v=$("router-link");return i(),l("div",null,[t("div",A,[B(v,{to:"/home/topics",class:"btn-slate"},{default:C(()=>[G]),_:1})]),t("div",H,[t("h2",J,c(n(o).name),1),n(o).description!==""&&n(o).description?(i(),l("p",K,c(n(o).description),1)):x("",!0),t("p",M,[O,Q,W,t("span",{onClick:s[0]||(s[0]=d=>r.order=r.order==="ascending"?"descending":"ascending"),class:"action-link"},c(r.order.replace(/(^\w|\s\w)/g,d=>d.toUpperCase())),1)]),t("div",X,[(i(!0),l(N,null,D(n(_),d=>(i(),S(q,{id:d.id,data:d,key:d.id},null,8,["id","data"]))),128))])])])}}};export{tt as default};