(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{95397:function(e,t,r){Promise.resolve().then(r.t.bind(r,65878,23)),Promise.resolve().then(r.t.bind(r,72972,23)),Promise.resolve().then(r.bind(r,98013)),Promise.resolve().then(r.bind(r,60772))},33145:function(e,t,r){"use strict";r.d(t,{default:function(){return i.a}});var n=r(48461),i=r.n(n)},27648:function(e,t,r){"use strict";r.d(t,{default:function(){return i.a}});var n=r(72972),i=r.n(n)},48461:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return l},getImageProps:function(){return s}});let n=r(47043),i=r(55346),o=r(65878),a=n._(r(5084));function s(e){let{props:t}=(0,i.getImgProps)(e,{defaultLoader:a.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let l=o.Image},98013:function(e,t,r){"use strict";r.d(t,{RemoveFromFavoriteButton:function(){return c},default:function(){return l}});var n=r(57437),i=r(12381),o=r(51817);let a=(0,r(79205).Z)("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);r(2265);var s=r(54887),l=function(){let{pending:e}=(0,s.useFormStatus)();return(0,n.jsx)(n.Fragment,{children:e?(0,n.jsx)(i.z,{variant:"outline",size:"icon",className:"bg-primary-foreground",disabled:!0,children:(0,n.jsx)(o.Z,{className:"h-2 w-2 animate-spin text-primary"})}):(0,n.jsx)(i.z,{variant:"outline",size:"icon",className:"bg-primary-foreground",type:"submit",children:(0,n.jsx)(a,{className:"w-4 h-4"})})})};function c(){let{pending:e}=(0,s.useFormStatus)();return(0,n.jsx)(n.Fragment,{children:e?(0,n.jsx)(i.z,{variant:"outline",size:"icon",className:"bg-primary-foreground",disabled:!0,children:(0,n.jsx)(o.Z,{className:"h-2 w-2 animate-spin text-primary"})}):(0,n.jsx)(i.z,{variant:"outline",size:"icon",className:"bg-primary-foreground",type:"submit",children:(0,n.jsx)(a,{className:"w-4 h-4 text-primary-foreground",fill:"#E21C49"})})})}},60772:function(e,t,r){"use strict";r.d(t,{default:function(){return G}});var n=r(57437),i=r(2265),o=r(6741),a=r(98575),s=r(73966),l=r(15278),c=r(99255),u=r(19961),d=r(83832),f=r(71599),p=r(66840),m=r(37053),h=r(80886),g=r(95098),[v,b]=(0,s.b)("Tooltip",[u.D7]),y=(0,u.D7)(),x="TooltipProvider",w="tooltip.open",[T,j]=v(x),N=e=>{let{__scopeTooltip:t,delayDuration:r=700,skipDelayDuration:o=300,disableHoverableContent:a=!1,children:s}=e,[l,c]=i.useState(!0),u=i.useRef(!1),d=i.useRef(0);return i.useEffect(()=>{let e=d.current;return()=>window.clearTimeout(e)},[]),(0,n.jsx)(T,{scope:t,isOpenDelayed:l,delayDuration:r,onOpen:i.useCallback(()=>{window.clearTimeout(d.current),c(!1)},[]),onClose:i.useCallback(()=>{window.clearTimeout(d.current),d.current=window.setTimeout(()=>c(!0),o)},[o]),isPointerInTransitRef:u,onPointerInTransitChange:i.useCallback(e=>{u.current=e},[]),disableHoverableContent:a,children:s})};N.displayName=x;var E="Tooltip",[C,P]=v(E),M=e=>{let{__scopeTooltip:t,children:r,open:o,defaultOpen:a=!1,onOpenChange:s,disableHoverableContent:l,delayDuration:d}=e,f=j(E,e.__scopeTooltip),p=y(t),[m,g]=i.useState(null),v=(0,c.M)(),b=i.useRef(0),x=null!=l?l:f.disableHoverableContent,T=null!=d?d:f.delayDuration,N=i.useRef(!1),[P=!1,M]=(0,h.T)({prop:o,defaultProp:a,onChange:e=>{e?(f.onOpen(),document.dispatchEvent(new CustomEvent(w))):f.onClose(),null==s||s(e)}}),k=i.useMemo(()=>P?N.current?"delayed-open":"instant-open":"closed",[P]),O=i.useCallback(()=>{window.clearTimeout(b.current),b.current=0,N.current=!1,M(!0)},[M]),R=i.useCallback(()=>{window.clearTimeout(b.current),b.current=0,M(!1)},[M]),_=i.useCallback(()=>{window.clearTimeout(b.current),b.current=window.setTimeout(()=>{N.current=!0,M(!0),b.current=0},T)},[T,M]);return i.useEffect(()=>()=>{b.current&&(window.clearTimeout(b.current),b.current=0)},[]),(0,n.jsx)(u.fC,{...p,children:(0,n.jsx)(C,{scope:t,contentId:v,open:P,stateAttribute:k,trigger:m,onTriggerChange:g,onTriggerEnter:i.useCallback(()=>{f.isOpenDelayed?_():O()},[f.isOpenDelayed,_,O]),onTriggerLeave:i.useCallback(()=>{x?R():(window.clearTimeout(b.current),b.current=0)},[R,x]),onOpen:O,onClose:R,disableHoverableContent:x,children:r})})};M.displayName=E;var k="TooltipTrigger",O=i.forwardRef((e,t)=>{let{__scopeTooltip:r,...s}=e,l=P(k,r),c=j(k,r),d=y(r),f=i.useRef(null),m=(0,a.e)(t,f,l.onTriggerChange),h=i.useRef(!1),g=i.useRef(!1),v=i.useCallback(()=>h.current=!1,[]);return i.useEffect(()=>()=>document.removeEventListener("pointerup",v),[v]),(0,n.jsx)(u.ee,{asChild:!0,...d,children:(0,n.jsx)(p.WV.button,{"aria-describedby":l.open?l.contentId:void 0,"data-state":l.stateAttribute,...s,ref:m,onPointerMove:(0,o.M)(e.onPointerMove,e=>{"touch"===e.pointerType||g.current||c.isPointerInTransitRef.current||(l.onTriggerEnter(),g.current=!0)}),onPointerLeave:(0,o.M)(e.onPointerLeave,()=>{l.onTriggerLeave(),g.current=!1}),onPointerDown:(0,o.M)(e.onPointerDown,()=>{h.current=!0,document.addEventListener("pointerup",v,{once:!0})}),onFocus:(0,o.M)(e.onFocus,()=>{h.current||l.onOpen()}),onBlur:(0,o.M)(e.onBlur,l.onClose),onClick:(0,o.M)(e.onClick,l.onClose)})})});O.displayName=k;var R="TooltipPortal",[_,L]=v(R,{forceMount:void 0}),U=e=>{let{__scopeTooltip:t,forceMount:r,children:i,container:o}=e,a=P(R,t);return(0,n.jsx)(_,{scope:t,forceMount:r,children:(0,n.jsx)(f.z,{present:r||a.open,children:(0,n.jsx)(d.h,{asChild:!0,container:o,children:i})})})};U.displayName=R;var z="TooltipContent",I=i.forwardRef((e,t)=>{let r=L(z,e.__scopeTooltip),{forceMount:i=r.forceMount,side:o="top",...a}=e,s=P(z,e.__scopeTooltip);return(0,n.jsx)(f.z,{present:i||s.open,children:s.disableHoverableContent?(0,n.jsx)(F,{side:o,...a,ref:t}):(0,n.jsx)(A,{side:o,...a,ref:t})})}),A=i.forwardRef((e,t)=>{let r=P(z,e.__scopeTooltip),o=j(z,e.__scopeTooltip),s=i.useRef(null),l=(0,a.e)(t,s),[c,u]=i.useState(null),{trigger:d,onClose:f}=r,p=s.current,{onPointerInTransitChange:m}=o,h=i.useCallback(()=>{u(null),m(!1)},[m]),g=i.useCallback((e,t)=>{let r=e.currentTarget,n={x:e.clientX,y:e.clientY},i=function(e,t){let r=Math.abs(t.top-e.y),n=Math.abs(t.bottom-e.y),i=Math.abs(t.right-e.x),o=Math.abs(t.left-e.x);switch(Math.min(r,n,i,o)){case o:return"left";case i:return"right";case r:return"top";case n:return"bottom";default:throw Error("unreachable")}}(n,r.getBoundingClientRect());u(function(e){let t=e.slice();return t.sort((e,t)=>e.x<t.x?-1:e.x>t.x?1:e.y<t.y?-1:e.y>t.y?1:0),function(e){if(e.length<=1)return e.slice();let t=[];for(let r=0;r<e.length;r++){let n=e[r];for(;t.length>=2;){let e=t[t.length-1],r=t[t.length-2];if((e.x-r.x)*(n.y-r.y)>=(e.y-r.y)*(n.x-r.x))t.pop();else break}t.push(n)}t.pop();let r=[];for(let t=e.length-1;t>=0;t--){let n=e[t];for(;r.length>=2;){let e=r[r.length-1],t=r[r.length-2];if((e.x-t.x)*(n.y-t.y)>=(e.y-t.y)*(n.x-t.x))r.pop();else break}r.push(n)}return(r.pop(),1===t.length&&1===r.length&&t[0].x===r[0].x&&t[0].y===r[0].y)?t:t.concat(r)}(t)}([...function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,n=[];switch(t){case"top":n.push({x:e.x-r,y:e.y+r},{x:e.x+r,y:e.y+r});break;case"bottom":n.push({x:e.x-r,y:e.y-r},{x:e.x+r,y:e.y-r});break;case"left":n.push({x:e.x+r,y:e.y-r},{x:e.x+r,y:e.y+r});break;case"right":n.push({x:e.x-r,y:e.y-r},{x:e.x-r,y:e.y+r})}return n}(n,i),...function(e){let{top:t,right:r,bottom:n,left:i}=e;return[{x:i,y:t},{x:r,y:t},{x:r,y:n},{x:i,y:n}]}(t.getBoundingClientRect())])),m(!0)},[m]);return i.useEffect(()=>()=>h(),[h]),i.useEffect(()=>{if(d&&p){let e=e=>g(e,p),t=e=>g(e,d);return d.addEventListener("pointerleave",e),p.addEventListener("pointerleave",t),()=>{d.removeEventListener("pointerleave",e),p.removeEventListener("pointerleave",t)}}},[d,p,g,h]),i.useEffect(()=>{if(c){let e=e=>{let t=e.target,r={x:e.clientX,y:e.clientY},n=(null==d?void 0:d.contains(t))||(null==p?void 0:p.contains(t)),i=!function(e,t){let{x:r,y:n}=e,i=!1;for(let e=0,o=t.length-1;e<t.length;o=e++){let a=t[e].x,s=t[e].y,l=t[o].x,c=t[o].y;s>n!=c>n&&r<(l-a)*(n-s)/(c-s)+a&&(i=!i)}return i}(r,c);n?h():i&&(h(),f())};return document.addEventListener("pointermove",e),()=>document.removeEventListener("pointermove",e)}},[d,p,c,f,h]),(0,n.jsx)(F,{...e,ref:l})}),[S,D]=v(E,{isInside:!1}),F=i.forwardRef((e,t)=>{let{__scopeTooltip:r,children:o,"aria-label":a,onEscapeKeyDown:s,onPointerDownOutside:c,...d}=e,f=P(z,r),p=y(r),{onClose:h}=f;return i.useEffect(()=>(document.addEventListener(w,h),()=>document.removeEventListener(w,h)),[h]),i.useEffect(()=>{if(f.trigger){let e=e=>{let t=e.target;(null==t?void 0:t.contains(f.trigger))&&h()};return window.addEventListener("scroll",e,{capture:!0}),()=>window.removeEventListener("scroll",e,{capture:!0})}},[f.trigger,h]),(0,n.jsx)(l.XB,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:s,onPointerDownOutside:c,onFocusOutside:e=>e.preventDefault(),onDismiss:h,children:(0,n.jsxs)(u.VY,{"data-state":f.stateAttribute,...p,...d,ref:t,style:{...d.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[(0,n.jsx)(m.A4,{children:o}),(0,n.jsx)(S,{scope:r,isInside:!0,children:(0,n.jsx)(g.f,{id:f.contentId,role:"tooltip",children:a||o})})]})})});I.displayName=z;var B="TooltipArrow";i.forwardRef((e,t)=>{let{__scopeTooltip:r,...i}=e,o=y(r);return D(B,r).isInside?null:(0,n.jsx)(u.Eh,{...o,...i,ref:t})}).displayName=B;var H=r(93448);let V=i.forwardRef((e,t)=>{let{className:r,sideOffset:i=4,...o}=e;return(0,n.jsx)(U,{children:(0,n.jsx)(I,{ref:t,sideOffset:i,className:(0,H.cn)("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",r),...o})})});V.displayName=I.displayName;var W=r(12379),Z=r(33145),X=r(27648),Y=r(35475),G=function(){let e=(0,Y.useSearchParams)(),t=e.get("filter"),r=(0,Y.usePathname)(),o=(0,i.useCallback)((t,r)=>{let n=new URLSearchParams(e.toString());return n.set(t,r),n.toString()},[e]);return(0,n.jsx)("div",{className:"flex flex-row justify-evenly mt-5 w-full overflow-x-scroll no-scrollbar",children:W.N.map(e=>(0,n.jsx)(X.default,{href:r+"?"+o("filter",e.name),className:(0,H.cn)(t===e.name?"border-b-2 border-black pb-2 flex-shrink-0":"opacity-70 flex-shrink-0","flex flex-col gap-y-3 items-center"),children:(0,n.jsx)(N,{children:(0,n.jsxs)(M,{children:[(0,n.jsx)(O,{children:(0,n.jsx)("div",{className:"relative lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4",children:(0,n.jsx)(Z.default,{src:e.imageUrl,alt:"Category image",className:"lg:w-8 lg:h-8 md:w-6 md:h-6 sm:w-4 sm:h-4",width:24,height:24})})}),(0,n.jsx)(V,{children:(0,n.jsx)("p",{className:"text-xs font-medium",children:e.title})})]})})},e.id))})}},12381:function(e,t,r){"use strict";r.d(t,{z:function(){return c}});var n=r(57437),i=r(2265),o=r(37053),a=r(77712),s=r(93448);let l=(0,a.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=i.forwardRef((e,t)=>{let{className:r,variant:i,size:a,asChild:c=!1,...u}=e,d=c?o.g7:"button";return(0,n.jsx)(d,{className:(0,s.cn)(l({variant:i,size:a,className:r})),ref:t,...u})});c.displayName="Button"},12379:function(e,t,r){"use strict";r.d(t,{N:function(){return n}});let n=[{id:0,name:"beach",description:"This Property is close to the Beach.",title:"Beach",imageUrl:"https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg"},{id:1,name:"trending",description:"This is a Property which is trending.",title:"Trending",imageUrl:"https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg"},{id:2,name:"beachfront",description:"This is a Property is close to the beachfront",title:"Beachfront",imageUrl:"https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg"},{id:3,name:"erathhome",description:"This Property is considerd a Earth Home",title:"Earth Home",imageUrl:"https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg"},{id:4,name:"luxe",description:"This Property is considerd Luxorious",title:"Luxe",imageUrl:"https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg"},{id:5,name:"amazingView",description:"This property has an amazing View",title:"Amazing View",imageUrl:"https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"},{id:6,name:"design",description:"This property puts a big focus on design ",title:"Design",imageUrl:"https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg"},{id:7,name:"pool",description:"This property has an amazing Pool",title:"Pool",imageUrl:"https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg"},{id:8,name:"tiny",description:"This property is considered a tiny home",title:"Tiny Home",imageUrl:"https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg"},{id:9,name:"historic",description:"This Property is considered historic",title:"Historic Home",imageUrl:"https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg"},{id:10,name:"countryside",description:"This Property is located on the countryside",title:"Countryside",imageUrl:"https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg"},{id:11,name:"omg",description:"This Property has a wow factor",title:"WOW!",imageUrl:"https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg"},{id:12,name:"surfing",description:"This Property is located near to a surfing spot",title:"Surfing",imageUrl:"https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg"}]},93448:function(e,t,r){"use strict";r.d(t,{cn:function(){return o}});var n=r(61994),i=r(53335);function o(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,i.m6)((0,n.W)(t))}},71599:function(e,t,r){"use strict";r.d(t,{z:function(){return a}});var n=r(2265),i=r(98575),o=r(61188),a=e=>{var t,r;let a,l;let{present:c,children:u}=e,d=function(e){var t,r;let[i,a]=n.useState(),l=n.useRef({}),c=n.useRef(e),u=n.useRef("none"),[d,f]=(t=e?"mounted":"unmounted",r={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},n.useReducer((e,t)=>{let n=r[e][t];return null!=n?n:e},t));return n.useEffect(()=>{let e=s(l.current);u.current="mounted"===d?e:"none"},[d]),(0,o.b)(()=>{let t=l.current,r=c.current;if(r!==e){let n=u.current,i=s(t);e?f("MOUNT"):"none"===i||(null==t?void 0:t.display)==="none"?f("UNMOUNT"):r&&n!==i?f("ANIMATION_OUT"):f("UNMOUNT"),c.current=e}},[e,f]),(0,o.b)(()=>{if(i){var e;let t;let r=null!==(e=i.ownerDocument.defaultView)&&void 0!==e?e:window,n=e=>{let n=s(l.current).includes(e.animationName);if(e.target===i&&n&&(f("ANIMATION_END"),!c.current)){let e=i.style.animationFillMode;i.style.animationFillMode="forwards",t=r.setTimeout(()=>{"forwards"===i.style.animationFillMode&&(i.style.animationFillMode=e)})}},o=e=>{e.target===i&&(u.current=s(l.current))};return i.addEventListener("animationstart",o),i.addEventListener("animationcancel",n),i.addEventListener("animationend",n),()=>{r.clearTimeout(t),i.removeEventListener("animationstart",o),i.removeEventListener("animationcancel",n),i.removeEventListener("animationend",n)}}f("ANIMATION_END")},[i,f]),{isPresent:["mounted","unmountSuspended"].includes(d),ref:n.useCallback(e=>{e&&(l.current=getComputedStyle(e)),a(e)},[])}}(c),f="function"==typeof u?u({present:d.isPresent}):n.Children.only(u),p=(0,i.e)(d.ref,(a=null===(t=Object.getOwnPropertyDescriptor(f.props,"ref"))||void 0===t?void 0:t.get)&&"isReactWarning"in a&&a.isReactWarning?f.ref:(a=null===(r=Object.getOwnPropertyDescriptor(f,"ref"))||void 0===r?void 0:r.get)&&"isReactWarning"in a&&a.isReactWarning?f.props.ref:f.props.ref||f.ref);return"function"==typeof u||d.isPresent?n.cloneElement(f,{ref:p}):null};function s(e){return(null==e?void 0:e.animationName)||"none"}a.displayName="Presence"}},function(e){e.O(0,[787,878,374,971,117,744],function(){return e(e.s=95397)}),_N_E=e.O()}]);