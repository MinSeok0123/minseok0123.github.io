(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[133],{640:function(e,t,a){"use strict";var r=a(1742),n={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var a,o,i,l,s,m,c=!1;t||(t={}),a=t.debug||!1;try{if(i=r(),l=document.createRange(),s=document.getSelection(),(m=document.createElement("span")).textContent=e,m.ariaHidden="true",m.style.all="unset",m.style.position="fixed",m.style.top=0,m.style.clip="rect(0, 0, 0, 0)",m.style.whiteSpace="pre",m.style.webkitUserSelect="text",m.style.MozUserSelect="text",m.style.msUserSelect="text",m.style.userSelect="text",m.addEventListener("copy",(function(r){if(r.stopPropagation(),t.format)if(r.preventDefault(),void 0===r.clipboardData){a&&console.warn("unable to use e.clipboardData"),a&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var o=n[t.format]||n.default;window.clipboardData.setData(o,e)}else r.clipboardData.clearData(),r.clipboardData.setData(t.format,e);t.onCopy&&(r.preventDefault(),t.onCopy(r.clipboardData))})),document.body.appendChild(m),l.selectNodeContents(m),s.addRange(l),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");c=!0}catch(d){a&&console.error("unable to copy using execCommand: ",d),a&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),c=!0}catch(d){a&&console.error("unable to copy using clipboardData: ",d),a&&console.error("falling back to prompt"),o=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(o,e)}}finally{s&&("function"==typeof s.removeRange?s.removeRange(l):s.removeAllRanges()),m&&document.body.removeChild(m),i()}return c}},9169:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return A}});var r=a(6450),n=a(7462),o=a(4316),i=a(7294),l=a(4854),s=a(917);const m=(0,o.Z)("div",{target:"e1st1jau11"})({name:"1nykrg1",styles:"@media (max-width: 1024px){padding-left:1rem;padding-right:1rem;}"}),c=(0,o.Z)("h1",{target:"e1st1jau10"})({name:"1gfunde",styles:"font-size:3rem;line-height:1.5;letter-spacing:-0.004em;margin-top:0px;font-weight:800;color:var(--text1);margin-bottom:2rem;word-break:keep-all;transition:color 0.125s ease-in 0s;@media (max-width: 1024px){font-size:2.25rem;}"}),d=(0,o.Z)("div",{target:"e1st1jau9"})({name:"1x3ge7b",styles:"-webkit-box-align:center;align-items:center;font-size:1rem;color:var(--text2);display:flex;-webkit-box-pack:justify;justify-content:space-between;@media (max-width: 768px){margin-bottom:0.75rem;}"}),u=(0,o.Z)("div",{target:"e1st1jau8"})(""),g=(0,o.Z)("div",{target:"e1st1jau7"})({name:"4yail4",styles:"display:none;@media (max-width: 1024px){display:flex;background:var(--bg-element1);border:1px solid var(--border2);padding-left:0.75rem;padding-right:0.75rem;display:flex;-webkit-box-align:center;align-items:center;height:1.5rem;border-radius:0.75rem;outline:none;cursor:pointer;}"}),p=(0,o.Z)("svg",{target:"e1st1jau6"})({name:"zppba0",styles:"width:0.75rem;height:0.75rem;margin-right:0.75rem"}),h=(0,o.Z)("span",{target:"e1st1jau5"})({name:"1wkbxb0",styles:"font-size:0.75rem;font-weight:bold"}),f=(0,o.Z)("span",{target:"e1st1jau4"})({name:"1nmtyc9",styles:"color:var(--text2);font-weight:bold;@media (max-width: 768px){font-size:0.875rem;}"}),b=(0,o.Z)("span",{target:"e1st1jau3"})({name:"1667tx1",styles:"margin-left:0.5rem;margin-right:0.5rem"}),y=(0,o.Z)("span",{target:"e1st1jau2"})({name:"1jrfw2k",styles:"font-size:1rem;color:var(--text2);@media (max-width: 768px){font-size:0.875rem;}"}),w=(0,o.Z)("div",{target:"e1st1jau1"})({name:"9f845i",styles:"margin-top:0.875rem;margin-bottom:-0.875rem;min-height:0.875rem;@media (max-width: 768px){margin-top:0.5rem;margin-bottom:-0.5rem;min-height:0.5rem;}"}),x=(0,o.Z)("div",{target:"e1st1jau0"})({name:"1a4ydm4",styles:"margin-bottom:0.875rem;background:var(--bg-tag);padding-left:1rem;padding-right:1rem;height:2rem;border-radius:1rem;display:inline-flex;-webkit-box-align:center;align-items:center;margin-right:0.875rem;color:var(--velog);text-decoration:none;font-weight:500;font-size:1rem;@media (max-width: 768px){height:1.5rem;font-size:0.75rem;border-radius:0.75rem;padding-left:0.75rem;padding-right:0.75rem;margin-right:0.5rem;margin-bottom:0.5rem;}"});var v=function(e){let{title:t,date:a,categories:r}=e;const{0:n,1:o}=(0,i.useState)(!0),{0:v,1:Z}=(0,i.useState)(0),{0:k,1:C}=(0,i.useState)(0),{0:j,1:D}=(0,i.useState)();(0,i.useEffect)((()=>{(async()=>{try{const e=window.location.pathname,t=decodeURIComponent(e.replace(/^\/+|\/+$/g,"")),a=await fetch("https://port-0-minlog-be-dihik2mliwbygs1.sel4.cloudtype.app/api/get_count/"+encodeURIComponent(t),{method:"POST"});if(!a.ok)throw new Error("네트워크 응답이 좋지 않았습니다.");{const e=await a.json();Z(e.view_count),C(e.like_count),D(e.liked),o(!1)}}catch(e){console.log("조회수, 좋아요를 불러오는데 에러 발생:",e)}})()}),[]);return(0,s.tZ)(i.Fragment,null,(0,s.tZ)(m,null,(0,s.tZ)(c,null,t),(0,s.tZ)(d,null,(0,s.tZ)(u,null,(0,s.tZ)(f,null,a),(0,s.tZ)(b,null,"·"),n?(0,s.tZ)(y,null,"조회수: "):(0,s.tZ)(y,null,"조회수: ",v)),(0,s.tZ)(g,{onClick:async()=>{try{const e=window.location.pathname,t=decodeURIComponent(e.replace(/^\/+|\/+$/g,"")),a=await fetch("https://port-0-minlog-be-dihik2mliwbygs1.sel4.cloudtype.app/api/like/"+encodeURIComponent(t),{method:"PUT"});if(!a.ok)throw new Error("네트워크 응답이 좋지 않았습니다.");{const e=await a.json();C(e.like_count),D(e.liked),console.log(e.liked)}}catch(e){console.log("좋아요를 업데이트하는 동안 에러 발생:",e)}},style:{backgroundColor:j?"rgb(56, 217, 169)":"",color:j?"var(--button-text)":"var(--text3)",borderColor:j?"rgb(56, 217, 169)":""}},(0,s.tZ)(p,{width:"24",height:"24",viewBox:"0 0 24 24"},(0,s.tZ)("path",{fill:"currentColor",d:"M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"})),(0,s.tZ)(h,null,k))),(0,s.tZ)(w,null,Array.isArray(r)&&r.map(((e,t)=>(0,s.tZ)(l.Link,{to:"/?category="+e},(0,s.tZ)(x,{key:t},t>0,e)))))))},Z=a(8032),k=a(8707);const C=(0,o.Z)("div",{target:"e1opi4mu1"})({name:"w70558",styles:"position:relative;margin-top:5.5rem;width:768px;margin-left:auto;margin-right:auto;@media (max-width: 1024px){margin-top:2rem;}@media (max-width: 768px){margin-top:1.5rem;width:100%;}"}),j=(0,o.Z)((e=>(0,s.tZ)(Z.G,(0,n.Z)({},e,{style:{position:"relative"}}))),{target:"e1opi4mu0"})({name:"1ayk1c0",styles:"z-index:-1;display:block;margin:3rem auto;max-width:100%;@media (max-width: 768px){margin-left:2rem;margin-right:2rem;}"});var D=function(e){let{title:t,date:a,categories:r,thumbnail:n}=e;return(0,s.tZ)(i.Fragment,null,(0,s.tZ)(k.Z,null),(0,s.tZ)(C,null,(0,s.tZ)(v,{title:t,date:a,categories:r}),(0,s.tZ)(j,{image:n,alt:"thumbnail"})))},R=a(9297),E=a(4480),z=a(9899);const S=(0,o.Z)("div",{target:"e1gqsjds0"})({name:"hx9xpc",styles:"@media (max-width: 768px){padding:0 20px;}"});var U=e=>{let{id:t}=e;const a=(0,i.useRef)(null),r=(0,E.sJ)(z.XG);return(0,i.useEffect)((()=>{if(null===a.current)return;const e=document.createElement("script"),t={src:"https://utteranc.es/client.js",repo:"minseok0123/minseok0123.github.io","issue-term":"pathname",label:"Comment",theme:"github-"+r,crossorigin:"anonymous",async:"true"};Object.entries(t).forEach((t=>{let[a,r]=t;e.setAttribute(a,r)}));const n=a.current;for(;n.firstChild;)n.removeChild(n.firstChild);a.current.appendChild(e)}),[r,t]),(0,s.tZ)(S,{ref:a,id:t})};var A=function(e){let{data:{allMarkdownRemark:{edges:t}},location:{href:a}}=e;const{node:{html:n,frontmatter:{title:o,summary:i,date:l,categories:m,thumbnail:{childImageSharp:{gatsbyImageData:c},publicURL:d}}}}=t[0];return(0,s.tZ)(r.Z,{title:o,description:i,url:a,image:d},(0,s.tZ)(D,{title:o,date:l,categories:m,thumbnail:c}),(0,s.tZ)(R.Z,{html:n}),(0,s.tZ)(U,null))}},1742:function(e){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,a=[],r=0;r<e.rangeCount;r++)a.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||a.forEach((function(t){e.addRange(t)})),t&&t.focus()}}}}]);
//# sourceMappingURL=component---src-templates-post-template-tsx-1f1407cbf747c689c742.js.map