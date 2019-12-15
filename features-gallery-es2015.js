(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-gallery"],{

/***/ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js ***!
  \**********************************************************************/
/*! exports provided: LazyLoadImageDirective, LazyLoadImageModule, intersectionObserverPreset, scrollPreset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadImageDirective", function() { return LazyLoadImageDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadImageModule", function() { return LazyLoadImageModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersectionObserverPreset", function() { return intersectionObserverPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollPreset", function() { return scrollPreset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");






const cssClassNames = {
    loaded: 'ng-lazyloaded',
    loading: 'ng-lazyloading',
    failed: 'ng-failed-lazyloaded'
};
function removeCssClassName(element, cssClassName) {
    element.className = element.className.replace(cssClassName, '');
}
function addCssClassName(element, cssClassName) {
    if (!element.className.includes(cssClassName)) {
        element.className += ` ${cssClassName}`;
    }
}
function hasCssClassName(element, cssClassName) {
    return element.className && element.className.includes(cssClassName);
}

function getNavigator() {
    return typeof window !== 'undefined' ? window.navigator : undefined;
}
function isChildOfPicture(element) {
    return Boolean(element.parentElement && element.parentElement.nodeName.toLowerCase() === 'picture');
}
function isImageElement(element) {
    return element.nodeName.toLowerCase() === 'img';
}
function setImage(element, imagePath, useSrcset) {
    if (isImageElement(element)) {
        if (useSrcset && 'srcset' in element) {
            element.srcset = imagePath;
        }
        else {
            element.src = imagePath;
        }
    }
    else {
        element.style.backgroundImage = `url('${imagePath}')`;
    }
    return element;
}
function setSources(attrName) {
    return (image) => {
        const sources = image.parentElement.getElementsByTagName('source');
        for (let i = 0; i < sources.length; i++) {
            const attrValue = sources[i].getAttribute(attrName);
            if (attrValue) {
                // Check if `srcset` is supported by the current browser
                if ('srcset' in sources[i]) {
                    sources[i].srcset = attrValue;
                }
                else {
                    sources[i].src = attrValue;
                }
            }
        }
    };
}
const setSourcesToDefault = setSources('defaultImage');
const setSourcesToLazy = setSources('lazyLoad');
const setSourcesToError = setSources('errorImage');
function setImageAndSources(setSourcesFn) {
    return (element, imagePath, useSrcset) => {
        if (isImageElement(element) && isChildOfPicture(element)) {
            setSourcesFn(element);
        }
        if (imagePath) {
            setImage(element, imagePath, useSrcset);
        }
    };
}
const setImageAndSourcesToDefault = setImageAndSources(setSourcesToDefault);
const setImageAndSourcesToLazy = setImageAndSources(setSourcesToLazy);
const setImageAndSourcesToError = setImageAndSources(setSourcesToError);

const end = ({ element }) => addCssClassName(element, cssClassNames.loaded);
const loadImage = ({ element, useSrcset, imagePath, decode }) => {
    let img;
    if (isImageElement(element) && isChildOfPicture(element)) {
        const parentClone = element.parentNode.cloneNode(true);
        img = parentClone.getElementsByTagName('img')[0];
        setSourcesToLazy(img);
        setImage(img, imagePath, useSrcset);
    }
    else {
        img = new Image();
        if (isImageElement(element) && element.sizes) {
            img.sizes = element.sizes;
        }
        if (useSrcset && 'srcset' in img) {
            img.srcset = imagePath;
        }
        else {
            img.src = imagePath;
        }
    }
    if (decode && img.decode) {
        return img.decode().then(() => imagePath);
    }
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(imagePath);
        img.onerror = () => reject(null);
    });
};
const setErrorImage = ({ element, errorImagePath, useSrcset }) => {
    setImageAndSourcesToError(element, errorImagePath, useSrcset);
    addCssClassName(element, cssClassNames.failed);
};
const setLoadedImage = ({ element, imagePath, useSrcset }) => {
    setImageAndSourcesToLazy(element, imagePath, useSrcset);
};
const setup = ({ element, defaultImagePath, useSrcset }) => {
    setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
    if (hasCssClassName(element, cssClassNames.loaded)) {
        removeCssClassName(element, cssClassNames.loaded);
    }
};
const isBot = navigator => {
    if (navigator && navigator.userAgent) {
        return /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|duckduckbot/i.test(navigator.userAgent);
    }
    return false;
};
const sharedPreset = {
    finally: end,
    loadImage,
    setErrorImage,
    setLoadedImage,
    setup,
    isBot
};

const observers = new WeakMap();
const intersectionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
function loadingCallback(entrys) {
    entrys.forEach(entry => intersectionSubject.next(entry));
}
const uniqKey = {};
const getIntersectionObserver = (attributes) => {
    const scrollContainerKey = attributes.scrollContainer || uniqKey;
    const options = {
        root: attributes.scrollContainer || null
    };
    if (attributes.offset) {
        options.rootMargin = `${attributes.offset}px`;
    }
    let observer = observers.get(scrollContainerKey);
    if (!observer) {
        observer = new IntersectionObserver(loadingCallback, options);
        observers.set(scrollContainerKey, observer);
    }
    observer.observe(attributes.element);
    return rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].create((obs) => {
        const subscription = intersectionSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(entry => entry.target === attributes.element)).subscribe(obs);
        return () => {
            subscription.unsubscribe();
            observer.unobserve(attributes.element);
        };
    });
};

const isVisible = ({ event }) => {
    return event.isIntersecting;
};
const getObservable = (attributes, _getInterObserver = getIntersectionObserver) => {
    if (attributes.customObservable) {
        return attributes.customObservable;
    }
    return _getInterObserver(attributes);
};
const intersectionObserverPreset = Object.assign({}, sharedPreset, {
    isVisible,
    getObservable
});

const isVisible$1 = () => {
    return true;
};
const getObservable$1 = () => {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])('load');
};
const loadImage$1 = ({ imagePath }) => {
    return [imagePath];
};
const ssrPreset = Object.assign({}, sharedPreset, {
    isVisible: isVisible$1,
    getObservable: getObservable$1,
    loadImage: loadImage$1
});

function createHooks(platformId, options) {
    const defaultPreset = intersectionObserverPreset;
    const isBot = options && options.isBot ? options.isBot : defaultPreset.isBot;
    if (isBot(getNavigator(), platformId)) {
        return Object.assign(ssrPreset, { isBot });
    }
    else if (!options) {
        return defaultPreset;
    }
    const hooks = {};
    if (options.preset) {
        Object.assign(hooks, options.preset);
    }
    else {
        Object.assign(hooks, defaultPreset);
    }
    Object.keys(options)
        .filter(key => key !== 'preset')
        .forEach(key => {
        hooks[key] = options[key];
    });
    return hooks;
}

function lazyLoadImage(hookSet, attributes) {
    return (evntObservable) => {
        return evntObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(event => hookSet.isVisible({
            element: attributes.element,
            event: event,
            offset: attributes.offset,
            scrollContainer: attributes.scrollContainer
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(() => hookSet.loadImage(attributes)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(imagePath => hookSet.setLoadedImage({
            element: attributes.element,
            imagePath,
            useSrcset: attributes.useSrcset
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(() => true), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(() => {
            hookSet.setErrorImage(attributes);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(false);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(() => hookSet.finally(attributes)));
    };
}

let LazyLoadImageDirective = class LazyLoadImageDirective {
    constructor(el, ngZone, platformId, options) {
        this.onLoad = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"](); // Callback when an image is loaded
        this.elementRef = el;
        this.ngZone = ngZone;
        this.propertyChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"]();
        this.platformId = platformId;
        this.hooks = createHooks(platformId, options);
    }
    ngOnChanges() {
        this.propertyChanges$.next({
            element: this.elementRef.nativeElement,
            imagePath: this.lazyImage,
            defaultImagePath: this.defaultImage,
            errorImagePath: this.errorImage,
            useSrcset: this.useSrcset,
            offset: this.offset ? this.offset | 0 : 0,
            scrollContainer: this.scrollTarget,
            customObservable: this.customObservable,
            decode: this.decode
        });
    }
    ngAfterContentInit() {
        // Don't do anything if SSR and the user isn't a bot
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platformId) && !this.hooks.isBot(getNavigator(), this.platformId)) {
            return null;
        }
        this.ngZone.runOutsideAngular(() => {
            this.scrollSubscription = this.propertyChanges$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(attributes => this.hooks.setup(attributes)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(attributes => this.hooks.getObservable(attributes).pipe(lazyLoadImage(this.hooks, attributes))))
                .subscribe(success => this.onLoad.emit(success));
        });
    }
    ngOnDestroy() {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])('lazyLoad'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LazyLoadImageDirective.prototype, "lazyImage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LazyLoadImageDirective.prototype, "defaultImage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LazyLoadImageDirective.prototype, "errorImage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], LazyLoadImageDirective.prototype, "scrollTarget", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
], LazyLoadImageDirective.prototype, "customObservable", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], LazyLoadImageDirective.prototype, "offset", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], LazyLoadImageDirective.prototype, "useSrcset", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], LazyLoadImageDirective.prototype, "decode", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"])
], LazyLoadImageDirective.prototype, "onLoad", void 0);
LazyLoadImageDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"])({
        selector: '[lazyLoad]'
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"])), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])('options')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"], Object, Object])
], LazyLoadImageDirective);

var LazyLoadImageModule_1;
let LazyLoadImageModule = LazyLoadImageModule_1 = class LazyLoadImageModule {
    static forRoot(options) {
        return {
            ngModule: LazyLoadImageModule_1,
            providers: [{ provide: 'options', useValue: options }]
        };
    }
};
LazyLoadImageModule = LazyLoadImageModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [LazyLoadImageDirective],
        exports: [LazyLoadImageDirective]
    })
], LazyLoadImageModule);

class Rect {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    static fromElement(element) {
        const { left, top, right, bottom } = element.getBoundingClientRect();
        if (left === 0 && top === 0 && right === 0 && bottom === 0) {
            return Rect.empty;
        }
        else {
            return new Rect(left, top, right, bottom);
        }
    }
    static fromWindow(_window) {
        return new Rect(0, 0, _window.innerWidth, _window.innerHeight);
    }
    inflate(inflateBy) {
        this.left -= inflateBy;
        this.top -= inflateBy;
        this.right += inflateBy;
        this.bottom += inflateBy;
    }
    intersectsWith(rect) {
        return rect.left < this.right && this.left < rect.right && rect.top < this.bottom && this.top < rect.bottom;
    }
    getIntersectionWith(rect) {
        const left = Math.max(this.left, rect.left);
        const top = Math.max(this.top, rect.top);
        const right = Math.min(this.right, rect.right);
        const bottom = Math.min(this.bottom, rect.bottom);
        if (right >= left && bottom >= top) {
            return new Rect(left, top, right, bottom);
        }
        else {
            return Rect.empty;
        }
    }
}
Rect.empty = new Rect(0, 0, 0, 0);

const scrollListeners = new WeakMap();
function sampleObservable(obs, scheduler) {
    return obs.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["sampleTime"])(100, scheduler), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''));
}
// Only create one scroll listener per target and share the observable.
// Typical, there will only be one observable per application
const getScrollListener = (scrollTarget) => {
    if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
        console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["empty"])();
    }
    const scrollListener = scrollListeners.get(scrollTarget);
    if (scrollListener) {
        return scrollListener;
    }
    const srollEvent = rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].create((observer) => {
        const eventName = 'scroll';
        const handler = (event) => observer.next(event);
        const options = { passive: true, capture: false };
        scrollTarget.addEventListener(eventName, handler, options);
        return () => scrollTarget.removeEventListener(eventName, handler, options);
    });
    const listener = sampleObservable(srollEvent);
    scrollListeners.set(scrollTarget, listener);
    return listener;
};

const isVisible$2 = ({ element, offset, scrollContainer }, getWindow = () => window) => {
    const elementBounds = Rect.fromElement(element);
    if (elementBounds === Rect.empty) {
        return false;
    }
    const windowBounds = Rect.fromWindow(getWindow());
    elementBounds.inflate(offset);
    if (scrollContainer) {
        const scrollContainerBounds = Rect.fromElement(scrollContainer);
        const intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
        return elementBounds.intersectsWith(intersection);
    }
    else {
        return elementBounds.intersectsWith(windowBounds);
    }
};
const getObservable$2 = (attributes) => {
    if (attributes.customObservable) {
        return attributes.customObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''));
    }
    if (attributes.scrollContainer) {
        return getScrollListener(attributes.scrollContainer);
    }
    return getScrollListener(window);
};
const scrollPreset = Object.assign({}, sharedPreset, {
    isVisible: isVisible$2,
    getObservable: getObservable$2
});


//# sourceMappingURL=ng-lazyload-image.js.map


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/image-card/image-card.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/image-card/image-card.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nz-card [nzBordered]=\"false\"\n         [nzCover]=\"coverTemplate\"\n         [nzActions]=\"[actionSetting, actionEdit, actionEllipsis]\"\n>\n  <nz-card-meta\n    nzTitle=\"{{image.title}}\"\n  ></nz-card-meta>\n</nz-card>\n<ng-template #coverTemplate>\n  <img src=\"{{image.pixelSrc}}\"/>\n  <img lazyLoad=\"{{image.src}}\" alt=\"\">\n</ng-template>\n<ng-template #actionSetting>\n  <i nz-icon nzType=\"delete\" (click)=\"onDeleted(image)\"></i>\n</ng-template>\n<ng-template #actionEdit>\n  <i nz-icon nzType=\"edit\"\n     nz-popover\n     [nzPopoverContent]=\"editImageTitleTemplate\"\n     [(nzVisible)]=\"showPopover\"\n     nzTitle=\"Edit image title\"\n     nzPopoverTrigger=\"click\">\n  </i>\n</ng-template>\n<ng-template #actionEllipsis>\n  <i nz-icon nzType=\"more\" (click)=\"onShowMore(image)\"></i>\n</ng-template>\n\n<ng-template #editImageTitleTemplate>\n  <form nz-form [formGroup]=\"titleForm\" (ngSubmit)=\"submitForm(image)\" class=\"image-title-form\">\n    <nz-form-item>\n      <nz-form-control nzErrorTip=\"The title cant be empty\">\n        <input type=\"text\" nz-input formControlName=\"title\" placeholder=\"Insert title\" autofocus/>\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-control>\n        <button nz-button nzType=\"primary\" style=\"float: right;\" [disabled]=\"titleForm.invalid\">Change</button>\n      </nz-form-control>\n    </nz-form-item>\n  </form>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/features/gallery/gallery.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/features/gallery/gallery.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nz-layout>\n  <nz-header class=\"gallery-header\" >\n    <nz-page-header nzTitle=\"My Gallery\" [nzSubtitle]=\"'Here you can find all your media'\"></nz-page-header>\n  </nz-header>\n  <nz-content style=\"min-height: 100vh;\">\n    <div nz-row style=\"max-width: 1280px; margin: 0 auto;\">\n      <div nz-col nzXs=\"12\" nzSm=\"12\" nzMd=\"8\" nzLg=\"6\" nzXl=\"6\"\n           style=\" padding: 15px; float: left!important;\"\n           *ngFor=\"let img of images\">\n        <app-image-card [image]=\"img\"\n                        (deleted)=\"onDelete($event)\"\n                        (showMore)=\"onShowMore($event)\"\n                        (titleChanged)=\"onTitleChanged($event)\">\n        </app-image-card>\n      </div>\n    </div>\n  </nz-content>\n</nz-layout>\n");

/***/ }),

