(()=>{var r=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var l=Object.prototype.hasOwnProperty;var p=(t,e)=>{for(var n in e)r(t,n,{get:e[n],enumerable:!0})},m=(t,e,n,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of d(e))!l.call(t,s)&&s!==n&&r(t,s,{get:()=>e[s],enumerable:!(o=u(e,s))||o.enumerable});return t};var N=t=>m(r({},"__esModule",{value:!0}),t);var y={};p(y,{onLoad:()=>b,onUnload:()=>x});var{flux:{dispatcher:a},observeDom:g}=shelter,i=()=>devicePixelRatio,c=t=>[t.naturalWidth/i(),t.naturalHeight/i()],E=t=>c(t).map(Math.round);function f(t){let e=c(t)[1],n=e/100*2;return Math.abs(t.height-e)<=n}function D(t){if(i()===1||!f(t)||!t.parentElement.matches("[class*=imageWrapper][style]"))return;let[e,n]=E(t);t.style.height="100%",t.style.width="100%",t.src=t.src.replace(/\?width=\d+&height=\d+/,`?width=${e}&height=${n}`),t.parentElement.style.height=`${n/i()}px`,t.parentElement.style.width=`${e/i()}px`}function h(){let t=g("img",e=>{D(e),t()});setTimeout(t,250)}var b=()=>a.subscribe("UPDATE_CHANNEL_DIMENSIONS",h),x=()=>a.unsubscribe("UPDATE_CHANNEL_DIMENSIONS",h);return N(y);})();