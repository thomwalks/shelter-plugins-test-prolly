(()=>{var S=Object.create;var a=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var T=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty;var P=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),z=(e,t)=>{for(var r in t)a(e,r,{get:t[r],enumerable:!0})},p=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of k(t))!x.call(e,o)&&o!==r&&a(e,o,{get:()=>t[o],enumerable:!(s=A(t,o))||s.enumerable});return e};var l=(e,t,r)=>(r=e!=null?S(T(e)):{},p(t||!e||!e.__esModule?a(r,"default",{value:e,enumerable:!0}):r,e)),C=e=>p(a({},"__esModule",{value:!0}),e);var n=P((L,h)=>{h.exports=shelter.solidWeb});var W={};z(W,{onUnload:()=>j});var m=l(n(),1),g=l(n(),1),i=l(n(),1),d=l(n(),1),N=(0,m.template)('<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px; border:none;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"></iframe>',2),D=(0,m.template)('<iframe title="deezer-widget" width="100%" style="border:none;max-width:660px" allow="encrypted-media; clipboard-write"></iframe>',2),{flux:{storesFlat:{ThemeStore:R,SelectedChannelStore:G},dispatcher:_},solid:{onCleanup:O},util:{createSubscription:q,getFiber:M,reactFiberWalker:U},observeDom:F,ui:{ReactiveRoot:B}}=shelter,b=e=>(()=>{let t=N.cloneNode(!0);return(0,d.effect)(r=>{let s=e.includes("playlist")?450:e.includes("i=")?175:450,o=`https://embed.music.apple.com/${e.replace("/_/","/")}`;return s!==r._v$&&(0,i.setAttribute)(t,"height",r._v$=s),o!==r._v$2&&(0,i.setAttribute)(t,"src",r._v$2=o),r},{_v$:void 0,_v$2:void 0}),t})(),w=e=>(()=>{let t=D.cloneNode(!0);return(0,d.effect)(r=>{let s=`https://widget.deezer.com/widget/${R.getState().theme}/${e}`,o=e.includes("track")?150:200;return s!==r._v$3&&(0,i.setAttribute)(t,"src",r._v$3=s),o!==r._v$4&&(0,i.setAttribute)(t,"height",r._v$4=o),r},{_v$3:void 0,_v$4:void 0}),t})(),I=[[/https?:\/\/(?:geo\.)?music\.apple\.com\/([a-z]+\/(?:album|playlist)\/.*)/,(e,t)=>Promise.resolve(b(t))],[/https?:\/\/(?:www\.)?deezer\.com\/[a-z]+\/((?:track|album|playlist)\/\d+)/,(e,t)=>Promise.resolve(w(t))],[/https?:\/\/(?:song|album)\.link\/.+/,async e=>{debugger;try{let t=await fetch(`https://songlinkprox.yellowsink-cf.workers.dev/${e}`).then(r=>r.json());for(let[r,s]of[["appleMusic",b],["deezer",w]])if(t.linksByPlatform[r])return s(t.linksByPlatform[r].url.split(".com/")[1])}catch{console.error(`error fetching data from songlink for ${e}, bailing`);return}}]],v=["MESSAGE_CREATE","MESSAGE_UPDATE","UPDATE_CHANNEL_DIMENSIONS"];function y(e){if((e.type==="MESSAGE_CREATE"||e.type==="MESSAGE_UPDATE")&&e.message.channel_id!==G.getChannelId())return;let t=F('[id^="chat-messages-"]:not([data-more-embeds])',async r=>{r.dataset.moreEmbeds="1",t(),r.getElementsByTagName("article").length===0&&await new Promise(o=>setTimeout(o,1e3));let s=r.getElementsByTagName("article");for(let o of s){let c=U(M(o),"embed",!0)?.memoizedProps.embed;if(c?.type!=="link"&&c.type!=="article")return;for(let[E,$]of I){let f=c.url.match(E);if(!f)continue;let u=await $(...f);if(u){o.style.display="none",o.insertAdjacentElement("afterend",(0,g.createComponent)(B,{children:u}));break}}}});setTimeout(t,1e3)}for(let e of v)_.subscribe(e,y);function j(){for(let e of v)_.unsubscribe(e,y)}return C(W);})();