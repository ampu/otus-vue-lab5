import{d as u,E as n,a as d,n as c,q as m,b as h,o as a,f as l,g as i,u as p,s as f,h as A}from"./index-85516e1b.js";import{A as _}from"./add-7f1df6ed.js";import{A as S}from"./AuthorForm-967f3be4.js";import{a as w}from"./book-store-70aea76a.js";import{F as C}from"./flash-types-b3fc580b.js";const F=h("h1",null,"New Author",-1),E=u({__name:"AddAuthorView",setup(V){const t=A(),o=w(),s=n(),r=async e=>{await o.addAuthor(e),s.addFlash({status:C.SUCCESS,message:"Author added"}),await t.push({name:"authors",query:{page:-1}})};return(e,x)=>(a(),d("div",null,[F,c(S,{"onUpdate:modelValue":r},{default:m(()=>[(a(),l(i(p(_)))),f(" Add ")]),_:1})]))}});export{E as default};
