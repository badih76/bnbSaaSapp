"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[27],{27648:function(e,t,n){n.d(t,{default:function(){return o.a}});var r=n(72972),o=n.n(r)},12119:function(e,t,n){Object.defineProperty(t,"$",{enumerable:!0,get:function(){return o}});let r=n(83079);function o(e){let{createServerReference:t}=n(6671);return t(e,r.callServer)}},6394:function(e,t,n){n.d(t,{f:function(){return a}});var r=n(2265),o=n(66840),l=n(57437),u=r.forwardRef((e,t)=>(0,l.jsx)(o.WV.label,{...e,ref:t,onMouseDown:t=>{var n;t.target.closest("button, input, select, textarea")||(null===(n=e.onMouseDown)||void 0===n||n.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));u.displayName="Label";var a=u},27312:function(e,t,n){n.d(t,{VY:function(){return q},ee:function(){return V},fC:function(){return U},h_:function(){return z},xz:function(){return B}});var r=n(2265),o=n(6741),l=n(98575),u=n(73966),a=n(15278),i=n(86097),c=n(99103),s=n(99255),d=n(19961),f=n(83832),v=n(71599),p=n(66840),m=n(37053),h=n(80886),g=n(5478),E=n(60703),b=n(57437),y="Popover",[w,C]=(0,u.b)(y,[d.D7]),R=(0,d.D7)(),[P,S]=w(y),k=e=>{let{__scopePopover:t,children:n,open:o,defaultOpen:l,onOpenChange:u,modal:a=!1}=e,i=R(t),c=r.useRef(null),[f,v]=r.useState(!1),[p=!1,m]=(0,h.T)({prop:o,defaultProp:l,onChange:u});return(0,b.jsx)(d.fC,{...i,children:(0,b.jsx)(P,{scope:t,contentId:(0,s.M)(),triggerRef:c,open:p,onOpenChange:m,onOpenToggle:r.useCallback(()=>m(e=>!e),[m]),hasCustomAnchor:f,onCustomAnchorAdd:r.useCallback(()=>v(!0),[]),onCustomAnchorRemove:r.useCallback(()=>v(!1),[]),modal:a,children:n})})};k.displayName=y;var x="PopoverAnchor",D=r.forwardRef((e,t)=>{let{__scopePopover:n,...o}=e,l=S(x,n),u=R(n),{onCustomAnchorAdd:a,onCustomAnchorRemove:i}=l;return r.useEffect(()=>(a(),()=>i()),[a,i]),(0,b.jsx)(d.ee,{...u,...o,ref:t})});D.displayName=x;var N="PopoverTrigger",O=r.forwardRef((e,t)=>{let{__scopePopover:n,...r}=e,u=S(N,n),a=R(n),i=(0,l.e)(t,u.triggerRef),c=(0,b.jsx)(p.WV.button,{type:"button","aria-haspopup":"dialog","aria-expanded":u.open,"aria-controls":u.contentId,"data-state":K(u.open),...r,ref:i,onClick:(0,o.M)(e.onClick,u.onOpenToggle)});return u.hasCustomAnchor?c:(0,b.jsx)(d.ee,{asChild:!0,...a,children:c})});O.displayName=N;var A="PopoverPortal",[I,M]=w(A,{forceMount:void 0}),T=e=>{let{__scopePopover:t,forceMount:n,children:r,container:o}=e,l=S(A,t);return(0,b.jsx)(I,{scope:t,forceMount:n,children:(0,b.jsx)(v.z,{present:n||l.open,children:(0,b.jsx)(f.h,{asChild:!0,container:o,children:r})})})};T.displayName=A;var L="PopoverContent",F=r.forwardRef((e,t)=>{let n=M(L,e.__scopePopover),{forceMount:r=n.forceMount,...o}=e,l=S(L,e.__scopePopover);return(0,b.jsx)(v.z,{present:r||l.open,children:l.modal?(0,b.jsx)(_,{...o,ref:t}):(0,b.jsx)(j,{...o,ref:t})})});F.displayName=L;var _=r.forwardRef((e,t)=>{let n=S(L,e.__scopePopover),u=r.useRef(null),a=(0,l.e)(t,u),i=r.useRef(!1);return r.useEffect(()=>{let e=u.current;if(e)return(0,g.Ry)(e)},[]),(0,b.jsx)(E.Z,{as:m.g7,allowPinchZoom:!0,children:(0,b.jsx)($,{...e,ref:a,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,o.M)(e.onCloseAutoFocus,e=>{var t;e.preventDefault(),i.current||null===(t=n.triggerRef.current)||void 0===t||t.focus()}),onPointerDownOutside:(0,o.M)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey,r=2===t.button||n;i.current=r},{checkForDefaultPrevented:!1}),onFocusOutside:(0,o.M)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1})})})}),j=r.forwardRef((e,t)=>{let n=S(L,e.__scopePopover),o=r.useRef(!1),l=r.useRef(!1);return(0,b.jsx)($,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var r,u;null===(r=e.onCloseAutoFocus)||void 0===r||r.call(e,t),t.defaultPrevented||(o.current||null===(u=n.triggerRef.current)||void 0===u||u.focus(),t.preventDefault()),o.current=!1,l.current=!1},onInteractOutside:t=>{var r,u;null===(r=e.onInteractOutside)||void 0===r||r.call(e,t),t.defaultPrevented||(o.current=!0,"pointerdown"!==t.detail.originalEvent.type||(l.current=!0));let a=t.target;(null===(u=n.triggerRef.current)||void 0===u?void 0:u.contains(a))&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&l.current&&t.preventDefault()}})}),$=r.forwardRef((e,t)=>{let{__scopePopover:n,trapFocus:r,onOpenAutoFocus:o,onCloseAutoFocus:l,disableOutsidePointerEvents:u,onEscapeKeyDown:s,onPointerDownOutside:f,onFocusOutside:v,onInteractOutside:p,...m}=e,h=S(L,n),g=R(n);return(0,i.EW)(),(0,b.jsx)(c.M,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:o,onUnmountAutoFocus:l,children:(0,b.jsx)(a.XB,{asChild:!0,disableOutsidePointerEvents:u,onInteractOutside:p,onEscapeKeyDown:s,onPointerDownOutside:f,onFocusOutside:v,onDismiss:()=>h.onOpenChange(!1),children:(0,b.jsx)(d.VY,{"data-state":K(h.open),role:"dialog",id:h.contentId,...g,...m,ref:t,style:{...m.style,"--radix-popover-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-popover-content-available-width":"var(--radix-popper-available-width)","--radix-popover-content-available-height":"var(--radix-popper-available-height)","--radix-popover-trigger-width":"var(--radix-popper-anchor-width)","--radix-popover-trigger-height":"var(--radix-popper-anchor-height)"}})})})}),W="PopoverClose";function K(e){return e?"open":"closed"}r.forwardRef((e,t)=>{let{__scopePopover:n,...r}=e,l=S(W,n);return(0,b.jsx)(p.WV.button,{type:"button",...r,ref:t,onClick:(0,o.M)(e.onClick,()=>l.onOpenChange(!1))})}).displayName=W,r.forwardRef((e,t)=>{let{__scopePopover:n,...r}=e,o=R(n);return(0,b.jsx)(d.Eh,{...o,...r,ref:t})}).displayName="PopoverArrow";var U=k,V=D,B=O,z=T,q=F},98334:function(e,t,n){let r,o;n.d(t,{mY:function(){return e7}});var l=/[\\\/_+.#"@\[\(\{&]/,u=/[\\\/_+.#"@\[\(\{&]/g,a=/[\s-]/,i=/[\s-]/g;function c(e){return e.toLowerCase().replace(i," ")}function s(){return(s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}var d=n(2265),f=n.t(d,2);function v(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(null==e||e(r),!1===n||!r.defaultPrevented)return null==t?void 0:t(r)}}function p(...e){return t=>e.forEach(e=>{"function"==typeof e?e(t):null!=e&&(e.current=t)})}function m(...e){return(0,d.useCallback)(p(...e),e)}let h=(null==globalThis?void 0:globalThis.document)?d.useLayoutEffect:()=>{},g=f["useId".toString()]||(()=>void 0),E=0;function b(e){let[t,n]=d.useState(g());return h(()=>{e||n(e=>null!=e?e:String(E++))},[e]),e||(t?`radix-${t}`:"")}function y(e){let t=(0,d.useRef)(e);return(0,d.useEffect)(()=>{t.current=e}),(0,d.useMemo)(()=>(...e)=>{var n;return null===(n=t.current)||void 0===n?void 0:n.call(t,...e)},[])}var w=n(54887);let C=(0,d.forwardRef)((e,t)=>{let{children:n,...r}=e,o=d.Children.toArray(n),l=o.find(S);if(l){let e=l.props.children,n=o.map(t=>t!==l?t:d.Children.count(e)>1?d.Children.only(null):(0,d.isValidElement)(e)?e.props.children:null);return(0,d.createElement)(R,s({},r,{ref:t}),(0,d.isValidElement)(e)?(0,d.cloneElement)(e,void 0,n):null)}return(0,d.createElement)(R,s({},r,{ref:t}),n)});C.displayName="Slot";let R=(0,d.forwardRef)((e,t)=>{let{children:n,...r}=e;return(0,d.isValidElement)(n)?(0,d.cloneElement)(n,{...function(e,t){let n={...t};for(let r in t){let o=e[r],l=t[r];/^on[A-Z]/.test(r)?o&&l?n[r]=(...e)=>{l(...e),o(...e)}:o&&(n[r]=o):"style"===r?n[r]={...o,...l}:"className"===r&&(n[r]=[o,l].filter(Boolean).join(" "))}return{...e,...n}}(r,n.props),ref:t?p(t,n.ref):n.ref}):d.Children.count(n)>1?d.Children.only(null):null});R.displayName="SlotClone";let P=({children:e})=>(0,d.createElement)(d.Fragment,null,e);function S(e){return(0,d.isValidElement)(e)&&e.type===P}let k=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=(0,d.forwardRef)((e,n)=>{let{asChild:r,...o}=e,l=r?C:t;return(0,d.useEffect)(()=>{window[Symbol.for("radix-ui")]=!0},[]),(0,d.createElement)(l,s({},o,{ref:n}))});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{}),x="dismissableLayer.update",D=(0,d.createContext)({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),N=(0,d.forwardRef)((e,t)=>{var n;let{disableOutsidePointerEvents:o=!1,onEscapeKeyDown:l,onPointerDownOutside:u,onFocusOutside:a,onInteractOutside:i,onDismiss:c,...f}=e,p=(0,d.useContext)(D),[h,g]=(0,d.useState)(null),E=null!==(n=null==h?void 0:h.ownerDocument)&&void 0!==n?n:null==globalThis?void 0:globalThis.document,[,b]=(0,d.useState)({}),w=m(t,e=>g(e)),C=Array.from(p.layers),[R]=[...p.layersWithOutsidePointerEventsDisabled].slice(-1),P=C.indexOf(R),S=h?C.indexOf(h):-1,N=p.layersWithOutsidePointerEventsDisabled.size>0,I=S>=P,M=function(e,t=null==globalThis?void 0:globalThis.document){let n=y(e),r=(0,d.useRef)(!1),o=(0,d.useRef)(()=>{});return(0,d.useEffect)(()=>{let e=e=>{if(e.target&&!r.current){let r={originalEvent:e};function l(){A("dismissableLayer.pointerDownOutside",n,r,{discrete:!0})}"touch"===e.pointerType?(t.removeEventListener("click",o.current),o.current=l,t.addEventListener("click",o.current,{once:!0})):l()}else t.removeEventListener("click",o.current);r.current=!1},l=window.setTimeout(()=>{t.addEventListener("pointerdown",e)},0);return()=>{window.clearTimeout(l),t.removeEventListener("pointerdown",e),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}(e=>{let t=e.target,n=[...p.branches].some(e=>e.contains(t));!I||n||(null==u||u(e),null==i||i(e),e.defaultPrevented||null==c||c())},E),T=function(e,t=null==globalThis?void 0:globalThis.document){let n=y(e),r=(0,d.useRef)(!1);return(0,d.useEffect)(()=>{let e=e=>{e.target&&!r.current&&A("dismissableLayer.focusOutside",n,{originalEvent:e},{discrete:!1})};return t.addEventListener("focusin",e),()=>t.removeEventListener("focusin",e)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}(e=>{let t=e.target;[...p.branches].some(e=>e.contains(t))||(null==a||a(e),null==i||i(e),e.defaultPrevented||null==c||c())},E);return!function(e,t=null==globalThis?void 0:globalThis.document){let n=y(e);(0,d.useEffect)(()=>{let e=e=>{"Escape"===e.key&&n(e)};return t.addEventListener("keydown",e),()=>t.removeEventListener("keydown",e)},[n,t])}(e=>{S!==p.layers.size-1||(null==l||l(e),!e.defaultPrevented&&c&&(e.preventDefault(),c()))},E),(0,d.useEffect)(()=>{if(h)return o&&(0===p.layersWithOutsidePointerEventsDisabled.size&&(r=E.body.style.pointerEvents,E.body.style.pointerEvents="none"),p.layersWithOutsidePointerEventsDisabled.add(h)),p.layers.add(h),O(),()=>{o&&1===p.layersWithOutsidePointerEventsDisabled.size&&(E.body.style.pointerEvents=r)}},[h,E,o,p]),(0,d.useEffect)(()=>()=>{h&&(p.layers.delete(h),p.layersWithOutsidePointerEventsDisabled.delete(h),O())},[h,p]),(0,d.useEffect)(()=>{let e=()=>b({});return document.addEventListener(x,e),()=>document.removeEventListener(x,e)},[]),(0,d.createElement)(k.div,s({},f,{ref:w,style:{pointerEvents:N?I?"auto":"none":void 0,...e.style},onFocusCapture:v(e.onFocusCapture,T.onFocusCapture),onBlurCapture:v(e.onBlurCapture,T.onBlurCapture),onPointerDownCapture:v(e.onPointerDownCapture,M.onPointerDownCapture)}))});function O(){let e=new CustomEvent(x);document.dispatchEvent(e)}function A(e,t,n,{discrete:r}){let o=n.originalEvent.target,l=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});(t&&o.addEventListener(e,t,{once:!0}),r)?o&&(0,w.flushSync)(()=>o.dispatchEvent(l)):o.dispatchEvent(l)}let I="focusScope.autoFocusOnMount",M="focusScope.autoFocusOnUnmount",T={bubbles:!1,cancelable:!0},L=(0,d.forwardRef)((e,t)=>{let{loop:n=!1,trapped:r=!1,onMountAutoFocus:o,onUnmountAutoFocus:l,...u}=e,[a,i]=(0,d.useState)(null),c=y(o),f=y(l),v=(0,d.useRef)(null),p=m(t,e=>i(e)),h=(0,d.useRef)({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;(0,d.useEffect)(()=>{if(r){function e(e){if(h.paused||!a)return;let t=e.target;a.contains(t)?v.current=t:j(v.current,{select:!0})}function t(e){if(h.paused||!a)return;let t=e.relatedTarget;null===t||a.contains(t)||j(v.current,{select:!0})}document.addEventListener("focusin",e),document.addEventListener("focusout",t);let n=new MutationObserver(function(e){if(document.activeElement===document.body)for(let t of e)t.removedNodes.length>0&&j(a)});return a&&n.observe(a,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",e),document.removeEventListener("focusout",t),n.disconnect()}}},[r,a,h.paused]),(0,d.useEffect)(()=>{if(a){$.add(h);let e=document.activeElement;if(!a.contains(e)){let t=new CustomEvent(I,T);a.addEventListener(I,c),a.dispatchEvent(t),t.defaultPrevented||(function(e,{select:t=!1}={}){let n=document.activeElement;for(let r of e)if(j(r,{select:t}),document.activeElement!==n)return}(F(a).filter(e=>"A"!==e.tagName),{select:!0}),document.activeElement===e&&j(a))}return()=>{a.removeEventListener(I,c),setTimeout(()=>{let t=new CustomEvent(M,T);a.addEventListener(M,f),a.dispatchEvent(t),t.defaultPrevented||j(null!=e?e:document.body,{select:!0}),a.removeEventListener(M,f),$.remove(h)},0)}}},[a,c,f,h]);let g=(0,d.useCallback)(e=>{if(!n&&!r||h.paused)return;let t="Tab"===e.key&&!e.altKey&&!e.ctrlKey&&!e.metaKey,o=document.activeElement;if(t&&o){let t=e.currentTarget,[r,l]=function(e){let t=F(e);return[_(t,e),_(t.reverse(),e)]}(t);r&&l?e.shiftKey||o!==l?e.shiftKey&&o===r&&(e.preventDefault(),n&&j(l,{select:!0})):(e.preventDefault(),n&&j(r,{select:!0})):o===t&&e.preventDefault()}},[n,r,h.paused]);return(0,d.createElement)(k.div,s({tabIndex:-1},u,{ref:p,onKeyDown:g}))});function F(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{let t="INPUT"===e.tagName&&"hidden"===e.type;return e.disabled||e.hidden||t?NodeFilter.FILTER_SKIP:e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function _(e,t){for(let n of e)if(!function(e,{upTo:t}){if("hidden"===getComputedStyle(e).visibility)return!0;for(;e&&(void 0===t||e!==t);){if("none"===getComputedStyle(e).display)return!0;e=e.parentElement}return!1}(n,{upTo:t}))return n}function j(e,{select:t=!1}={}){if(e&&e.focus){var n;let r=document.activeElement;e.focus({preventScroll:!0}),e!==r&&(n=e)instanceof HTMLInputElement&&"select"in n&&t&&e.select()}}let $=(o=[],{add(e){let t=o[0];e!==t&&(null==t||t.pause()),(o=W(o,e)).unshift(e)},remove(e){var t;null===(t=(o=W(o,e))[0])||void 0===t||t.resume()}});function W(e,t){let n=[...e],r=n.indexOf(t);return -1!==r&&n.splice(r,1),n}let K=(0,d.forwardRef)((e,t)=>{var n;let{container:r=null==globalThis?void 0:null===(n=globalThis.document)||void 0===n?void 0:n.body,...o}=e;return r?w.createPortal((0,d.createElement)(k.div,s({},o,{ref:t})),r):null}),U=e=>{let{present:t,children:n}=e,r=function(e){var t,n;let[r,o]=(0,d.useState)(),l=(0,d.useRef)({}),u=(0,d.useRef)(e),a=(0,d.useRef)("none"),[i,c]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},(0,d.useReducer)((e,t)=>{let r=n[e][t];return null!=r?r:e},t));return(0,d.useEffect)(()=>{let e=V(l.current);a.current="mounted"===i?e:"none"},[i]),h(()=>{let t=l.current,n=u.current;if(n!==e){let r=a.current,o=V(t);e?c("MOUNT"):"none"===o||(null==t?void 0:t.display)==="none"?c("UNMOUNT"):n&&r!==o?c("ANIMATION_OUT"):c("UNMOUNT"),u.current=e}},[e,c]),h(()=>{if(r){let e=e=>{let t=V(l.current).includes(e.animationName);e.target===r&&t&&(0,w.flushSync)(()=>c("ANIMATION_END"))},t=e=>{e.target===r&&(a.current=V(l.current))};return r.addEventListener("animationstart",t),r.addEventListener("animationcancel",e),r.addEventListener("animationend",e),()=>{r.removeEventListener("animationstart",t),r.removeEventListener("animationcancel",e),r.removeEventListener("animationend",e)}}c("ANIMATION_END")},[r,c]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:(0,d.useCallback)(e=>{e&&(l.current=getComputedStyle(e)),o(e)},[])}}(t),o="function"==typeof n?n({present:r.isPresent}):d.Children.only(n),l=m(r.ref,o.ref);return"function"==typeof n||r.isPresent?(0,d.cloneElement)(o,{ref:l}):null};function V(e){return(null==e?void 0:e.animationName)||"none"}U.displayName="Presence";let B=0;function z(){let e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}var q=n(5853),Y=n(85770),X=n(17325),Z=(0,n(31412)._)(),H=function(){},G=d.forwardRef(function(e,t){var n=d.useRef(null),r=d.useState({onScrollCapture:H,onWheelCapture:H,onTouchMoveCapture:H}),o=r[0],l=r[1],u=e.forwardProps,a=e.children,i=e.className,c=e.removeScrollBar,s=e.enabled,f=e.shards,v=e.sideCar,p=e.noIsolation,m=e.inert,h=e.allowPinchZoom,g=e.as,E=(0,q._T)(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),b=(0,X.q)([n,t]),y=(0,q.pi)((0,q.pi)({},E),o);return d.createElement(d.Fragment,null,s&&d.createElement(v,{sideCar:Z,removeScrollBar:c,shards:f,noIsolation:p,inert:m,setCallbacks:l,allowPinchZoom:!!h,lockRef:n}),u?d.cloneElement(d.Children.only(a),(0,q.pi)((0,q.pi)({},y),{ref:b})):d.createElement(void 0===g?"div":g,(0,q.pi)({},y,{className:i,ref:b}),a))});G.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1},G.classNames={fullWidth:Y.zi,zeroRight:Y.pF};var J=n(49085),Q=n(5517),ee=n(18704),et=!1;if("undefined"!=typeof window)try{var en=Object.defineProperty({},"passive",{get:function(){return et=!0,!0}});window.addEventListener("test",en,en),window.removeEventListener("test",en,en)}catch(e){et=!1}var er=!!et&&{passive:!1},eo=function(e,t){var n=window.getComputedStyle(e);return"hidden"!==n[t]&&!(n.overflowY===n.overflowX&&"TEXTAREA"!==e.tagName&&"visible"===n[t])},el=function(e,t){var n=t;do{if("undefined"!=typeof ShadowRoot&&n instanceof ShadowRoot&&(n=n.host),eu(e,n)){var r=ea(e,n);if(r[1]>r[2])return!0}n=n.parentNode}while(n&&n!==document.body);return!1},eu=function(e,t){return"v"===e?eo(t,"overflowY"):eo(t,"overflowX")},ea=function(e,t){return"v"===e?[t.scrollTop,t.scrollHeight,t.clientHeight]:[t.scrollLeft,t.scrollWidth,t.clientWidth]},ei=function(e,t,n,r,o){var l,u=(l=window.getComputedStyle(t).direction,"h"===e&&"rtl"===l?-1:1),a=u*r,i=n.target,c=t.contains(i),s=!1,d=a>0,f=0,v=0;do{var p=ea(e,i),m=p[0],h=p[1]-p[2]-u*m;(m||h)&&eu(e,i)&&(f+=h,v+=m),i=i.parentNode}while(!c&&i!==document.body||c&&(t.contains(i)||t===i));return d&&(o&&0===f||!o&&a>f)?s=!0:!d&&(o&&0===v||!o&&-a>v)&&(s=!0),s},ec=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},es=function(e){return[e.deltaX,e.deltaY]},ed=function(e){return e&&"current"in e?e.current:e},ef=0,ev=[],ep=(0,J.L)(Z,function(e){var t=d.useRef([]),n=d.useRef([0,0]),r=d.useRef(),o=d.useState(ef++)[0],l=d.useState(function(){return(0,ee.Ws)()})[0],u=d.useRef(e);d.useEffect(function(){u.current=e},[e]),d.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var t=(0,q.ev)([e.lockRef.current],(e.shards||[]).map(ed),!0).filter(Boolean);return t.forEach(function(e){return e.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),t.forEach(function(e){return e.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var a=d.useCallback(function(e,t){if("touches"in e&&2===e.touches.length)return!u.current.allowPinchZoom;var o,l=ec(e),a=n.current,i="deltaX"in e?e.deltaX:a[0]-l[0],c="deltaY"in e?e.deltaY:a[1]-l[1],s=e.target,d=Math.abs(i)>Math.abs(c)?"h":"v";if("touches"in e&&"h"===d&&"range"===s.type)return!1;var f=el(d,s);if(!f)return!0;if(f?o=d:(o="v"===d?"h":"v",f=el(d,s)),!f)return!1;if(!r.current&&"changedTouches"in e&&(i||c)&&(r.current=o),!o)return!0;var v=r.current||o;return ei(v,t,e,"h"===v?i:c,!0)},[]),i=d.useCallback(function(e){if(ev.length&&ev[ev.length-1]===l){var n="deltaY"in e?es(e):ec(e),r=t.current.filter(function(t){var r;return t.name===e.type&&t.target===e.target&&(r=t.delta)[0]===n[0]&&r[1]===n[1]})[0];if(r&&r.should){e.cancelable&&e.preventDefault();return}if(!r){var o=(u.current.shards||[]).map(ed).filter(Boolean).filter(function(t){return t.contains(e.target)});(o.length>0?a(e,o[0]):!u.current.noIsolation)&&e.cancelable&&e.preventDefault()}}},[]),c=d.useCallback(function(e,n,r,o){var l={name:e,delta:n,target:r,should:o};t.current.push(l),setTimeout(function(){t.current=t.current.filter(function(e){return e!==l})},1)},[]),s=d.useCallback(function(e){n.current=ec(e),r.current=void 0},[]),f=d.useCallback(function(t){c(t.type,es(t),t.target,a(t,e.lockRef.current))},[]),v=d.useCallback(function(t){c(t.type,ec(t),t.target,a(t,e.lockRef.current))},[]);d.useEffect(function(){return ev.push(l),e.setCallbacks({onScrollCapture:f,onWheelCapture:f,onTouchMoveCapture:v}),document.addEventListener("wheel",i,er),document.addEventListener("touchmove",i,er),document.addEventListener("touchstart",s,er),function(){ev=ev.filter(function(e){return e!==l}),document.removeEventListener("wheel",i,er),document.removeEventListener("touchmove",i,er),document.removeEventListener("touchstart",s,er)}},[]);var p=e.removeScrollBar,m=e.inert;return d.createElement(d.Fragment,null,m?d.createElement(l,{styles:"\n  .block-interactivity-".concat(o," {pointer-events: none;}\n  .allow-interactivity-").concat(o," {pointer-events: all;}\n")}):null,p?d.createElement(Q.jp,{gapMode:"margin"}):null)}),em=d.forwardRef(function(e,t){return d.createElement(G,(0,q.pi)({},e,{ref:t,sideCar:ep}))});em.classNames=G.classNames;var eh=n(5478);let eg="Dialog",[eE,eb]=function(e,t=[]){let n=[],r=()=>{let t=n.map(e=>(0,d.createContext)(e));return function(n){let r=(null==n?void 0:n[e])||t;return(0,d.useMemo)(()=>({[`__scope${e}`]:{...n,[e]:r}}),[n,r])}};return r.scopeName=e,[function(t,r){let o=(0,d.createContext)(r),l=n.length;function u(t){let{scope:n,children:r,...u}=t,a=(null==n?void 0:n[e][l])||o,i=(0,d.useMemo)(()=>u,Object.values(u));return(0,d.createElement)(a.Provider,{value:i},r)}return n=[...n,r],u.displayName=t+"Provider",[u,function(n,u){let a=(null==u?void 0:u[e][l])||o,i=(0,d.useContext)(a);if(i)return i;if(void 0!==r)return r;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let r=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return(0,d.useMemo)(()=>({[`__scope${t.scopeName}`]:r}),[r])}};return n.scopeName=t.scopeName,n}(r,...t)]}(eg),[ey,ew]=eE(eg),eC="DialogPortal",[eR,eP]=eE(eC,{forceMount:void 0}),eS="DialogOverlay",ek=(0,d.forwardRef)((e,t)=>{let n=eP(eS,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,l=ew(eS,e.__scopeDialog);return l.modal?(0,d.createElement)(U,{present:r||l.open},(0,d.createElement)(ex,s({},o,{ref:t}))):null}),ex=(0,d.forwardRef)((e,t)=>{let{__scopeDialog:n,...r}=e,o=ew(eS,n);return(0,d.createElement)(em,{as:C,allowPinchZoom:!0,shards:[o.contentRef]},(0,d.createElement)(k.div,s({"data-state":eM(o.open)},r,{ref:t,style:{pointerEvents:"auto",...r.style}})))}),eD="DialogContent",eN=(0,d.forwardRef)((e,t)=>{let n=eP(eD,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,l=ew(eD,e.__scopeDialog);return(0,d.createElement)(U,{present:r||l.open},l.modal?(0,d.createElement)(eO,s({},o,{ref:t})):(0,d.createElement)(eA,s({},o,{ref:t})))}),eO=(0,d.forwardRef)((e,t)=>{let n=ew(eD,e.__scopeDialog),r=(0,d.useRef)(null),o=m(t,n.contentRef,r);return(0,d.useEffect)(()=>{let e=r.current;if(e)return(0,eh.Ry)(e)},[]),(0,d.createElement)(eI,s({},e,{ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:v(e.onCloseAutoFocus,e=>{var t;e.preventDefault(),null===(t=n.triggerRef.current)||void 0===t||t.focus()}),onPointerDownOutside:v(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey;(2===t.button||n)&&e.preventDefault()}),onFocusOutside:v(e.onFocusOutside,e=>e.preventDefault())}))}),eA=(0,d.forwardRef)((e,t)=>{let n=ew(eD,e.__scopeDialog),r=(0,d.useRef)(!1),o=(0,d.useRef)(!1);return(0,d.createElement)(eI,s({},e,{ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var l,u;null===(l=e.onCloseAutoFocus)||void 0===l||l.call(e,t),t.defaultPrevented||(r.current||null===(u=n.triggerRef.current)||void 0===u||u.focus(),t.preventDefault()),r.current=!1,o.current=!1},onInteractOutside:t=>{var l,u;null===(l=e.onInteractOutside)||void 0===l||l.call(e,t),t.defaultPrevented||(r.current=!0,"pointerdown"!==t.detail.originalEvent.type||(o.current=!0));let a=t.target;(null===(u=n.triggerRef.current)||void 0===u?void 0:u.contains(a))&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&o.current&&t.preventDefault()}}))}),eI=(0,d.forwardRef)((e,t)=>{let{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:o,onCloseAutoFocus:l,...u}=e,a=ew(eD,n),i=m(t,(0,d.useRef)(null));return(0,d.useEffect)(()=>{var e,t;let n=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",null!==(e=n[0])&&void 0!==e?e:z()),document.body.insertAdjacentElement("beforeend",null!==(t=n[1])&&void 0!==t?t:z()),B++,()=>{1===B&&document.querySelectorAll("[data-radix-focus-guard]").forEach(e=>e.remove()),B--}},[]),(0,d.createElement)(d.Fragment,null,(0,d.createElement)(L,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:o,onUnmountAutoFocus:l},(0,d.createElement)(N,s({role:"dialog",id:a.contentId,"aria-describedby":a.descriptionId,"aria-labelledby":a.titleId,"data-state":eM(a.open)},u,{ref:i,onDismiss:()=>a.onOpenChange(!1)}))),!1)});function eM(e){return e?"open":"closed"}let[eT,eL]=function(e,t){let n=(0,d.createContext)(t);function r(e){let{children:t,...r}=e,o=(0,d.useMemo)(()=>r,Object.values(r));return(0,d.createElement)(n.Provider,{value:o},t)}return r.displayName=e+"Provider",[r,function(r){let o=(0,d.useContext)(n);if(o)return o;if(void 0!==t)return t;throw Error(`\`${r}\` must be used within \`${e}\``)}]}("DialogTitleWarning",{contentName:eD,titleName:"DialogTitle",docsSlug:"dialog"}),eF=e=>{let{__scopeDialog:t,children:n,open:r,defaultOpen:o,onOpenChange:l,modal:u=!0}=e,a=(0,d.useRef)(null),i=(0,d.useRef)(null),[c=!1,s]=function({prop:e,defaultProp:t,onChange:n=()=>{}}){let[r,o]=function({defaultProp:e,onChange:t}){let n=(0,d.useState)(e),[r]=n,o=(0,d.useRef)(r),l=y(t);return(0,d.useEffect)(()=>{o.current!==r&&(l(r),o.current=r)},[r,o,l]),n}({defaultProp:t,onChange:n}),l=void 0!==e,u=l?e:r,a=y(n);return[u,(0,d.useCallback)(t=>{if(l){let n="function"==typeof t?t(e):t;n!==e&&a(n)}else o(t)},[l,e,o,a])]}({prop:r,defaultProp:o,onChange:l});return(0,d.createElement)(ey,{scope:t,triggerRef:a,contentRef:i,contentId:b(),titleId:b(),descriptionId:b(),open:c,onOpenChange:s,onOpenToggle:(0,d.useCallback)(()=>s(e=>!e),[s]),modal:u},n)},e_=e=>{let{__scopeDialog:t,forceMount:n,children:r,container:o}=e,l=ew(eC,t);return(0,d.createElement)(eR,{scope:t,forceMount:n},d.Children.map(r,e=>(0,d.createElement)(U,{present:n||l.open},(0,d.createElement)(K,{asChild:!0,container:o},e))))};var ej='[cmdk-group=""]',e$='[cmdk-group-items=""]',eW='[cmdk-item=""]',eK=`${eW}:not([aria-disabled="true"])`,eU="cmdk-item-select",eV="data-value",eB=(e,t,n)=>{var r;return r=e,function e(t,n,r,o,c,s,d){if(s===n.length)return c===t.length?1:.99;var f=`${c},${s}`;if(void 0!==d[f])return d[f];for(var v,p,m,h,g=o.charAt(s),E=r.indexOf(g,c),b=0;E>=0;)(v=e(t,n,r,o,E+1,s+1,d))>b&&(E===c?v*=1:l.test(t.charAt(E-1))?(v*=.8,(m=t.slice(c,E-1).match(u))&&c>0&&(v*=Math.pow(.999,m.length))):a.test(t.charAt(E-1))?(v*=.9,(h=t.slice(c,E-1).match(i))&&c>0&&(v*=Math.pow(.999,h.length))):(v*=.17,c>0&&(v*=Math.pow(.999,E-c))),t.charAt(E)!==n.charAt(s)&&(v*=.9999)),(v<.1&&r.charAt(E-1)===o.charAt(s+1)||o.charAt(s+1)===o.charAt(s)&&r.charAt(E-1)!==o.charAt(s))&&.1*(p=e(t,n,r,o,E+1,s+2,d))>v&&(v=.1*p),v>b&&(b=v),E=r.indexOf(g,E+1);return d[f]=b,b}(r=n&&n.length>0?`${r+" "+n.join(" ")}`:r,t,c(r),c(t),0,0,{})},ez=d.createContext(void 0),eq=()=>d.useContext(ez),eY=d.createContext(void 0),eX=()=>d.useContext(eY),eZ=d.createContext(void 0),eH=d.forwardRef((e,t)=>{let n=e8(()=>{var t,n;return{search:"",value:null!=(n=null!=(t=e.value)?t:e.defaultValue)?n:"",filtered:{count:0,items:new Map,groups:new Set}}}),r=e8(()=>new Set),o=e8(()=>new Map),l=e8(()=>new Map),u=e8(()=>new Set),a=e2(e),{label:i,children:c,value:s,onValueChange:f,filter:v,shouldFilter:p,loop:m,disablePointerSelection:h=!1,vimBindings:g=!0,...E}=e,b=d.useId(),y=d.useId(),w=d.useId(),C=d.useRef(null),R=te();e5(()=>{if(void 0!==s){let e=s.trim();n.current.value=e,P.emit()}},[s]),e5(()=>{R(6,A)},[]);let P=d.useMemo(()=>({subscribe:e=>(u.current.add(e),()=>u.current.delete(e)),snapshot:()=>n.current,setState:(e,t,r)=>{var o,l,u;if(!Object.is(n.current[e],t)){if(n.current[e]=t,"search"===e)O(),D(),R(1,N);else if("value"===e&&(r||R(5,A),(null==(o=a.current)?void 0:o.value)!==void 0)){null==(u=(l=a.current).onValueChange)||u.call(l,null!=t?t:"");return}P.emit()}},emit:()=>{u.current.forEach(e=>e())}}),[]),S=d.useMemo(()=>({value:(e,t,r)=>{var o;t!==(null==(o=l.current.get(e))?void 0:o.value)&&(l.current.set(e,{value:t,keywords:r}),n.current.filtered.items.set(e,x(t,r)),R(2,()=>{D(),P.emit()}))},item:(e,t)=>(r.current.add(e),t&&(o.current.has(t)?o.current.get(t).add(e):o.current.set(t,new Set([e]))),R(3,()=>{O(),D(),n.current.value||N(),P.emit()}),()=>{l.current.delete(e),r.current.delete(e),n.current.filtered.items.delete(e);let t=I();R(4,()=>{O(),(null==t?void 0:t.getAttribute("id"))===e&&N(),P.emit()})}),group:e=>(o.current.has(e)||o.current.set(e,new Set),()=>{l.current.delete(e),o.current.delete(e)}),filter:()=>a.current.shouldFilter,label:i||e["aria-label"],disablePointerSelection:h,listId:b,inputId:w,labelId:y,listInnerRef:C}),[]);function x(e,t){var r,o;let l=null!=(o=null==(r=a.current)?void 0:r.filter)?o:eB;return e?l(e,n.current.search,t):0}function D(){if(!n.current.search||!1===a.current.shouldFilter)return;let e=n.current.filtered.items,t=[];n.current.filtered.groups.forEach(n=>{let r=o.current.get(n),l=0;r.forEach(t=>{l=Math.max(e.get(t),l)}),t.push([n,l])});let r=C.current;M().sort((t,n)=>{var r,o;let l=t.getAttribute("id"),u=n.getAttribute("id");return(null!=(r=e.get(u))?r:0)-(null!=(o=e.get(l))?o:0)}).forEach(e=>{let t=e.closest(e$);t?t.appendChild(e.parentElement===t?e:e.closest(`${e$} > *`)):r.appendChild(e.parentElement===r?e:e.closest(`${e$} > *`))}),t.sort((e,t)=>t[1]-e[1]).forEach(e=>{let t=C.current.querySelector(`${ej}[${eV}="${encodeURIComponent(e[0])}"]`);null==t||t.parentElement.appendChild(t)})}function N(){let e=M().find(e=>"true"!==e.getAttribute("aria-disabled")),t=null==e?void 0:e.getAttribute(eV);P.setState("value",t||void 0)}function O(){var e,t,u,i;if(!n.current.search||!1===a.current.shouldFilter){n.current.filtered.count=r.current.size;return}n.current.filtered.groups=new Set;let c=0;for(let o of r.current){let r=x(null!=(t=null==(e=l.current.get(o))?void 0:e.value)?t:"",null!=(i=null==(u=l.current.get(o))?void 0:u.keywords)?i:[]);n.current.filtered.items.set(o,r),r>0&&c++}for(let[e,t]of o.current)for(let r of t)if(n.current.filtered.items.get(r)>0){n.current.filtered.groups.add(e);break}n.current.filtered.count=c}function A(){var e,t,n;let r=I();r&&((null==(e=r.parentElement)?void 0:e.firstChild)===r&&(null==(n=null==(t=r.closest(ej))?void 0:t.querySelector('[cmdk-group-heading=""]'))||n.scrollIntoView({block:"nearest"})),r.scrollIntoView({block:"nearest"}))}function I(){var e;return null==(e=C.current)?void 0:e.querySelector(`${eW}[aria-selected="true"]`)}function M(){var e;return Array.from(null==(e=C.current)?void 0:e.querySelectorAll(eK))}function T(e){let t=M()[e];t&&P.setState("value",t.getAttribute(eV))}function L(e){var t;let n=I(),r=M(),o=r.findIndex(e=>e===n),l=r[o+e];null!=(t=a.current)&&t.loop&&(l=o+e<0?r[r.length-1]:o+e===r.length?r[0]:r[o+e]),l&&P.setState("value",l.getAttribute(eV))}function F(e){let t=I(),n=null==t?void 0:t.closest(ej),r;for(;n&&!r;)r=null==(n=e>0?function(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return n;n=n.nextElementSibling}}(n,ej):function(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return n;n=n.previousElementSibling}}(n,ej))?void 0:n.querySelector(eK);r?P.setState("value",r.getAttribute(eV)):L(e)}let _=()=>T(M().length-1),j=e=>{e.preventDefault(),e.metaKey?_():e.altKey?F(1):L(1)},$=e=>{e.preventDefault(),e.metaKey?T(0):e.altKey?F(-1):L(-1)};return d.createElement(k.div,{ref:t,tabIndex:-1,...E,"cmdk-root":"",onKeyDown:e=>{var t;if(null==(t=E.onKeyDown)||t.call(E,e),!e.defaultPrevented)switch(e.key){case"n":case"j":g&&e.ctrlKey&&j(e);break;case"ArrowDown":j(e);break;case"p":case"k":g&&e.ctrlKey&&$(e);break;case"ArrowUp":$(e);break;case"Home":e.preventDefault(),T(0);break;case"End":e.preventDefault(),_();break;case"Enter":if(!e.nativeEvent.isComposing&&229!==e.keyCode){e.preventDefault();let t=I();if(t){let e=new Event(eU);t.dispatchEvent(e)}}}}},d.createElement("label",{"cmdk-label":"",htmlFor:S.inputId,id:S.labelId,style:tn},i),tt(e,e=>d.createElement(eY.Provider,{value:P},d.createElement(ez.Provider,{value:S},e))))}),eG=d.forwardRef((e,t)=>{var n,r;let o=d.useId(),l=d.useRef(null),u=d.useContext(eZ),a=eq(),i=e2(e),c=null!=(r=null==(n=i.current)?void 0:n.forceMount)?r:null==u?void 0:u.forceMount;e5(()=>{if(!c)return a.item(o,null==u?void 0:u.id)},[c]);let s=e4(o,l,[e.value,e.children,l],e.keywords),f=eX(),v=e6(e=>e.value&&e.value===s.current),p=e6(e=>!!c||!1===a.filter()||!e.search||e.filtered.items.get(o)>0);function m(){var e,t;h(),null==(t=(e=i.current).onSelect)||t.call(e,s.current)}function h(){f.setState("value",s.current,!0)}if(d.useEffect(()=>{let t=l.current;if(!(!t||e.disabled))return t.addEventListener(eU,m),()=>t.removeEventListener(eU,m)},[p,e.onSelect,e.disabled]),!p)return null;let{disabled:g,value:E,onSelect:b,forceMount:y,keywords:w,...C}=e;return d.createElement(k.div,{ref:e3([l,t]),...C,id:o,"cmdk-item":"",role:"option","aria-disabled":!!g,"aria-selected":!!v,"data-disabled":!!g,"data-selected":!!v,onPointerMove:g||a.disablePointerSelection?void 0:h,onClick:g?void 0:m},e.children)}),eJ=d.forwardRef((e,t)=>{let{heading:n,children:r,forceMount:o,...l}=e,u=d.useId(),a=d.useRef(null),i=d.useRef(null),c=d.useId(),s=eq(),f=e6(e=>!!o||!1===s.filter()||!e.search||e.filtered.groups.has(u));e5(()=>s.group(u),[]),e4(u,a,[e.value,e.heading,i]);let v=d.useMemo(()=>({id:u,forceMount:o}),[o]);return d.createElement(k.div,{ref:e3([a,t]),...l,"cmdk-group":"",role:"presentation",hidden:!f||void 0},n&&d.createElement("div",{ref:i,"cmdk-group-heading":"","aria-hidden":!0,id:c},n),tt(e,e=>d.createElement("div",{"cmdk-group-items":"",role:"group","aria-labelledby":n?c:void 0},d.createElement(eZ.Provider,{value:v},e))))}),eQ=d.forwardRef((e,t)=>{let{alwaysRender:n,...r}=e,o=d.useRef(null),l=e6(e=>!e.search);return n||l?d.createElement(k.div,{ref:e3([o,t]),...r,"cmdk-separator":"",role:"separator"}):null}),e0=d.forwardRef((e,t)=>{let{onValueChange:n,...r}=e,o=null!=e.value,l=eX(),u=e6(e=>e.search),a=e6(e=>e.value),i=eq(),c=d.useMemo(()=>{var e;let t=null==(e=i.listInnerRef.current)?void 0:e.querySelector(`${eW}[${eV}="${encodeURIComponent(a)}"]`);return null==t?void 0:t.getAttribute("id")},[]);return d.useEffect(()=>{null!=e.value&&l.setState("search",e.value)},[e.value]),d.createElement(k.input,{ref:t,...r,"cmdk-input":"",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"aria-autocomplete":"list",role:"combobox","aria-expanded":!0,"aria-controls":i.listId,"aria-labelledby":i.labelId,"aria-activedescendant":c,id:i.inputId,type:"text",value:o?e.value:u,onChange:e=>{o||l.setState("search",e.target.value),null==n||n(e.target.value)}})}),e1=d.forwardRef((e,t)=>{let{children:n,label:r="Suggestions",...o}=e,l=d.useRef(null),u=d.useRef(null),a=eq();return d.useEffect(()=>{if(u.current&&l.current){let e=u.current,t=l.current,n,r=new ResizeObserver(()=>{n=requestAnimationFrame(()=>{let n=e.offsetHeight;t.style.setProperty("--cmdk-list-height",n.toFixed(1)+"px")})});return r.observe(e),()=>{cancelAnimationFrame(n),r.unobserve(e)}}},[]),d.createElement(k.div,{ref:e3([l,t]),...o,"cmdk-list":"",role:"listbox","aria-label":r,id:a.listId},tt(e,e=>d.createElement("div",{ref:e3([u,a.listInnerRef]),"cmdk-list-sizer":""},e)))}),e9=d.forwardRef((e,t)=>{let{open:n,onOpenChange:r,overlayClassName:o,contentClassName:l,container:u,...a}=e;return d.createElement(eF,{open:n,onOpenChange:r},d.createElement(e_,{container:u},d.createElement(ek,{"cmdk-overlay":"",className:o}),d.createElement(eN,{"aria-label":e.label,"cmdk-dialog":"",className:l},d.createElement(eH,{ref:t,...a}))))}),e7=Object.assign(eH,{List:e1,Item:eG,Input:e0,Group:eJ,Separator:eQ,Dialog:e9,Empty:d.forwardRef((e,t)=>e6(e=>0===e.filtered.count)?d.createElement(k.div,{ref:t,...e,"cmdk-empty":"",role:"presentation"}):null),Loading:d.forwardRef((e,t)=>{let{progress:n,children:r,label:o="Loading...",...l}=e;return d.createElement(k.div,{ref:t,...l,"cmdk-loading":"",role:"progressbar","aria-valuenow":n,"aria-valuemin":0,"aria-valuemax":100,"aria-label":o},tt(e,e=>d.createElement("div",{"aria-hidden":!0},e)))})});function e2(e){let t=d.useRef(e);return e5(()=>{t.current=e}),t}var e5="undefined"==typeof window?d.useEffect:d.useLayoutEffect;function e8(e){let t=d.useRef();return void 0===t.current&&(t.current=e()),t}function e3(e){return t=>{e.forEach(e=>{"function"==typeof e?e(t):null!=e&&(e.current=t)})}}function e6(e){let t=eX(),n=()=>e(t.snapshot());return d.useSyncExternalStore(t.subscribe,n,n)}function e4(e,t,n,r=[]){let o=d.useRef(),l=eq();return e5(()=>{var u;let a=(()=>{var e;for(let t of n){if("string"==typeof t)return t.trim();if("object"==typeof t&&"current"in t)return t.current?null==(e=t.current.textContent)?void 0:e.trim():o.current}})(),i=r.map(e=>e.trim());l.value(e,a,i),null==(u=t.current)||u.setAttribute(eV,a),o.current=a}),o}var te=()=>{let[e,t]=d.useState(),n=e8(()=>new Map);return e5(()=>{n.current.forEach(e=>e()),n.current=new Map},[e]),(e,r)=>{n.current.set(e,r),t({})}};function tt({asChild:e,children:t},n){let r;return e&&d.isValidElement(t)?d.cloneElement("function"==typeof(r=t.type)?r(t.props):"render"in r?r.render(t.props):t,{ref:t.ref},n(t.props.children)):n(t)}var tn={position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"}}}]);