/***/ "./src/app/components/image-card/image-card.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/components/image-card/image-card.component.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n}\n:host img {\n  position: absolute;\n  left: 0;\n  top: 0;\n  max-width: 100%;\n  height: inherit;\n}\n:host .ng-lazyloaded {\n  opacity: 1;\n}\n:host ::ng-deep .ant-card {\n  background: transparent;\n}\n:host ::ng-deep .ant-card-actions {\n  background: transparent;\n  border-top: none;\n}\n:host ::ng-deep .ant-card-actions > li i {\n  color: #1976d2;\n}\n:host ::ng-deep .ant-card-body {\n  background: #000;\n  opacity: 0.5;\n  margin-top: -65px;\n}\n:host ::ng-deep .ant-card-meta-title {\n  color: #FFFFFF;\n}\n:host ::ng-deep .ant-card-cover {\n  width: auto;\n  height: 250px;\n}\n.image-title-form {\n  width: 260px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hdmltYXNsYXRpMS9wcm9qZWN0cy9jbG91ZGluYXJ5L3NyYy9hcHAvY29tcG9uZW50cy9pbWFnZS1jYXJkL2ltYWdlLWNhcmQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvaW1hZ2UtY2FyZC9pbWFnZS1jYXJkLmNvbXBvbmVudC5zY3NzIiwiL1VzZXJzL2F2aW1hc2xhdGkxL3Byb2plY3RzL2Nsb3VkaW5hcnkvc3JjL3ZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsV0FBQTtBQ0RGO0FER0U7RUFDRSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUNESjtBREtFO0VBQ0UsVUFBQTtBQ0hKO0FEUUk7RUFDRSx1QkFBQTtBQ05OO0FEU0k7RUFDRSx1QkFBQTtFQUNBLGdCQUFBO0FDUE47QURVUTtFQUNFLGNFOUJBO0FEc0JWO0FEYUk7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQ1hOO0FEY0k7RUFDRSxjQUFBO0FDWk47QURlSTtFQUNFLFdBQUE7RUFDQSxhQUFBO0FDYk47QURrQkE7RUFDRSxZQUFBO0FDZkYiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2ltYWdlLWNhcmQvaW1hZ2UtY2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi8uLi92YXJpYWJsZXNcIjtcblxuOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcblxuICBpbWcge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiBpbmhlcml0O1xuICB9XG5cblxuICAubmctbGF6eWxvYWRlZCB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuXG4gIDo6bmctZGVlcCB7XG5cbiAgICAuYW50LWNhcmQge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgfVxuXG4gICAgLmFudC1jYXJkLWFjdGlvbnMge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItdG9wOiBub25lO1xuXG4gICAgICA+IGxpIHtcbiAgICAgICAgaSB7XG4gICAgICAgICAgY29sb3I6ICRhcHBCbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmFudC1jYXJkLWJvZHkge1xuICAgICAgYmFja2dyb3VuZDogIzAwMDtcbiAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgbWFyZ2luLXRvcDogLTY1cHg7XG4gICAgfVxuXG4gICAgLmFudC1jYXJkLW1ldGEtdGl0bGUge1xuICAgICAgY29sb3I6ICNGRkZGRkY7XG4gICAgfVxuXG4gICAgLmFudC1jYXJkLWNvdmVyIHtcbiAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgaGVpZ2h0OiAyNTBweDtcbiAgICB9XG4gIH1cbn1cblxuLmltYWdlLXRpdGxlLWZvcm0ge1xuICB3aWR0aDogMjYwcHg7XG59XG4iLCI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuOmhvc3QgaW1nIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBpbmhlcml0O1xufVxuOmhvc3QgLm5nLWxhenlsb2FkZWQge1xuICBvcGFjaXR5OiAxO1xufVxuOmhvc3QgOjpuZy1kZWVwIC5hbnQtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuOmhvc3QgOjpuZy1kZWVwIC5hbnQtY2FyZC1hY3Rpb25zIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci10b3A6IG5vbmU7XG59XG46aG9zdCA6Om5nLWRlZXAgLmFudC1jYXJkLWFjdGlvbnMgPiBsaSBpIHtcbiAgY29sb3I6ICMxOTc2ZDI7XG59XG46aG9zdCA6Om5nLWRlZXAgLmFudC1jYXJkLWJvZHkge1xuICBiYWNrZ3JvdW5kOiAjMDAwO1xuICBvcGFjaXR5OiAwLjU7XG4gIG1hcmdpbi10b3A6IC02NXB4O1xufVxuOmhvc3QgOjpuZy1kZWVwIC5hbnQtY2FyZC1tZXRhLXRpdGxlIHtcbiAgY29sb3I6ICNGRkZGRkY7XG59XG46aG9zdCA6Om5nLWRlZXAgLmFudC1jYXJkLWNvdmVyIHtcbiAgd2lkdGg6IGF1dG87XG4gIGhlaWdodDogMjUwcHg7XG59XG5cbi5pbWFnZS10aXRsZS1mb3JtIHtcbiAgd2lkdGg6IDI2MHB4O1xufSIsIiRhcHBCbHVlOiAjMTk3NmQyO1xuIl19 */");

