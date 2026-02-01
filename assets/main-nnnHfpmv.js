import{a as se}from"./vendor-CLb_lYsF.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const S="/goit_final_js_project/assets/sprite-b50_DFWG.svg",O={success:"icon-info",error:"icon-close",warning:"icon-star",info:"icon-info"},ce=3e3,le=500;function ue(){let e=document.getElementById("notification-container");return e||(e=document.createElement("div"),e.id="notification-container",document.body.appendChild(e)),e}function k(e,t){const n=ue(),i=O[e]||O.info,r=document.createElement("div");r.className=`notification notification-${e}`,r.innerHTML=`
    <svg class="notification-icon" width="20" height="20">
      <use href="${S}#${i}"></use>
    </svg>
    <p class="notification-message">${t}</p>
  `,n.appendChild(r),setTimeout(()=>{r.classList.add("fade-out"),setTimeout(()=>r.remove(),le)},ce)}const C={success:e=>k("success",e),error:e=>k("error",e),warning:e=>k("warning",e),info:e=>k("info",e)},de="https://your-energy.b.goit.study/api",h=se.create({baseURL:de}),_={400:"Bad request. Please check your input.",401:"Unauthorized. Please log in.",404:"Resource not found.",409:"This email has already been used.",500:"Server error. Please try again later.",default:"Something went wrong. Please try again."};h.interceptors.response.use(e=>e,e=>{var r;if(!e.response){const a=navigator.onLine?"Unable to connect to server. Please try again later.":"No internet connection. Please check your network.";return C.error(a),Promise.reject(e)}const t=e.response.status,i=((r=e.response.data)==null?void 0:r.message)||_[t]||_.default;return C.error(i),Promise.reject(e)});async function fe(){const{data:e}=await h.get("/quote");return e}async function ge({filter:e,page:t=1,limit:n=12}){const{data:i}=await h.get("/filters",{params:{filter:e,page:t,limit:n}});return i}async function me({bodypart:e,muscles:t,equipment:n,keyword:i,page:r=1,limit:a=10}){const s={page:r,limit:a};e&&(s.bodypart=e),t&&(s.muscles=t),n&&(s.equipment=n),i&&(s.keyword=i);const{data:l}=await h.get("/exercises",{params:s});return l}async function D(e){const{data:t}=await h.get(`/exercises/${e}`);return t}async function pe(e,t,n,i=""){const r={rate:t,email:n};i&&(r.review=i);const{data:a}=await h.patch(`/exercises/${e}/rating`,r);return a}async function he(e){const{data:t}=await h.post("/subscription",{email:e});return t}const ve=`<li class="workout-tile {{cardClass}}" data-id="{{id}}">
  <div class="workout-tile-header">
    <div class="workout-tile-left">
      <span class="workout-type-badge">WORKOUT</span>
      <span class="workout-rating" aria-label="Rating: {{ratingFormatted}} out of 5">
        {{ratingFormatted}}
        <svg width="18" height="18" class="workout-rating-star" aria-hidden="true">
          <use href="/img/sprite.svg#icon-star"></use>
        </svg>
      </span>
      <button type="button" class="bookmark-delete-btn" data-id="{{id}}" aria-label="Remove {{name}} from favorites">
        <svg width="20" height="20" aria-hidden="true">
          <use href="/img/sprite.svg#icon-trash"></use>
        </svg>
      </button>
    </div>
    <button class="workout-start-btn" data-id="{{id}}" aria-label="Start exercise {{name}}">
      Start
      <svg width="16" height="16" aria-hidden="true">
        <use href="/img/sprite.svg#icon-arrow"></use>
      </svg>
    </button>
  </div>

  <div class="workout-tile-body">
    <span class="workout-icon">
      <svg width="16px" height="16px" aria-hidden="true">
        <use href="/img/sprite.svg#icon-quote"></use>
      </svg>
    </span>
    <h3 class="workout-tile-title">{{name}}</h3>
  </div>

  <ul class="workout-tile-meta">
    <li class="meta-item">
      <span class="meta-label">Burned calories:</span>
      <span class="meta-value">{{burnedCalories}} / {{time}} min</span>
    </li>
    <li class="meta-item">
      <span class="meta-label">Body part:</span>
      <span class="meta-value">{{bodyPart}}</span>
    </li>
    <li class="meta-item">
      <span class="meta-label">Target:</span>
      <span class="meta-value">{{target}}</span>
    </li>
  </ul>
