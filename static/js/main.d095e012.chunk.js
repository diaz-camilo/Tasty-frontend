(this["webpackJsonptasty-app"]=this["webpackJsonptasty-app"]||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},41:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(15),i=n.n(s),r=(n(21),n(3)),j=(n(22),n(16)),u=n.n(j),b=(n(41),n(0));function o(e){var t=e.recipe,n=t.thumbnail_url,a=(t.thumbnail_alt_text,t.credits),s=(t.description,t.name),i=t.tags,j=(t.instructions,Object(c.useState)(!1)),u=Object(r.a)(j,2),o=u[0],l=u[1];return Object(b.jsxs)("div",{className:"recipe",style:{backgroundImage:"url(".concat(n,")")},onMouseEnter:function(e){return l(!0)},onMouseLeave:function(e){return l(!1)},children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:s}),Object(b.jsxs)("h4",{children:["by: ",a[0].name]})]}),o&&Object(b.jsx)("div",{className:"tags",children:i.map((function(e){return Object(b.jsx)("span",{className:"tag",children:e.display_name},e.id)}))})]})}n(43);var l=function(e){var t=e.recipes.map((function(e){return Object(b.jsx)(o,{id:e.id,recipe:e},e.id)}));return console.log(e),Object(b.jsx)("div",{className:"recipe-listing",children:t})},d={"x-rapidapi-host":"tasty.p.rapidapi.com","x-rapidapi-key":"31353c41d4msh98b0bafd455080ap162f8bjsnf7abc71f1ab5"};var p=function(){var e=Object(c.useState)(0),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(20),i=Object(r.a)(s,2),j=i[0],o=i[1],p=Object(c.useState)(""),h=Object(r.a)(p,2),O=h[0],f=h[1],x=Object(c.useState)({}),m=Object(r.a)(x,2),g=m[0],v=m[1],y=Object(c.useState)(!1),S=Object(r.a)(y,2),C=S[0],k=S[1],E=Object(c.useState)({}),N=Object(r.a)(E,2),F=(N[0],N[1]),L=function(){var e={method:"GET",url:"https://tasty.p.rapidapi.com/recipes/list",params:{from:n*j,size:j,tags:"",q:O},headers:d};u.a.request(e).then((function(e){v(e.data),k(!0)})).catch((function(e){k(!1),F(e)}))};Object(c.useEffect)((function(){L()}),[n,j]);var M=Math.ceil(g.count/j),_=function(e){var t=n+e;t<0||t>M||(k(!1),a(t))};return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsxs)("header",{children:[Object(b.jsx)("h1",{children:"Recipes"}),Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),k(!1),L()},children:[Object(b.jsxs)("label",{children:["Enter querry:"," ",Object(b.jsx)("input",{type:"text",onChange:function(e){return f(e.target.value)}})]}),Object(b.jsx)("button",{children:"search"})]})]}),Object(b.jsxs)("main",{children:[Object(b.jsxs)("aside",{children:[Object(b.jsx)("input",{type:"range",min:"10",max:"40",step:"5",defaultValue:"20",onChange:function(e){o(e.target.value)}}),Object(b.jsx)("label",{children:j}),Object(b.jsx)("br",{}),Object(b.jsx)("button",{onClick:function(){return _(-1)},children:"previous"}),Object(b.jsx)("button",{onClick:function(){return _(1)},children:"next"}),Object(b.jsx)("br",{}),Object(b.jsxs)("label",{children:["page: ",n,"/",M]})]}),C?Object(b.jsx)(l,{recipes:g.results}):Object(b.jsx)("p",{children:"Loading..."})]})]})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,45)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),s(e),i(e)}))};i.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(p,{})}),document.getElementById("root")),h()}},[[44,1,2]]]);
//# sourceMappingURL=main.d095e012.chunk.js.map