/***/ }),

/***/ "./src/app/components/image-card/image-card.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/image-card/image-card.component.ts ***!
  \***************************************************************/
/*! exports provided: ImageCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageCardComponent", function() { return ImageCardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");

// ANGULAR


let ImageCardComponent = class ImageCardComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        /**
         * a variable to show / hide popover
         */
        this.showPopover = false;
        /**
         * fire event when title changed
         */
        this.titleChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /**
         * fire event when image is deleted
         */
        this.deleted = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /**
         * fire event when details icon clicked
         */
        this.showMore = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
        this.titleForm = this.formBuilder.group({
            title: [this.image.title, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
    }
    onDeleted(image) {
        this.deleted.emit(image);
    }
    onShowMore(image) {
        this.showMore.emit(image);
    }
    submitForm(image) {
        if (this.titleForm.valid) {
            this.showPopover = false;
            // fire title changed with the new value
            this.titleChanged.emit({ image, title: this.titleForm.controls['title'].value });
        }
    }
};
ImageCardComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ImageCardComponent.prototype, "image", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], ImageCardComponent.prototype, "titleChanged", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], ImageCardComponent.prototype, "deleted", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], ImageCardComponent.prototype, "showMore", void 0);
ImageCardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-image-card',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./image-card.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/image-card/image-card.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./image-card.component.scss */ "./src/app/components/image-card/image-card.component.scss")).default]
    })
], ImageCardComponent);



