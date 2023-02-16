import{A as I}from"./add-7f1df6ed.js";import{d as g,o,a as c,b as e,t as V,u as t,f as v,g as x,h as P,i as N,_ as $,w,v as B,j as A,c as i,l as k,m as S,n as m,q as E,F as U,r as L,e as F,T as D,s as T,x as j,U as q}from"./index-85516e1b.js";import{u as M,_ as H,T as K}from"./use-page-7649b31a.js";import{E as O,g as z,a as G}from"./navigation-helpers-1ee623e9.js";import{a as J,u as Q}from"./book-store-70aea76a.js";import"./lodash-c76a3c9d.js";const W=["data-testid"],X={class:"d-flex gap-2"},Y=["data-testid"],Z=g({__name:"AuthorTableRow",props:{author:null},setup(_){const s=_,n=P(),a=N();return(l,u)=>(o(),c("tr",{"data-testid":`author-item-${s.author.id}`},[e("td",null,V(s.author.name),1),e("td",null,V(s.author.country??"-"),1),e("td",null,[e("div",X,[e("button",{type:"button",class:"btn btn-outline-secondary action","data-testid":`author-edit-${s.author.id}`,onClick:u[0]||(u[0]=r=>t(n).push({name:"authors-edit",params:{authorId:s.author.id},query:{redirect:t(a).fullPath}}))},[(o(),v(x(t(O))))],8,Y)])])],8,W))}});const tt=$(Z,[["__scopeId","data-v-37151ce4"]]),et={},st={class:"title"},ot=e("th",null,"Name",-1),at=e("th",null,"Country",-1),nt=e("th",{style:{width:"58px"}},null,-1),lt=[ot,at,nt];function rt(_,s){return o(),c("tr",st,lt)}const ut=$(et,[["render",rt]]),dt=["disabled"],it=["disabled"],ct=e("th",null,null,-1),_t=g({__name:"AuthorFilter",props:{disabled:{type:Boolean},modelValue:null},emits:["undefined"],setup(_,{emit:s}){const n=_,a=r=>i({get:()=>n.modelValue[r],set(d){s("update:modelValue",{...n.modelValue,[r]:d})}}),l=a("name"),u=a("country");return(r,d)=>(o(),c("tr",null,[e("th",null,[w(e("input",{class:"form-control","onUpdate:modelValue":d[0]||(d[0]=h=>A(l)?l.value=h:null),disabled:n.disabled},null,8,dt),[[B,t(l)]])]),e("th",null,[w(e("input",{class:"form-control","onUpdate:modelValue":d[1]||(d[1]=h=>A(u)?u.value=h:null),disabled:n.disabled},null,8,it),[[B,t(u)]])]),ct]))}}),pt={class:"table table-striped align-middle text-center"},mt=g({__name:"AuthorTable",setup(_){const s=J(),n=Q(),a=i(()=>n.fetchStatuses),l=k({}),u=i(()=>Object.values(l.value).some(Boolean)),r=i(()=>s.getAuthors(l.value)),d=i(()=>s.authors.length===0),h=i(()=>r.value.length===0),y=k(5),f=M("authors",()=>z(r.value.length,y.value)),R=i(()=>G(r.value,f.value,y.value)),C=i(()=>f.value);return S(n.fetchBooks),(bt,b)=>(o(),c("table",pt,[e("thead",null,[m(ut),m(_t,{disabled:t(a).disabled,modelValue:l.value,"onUpdate:modelValue":b[0]||(b[0]=p=>l.value=p)},null,8,["disabled","modelValue"])]),m(H,{title:"authors",statuses:t(a),isEmpty:t(d),isEmptyByFilter:t(h)},null,8,["statuses","isEmpty","isEmptyByFilter"]),m(D,{name:"fade",mode:"out-in"},{default:E(()=>[t(a).active?(o(),c("tbody",{key:t(C)},[(o(!0),c(U,null,L(t(R),p=>(o(),v(tt,{key:p.id,author:p},null,8,["author"]))),128))])):F("",!0)]),_:1}),t(a).active?(o(),v(K,{key:0,isFiltered:t(u),total:t(s).authors.length,filtered:t(r).length,perPage:y.value,page:t(f),"onUpdate:page":b[1]||(b[1]=p=>A(f)?f.value=p:null)},null,8,["isFiltered","total","filtered","perPage","page"])):F("",!0)]))}}),ht={class:"mb-3"},ft={class:"mb-3 d-flex flex-wrap"},vt=g({__name:"AuthorsView",setup(_){return(s,n)=>{const a=j("RouterLink");return o(),c("div",null,[e("h1",ht,[(o(),v(x(t(q)))),T(" Authors ")]),e("div",ft,[m(a,{to:{name:"authors-add"},class:"btn btn-primary d-flex align-items-center gap-1"},{default:E(()=>[(o(),v(x(t(I)))),T(" New Author ")]),_:1})]),m(mt)])}}});const wt=$(vt,[["__scopeId","data-v-10795a78"]]);export{wt as default};