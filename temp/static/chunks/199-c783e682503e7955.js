(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[199],{10407:function(e,r,n){"use strict";n.d(r,{Z:function(){return t}});let t=(0,n(79205).Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},40519:function(e,r,n){"use strict";n.d(r,{Z:function(){return t}});let t=(0,n(79205).Z)("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]])},21047:function(e,r,n){"use strict";n.d(r,{Z:function(){return t}});let t=(0,n(79205).Z)("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]])},99397:function(e,r,n){"use strict";n.d(r,{Z:function(){return t}});let t=(0,n(79205).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},73716:function(e){e.exports={style:{fontFamily:"'__geistMono_c3aa02', '__geistMono_Fallback_c3aa02'"},className:"__className_c3aa02",variable:"__variable_c3aa02"}},86157:function(e){e.exports={style:{fontFamily:"'__geistSans_1e4310', '__geistSans_Fallback_1e4310'"},className:"__className_1e4310",variable:"__variable_1e4310"}},83412:function(e,r,n){"use strict";n.d(r,{oC:function(){return rd},VY:function(){return rl},ZA:function(){return ri},ck:function(){return rs},wU:function(){return rv},__:function(){return rc},Uv:function(){return ru},Ee:function(){return rf},Rk:function(){return rp},fC:function(){return ro},Z0:function(){return rm},Tr:function(){return rh},tu:function(){return rw},fF:function(){return rg},xz:function(){return ra}});var t=n(2265),o=n(6741),a=n(98575),u=n(73966),l=n(80886),i=n(66840),c=n(29863),s=n(29114),d=n(15278),f=n(86097),p=n(99103),v=n(99255),m=n(19961),h=n(83832),g=n(71599),w=n(57437),x=n(26606),M="rovingFocusGroup.onEntryFocus",y={bubbles:!1,cancelable:!0},b="RovingFocusGroup",[_,C,R]=(0,c.B)(b),[j,D]=function(e,r=[]){let n=[],o=()=>{let r=n.map(e=>t.createContext(e));return function(n){let o=n?.[e]||r;return t.useMemo(()=>({[`__scope${e}`]:{...n,[e]:o}}),[n,o])}};return o.scopeName=e,[function(r,o){let a=t.createContext(o),u=n.length;function l(r){let{scope:n,children:o,...l}=r,i=n?.[e][u]||a,c=t.useMemo(()=>l,Object.values(l));return(0,w.jsx)(i.Provider,{value:c,children:o})}return n=[...n,o],l.displayName=r+"Provider",[l,function(n,l){let i=l?.[e][u]||a,c=t.useContext(i);if(c)return c;if(void 0!==o)return o;throw Error(`\`${n}\` must be used within \`${r}\``)}]},function(...e){let r=e[0];if(1===e.length)return r;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=n.reduce((r,{useScope:n,scopeName:t})=>{let o=n(e)[`__scope${t}`];return{...r,...o}},{});return t.useMemo(()=>({[`__scope${r.scopeName}`]:o}),[o])}};return n.scopeName=r.scopeName,n}(o,...r)]}(b,[R]),[k,I]=j(b),E=t.forwardRef((e,r)=>(0,w.jsx)(_.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,w.jsx)(_.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,w.jsx)(P,{...e,ref:r})})}));E.displayName=b;var P=t.forwardRef((e,r)=>{let{__scopeRovingFocusGroup:n,orientation:u,loop:c=!1,dir:d,currentTabStopId:f,defaultCurrentTabStopId:p,onCurrentTabStopIdChange:v,onEntryFocus:m,preventScrollOnEntryFocus:h=!1,...g}=e,b=t.useRef(null),_=(0,a.e)(r,b),R=(0,s.gm)(d),[j=null,D]=(0,l.T)({prop:f,defaultProp:p,onChange:v}),[I,E]=t.useState(!1),P=(0,x.W)(m),N=C(n),T=t.useRef(!1),[F,O]=t.useState(0);return t.useEffect(()=>{let e=b.current;if(e)return e.addEventListener(M,P),()=>e.removeEventListener(M,P)},[P]),(0,w.jsx)(k,{scope:n,orientation:u,dir:R,loop:c,currentTabStopId:j,onItemFocus:t.useCallback(e=>D(e),[D]),onItemShiftTab:t.useCallback(()=>E(!0),[]),onFocusableItemAdd:t.useCallback(()=>O(e=>e+1),[]),onFocusableItemRemove:t.useCallback(()=>O(e=>e-1),[]),children:(0,w.jsx)(i.WV.div,{tabIndex:I||0===F?-1:0,"data-orientation":u,...g,ref:_,style:{outline:"none",...e.style},onMouseDown:(0,o.M)(e.onMouseDown,()=>{T.current=!0}),onFocus:(0,o.M)(e.onFocus,e=>{let r=!T.current;if(e.target===e.currentTarget&&r&&!I){let r=new CustomEvent(M,y);if(e.currentTarget.dispatchEvent(r),!r.defaultPrevented){let e=N().filter(e=>e.focusable);S([e.find(e=>e.active),e.find(e=>e.id===j),...e].filter(Boolean).map(e=>e.ref.current),h)}}T.current=!1}),onBlur:(0,o.M)(e.onBlur,()=>E(!1))})})}),N="RovingFocusGroupItem",T=t.forwardRef((e,r)=>{let{__scopeRovingFocusGroup:n,focusable:a=!0,active:u=!1,tabStopId:l,...c}=e,s=(0,v.M)(),d=l||s,f=I(N,n),p=f.currentTabStopId===d,m=C(n),{onFocusableItemAdd:h,onFocusableItemRemove:g}=f;return t.useEffect(()=>{if(a)return h(),()=>g()},[a,h,g]),(0,w.jsx)(_.ItemSlot,{scope:n,id:d,focusable:a,active:u,children:(0,w.jsx)(i.WV.span,{tabIndex:p?0:-1,"data-orientation":f.orientation,...c,ref:r,onMouseDown:(0,o.M)(e.onMouseDown,e=>{a?f.onItemFocus(d):e.preventDefault()}),onFocus:(0,o.M)(e.onFocus,()=>f.onItemFocus(d)),onKeyDown:(0,o.M)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){f.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let r=function(e,r,n){var t;let o=(t=e.key,"rtl"!==n?t:"ArrowLeft"===t?"ArrowRight":"ArrowRight"===t?"ArrowLeft":t);if(!("vertical"===r&&["ArrowLeft","ArrowRight"].includes(o))&&!("horizontal"===r&&["ArrowUp","ArrowDown"].includes(o)))return F[o]}(e,f.orientation,f.dir);if(void 0!==r){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let o=m().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===r)o.reverse();else if("prev"===r||"next"===r){var n,t;"prev"===r&&o.reverse();let a=o.indexOf(e.currentTarget);o=f.loop?(n=o,t=a+1,n.map((e,r)=>n[(t+r)%n.length])):o.slice(a+1)}setTimeout(()=>S(o))}})})})});T.displayName=N;var F={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function S(e){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.activeElement;for(let t of e)if(t===n||(t.focus({preventScroll:r}),document.activeElement!==n))return}var O=n(37053),A=n(5478),L=n(60703),K=["Enter"," "],V=["ArrowUp","PageDown","End"],G=["ArrowDown","PageUp","Home",...V],W={ltr:[...K,"ArrowRight"],rtl:[...K,"ArrowLeft"]},U={ltr:["ArrowLeft"],rtl:["ArrowRight"]},Z="Menu",[B,z,X]=(0,c.B)(Z),[$,Y]=(0,u.b)(Z,[X,m.D7,D]),H=(0,m.D7)(),q=D(),[J,Q]=$(Z),[ee,er]=$(Z),en=e=>{let{__scopeMenu:r,open:n=!1,children:o,dir:a,onOpenChange:u,modal:l=!0}=e,i=H(r),[c,d]=t.useState(null),f=t.useRef(!1),p=(0,x.W)(u),v=(0,s.gm)(a);return t.useEffect(()=>{let e=()=>{f.current=!0,document.addEventListener("pointerdown",r,{capture:!0,once:!0}),document.addEventListener("pointermove",r,{capture:!0,once:!0})},r=()=>f.current=!1;return document.addEventListener("keydown",e,{capture:!0}),()=>{document.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("pointerdown",r,{capture:!0}),document.removeEventListener("pointermove",r,{capture:!0})}},[]),(0,w.jsx)(m.fC,{...i,children:(0,w.jsx)(J,{scope:r,open:n,onOpenChange:p,content:c,onContentChange:d,children:(0,w.jsx)(ee,{scope:r,onClose:t.useCallback(()=>p(!1),[p]),isUsingKeyboardRef:f,dir:v,modal:l,children:o})})})};en.displayName=Z;var et=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e,o=H(n);return(0,w.jsx)(m.ee,{...o,...t,ref:r})});et.displayName="MenuAnchor";var eo="MenuPortal",[ea,eu]=$(eo,{forceMount:void 0}),el=e=>{let{__scopeMenu:r,forceMount:n,children:t,container:o}=e,a=Q(eo,r);return(0,w.jsx)(ea,{scope:r,forceMount:n,children:(0,w.jsx)(g.z,{present:n||a.open,children:(0,w.jsx)(h.h,{asChild:!0,container:o,children:t})})})};el.displayName=eo;var ei="MenuContent",[ec,es]=$(ei),ed=t.forwardRef((e,r)=>{let n=eu(ei,e.__scopeMenu),{forceMount:t=n.forceMount,...o}=e,a=Q(ei,e.__scopeMenu),u=er(ei,e.__scopeMenu);return(0,w.jsx)(B.Provider,{scope:e.__scopeMenu,children:(0,w.jsx)(g.z,{present:t||a.open,children:(0,w.jsx)(B.Slot,{scope:e.__scopeMenu,children:u.modal?(0,w.jsx)(ef,{...o,ref:r}):(0,w.jsx)(ep,{...o,ref:r})})})})}),ef=t.forwardRef((e,r)=>{let n=Q(ei,e.__scopeMenu),u=t.useRef(null),l=(0,a.e)(r,u);return t.useEffect(()=>{let e=u.current;if(e)return(0,A.Ry)(e)},[]),(0,w.jsx)(ev,{...e,ref:l,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:(0,o.M)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)})}),ep=t.forwardRef((e,r)=>{let n=Q(ei,e.__scopeMenu);return(0,w.jsx)(ev,{...e,ref:r,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)})}),ev=t.forwardRef((e,r)=>{let{__scopeMenu:n,loop:u=!1,trapFocus:l,onOpenAutoFocus:i,onCloseAutoFocus:c,disableOutsidePointerEvents:s,onEntryFocus:v,onEscapeKeyDown:h,onPointerDownOutside:g,onFocusOutside:x,onInteractOutside:M,onDismiss:y,disableOutsideScroll:b,..._}=e,C=Q(ei,n),R=er(ei,n),j=H(n),D=q(n),k=z(n),[I,P]=t.useState(null),N=t.useRef(null),T=(0,a.e)(r,N,C.onContentChange),F=t.useRef(0),S=t.useRef(""),A=t.useRef(0),K=t.useRef(null),W=t.useRef("right"),U=t.useRef(0),Z=b?L.Z:t.Fragment,B=b?{as:O.g7,allowPinchZoom:!0}:void 0,X=e=>{var r,n;let t=S.current+e,o=k().filter(e=>!e.disabled),a=document.activeElement,u=null===(r=o.find(e=>e.ref.current===a))||void 0===r?void 0:r.textValue,l=function(e,r,n){var t;let o=r.length>1&&Array.from(r).every(e=>e===r[0])?r[0]:r,a=(t=Math.max(n?e.indexOf(n):-1,0),e.map((r,n)=>e[(t+n)%e.length]));1===o.length&&(a=a.filter(e=>e!==n));let u=a.find(e=>e.toLowerCase().startsWith(o.toLowerCase()));return u!==n?u:void 0}(o.map(e=>e.textValue),t,u),i=null===(n=o.find(e=>e.textValue===l))||void 0===n?void 0:n.ref.current;!function e(r){S.current=r,window.clearTimeout(F.current),""!==r&&(F.current=window.setTimeout(()=>e(""),1e3))}(t),i&&setTimeout(()=>i.focus())};t.useEffect(()=>()=>window.clearTimeout(F.current),[]),(0,f.EW)();let $=t.useCallback(e=>{var r,n,t;return W.current===(null===(r=K.current)||void 0===r?void 0:r.side)&&!!(t=null===(n=K.current)||void 0===n?void 0:n.area)&&function(e,r){let{x:n,y:t}=e,o=!1;for(let e=0,a=r.length-1;e<r.length;a=e++){let u=r[e].x,l=r[e].y,i=r[a].x,c=r[a].y;l>t!=c>t&&n<(i-u)*(t-l)/(c-l)+u&&(o=!o)}return o}({x:e.clientX,y:e.clientY},t)},[]);return(0,w.jsx)(ec,{scope:n,searchRef:S,onItemEnter:t.useCallback(e=>{$(e)&&e.preventDefault()},[$]),onItemLeave:t.useCallback(e=>{var r;$(e)||(null===(r=N.current)||void 0===r||r.focus(),P(null))},[$]),onTriggerLeave:t.useCallback(e=>{$(e)&&e.preventDefault()},[$]),pointerGraceTimerRef:A,onPointerGraceIntentChange:t.useCallback(e=>{K.current=e},[]),children:(0,w.jsx)(Z,{...B,children:(0,w.jsx)(p.M,{asChild:!0,trapped:l,onMountAutoFocus:(0,o.M)(i,e=>{var r;e.preventDefault(),null===(r=N.current)||void 0===r||r.focus({preventScroll:!0})}),onUnmountAutoFocus:c,children:(0,w.jsx)(d.XB,{asChild:!0,disableOutsidePointerEvents:s,onEscapeKeyDown:h,onPointerDownOutside:g,onFocusOutside:x,onInteractOutside:M,onDismiss:y,children:(0,w.jsx)(E,{asChild:!0,...D,dir:R.dir,orientation:"vertical",loop:u,currentTabStopId:I,onCurrentTabStopIdChange:P,onEntryFocus:(0,o.M)(v,e=>{R.isUsingKeyboardRef.current||e.preventDefault()}),preventScrollOnEntryFocus:!0,children:(0,w.jsx)(m.VY,{role:"menu","aria-orientation":"vertical","data-state":eW(C.open),"data-radix-menu-content":"",dir:R.dir,...j,..._,ref:T,style:{outline:"none",..._.style},onKeyDown:(0,o.M)(_.onKeyDown,e=>{let r=e.target.closest("[data-radix-menu-content]")===e.currentTarget,n=e.ctrlKey||e.altKey||e.metaKey,t=1===e.key.length;r&&("Tab"===e.key&&e.preventDefault(),!n&&t&&X(e.key));let o=N.current;if(e.target!==o||!G.includes(e.key))return;e.preventDefault();let a=k().filter(e=>!e.disabled).map(e=>e.ref.current);V.includes(e.key)&&a.reverse(),function(e){let r=document.activeElement;for(let n of e)if(n===r||(n.focus(),document.activeElement!==r))return}(a)}),onBlur:(0,o.M)(e.onBlur,e=>{e.currentTarget.contains(e.target)||(window.clearTimeout(F.current),S.current="")}),onPointerMove:(0,o.M)(e.onPointerMove,eB(e=>{let r=e.target,n=U.current!==e.clientX;if(e.currentTarget.contains(r)&&n){let r=e.clientX>U.current?"right":"left";W.current=r,U.current=e.clientX}}))})})})})})})});ed.displayName=ei;var em=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e;return(0,w.jsx)(i.WV.div,{role:"group",...t,ref:r})});em.displayName="MenuGroup";var eh=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e;return(0,w.jsx)(i.WV.div,{...t,ref:r})});eh.displayName="MenuLabel";var eg="MenuItem",ew="menu.itemSelect",ex=t.forwardRef((e,r)=>{let{disabled:n=!1,onSelect:u,...l}=e,c=t.useRef(null),s=er(eg,e.__scopeMenu),d=es(eg,e.__scopeMenu),f=(0,a.e)(r,c),p=t.useRef(!1);return(0,w.jsx)(eM,{...l,ref:f,disabled:n,onClick:(0,o.M)(e.onClick,()=>{let e=c.current;if(!n&&e){let r=new CustomEvent(ew,{bubbles:!0,cancelable:!0});e.addEventListener(ew,e=>null==u?void 0:u(e),{once:!0}),(0,i.jH)(e,r),r.defaultPrevented?p.current=!1:s.onClose()}}),onPointerDown:r=>{var n;null===(n=e.onPointerDown)||void 0===n||n.call(e,r),p.current=!0},onPointerUp:(0,o.M)(e.onPointerUp,e=>{var r;p.current||null===(r=e.currentTarget)||void 0===r||r.click()}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{let r=""!==d.searchRef.current;!n&&(!r||" "!==e.key)&&K.includes(e.key)&&(e.currentTarget.click(),e.preventDefault())})})});ex.displayName=eg;var eM=t.forwardRef((e,r)=>{let{__scopeMenu:n,disabled:u=!1,textValue:l,...c}=e,s=es(eg,n),d=q(n),f=t.useRef(null),p=(0,a.e)(r,f),[v,m]=t.useState(!1),[h,g]=t.useState("");return t.useEffect(()=>{let e=f.current;if(e){var r;g((null!==(r=e.textContent)&&void 0!==r?r:"").trim())}},[c.children]),(0,w.jsx)(B.ItemSlot,{scope:n,disabled:u,textValue:null!=l?l:h,children:(0,w.jsx)(T,{asChild:!0,...d,focusable:!u,children:(0,w.jsx)(i.WV.div,{role:"menuitem","data-highlighted":v?"":void 0,"aria-disabled":u||void 0,"data-disabled":u?"":void 0,...c,ref:p,onPointerMove:(0,o.M)(e.onPointerMove,eB(e=>{u?s.onItemLeave(e):(s.onItemEnter(e),e.defaultPrevented||e.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:(0,o.M)(e.onPointerLeave,eB(e=>s.onItemLeave(e))),onFocus:(0,o.M)(e.onFocus,()=>m(!0)),onBlur:(0,o.M)(e.onBlur,()=>m(!1))})})})}),ey=t.forwardRef((e,r)=>{let{checked:n=!1,onCheckedChange:t,...a}=e;return(0,w.jsx)(eI,{scope:e.__scopeMenu,checked:n,children:(0,w.jsx)(ex,{role:"menuitemcheckbox","aria-checked":eU(n)?"mixed":n,...a,ref:r,"data-state":eZ(n),onSelect:(0,o.M)(a.onSelect,()=>null==t?void 0:t(!!eU(n)||!n),{checkForDefaultPrevented:!1})})})});ey.displayName="MenuCheckboxItem";var eb="MenuRadioGroup",[e_,eC]=$(eb,{value:void 0,onValueChange:()=>{}}),eR=t.forwardRef((e,r)=>{let{value:n,onValueChange:t,...o}=e,a=(0,x.W)(t);return(0,w.jsx)(e_,{scope:e.__scopeMenu,value:n,onValueChange:a,children:(0,w.jsx)(em,{...o,ref:r})})});eR.displayName=eb;var ej="MenuRadioItem",eD=t.forwardRef((e,r)=>{let{value:n,...t}=e,a=eC(ej,e.__scopeMenu),u=n===a.value;return(0,w.jsx)(eI,{scope:e.__scopeMenu,checked:u,children:(0,w.jsx)(ex,{role:"menuitemradio","aria-checked":u,...t,ref:r,"data-state":eZ(u),onSelect:(0,o.M)(t.onSelect,()=>{var e;return null===(e=a.onValueChange)||void 0===e?void 0:e.call(a,n)},{checkForDefaultPrevented:!1})})})});eD.displayName=ej;var ek="MenuItemIndicator",[eI,eE]=$(ek,{checked:!1}),eP=t.forwardRef((e,r)=>{let{__scopeMenu:n,forceMount:t,...o}=e,a=eE(ek,n);return(0,w.jsx)(g.z,{present:t||eU(a.checked)||!0===a.checked,children:(0,w.jsx)(i.WV.span,{...o,ref:r,"data-state":eZ(a.checked)})})});eP.displayName=ek;var eN=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e;return(0,w.jsx)(i.WV.div,{role:"separator","aria-orientation":"horizontal",...t,ref:r})});eN.displayName="MenuSeparator";var eT=t.forwardRef((e,r)=>{let{__scopeMenu:n,...t}=e,o=H(n);return(0,w.jsx)(m.Eh,{...o,...t,ref:r})});eT.displayName="MenuArrow";var eF="MenuSub",[eS,eO]=$(eF),eA=e=>{let{__scopeMenu:r,children:n,open:o=!1,onOpenChange:a}=e,u=Q(eF,r),l=H(r),[i,c]=t.useState(null),[s,d]=t.useState(null),f=(0,x.W)(a);return t.useEffect(()=>(!1===u.open&&f(!1),()=>f(!1)),[u.open,f]),(0,w.jsx)(m.fC,{...l,children:(0,w.jsx)(J,{scope:r,open:o,onOpenChange:f,content:s,onContentChange:d,children:(0,w.jsx)(eS,{scope:r,contentId:(0,v.M)(),triggerId:(0,v.M)(),trigger:i,onTriggerChange:c,children:n})})})};eA.displayName=eF;var eL="MenuSubTrigger",eK=t.forwardRef((e,r)=>{let n=Q(eL,e.__scopeMenu),u=er(eL,e.__scopeMenu),l=eO(eL,e.__scopeMenu),i=es(eL,e.__scopeMenu),c=t.useRef(null),{pointerGraceTimerRef:s,onPointerGraceIntentChange:d}=i,f={__scopeMenu:e.__scopeMenu},p=t.useCallback(()=>{c.current&&window.clearTimeout(c.current),c.current=null},[]);return t.useEffect(()=>p,[p]),t.useEffect(()=>{let e=s.current;return()=>{window.clearTimeout(e),d(null)}},[s,d]),(0,w.jsx)(et,{asChild:!0,...f,children:(0,w.jsx)(eM,{id:l.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":l.contentId,"data-state":eW(n.open),...e,ref:(0,a.F)(r,l.onTriggerChange),onClick:r=>{var t;null===(t=e.onClick)||void 0===t||t.call(e,r),e.disabled||r.defaultPrevented||(r.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:(0,o.M)(e.onPointerMove,eB(r=>{i.onItemEnter(r),r.defaultPrevented||e.disabled||n.open||c.current||(i.onPointerGraceIntentChange(null),c.current=window.setTimeout(()=>{n.onOpenChange(!0),p()},100))})),onPointerLeave:(0,o.M)(e.onPointerLeave,eB(e=>{var r,t;p();let o=null===(r=n.content)||void 0===r?void 0:r.getBoundingClientRect();if(o){let r=null===(t=n.content)||void 0===t?void 0:t.dataset.side,a="right"===r,u=o[a?"left":"right"],l=o[a?"right":"left"];i.onPointerGraceIntentChange({area:[{x:e.clientX+(a?-5:5),y:e.clientY},{x:u,y:o.top},{x:l,y:o.top},{x:l,y:o.bottom},{x:u,y:o.bottom}],side:r}),window.clearTimeout(s.current),s.current=window.setTimeout(()=>i.onPointerGraceIntentChange(null),300)}else{if(i.onTriggerLeave(e),e.defaultPrevented)return;i.onPointerGraceIntentChange(null)}})),onKeyDown:(0,o.M)(e.onKeyDown,r=>{let t=""!==i.searchRef.current;if(!e.disabled&&(!t||" "!==r.key)&&W[u.dir].includes(r.key)){var o;n.onOpenChange(!0),null===(o=n.content)||void 0===o||o.focus(),r.preventDefault()}})})})});eK.displayName=eL;var eV="MenuSubContent",eG=t.forwardRef((e,r)=>{let n=eu(ei,e.__scopeMenu),{forceMount:u=n.forceMount,...l}=e,i=Q(ei,e.__scopeMenu),c=er(ei,e.__scopeMenu),s=eO(eV,e.__scopeMenu),d=t.useRef(null),f=(0,a.e)(r,d);return(0,w.jsx)(B.Provider,{scope:e.__scopeMenu,children:(0,w.jsx)(g.z,{present:u||i.open,children:(0,w.jsx)(B.Slot,{scope:e.__scopeMenu,children:(0,w.jsx)(ev,{id:s.contentId,"aria-labelledby":s.triggerId,...l,ref:f,align:"start",side:"rtl"===c.dir?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:e=>{var r;c.isUsingKeyboardRef.current&&(null===(r=d.current)||void 0===r||r.focus()),e.preventDefault()},onCloseAutoFocus:e=>e.preventDefault(),onFocusOutside:(0,o.M)(e.onFocusOutside,e=>{e.target!==s.trigger&&i.onOpenChange(!1)}),onEscapeKeyDown:(0,o.M)(e.onEscapeKeyDown,e=>{c.onClose(),e.preventDefault()}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{let r=e.currentTarget.contains(e.target),n=U[c.dir].includes(e.key);if(r&&n){var t;i.onOpenChange(!1),null===(t=s.trigger)||void 0===t||t.focus(),e.preventDefault()}})})})})})});function eW(e){return e?"open":"closed"}function eU(e){return"indeterminate"===e}function eZ(e){return eU(e)?"indeterminate":e?"checked":"unchecked"}function eB(e){return r=>"mouse"===r.pointerType?e(r):void 0}eG.displayName=eV;var ez="DropdownMenu",[eX,e$]=(0,u.b)(ez,[Y]),eY=Y(),[eH,eq]=eX(ez),eJ=e=>{let{__scopeDropdownMenu:r,children:n,dir:o,open:a,defaultOpen:u,onOpenChange:i,modal:c=!0}=e,s=eY(r),d=t.useRef(null),[f=!1,p]=(0,l.T)({prop:a,defaultProp:u,onChange:i});return(0,w.jsx)(eH,{scope:r,triggerId:(0,v.M)(),triggerRef:d,contentId:(0,v.M)(),open:f,onOpenChange:p,onOpenToggle:t.useCallback(()=>p(e=>!e),[p]),modal:c,children:(0,w.jsx)(en,{...s,open:f,onOpenChange:p,dir:o,modal:c,children:n})})};eJ.displayName=ez;var eQ="DropdownMenuTrigger",e0=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,disabled:t=!1,...u}=e,l=eq(eQ,n),c=eY(n);return(0,w.jsx)(et,{asChild:!0,...c,children:(0,w.jsx)(i.WV.button,{type:"button",id:l.triggerId,"aria-haspopup":"menu","aria-expanded":l.open,"aria-controls":l.open?l.contentId:void 0,"data-state":l.open?"open":"closed","data-disabled":t?"":void 0,disabled:t,...u,ref:(0,a.F)(r,l.triggerRef),onPointerDown:(0,o.M)(e.onPointerDown,e=>{t||0!==e.button||!1!==e.ctrlKey||(l.onOpenToggle(),l.open||e.preventDefault())}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{!t&&(["Enter"," "].includes(e.key)&&l.onOpenToggle(),"ArrowDown"===e.key&&l.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(e.key)&&e.preventDefault())})})})});e0.displayName=eQ;var e1=e=>{let{__scopeDropdownMenu:r,...n}=e,t=eY(r);return(0,w.jsx)(el,{...t,...n})};e1.displayName="DropdownMenuPortal";var e9="DropdownMenuContent",e2=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...a}=e,u=eq(e9,n),l=eY(n),i=t.useRef(!1);return(0,w.jsx)(ed,{id:u.contentId,"aria-labelledby":u.triggerId,...l,...a,ref:r,onCloseAutoFocus:(0,o.M)(e.onCloseAutoFocus,e=>{var r;i.current||null===(r=u.triggerRef.current)||void 0===r||r.focus(),i.current=!1,e.preventDefault()}),onInteractOutside:(0,o.M)(e.onInteractOutside,e=>{let r=e.detail.originalEvent,n=0===r.button&&!0===r.ctrlKey,t=2===r.button||n;(!u.modal||t)&&(i.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});e2.displayName=e9;var e7=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(em,{...o,...t,ref:r})});e7.displayName="DropdownMenuGroup";var e3=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(eh,{...o,...t,ref:r})});e3.displayName="DropdownMenuLabel";var e5=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(ex,{...o,...t,ref:r})});e5.displayName="DropdownMenuItem";var e6=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(ey,{...o,...t,ref:r})});e6.displayName="DropdownMenuCheckboxItem";var e4=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(eR,{...o,...t,ref:r})});e4.displayName="DropdownMenuRadioGroup";var e8=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(eD,{...o,...t,ref:r})});e8.displayName="DropdownMenuRadioItem";var re=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(eP,{...o,...t,ref:r})});re.displayName="DropdownMenuItemIndicator";var rr=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(eN,{...o,...t,ref:r})});rr.displayName="DropdownMenuSeparator",t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(eT,{...o,...t,ref:r})}).displayName="DropdownMenuArrow";var rn=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(eK,{...o,...t,ref:r})});rn.displayName="DropdownMenuSubTrigger";var rt=t.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,...t}=e,o=eY(n);return(0,w.jsx)(eG,{...o,...t,ref:r,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});rt.displayName="DropdownMenuSubContent";var ro=eJ,ra=e0,ru=e1,rl=e2,ri=e7,rc=e3,rs=e5,rd=e6,rf=e4,rp=e8,rv=re,rm=rr,rh=e=>{let{__scopeDropdownMenu:r,children:n,open:t,onOpenChange:o,defaultOpen:a}=e,u=eY(r),[i=!1,c]=(0,l.T)({prop:t,defaultProp:a,onChange:o});return(0,w.jsx)(eA,{...u,open:i,onOpenChange:c,children:n})},rg=rn,rw=rt}}]);