/***/ }),

/***/ "./src/app/components/image-card/index.ts":
/*!************************************************!*\
  !*** ./src/app/components/image-card/index.ts ***!
  \************************************************/
/*! exports provided: ImageCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _image_card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-card.component */ "./src/app/components/image-card/image-card.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageCardComponent", function() { return _image_card_component__WEBPACK_IMPORTED_MODULE_1__["ImageCardComponent"]; });





/***/ }),

/***/ "./src/app/features/gallery/gallery-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/features/gallery/gallery-routing.module.ts ***!
  \************************************************************/
/*! exports provided: GalleryRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryRoutingModule", function() { return GalleryRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _gallery_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gallery.component */ "./src/app/features/gallery/gallery.component.ts");

// ANGULAR



// APP

const routes = [
    {
        path: '',
        component: _gallery_component__WEBPACK_IMPORTED_MODULE_4__["GalleryComponent"]
    }
];
let GalleryRoutingModule = class GalleryRoutingModule {
};
GalleryRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]
        ]
    })
], GalleryRoutingModule);



/***/ }),

/***/ "./src/app/features/gallery/gallery.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/features/gallery/gallery.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host .gallery-header {\n  background: transparent;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hdmltYXNsYXRpMS9wcm9qZWN0cy9jbG91ZGluYXJ5L3NyYy9hcHAvZmVhdHVyZXMvZ2FsbGVyeS9nYWxsZXJ5LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9mZWF0dXJlcy9nYWxsZXJ5L2dhbGxlcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0M7RUFDRSx1QkFBQTtBQ0FIIiwiZmlsZSI6InNyYy9hcHAvZmVhdHVyZXMvZ2FsbGVyeS9nYWxsZXJ5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuIC5nYWxsZXJ5LWhlYWRlcntcbiAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuIH1cbn1cbiIsIjpob3N0IC5nYWxsZXJ5LWhlYWRlciB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/features/gallery/gallery.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/features/gallery/gallery.component.ts ***!
  \*******************************************************/
