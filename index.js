(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,c){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._templateSelector=n,this._likes=e.likes.length,this._id=e._id,this._cardOwnerId=e.owner._id,this._openImage=r,this._api=i,this._openDeletePopup=o,this._isLiked=e.likes.some((function(e){return e._id===c})),this._isOwner=c===this._cardOwnerId,this._toggleLike=this._toggleLike.bind(this)}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".card__btn").addEventListener("click",(function(){e._handleLikeBtn()})),this._element.querySelector(".card__delete").addEventListener("click",(function(){e._handleDeleteBtn()})),this._element.querySelector(".card__image").addEventListener("click",(function(){e._openImage(e._name,e._link)}))}},{key:"_toggleLike",value:function(e){this._likes=e.likes.length,this._renderLikes(),this._element.querySelector(".card__btn").classList.toggle("card__btn_active"),this._isLiked=!this._isLiked}},{key:"_handleLikeBtn",value:function(){this._isLiked?this._api.deleteLike(this._id,this._toggleLike):this._api.putLike(this._id,this._toggleLike)}},{key:"_renderLikes",value:function(){this._element.querySelector(".card__like-count").innerText=this._likes}},{key:"_handleDeleteBtn",value:function(){var e=this;this._openDeletePopup((function(){e._api.deleteCard(e._id,e._element.remove())}))}},{key:"generateCard",value:function(){this._element=this._getTemplate();var e=this._element.querySelector(".card__image");return e.src=this._link,e.setAttribute("alt",this._name),this._element.querySelector(".card__heading").textContent=this._name,this._renderLikes(),this._isOwner||(this._element.querySelector(".card__delete").style.display="none"),this._isLiked&&this._element.querySelector(".card__btn").classList.add("card__btn_active"),this._setEventListeners(),this._element}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._form=n}var t,r;return t=e,(r=[{key:"_isValid",value:function(e,t){var n=e.querySelector("#".concat(t.id,"-error"));t.validity.valid?this._hideError(n,t,this._errorClass,this._inputErrorClass):this._showError(n,t,this._errorClass,this._inputErrorClass)}},{key:"_showError",value:function(e,t){e.classList.add(this._errorClass),e.textContent=t.validationMessage,t.classList.add(this._inputErrorClass)}},{key:"_hideError",value:function(e,t){e.classList.remove(this._errorClass),e.textContent="",t.classList.remove(this._inputErrorClass)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleButton",value:function(e,t){var n=e.querySelector(this._submitButtonSelector);this._hasInvalidInput(t)?n.setAttribute("disabled",!0):n.removeAttribute("disabled")}},{key:"_setEventListeners",value:function(e){var t=this,n=Array.from(e.querySelectorAll(this._inputSelector));this._toggleButton(e,n),n.forEach((function(r){r.addEventListener("input",(function(){t._isValid(e,r),t._toggleButton(e,n)}))}))}},{key:"enableValidation",value:function(){var e=this;Array.from(document.querySelectorAll(this._formSelector)).forEach((function(t){e._setEventListeners(t)}))}},{key:"resetValidation",value:function(){var e=this;if(this._form){var t=Array.from(this._form.querySelectorAll(this._inputSelector)),n=this._form.querySelector(this._submitButtonSelector);t.forEach((function(t){var r=e._form.querySelector("#".concat(t.id,"-error"));t.classList.remove(e._inputErrorClass),r.classList.remove(e._errorClass),n.setAttribute("disabled","disabled")}))}}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=t.items,this._renderer=t.renderer,this._selector=n}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"appendItem",value:function(e){this._selector.prepend(e)}},{key:"prependItem",value:function(e){this._selector.append(e)}}])&&o(t.prototype,n),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._closeSelector=n.closeSelector,this._opened=n.opened,this._handleEscClose=this._handleEscClose.bind(this),this._handleOverlayClose=this._handleOverlayClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add(this._opened),document.addEventListener("keyup",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove(this._opened),document.removeEventListener("keyup",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"==e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target.classList.contains(this._opened)&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",this._handleOverlayClose),this._popup.querySelector(this._closeSelector).addEventListener("click",(function(){e.close()}))}}])&&c(t.prototype,n),e}();function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return(l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=h(r);if(o){var n=h(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function c(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(n=i.call(this,e,t))._imageSelector=t.imageSelector,n._captionSelector=t.captionSelector,n}return t=c,(n=[{key:"open",value:function(e,t){l(h(c.prototype),"open",this).call(this);var n=this._popup.querySelector(this._imageSelector),r=this._popup.querySelector(this._captionSelector);n.src=e,n.alt=t,r.innerText=t}}])&&a(t.prototype,n),c}(s);function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function c(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(r=i.call(this,e,t))._formSelector=t.formSelector,r._inputSelector=t.inputSelector,r._submitForm=n,r}return t=c,(n=[{key:"close",value:function(){v(S(c.prototype),"close",this).call(this),this._popup.querySelector(this._formSelector).reset()}},{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._popup.querySelectorAll(this._inputSelector),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value.trim()})),this._formValues}},{key:"setValues",value:function(e){this._inputList=this._popup.querySelectorAll(this._inputSelector),this._inputList.forEach((function(t){t.value=e[t.name]}))}},{key:"setEventListeners",value:function(){var e=this;v(S(c.prototype),"setEventListeners",this).call(this),this._popup.querySelector(this._formSelector).addEventListener("submit",(function(t){e._submitForm(t,e._getInputValues())}))}}])&&d(t.prototype,n),c}(s);function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(e,t,n){return(w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e,t){return!t||"object"!==g(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(r);if(o){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return O(this,e)});function c(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(n=i.call(this,e,t))._formSelector=t.formSelector,n}return t=c,(n=[{key:"open",value:function(e){w(C(c.prototype),"open",this).call(this),this._handler=e}},{key:"setEventListeners",value:function(){var e=this;w(C(c.prototype),"setEventListeners",this).call(this),this._popup.querySelector(this._formSelector).addEventListener("submit",(function(t){t.preventDefault(),e._handler(),e.close()}))}}])&&E(t.prototype,n),c}(s);function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var q=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userNameSelector=t.profileName,this._userJobSelector=t.profileJob,this._userAvatarSelector=t.profileAvatar}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:document.querySelector(this._userNameSelector).innerText,about:document.querySelector(this._userJobSelector).innerText}}},{key:"setUserInfo",value:function(e){document.querySelector(this._userNameSelector).innerText=e.name,document.querySelector(this._userJobSelector).innerText=e.about,this._id=e._id}},{key:"getUserId",value:function(){return this._id}},{key:"setUserAvatar",value:function(e){document.querySelector(this._userAvatarSelector).src=e}}])&&P(t.prototype,n),e}();function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var I=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._token=t.token}var t,n;return t=e,(n=[{key:"getProfileInfo",value:function(e,t){fetch(this._baseUrl+"".concat(e),{headers:{authorization:this._token}}).then((function(e){return e.json()})).then((function(e){t(e)}))}},{key:"setProfileInfo",value:function(e,t,n){fetch(this._baseUrl+"".concat(e),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){n(e)})).catch((function(e){console.log(e)}))}},{key:"getInitialCards",value:function(e,t){return fetch(this._baseUrl+"".concat(e),{method:"GET",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){t(e)}))}},{key:"postNewCard",value:function(e,t,n){fetch(this._baseUrl+"".concat(e),{method:"POST",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){n(e)}))}},{key:"deleteCard",value:function(e,t){fetch(this._baseUrl+"cards"+"/".concat(e),{method:"DELETE",headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject(e.status+":"+e.statusText)})).then((function(e){t()})).catch((function(e){console.log(e)}))}},{key:"putLike",value:function(e,t){fetch(this._baseUrl+"cards/likes"+"/".concat(e),{method:"PUT",headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject(e.status+":"+e.statusText)})).then((function(e){t(e)})).catch((function(e){console.log(e)}))}},{key:"deleteLike",value:function(e,t){fetch(this._baseUrl+"cards/likes"+"/".concat(e),{method:"DELETE",headers:{authorization:this._token}}).then((function(e){return e.ok?e.json():Promise.reject(e.status+":"+e.statusText)})).then((function(e){t(e)})).catch((function(e){console.log(e)}))}}])&&T(t.prototype,n),e}(),R={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},U={opened:"popup_opened",closeSelector:".popup__close",imageSelector:".popup__image",captionSelector:".popup__caption",inputSelector:".popup__input",formSelector:".popup__form"},A=document.querySelector(".profile__btn_edit"),D=document.querySelector(".profile__btn_add"),x=document.querySelector(".profile__overlay"),V=document.querySelector(".cards-gallery"),B=new _(".popup_type_image",U),N=new j(".popup_type_confirm",U),z=new r(R,document.querySelector(".popup_type_profile").querySelector(".popup__form")),J=new r(R,document.querySelector(".popup_type_add-card").querySelector(".popup__form")),F=new r(R,document.querySelector(".popup_type_avatar").querySelector(".popup__form")),G=new q({profileName:".profile__title",profileJob:".profile__subtitle",profileAvatar:".profile__photo"}),H=new I({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-19/",token:"aac4a60b-b09e-40d2-9391-f119b1a59443"}),M=new i({renderer:function(e){var n=new t(e,"#card",(function(e,t){B.open(t,e)}),N.open.bind(N),H,G.getUserId());M.prependItem(n.generateCard())}},V),K=new k(".popup_type_add-card",U,(function(e,n){e.preventDefault(),H.postNewCard("cards",n,(function(e){var n=new t(e,"#card",(function(e,t){B.open(t,e)}),N.open.bind(N),H,G.getUserId());M.appendItem(n.generateCard())})),K.close()})),Q=new k(".popup_type_profile",U,(function(e,t){e.preventDefault(),H.setProfileInfo("users/me",t,(function(e){G.setUserInfo(e)})),Q.close()})),W=new k(".popup_type_avatar",U,(function(e,t){e.preventDefault(),console.log(t.avatar),H.setProfileInfo("users/me/avatar",t,(function(e){G.setUserAvatar(e.avatar)})),W.close()}));K.setEventListeners(),N.setEventListeners(),B.setEventListeners(),Q.setEventListeners(),W.setEventListeners(),H.getProfileInfo("users/me",(function(e){G.setUserInfo(e),G.setUserAvatar(e.avatar)})),H.getInitialCards("cards",(function(e){M.renderItems(e)})),A.addEventListener("click",(function(){Q.open(),Q.setValues(G.getUserInfo()),z.enableValidation(),z.resetValidation()})),D.addEventListener("click",(function(){K.open(),J.enableValidation(),J.resetValidation()})),x.addEventListener("click",(function(){W.open(),F.enableValidation(),F.resetValidation()}))})();