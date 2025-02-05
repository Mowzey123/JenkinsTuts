/*!
* metismenujs - v1.0.3
* MetisMenu with Vanilla-JS
* https://github.com/onokumus/metismenujs#readme
*
* Made by Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
* Under MIT License
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.MetisMenu=e()}(this,function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */var i=function(){return(i=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var s in e=arguments[i])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}).apply(this,arguments)},n={parentTrigger:"li",subMenu:"ul",toggle:!0,triggerElement:"a"},l="active",h="collapse",c="in",u="collapsing";return function(){function t(t,e){this.element="string"==typeof t?document.querySelector(t):t,this.cacheEl=this.element,this.config=i({},n,e),this.cacheConfig=this.config,this.disposed=!1,this.ulArr=[],this.listenerOb=[],this.init()}return t.prototype.update=function(){this.disposed=!1,this.element=this.cacheEl,this.config=this.cacheConfig,this.init()},t.prototype.dispose=function(){for(var t=0,e=this.listenerOb;t<e.length;t++){var i=e[t];for(var n in i)if(i.hasOwnProperty(n)){var s=i[n];s[1].removeEventListener(s[0],s[2])}}this.ulArr=[],this.listenerOb=[],this.config=null,this.element=null,this.disposed=!0},t.prototype.on=function(t,e){return this.element.addEventListener(t,e,!1),this},t.prototype.off=function(t,e){return this.element.removeEventListener(t,e),this},t.prototype.emit=function(t,e,i){var n;return void 0===i&&(i=!1),"function"==typeof CustomEvent?n=new CustomEvent(t,{bubbles:i,detail:e}):(n=document.createEvent("CustomEvent")).initCustomEvent(t,i,!1,e),this.element.dispatchEvent(n),this},t.prototype.init=function(){this.ulArr=[].slice.call(this.element.querySelectorAll(this.config.subMenu));for(var t=0,e=this.ulArr;t<e.length;t++){var i=e[t],n=i.parentNode;i.classList.add(h),n.classList.contains(l)?this.show(i):this.hide(i);var s=n.querySelector(this.config.triggerElement);if("true"===s.getAttribute("aria-disabled"))return;s.setAttribute("aria-expanded","false");var r={aClick:["click",s,this.clickEvent.bind(this)]};for(var o in r)if(r.hasOwnProperty(o)){var a=r[o];a[1].addEventListener(a[0],a[2])}this.listenerOb.push(r)}},t.prototype.clickEvent=function(t){if(!this.disposed){"A"===t.currentTarget.tagName&&t.preventDefault();var e=t.currentTarget.parentNode.querySelector(this.config.subMenu);this.toggle(e)}},t.prototype.toggle=function(t){t.parentNode.classList.contains(l)?this.hide(t):this.show(t)},t.prototype.show=function(t){var e=this;if(!this.isTransitioning&&!t.classList.contains(c)){var i=function(){t.classList.remove(u),t.style.height="",t.removeEventListener("transitionend",i),e.setTransitioning(!1),e.emit("shown.metisMenu",{shownElement:t})},n=t.parentNode;n.classList.add(l),n.querySelector(this.config.triggerElement).setAttribute("aria-expanded","true"),t.style.height="0px",t.classList.remove(h),t.classList.remove(c),t.classList.add(u);var s=[].slice.call(n.parentNode.children).filter(function(t){return t!==n});if(this.config.toggle&&0<s.length)for(var r=0,o=s;r<o.length;r++){var a=o[r].querySelector(this.config.subMenu);null!==a&&this.hide(a)}this.setTransitioning(!0),t.classList.add(h),t.classList.add(c),t.style.height=t.scrollHeight+"px",this.emit("show.metisMenu",{showElement:t}),t.addEventListener("transitionend",i)}},t.prototype.hide=function(t){var e=this;if(!this.isTransitioning&&t.classList.contains(c)){this.emit("hide.metisMenu",{hideElement:t});var i=t.parentNode;i.classList.remove(l);var n=function(){t.classList.remove(u),t.classList.add(h),t.removeEventListener("transitionend",n),e.setTransitioning(!1),e.emit("hidden.metisMenu",{hiddenElement:t})};t.style.height=t.getBoundingClientRect().height+"px",t.style.height=t.offsetHeight+"px",t.classList.add(u),t.classList.remove(h),t.classList.remove(c),this.setTransitioning(!0),t.addEventListener("transitionend",n),t.style.height="0px",i.querySelector(this.config.triggerElement).setAttribute("aria-expanded","false")}},t.prototype.setTransitioning=function(t){this.isTransitioning=t},t}()});
//# sourceMappingURL=metismenujs.min.js.map
;
;
var body = document.body;

function checkWindow() {
    if (window.innerWidth < 992 && !body.classList.contains('mini-sidebar')) {
        body.classList.add('drawer-sidebar');
    }
}

//document.addEventListener('DOMContentLoaded', init);
//window.addEventListener('resize', checkWindow);

function backdrop(el) {
    el.classList.toggle('shined');
    body.classList.toggle('has-backdrop');
    return el;
}

function toggleAside() {
	if( body.classList.contains('drawer-sidebar') ) {
        backdrop(document.getElementById('sidebar'));
    } else {
        body.classList.toggle('mini-sidebar');
    }
}

function closeShined() {
    body.classList.remove('has-backdrop');
    document.querySelector('.shined').classList.remove('shined');
}


function init() {
    checkWindow();
    document.querySelector('.backdrop').addEventListener('click', closeShined);
}

/*
Way 1



*/


/*
TS: toggle sidebar

//let body = new ElementRef('body').nativeElement;
if(document.body.classList.contains('drawer-sidebar')) {
  console.log('backdrop');
} else {
  document.body.classList.toggle('mini-sidebar');
  //this.renderer.setElementClass(document.body, 'modal-open', true);
}
*/

;
//# sourceMappingURL=scripts.js.map