/*! exports provided: GalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryComponent", function() { return GalleryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_gallery_sandbox_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/gallery.sandbox.service */ "./src/app/features/gallery/services/gallery.sandbox.service.ts");

// ANGULAR


let GalleryComponent = class GalleryComponent {
    constructor(sandbox) {
        this.sandbox = sandbox;
        this.images = [];
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                this.images = yield this.sandbox.getList(1, 100);
            }
            catch (e) {
                // error handling
            }
        });
    }
    onDelete(image) {
        this.images = this.images.filter(item => item.id !== image.id);
    }
    onShowMore(image) {
    }
    onTitleChanged($event) {
        const { image, title } = $event;
        let originalImage = this.images.find(item => item.id === image.id);
        if (originalImage) {
            originalImage.title = title;
        }
    }
};
GalleryComponent.ctorParameters = () => [
    { type: _services_gallery_sandbox_service__WEBPACK_IMPORTED_MODULE_2__["GallerySandboxService"] }
];
GalleryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-gallery',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./gallery.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/features/gallery/gallery.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./gallery.component.scss */ "./src/app/features/gallery/gallery.component.scss")).default]
    })
], GalleryComponent);



/***/ }),

/***/ "./src/app/features/gallery/gallery.module.ts":
/*!****************************************************!*\
  !*** ./src/app/features/gallery/gallery.module.ts ***!
  \****************************************************/
