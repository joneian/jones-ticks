if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const l=e=>s(e,t),c={module:{uri:t},exports:o,require:l};i[t]=Promise.all(r.map((e=>c[e]||l(e)))).then((e=>(n(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CCr7pBeQ.js",revision:null},{url:"assets/index-D8gU7WJm.css",revision:null},{url:"index.html",revision:"83ec315e66a208e987071a516550bc97"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"checkmark-small.png",revision:"125d19e0048efd4c23efb9d890398735"},{url:"checkmark.png",revision:"56edfddb905a4a6cf8f513fba52961c9"},{url:"manifest.webmanifest",revision:"60b0f609a958ef22fb11b33595e0f41d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