</li>
`,ye=`<li class="section-tile" data-filter="{{filter}}" data-name="{{name}}">
  <img src="{{imgURL}}" alt="" class="section-tile-bg" loading="lazy" decoding="async" fetchpriority="low">
  <div class="section-tile-overlay"></div>
  <div class="section-tile-content">
    <h3 class="section-name">
      <a href="#" class="section-link">{{name}}</a>
    </h3>
    <p class="section-type">{{filter}}</p>
  </div>
</li>
`,be=`<div class="favorites-empty">
  <p class="favorites-empty-text">
    It appears that you haven't added any exercises to your favorites yet. To get started, you can
    add exercises that you like to your favorites for easier access in the future.
  </p>
</div>
`,we=`<ul class="pager-list">
  <li>
    <a href="#" class="pager-btn pager-first" data-page="1" aria-label="Go to first page">
      <svg width="13" height="12" class="pager-icon flip" aria-hidden="true">
        <use href="/img/sprite.svg#icon-double-arrow-right"></use>
      </svg>
    </a>
  </li>
  <li>
    <a href="#" class="pager-btn pager-prev" aria-label="Go to previous page">
      <svg width="20" height="20" class="pager-icon flip" aria-hidden="true">
        <use href="/img/sprite.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </li>
  <li>
    <ul class="pager-numbers"></ul>
  </li>
  <li>
    <a href="#" class="pager-btn pager-next" aria-label="Go to next page">
      <svg width="20" height="20" class="pager-icon" aria-hidden="true">
        <use href="/img/sprite.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </li>
  <li>
    <a href="#" class="pager-btn pager-last" aria-label="Go to last page">
      <svg width="13" height="12" class="pager-icon" aria-hidden="true">
        <use href="/img/sprite.svg#icon-double-arrow-right"></use>
      </svg>
    </a>
  </li>