/*! exports provided: GalleryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryModule", function() { return GalleryModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ant-design/icons-angular/icons */ "./node_modules/@ant-design/icons-angular/fesm2015/ant-design-icons-angular-icons.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js");
/* harmony import */ var _gallery_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gallery.component */ "./src/app/features/gallery/gallery.component.ts");
/* harmony import */ var _gallery_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gallery-routing.module */ "./src/app/features/gallery/gallery-routing.module.ts");
/* harmony import */ var _components_image_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/image-card */ "./src/app/components/image-card/index.ts");

// ANGULAR



// VENDORS



// APP



const icons = [_ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_5__["DeleteOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_5__["EditOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_5__["MoreOutline"]];
let GalleryModule = class GalleryModule {
};
GalleryModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _gallery_component__WEBPACK_IMPORTED_MODULE_7__["GalleryComponent"],
            _components_image_card__WEBPACK_IMPORTED_MODULE_9__["ImageCardComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _gallery_routing_module__WEBPACK_IMPORTED_MODULE_8__["GalleryRoutingModule"],
            ng_lazyload_image__WEBPACK_IMPORTED_MODULE_6__["LazyLoadImageModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NgZorroAntdModule"]
        ],
        providers: [
            {
                provide: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NZ_ICONS"], useValue: icons
            }
        ]
    })
], GalleryModule);



