(()=>{var g=Object.create;var T=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var P=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),G=(e,t)=>{for(var s in t)T(e,s,{get:t[s],enumerable:!0})},m=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of x(t))!N.call(e,o)&&o!==s&&T(e,o,{get:()=>t[o],enumerable:!(r=C(t,o))||r.enumerable});return e};var u=(e,t,s)=>(s=e!=null?g(D(e)):{},m(t||!e||!e.__esModule?T(s,"default",{value:e,enumerable:!0}):s,e)),O=e=>m(T({},"__esModule",{value:!0}),e);var a=P((B,f)=>{f.exports=shelter.solidWeb});var j={};G(j,{onUnload:()=>L});var A=u(a()),l=u(a());var p={[-9]:["AKST"],[-8]:["PST"],[-7]:["MST"],[-6]:["CT","CST"],[-5]:["ET","EST"],[-4]:["EDT"],[-3]:["AMST","ART","BRT","SRT","UYT","WGT"],[-2]:["FNT","PMDT"],[-1]:["AZOT","CVT","EGT"],0:["UTC","GMT","WET"],1:["CET","MET","WAT"],2:["CAT","EET","KALT","SAST","WAST"],3:["AST","EAT","FET","IOT","MSK","TRT"],4:["RET","AMT"],5:["MVT","PKT","TJT","TMT","UZT"],5.5:["IST"],7:["THA","WIB"],8:["AWST","CST","HKT","MST","MYT","SGT","WST"],9:["JST","KST"],9.5:["ACST"],10:["AEST","AET","VLAT"],12:["NZST"]},R=Object.values(p).flat(),U=Object.fromEntries(Object.entries(p).flatMap(([e,t])=>t.map(s=>[s,parseFloat(e)]))),$=new RegExp(`(${R.join("|")})(?:([+-]\\d+)(?::(\\d+))?)?`),i=e=>{if(!e)return;let t=e.match($);if(!t)return;let[,s,r,o]=t;return U[s]+parseFloat(r??0)+parseFloat(o??0)/60};var W=(0,A.template)('<time class="ys_tz"> (Theirs: <!>:<!>)</time>',4),{flux:{dispatcher:d,stores:S},observeDom:y,util:{getFiber:z,reactFiberWalker:K}}=shelter,F=(e,t)=>i(S.UserProfileStore.getUserProfile(e)?.bio)??i(S.UserProfileStore.getGuildMemberProfile(e,t)?.bio)??i(S.NoteStore.getNote(e)?.note);function I(e){if(e.parentElement.querySelector(".ys_tz"))return;let t=K(z(e),"message",!0)?.memoizedProps?.message,s=t?.timestamp?.clone();if(!s)return;let r=F(t.author.id,S.ChannelStore.getChannel(t.channel_id)?.guild_id);r===void 0||(s.utc(),s.hours(s.hours()+r),Date.now()-Date.parse(s.toISOString())>1e3*60*60*24)||e.parentElement.append((()=>{let n=W.cloneNode(!0),h=n.firstChild,c=h.nextSibling,M=c.nextSibling,E=M.nextSibling,Z=E.nextSibling;return(0,l.insert)(n,()=>s.hours(),c),(0,l.insert)(n,()=>s.minutes(),E),n})())}function _(){let e=y("h3 time[id^=message-timestamp]",t=>{e(),I(t)});setTimeout(e,500)}var b=["MESSAGE_CREATE","CHANNEL_SELECT","LOAD_MESSAGES_SUCCESS","UPDATE_CHANNEL_DIMENSIONS","MESSAGE_END_EDIT","MESSAGE_UPDATE"];b.forEach(e=>d.subscribe(e,_));var L=()=>b.forEach(e=>d.unsubscribe(e,_));return O(j);})();