</ul>
`,Le={"workout-tile":ve,"section-tile":ye,"favorites-empty":be,pagination:we};async function w(e){const t=Le[e];return t?t.replace(/\/img\/sprite\.svg/g,S):(console.warn(`Template not found: ${e}`),"")}function $(e,t){return e.replace(/\{\{(\w+)\}\}/g,(n,i)=>t[i]!==void 0?t[i]:"")}function Ee(e){const t=document.getElementById("quote-text"),n=document.getElementById("quote-author");t&&e.quote&&(t.textContent=e.quote),n&&e.author&&(n.textContent=e.author)}async function ke(e,t){const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No exercises found. Try another filter.</p>';return}const i=await w("workout-tile"),r=e.map(a=>$(i,{id:a._id,rating:a.rating||0,ratingFormatted:a.rating?a.rating.toFixed(1):"0.0",cardClass:"",name:a.name,burnedCalories:a.burnedCalories||0,time:a.time||0,bodyPart:a.bodyPart||"N/A",target:a.target||"N/A"})).join("");n.className="workouts-grid",n.innerHTML=r}async function Fe(e,t){const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No categories found.</p>';return}const i=await w("section-tile"),r=e.map(a=>$(i,{filter:a.filter,name:a.name,imgURL:a.imgURL||""})).join("");n.className="sections-grid",n.innerHTML=r}async function H(e,t){const n=document.getElementById(t);if(!n)return;if(e.length===0){const a=await w("favorites-empty");n.innerHTML=a;return}const i=await w("workout-tile"),r=e.map(a=>$(i,{id:a._id,name:a.name,burnedCalories:a.burnedCalories||0,time:a.time||0,bodyPart:a.bodyPart||"N/A",target:a.target||"N/A",rating:a.rating||0,ratingFormatted:a.rating?a.rating.toFixed(1):"0.0",cardClass:"is-favorite"})).join("");n.className="favorites-grid",n.innerHTML=r}function Ce(e){return e.replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function f(e,t,n,i=t){if(!e)return!1;const r=Ce(`listener-${i}`);return e.dataset[r]==="true"?!1:(e.dataset[r]="true",e.addEventListener(t,n),!0)}function o(e){return document.getElementById(e)}function xe(e,t=document){return t.querySelector(e)}function Te(e,t){const n=o(e)||xe(t);n&&n.scrollIntoView({behavior:"smooth"})}function F(e,t,n){t?(e.classList.add("disabled"),e.setAttribute("aria-disabled","true"),e.removeAttribute("data-page")):(e.classList.remove("disabled"),e.removeAttribute("aria-disabled"),e.dataset.page=n)}function Se(e,t){const n=[];if(t<=3){for(let a=1;a<=t;a++)n.push(a);return n}let i,r;e===1?(i=1,r=3):e===t?(i=t-2,r=t):(i=e-1,r=e+1),i>1&&n.push("...");for(let a=i;a<=r;a++)n.push(a);return r<t&&n.push("..."),n}async function x(e,t,n="pager-container"){const i=o(n);if(!i)return;if(t<=1){i.innerHTML="";return}if(!i.querySelector(".pager-list")){const u=await w("pagination");i.innerHTML=u}const r=i.querySelector(".pager-first"),a=i.querySelector(".pager-prev"),s=i.querySelector(".pager-next"),l=i.querySelector(".pager-last"),v=i.querySelector(".pager-numbers");F(r,e===1,1),F(a,e===1,e-1),F(s,e===t,e+1),F(l,e===t,t);const E=Se(e,t).map(u=>u==="..."?'<li aria-hidden="true"><span class="pager-dots">...</span></li>':u===e?`<li><a href="#" class="pager-number current" aria-current="page">${u}</a></li>`:`<li><a href="#" class="pager-number" data-page="${u}">${u}</a></li>`).join("");v.innerHTML=E}function j(e,t="pager-container"){const n=o(t);return n?f(n,"click",r=>{const a=r.target.closest(".pager-number, .pager-btn");if(!a||a.classList.contains("disabled")||a.classList.contains("current"))return;r.preventDefault();const s=Number(a.dataset.page);s&&!isNaN(s)&&e(s)},"pager"):void 0}function Me(e="workouts-header"){Te(e,".workouts-section")}let d=[];function G(e){if(e.key==="Escape"&&d.length>0){const t=d[d.length-1];m(t)}}function K(e){const t=document.getElementById(e);if(!t)return;t.classList.remove("hidden"),document.body.classList.add("modal-open"),d.includes(e)||d.push(e),d.length===1&&document.addEventListener("keydown",G);const n=t.querySelector(".modal-backdrop");n&&f(n,"click",()=>m(e),`backdrop-${e}`)}function m(e){const t=document.getElementById(e);t&&(t.classList.add("hidden"),d=d.filter(n=>n!==e),d.length===0&&(document.body.classList.remove("modal-open"),document.removeEventListener("keydown",G)))}let B=null,b=null;function Ae(){const e=document.querySelector("#rating-stars .rating-radio:checked");return e?parseFloat(e.value):0}function V(){const e=o("rating-form"),t=o("rating-display-value");e&&e.reset(),t&&(t.textContent="0.0")}function Be(){const e=o("rating-stars"),t=o("rating-display-value");e&&e.dataset.listenerRating!=="true"&&(e.dataset.listenerRating="true",e.addEventListener("change",n=>{if(n.target.classList.contains("rating-radio")){const i=parseFloat(n.target.value);t&&(t.textContent=i.toFixed(1))}}))}function J(){const e=o("rating-form");e&&b&&(e.removeEventListener("submit",b),b=null),B=null}function Ne(){m("workout-modal"),K("rating-modal"),V(),Be()}function W(){J(),m("rating-modal"),V()}function Re(e){J(),B=e;const t=o("rating-popup-close-btn");t&&(t.onclick=()=>{W()});const n=o("rating-form");n&&(b=async i=>{if(i.preventDefault(),!n.checkValidity()){n.reportValidity();return}const r=Ae(),a=o("rating-email"),s=o("rating-review"),l=a==null?void 0:a.value.trim(),v=(s==null?void 0:s.value.trim())||"";try{await pe(B,r,l,v),C.success("Rating submitted successfully!"),W()}catch(y){console.error("Failed to submit rating:",y)}},n.addEventListener("submit",b))}const Y="favoriteWorkouts";function M(){try{const e=localStorage.getItem(Y);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to get favorites:",e),[]}}function Q(e){localStorage.setItem(Y,JSON.stringify(e))}function qe(e){try{const t=M();return t.some(n=>n._id===e._id)?!1:(t.push(e),Q(t),!0)}catch(t){return console.error("Failed to add favorite:",t),!1}}function Z(e){try{const n=M().filter(i=>i._id!==e);return Q(n),!0}catch(t){return console.error("Failed to remove favorite:",t),!1}}function N(e){return M().some(t=>t._id===e)}function z(){const e=o("modal-close-btn"),t=o("give-rating-btn"),n=o("add-to-favorites-btn");e&&(e.onclick=null),t&&(t.onclick=null),n&&(n.onclick=null)}function Pe(e){if(!e)return;const t=o("modal-workout-gif");t&&(t.src=e.gifUrl||"",t.alt=e.name||"Workout");const n=o("modal-workout-title");n&&(n.textContent=e.name||"Workout");const i=o("modal-workout-rating");if(i){const u=e.rating||0,I=Math.floor(u);i.innerHTML=`
      <span class="rating-value">${u.toFixed(1)}</span>
      <div class="rating-stars">
        ${Array.from({length:5},(ct,oe)=>`<svg class="star ${oe<I?"filled":""}" width="18" height="18" aria-hidden="true">
            <use href="${S}#icon-star"></use>
          </svg>`).join("")}
      </div>
    `}const r=o("modal-target");r&&(r.textContent=e.target||"N/A");const a=o("modal-bodypart");a&&(a.textContent=e.bodyPart||"N/A");const s=o("modal-equipment");s&&(s.textContent=e.equipment||"N/A");const l=o("modal-popular");l&&(l.textContent=e.popularity||"0");const v=o("modal-calories");v&&(v.textContent=`${e.burnedCalories||0}/${e.time||0} min`);const y=o("modal-description");y&&(y.textContent=e.description||"No description available.");const E=o("workout-popup");E&&(E.dataset.workoutId=e._id)}function U(e){const t=o("add-to-favorites-btn");t&&(N(e)?t.innerHTML=`
      <span class="btn-text">Remove from favorites</span>
      <svg width="20" height="20" aria-hidden="true">
        <use href="${S}#icon-trash"></use>
      </svg>
    `:t.innerHTML=`
      <span class="btn-text">Add to favorites</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3.5C10 3.5 6.5 1 3.5 3.5C0.5 6 2 10 10 16.5C18 10 19.5 6 16.5 3.5C13.5 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `)}function $e(e,t={}){z();const{onFavoriteChange:n}=t,i=o("modal-close-btn");i&&(i.onclick=()=>{z(),m("workout-modal")});const r=o("give-rating-btn");r&&(r.onclick=()=>{Ne(),Re(e)});const a=o("add-to-favorites-btn");a&&(U(e),a.onclick=async()=>{if(N(e))Z(e);else{const s=await D(e);qe(s)}U(e),n&&n(e,N(e))})}async function X(e,t={}){try{const n=await D(e);Pe(n),K("workout-modal"),$e(e,t)}catch(n){console.error(`Failed to fetch exercise details for ${e}:`,n)}}const R="motivation-of-the-day";function ee(){return new Date().toISOString().split("T")[0]}function Ie(){try{const e=localStorage.getItem(R);if(!e)return null;const{quote:t,author:n,date:i}=JSON.parse(e);return i===ee()?{quote:t,author:n}:(localStorage.removeItem(R),null)}catch(e){return console.error("Error reading cached motivation:",e),null}}function Oe(e,t){try{localStorage.setItem(R,JSON.stringify({quote:e,author:t,date:ee()}))}catch(n){console.error("Error caching motivation:",n)}}async function te(){try{let e=Ie();e||(e=await fe(),Oe(e.quote,e.author)),Ee(e)}catch(e){console.error("Failed to initialize motivation:",e)}}const T={mobile:767,tablet:1439,desktop:1440};function ne(){return window.innerWidth<=T.mobile}function _e(){return window.innerWidth>T.mobile&&window.innerWidth<T.desktop}function ie(){return window.innerWidth>=T.desktop}function He(){return ne()?9:12}function We(){return ne()?8:10}function q(){return ie()?1/0:_e()?10:8}function ze(){return!ie()}function re(e,t=300){let n;const i=()=>{clearTimeout(n),n=setTimeout(e,t)};return window.addEventListener("resize",i),()=>{clearTimeout(n),window.removeEventListener("resize",i)}}function ae(e,{timeout:t=2e3}={}){const n=()=>{"requestIdleCallback"in window?window.requestIdleCallback(()=>e(),{timeout:t}):setTimeout(e,1)};document.readyState==="complete"?n():window.addEventListener("load",n,{once:!0})}const c={view:"categories",filter:"Muscles",category:null,categoryFilter:null,keyword:"",page:1};function P(){return c.view==="categories"?He():We()}async function p(){const e=o("workouts-container");try{const t=P();if(c.view==="categories"){const n=await ge({filter:c.filter,page:c.page,limit:t});Fe(n.results,"workouts-container"),x(n.page?Number(n.page):1,n.totalPages||1)}else{const n={limit:t,page:c.page};c.categoryFilter==="Muscles"?n.muscles=c.category.toLowerCase():c.categoryFilter==="Body parts"?n.bodypart=c.category.toLowerCase():c.categoryFilter==="Equipment"&&(n.equipment=c.category.toLowerCase()),c.keyword&&(n.keyword=c.keyword);const i=await me(n);ke(i.results,"workouts-container"),x(i.page?Number(i.page):1,i.totalPages||1)}}catch(t){console.error("Fetch error:",t),e&&(e.innerHTML='<p class="error-message">Failed to load data. Please try again.</p>')}}function Ue(e){e&&e!==c.page&&(c.page=e,p(),Me())}function De(e){const t=o("section-title"),n=o("exercise-search-form");t&&(t.innerHTML=`Exercises / <span class="section-name">${e}</span>`),n&&n.classList.remove("hidden")}function je(){const e=o("section-title"),t=o("exercise-search-form"),n=o("exercise-search-input"),i=o("exercise-clear-btn");e&&(e.textContent="Exercises"),t&&t.classList.add("hidden"),n&&(n.value=""),i&&i.classList.add("hidden")}function Ge(){const e=o("filter-tabs");e&&f(e,"click",async t=>{const n=t.target.closest(".filter-tab");if(n){document.querySelectorAll(".filter-tab").forEach(i=>{i.classList.remove("active"),i.setAttribute("aria-pressed","false")}),n.classList.add("active"),n.setAttribute("aria-pressed","true"),c.filter=n.dataset.filter,c.view="categories",c.page=1,c.keyword="",c.category=null,je();try{await p()}catch(i){console.error("Failed to fetch data:",i)}}},"filter-tabs")}function Ke(){const e=o("exercise-search-form"),t=o("exercise-search-input"),n=o("exercise-clear-btn");!e||!t||(f(t,"input",()=>{t.value.trim()?n.classList.remove("hidden"):n.classList.add("hidden")},"search-input"),f(n,"click",async()=>{t.value="",n.classList.add("hidden"),t.focus(),c.keyword="",c.page=1;try{await p()}catch(i){console.error("Failed to fetch exercises:",i)}},"search-clear"),f(e,"submit",async i=>{i.preventDefault(),c.keyword=t.value.trim(),c.page=1;try{await p()}catch(r){console.error("Failed to search exercises:",r)}},"search-submit"))}function Ve(){const e=o("workouts-container");e&&f(e,"click",async t=>{const n=t.target.closest(".section-tile");if(n){t.preventDefault();const r=n.dataset.name,a=n.dataset.filter;if(!r)return;c.view="exercises",c.category=r,c.categoryFilter=a,c.page=1,c.keyword="",De(r),Ke();try{await p()}catch(s){console.error("Failed to fetch exercises:",s)}return}const i=t.target.closest(".workout-start-btn");if(i){const r=i.dataset.id;r&&X(r)}},"workouts")}function Je(){let e=P();re(()=>{const t=P();t!==e&&(e=t,c.page=1,p())})}function Ye(){const e=document.querySelector(".main-content");e&&e.classList.add("loaded"),p().catch(t=>{console.error("Error initializing home page:",t)}),ae(async()=>{try{await te()}catch(t){console.error("Error initializing motivation:",t)}}),Ge(),Ve(),j(Ue),Je()}const g={page:1};async function L(){if(!o("favorites-container"))return;const t=M();if(t.length===0){await H([],"favorites-container"),x(1,1,"favorites-pager");return}const n=q(),i=ze(),r=i?Math.ceil(t.length/n):1;g.page>r&&(g.page=r);const a=i?(g.page-1)*n:0,s=i?a+n:t.length,l=t.slice(a,s);await H(l,"favorites-container"),i&&x(g.page,r,"favorites-pager")}function Qe(e){e&&e!==g.page&&(g.page=e,L())}async function Ze(e){m("workout-popup"),m("workout-modal"),await L()}function Xe(){const e=o("favorites-container");e&&f(e,"click",async t=>{const n=t.target.closest(".bookmark-delete-btn");if(n){t.stopPropagation();const r=n.dataset.id;if(r){Z(r);try{await L()}catch(a){console.error("Failed to render favorites:",a)}}return}const i=t.target.closest(".workout-start-btn");if(i){t.stopPropagation();const r=i.dataset.id;r&&X(r,{onFavoriteChange:(a,s)=>{s||Ze()}})}},"favorites")}function et(){let e=q();re(()=>{const t=q();t!==e&&(e=t,g.page=1,L())})}function tt(){const e=document.querySelector(".favorites-page");e&&e.classList.add("loaded"),L().catch(t=>{console.error("Error initializing favorites page:",t)}),ae(async()=>{try{await te()}catch(t){console.error("Error initializing motivation:",t)}}),Xe(),j(Qe,"favorites-pager"),et()}function nt(){const e=o("mobile-menu"),t=o("burger-btn");e&&(e.showModal(),document.body.style.overflow="hidden"),t&&t.setAttribute("aria-expanded","true")}function A(){const e=o("mobile-menu");e&&e.close()}function it(){const e=o("burger-btn"),t=o("mobile-menu"),n=o("mobile-close-btn");if(!e||!t||!n)return;e.addEventListener("click",nt),n.addEventListener("click",A),t.addEventListener("click",r=>{r.target===t&&A()}),t.querySelectorAll(".mobile-nav-link").forEach(r=>{r.addEventListener("click",A)}),t.addEventListener("close",()=>{e.setAttribute("aria-expanded","false"),document.body.style.overflow=""})}function rt(){const e=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(n=>{const i=n.getAttribute("href");e.endsWith(i.replace("./","/"))||e.endsWith("/")&&i.includes("index.html")||e.endsWith("/index.html")&&i.includes("index.html")||e.includes("favorites")&&i.includes("favorites")?(n.setAttribute("aria-current","page"),n.classList.add("active")):(n.removeAttribute("aria-current"),n.classList.remove("active"))})}function at(){it(),rt()}document.addEventListener("DOMContentLoaded",at);function ot(){const e=window.location.pathname,t=document.getElementById("nav-home"),n=document.getElementById("nav-favorites");e.includes("favorites")?n==null||n.classList.add("active"):t==null||t.classList.add("active")}function st(){const e=document.getElementById("subscription-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=e.email.value;try{await he(n),C.success("Successfully subscribed!"),e.reset()}catch{}})}document.addEventListener("DOMContentLoaded",()=>{ot(),st(),document.getElementById("workouts-container")&&Ye(),document.getElementById("favorites-container")&&tt()});
//# sourceMappingURL=main-nnnHfpmv.js.map