/***/ }),

/***/ "./src/app/features/gallery/index.ts":
/*!*******************************************!*\
  !*** ./src/app/features/gallery/index.ts ***!
  \*******************************************/
/*! exports provided: GalleryModule, GalleryComponent, GallerySandboxService, GalleryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _gallery_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gallery.module */ "./src/app/features/gallery/gallery.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GalleryModule", function() { return _gallery_module__WEBPACK_IMPORTED_MODULE_1__["GalleryModule"]; });

/* harmony import */ var _gallery_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery.component */ "./src/app/features/gallery/gallery.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GalleryComponent", function() { return _gallery_component__WEBPACK_IMPORTED_MODULE_2__["GalleryComponent"]; });

/* harmony import */ var _services_gallery_sandbox_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/gallery.sandbox.service */ "./src/app/features/gallery/services/gallery.sandbox.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GallerySandboxService", function() { return _services_gallery_sandbox_service__WEBPACK_IMPORTED_MODULE_3__["GallerySandboxService"]; });

/* harmony import */ var _services_gallery_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/gallery.service */ "./src/app/features/gallery/services/gallery.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GalleryService", function() { return _services_gallery_service__WEBPACK_IMPORTED_MODULE_4__["GalleryService"]; });








/***/ }),

/***/ "./src/app/features/gallery/services/gallery.sandbox.service.ts":
/*!**********************************************************************!*\
  !*** ./src/app/features/gallery/services/gallery.sandbox.service.ts ***!
  \**********************************************************************/
/*! exports provided: GallerySandboxService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GallerySandboxService", function() { return GallerySandboxService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _gallery_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery.service */ "./src/app/features/gallery/services/gallery.service.ts");

// ANGULAR


let GallerySandboxService = class GallerySandboxService {
    constructor(galleryService) {
        this.galleryService = galleryService;
    }
    getList(page = 1, perPage = 10, orderBy = 'latest') {
        return this.galleryService.getList(page, perPage, orderBy)
            .then(res => res.map((img) => {
            return {
                id: img.id,
                title: img.description || 'Add a title',
                src: `https://source.unsplash.com/${img.id}/290x250`,
                pixelSrc: `https://source.unsplash.com/${img.id}/5x5`,
                alt: img.alt_description
            };
        }));
    }
};
GallerySandboxService.ctorParameters = () => [
    { type: _gallery_service__WEBPACK_IMPORTED_MODULE_2__["GalleryService"] }
];
GallerySandboxService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], GallerySandboxService);



/***/ }),

/***/ "./src/app/features/gallery/services/gallery.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/features/gallery/services/gallery.service.ts ***!
  \**************************************************************/
/*! exports provided: GalleryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryService", function() { return GalleryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _share_services_image_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../share/services/image.service */ "./src/app/share/services/image.service.ts");

// ANGULAR


let GalleryService = class GalleryService {
    constructor(imgApi) {
        this.imgApi = imgApi;
    }
    getList(page = 1, perPage = 10, orderBy = 'latest') {
        return this.imgApi.getList(page, perPage, orderBy);
    }
};
GalleryService.ctorParameters = () => [
    { type: _share_services_image_service__WEBPACK_IMPORTED_MODULE_2__["ImageService"] }
];
GalleryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], GalleryService);



/***/ })

}]);
//# sourceMappingURL=features-gallery-es2015.js.map