var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-gallery"], {
        /***/ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js": 
        /*!**********************************************************************!*\
          !*** ./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js ***!
          \**********************************************************************/
        /*! exports provided: LazyLoadImageDirective, LazyLoadImageModule, intersectionObserverPreset, scrollPreset */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadImageDirective", function () { return LazyLoadImageDirective; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadImageModule", function () { return LazyLoadImageModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersectionObserverPreset", function () { return intersectionObserverPreset; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollPreset", function () { return scrollPreset; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
            /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
            var cssClassNames = {
                loaded: 'ng-lazyloaded',
                loading: 'ng-lazyloading',
                failed: 'ng-failed-lazyloaded'
            };
            function removeCssClassName(element, cssClassName) {
                element.className = element.className.replace(cssClassName, '');
            }
            function addCssClassName(element, cssClassName) {
                if (!element.className.includes(cssClassName)) {
                    element.className += " " + cssClassName;
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
                    element.style.backgroundImage = "url('" + imagePath + "')";
                }
                return element;
            }
            function setSources(attrName) {
                return function (image) {
                    var sources = image.parentElement.getElementsByTagName('source');
                    for (var i = 0; i < sources.length; i++) {
                        var attrValue = sources[i].getAttribute(attrName);
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
            var setSourcesToDefault = setSources('defaultImage');
            var setSourcesToLazy = setSources('lazyLoad');
            var setSourcesToError = setSources('errorImage');
            function setImageAndSources(setSourcesFn) {
                return function (element, imagePath, useSrcset) {
                    if (isImageElement(element) && isChildOfPicture(element)) {
                        setSourcesFn(element);
                    }
                    if (imagePath) {
                        setImage(element, imagePath, useSrcset);
                    }
                };
            }
            var setImageAndSourcesToDefault = setImageAndSources(setSourcesToDefault);
            var setImageAndSourcesToLazy = setImageAndSources(setSourcesToLazy);
            var setImageAndSourcesToError = setImageAndSources(setSourcesToError);
            var end = function (_a) {
                var element = _a.element;
                return addCssClassName(element, cssClassNames.loaded);
            };
            var loadImage = function (_a) {
                var element = _a.element, useSrcset = _a.useSrcset, imagePath = _a.imagePath, decode = _a.decode;
                var img;
                if (isImageElement(element) && isChildOfPicture(element)) {
                    var parentClone = element.parentNode.cloneNode(true);
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
                    return img.decode().then(function () { return imagePath; });
                }
                return new Promise(function (resolve, reject) {
                    img.onload = function () { return resolve(imagePath); };
                    img.onerror = function () { return reject(null); };
                });
            };
            var setErrorImage = function (_a) {
                var element = _a.element, errorImagePath = _a.errorImagePath, useSrcset = _a.useSrcset;
                setImageAndSourcesToError(element, errorImagePath, useSrcset);
                addCssClassName(element, cssClassNames.failed);
            };
            var setLoadedImage = function (_a) {
                var element = _a.element, imagePath = _a.imagePath, useSrcset = _a.useSrcset;
                setImageAndSourcesToLazy(element, imagePath, useSrcset);
            };
            var setup = function (_a) {
                var element = _a.element, defaultImagePath = _a.defaultImagePath, useSrcset = _a.useSrcset;
                setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
                if (hasCssClassName(element, cssClassNames.loaded)) {
                    removeCssClassName(element, cssClassNames.loaded);
                }
            };
            var isBot = function (navigator) {
                if (navigator && navigator.userAgent) {
                    return /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|duckduckbot/i.test(navigator.userAgent);
                }
                return false;
            };
            var sharedPreset = {
                finally: end,
                loadImage: loadImage,
                setErrorImage: setErrorImage,
                setLoadedImage: setLoadedImage,
                setup: setup,
                isBot: isBot
            };
            var observers = new WeakMap();
            var intersectionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
            function loadingCallback(entrys) {
                entrys.forEach(function (entry) { return intersectionSubject.next(entry); });
            }
            var uniqKey = {};
            var getIntersectionObserver = function (attributes) {
                var scrollContainerKey = attributes.scrollContainer || uniqKey;
                var options = {
                    root: attributes.scrollContainer || null
                };
                if (attributes.offset) {
                    options.rootMargin = attributes.offset + "px";
                }
                var observer = observers.get(scrollContainerKey);
                if (!observer) {
                    observer = new IntersectionObserver(loadingCallback, options);
                    observers.set(scrollContainerKey, observer);
                }
                observer.observe(attributes.element);
                return rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].create(function (obs) {
                    var subscription = intersectionSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (entry) { return entry.target === attributes.element; })).subscribe(obs);
                    return function () {
                        subscription.unsubscribe();
                        observer.unobserve(attributes.element);
                    };
                });
            };
            var isVisible = function (_a) {
                var event = _a.event;
                return event.isIntersecting;
            };
            var getObservable = function (attributes, _getInterObserver) {
                if (_getInterObserver === void 0) { _getInterObserver = getIntersectionObserver; }
                if (attributes.customObservable) {
                    return attributes.customObservable;
                }
                return _getInterObserver(attributes);
            };
            var intersectionObserverPreset = Object.assign({}, sharedPreset, {
                isVisible: isVisible,
                getObservable: getObservable
            });
            var isVisible$1 = function () {
                return true;
            };
            var getObservable$1 = function () {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])('load');
            };
            var loadImage$1 = function (_a) {
                var imagePath = _a.imagePath;
                return [imagePath];
            };
            var ssrPreset = Object.assign({}, sharedPreset, {
                isVisible: isVisible$1,
                getObservable: getObservable$1,
                loadImage: loadImage$1
            });
            function createHooks(platformId, options) {
                var defaultPreset = intersectionObserverPreset;
                var isBot = options && options.isBot ? options.isBot : defaultPreset.isBot;
                if (isBot(getNavigator(), platformId)) {
                    return Object.assign(ssrPreset, { isBot: isBot });
                }
                else if (!options) {
                    return defaultPreset;
                }
                var hooks = {};
                if (options.preset) {
                    Object.assign(hooks, options.preset);
                }
                else {
                    Object.assign(hooks, defaultPreset);
                }
                Object.keys(options)
                    .filter(function (key) { return key !== 'preset'; })
                    .forEach(function (key) {
                    hooks[key] = options[key];
                });
                return hooks;
            }
            function lazyLoadImage(hookSet, attributes) {
                return function (evntObservable) {
                    return evntObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (event) { return hookSet.isVisible({
                        element: attributes.element,
                        event: event,
                        offset: attributes.offset,
                        scrollContainer: attributes.scrollContainer
                    }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(function () { return hookSet.loadImage(attributes); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (imagePath) { return hookSet.setLoadedImage({
                        element: attributes.element,
                        imagePath: imagePath,
                        useSrcset: attributes.useSrcset
                    }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return true; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function () {
                        hookSet.setErrorImage(attributes);
                        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(false);
                    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () { return hookSet.finally(attributes); }));
                };
            }
            var LazyLoadImageDirective = /** @class */ (function () {
                function LazyLoadImageDirective(el, ngZone, platformId, options) {
                    this.onLoad = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"](); // Callback when an image is loaded
                    this.elementRef = el;
                    this.ngZone = ngZone;
                    this.propertyChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"]();
                    this.platformId = platformId;
                    this.hooks = createHooks(platformId, options);
                }
                LazyLoadImageDirective.prototype.ngOnChanges = function () {
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
                };
                LazyLoadImageDirective.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    // Don't do anything if SSR and the user isn't a bot
                    if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platformId) && !this.hooks.isBot(getNavigator(), this.platformId)) {
                        return null;
                    }
                    this.ngZone.runOutsideAngular(function () {
                        _this.scrollSubscription = _this.propertyChanges$
                            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (attributes) { return _this.hooks.setup(attributes); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (attributes) { return _this.hooks.getObservable(attributes).pipe(lazyLoadImage(_this.hooks, attributes)); }))
                            .subscribe(function (success) { return _this.onLoad.emit(success); });
                    });
                };
                LazyLoadImageDirective.prototype.ngOnDestroy = function () {
                    if (this.scrollSubscription) {
                        this.scrollSubscription.unsubscribe();
                    }
                };
                return LazyLoadImageDirective;
            }());
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
            var LazyLoadImageModule = LazyLoadImageModule_1 = /** @class */ (function () {
                function LazyLoadImageModule() {
                }
                LazyLoadImageModule.forRoot = function (options) {
                    return {
                        ngModule: LazyLoadImageModule_1,
                        providers: [{ provide: 'options', useValue: options }]
                    };
                };
                return LazyLoadImageModule;
            }());
            LazyLoadImageModule = LazyLoadImageModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
                    declarations: [LazyLoadImageDirective],
                    exports: [LazyLoadImageDirective]
                })
            ], LazyLoadImageModule);
            var Rect = /** @class */ (function () {
                function Rect(left, top, right, bottom) {
                    this.left = left;
                    this.top = top;
                    this.right = right;
                    this.bottom = bottom;
                }
                Rect.fromElement = function (element) {
                    var _a = element.getBoundingClientRect(), left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom;
                    if (left === 0 && top === 0 && right === 0 && bottom === 0) {
                        return Rect.empty;
                    }
                    else {
                        return new Rect(left, top, right, bottom);
                    }
                };
                Rect.fromWindow = function (_window) {
                    return new Rect(0, 0, _window.innerWidth, _window.innerHeight);
                };
                Rect.prototype.inflate = function (inflateBy) {
                    this.left -= inflateBy;
                    this.top -= inflateBy;
                    this.right += inflateBy;
                    this.bottom += inflateBy;
                };
                Rect.prototype.intersectsWith = function (rect) {
                    return rect.left < this.right && this.left < rect.right && rect.top < this.bottom && this.top < rect.bottom;
                };
                Rect.prototype.getIntersectionWith = function (rect) {
                    var left = Math.max(this.left, rect.left);
                    var top = Math.max(this.top, rect.top);
                    var right = Math.min(this.right, rect.right);
                    var bottom = Math.min(this.bottom, rect.bottom);
                    if (right >= left && bottom >= top) {
                        return new Rect(left, top, right, bottom);
                    }
                    else {
                        return Rect.empty;
                    }
                };
                return Rect;
            }());
            Rect.empty = new Rect(0, 0, 0, 0);
            var scrollListeners = new WeakMap();
            function sampleObservable(obs, scheduler) {
                return obs.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["sampleTime"])(100, scheduler), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''));
            }
            // Only create one scroll listener per target and share the observable.
            // Typical, there will only be one observable per application
            var getScrollListener = function (scrollTarget) {
                if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
                    console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["empty"])();
                }
                var scrollListener = scrollListeners.get(scrollTarget);
                if (scrollListener) {
                    return scrollListener;
                }
                var srollEvent = rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].create(function (observer) {
                    var eventName = 'scroll';
                    var handler = function (event) { return observer.next(event); };
                    var options = { passive: true, capture: false };
                    scrollTarget.addEventListener(eventName, handler, options);
                    return function () { return scrollTarget.removeEventListener(eventName, handler, options); };
                });
                var listener = sampleObservable(srollEvent);
                scrollListeners.set(scrollTarget, listener);
                return listener;
            };
            var isVisible$2 = function (_a, getWindow) {
                var element = _a.element, offset = _a.offset, scrollContainer = _a.scrollContainer;
                if (getWindow === void 0) { getWindow = function () { return window; }; }
                var elementBounds = Rect.fromElement(element);
                if (elementBounds === Rect.empty) {
                    return false;
                }
                var windowBounds = Rect.fromWindow(getWindow());
                elementBounds.inflate(offset);
                if (scrollContainer) {
                    var scrollContainerBounds = Rect.fromElement(scrollContainer);
                    var intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
                    return elementBounds.intersectsWith(intersection);
                }
                else {
                    return elementBounds.intersectsWith(windowBounds);
                }
            };
            var getObservable$2 = function (attributes) {
                if (attributes.customObservable) {
                    return attributes.customObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''));
                }
                if (attributes.scrollContainer) {
                    return getScrollListener(attributes.scrollContainer);
                }
                return getScrollListener(window);
            };
            var scrollPreset = Object.assign({}, sharedPreset, {
                isVisible: isVisible$2,
                getObservable: getObservable$2
            });
            //# sourceMappingURL=ng-lazyload-image.js.map
            /***/ 
        }),
        /***/ "./node_modules/ngx-infinite-scroll/modules/ngx-infinite-scroll.js": 
        /*!*************************************************************************!*\
          !*** ./node_modules/ngx-infinite-scroll/modules/ngx-infinite-scroll.js ***!
          \*************************************************************************/
        /*! exports provided: InfiniteScrollDirective, InfiniteScrollModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrollDirective", function () { return InfiniteScrollDirective; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrollModule", function () { return InfiniteScrollModule; });
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
            /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * @param {?} selector
             * @param {?} scrollWindow
             * @param {?} defaultElement
             * @param {?} fromRoot
             * @return {?}
             */
            function resolveContainerElement(selector, scrollWindow, defaultElement, fromRoot) {
                /** @type {?} */
                var hasWindow = window && !!window.document && window.document.documentElement;
                /** @type {?} */
                var container = hasWindow && scrollWindow ? window : defaultElement;
                if (selector) {
                    /** @type {?} */
                    var containerIsString = selector && hasWindow && typeof selector === 'string';
                    container = containerIsString
                        ? findElement(selector, defaultElement.nativeElement, fromRoot)
                        : selector;
                    if (!container) {
                        throw new Error('ngx-infinite-scroll {resolveContainerElement()}: selector for');
                    }
                }
                return container;
            }
            /**
             * @param {?} selector
             * @param {?} customRoot
             * @param {?} fromRoot
             * @return {?}
             */
            function findElement(selector, customRoot, fromRoot) {
                /** @type {?} */
                var rootEl = fromRoot ? window.document : customRoot;
                return rootEl.querySelector(selector);
            }
            /**
             * @param {?} prop
             * @return {?}
             */
            function inputPropChanged(prop) {
                return prop && !prop.firstChange;
            }
            /**
             * @return {?}
             */
            function hasWindowDefined() {
                return typeof window !== 'undefined';
            }
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var VerticalProps = {
                clientHeight: "clientHeight",
                offsetHeight: "offsetHeight",
                scrollHeight: "scrollHeight",
                pageYOffset: "pageYOffset",
                offsetTop: "offsetTop",
                scrollTop: "scrollTop",
                top: "top"
            };
            /** @type {?} */
            var HorizontalProps = {
                clientHeight: "clientWidth",
                offsetHeight: "offsetWidth",
                scrollHeight: "scrollWidth",
                pageYOffset: "pageXOffset",
                offsetTop: "offsetLeft",
                scrollTop: "scrollLeft",
                top: "left"
            };
            var AxisResolver = /** @class */ (function () {
                /**
                 * @param {?=} vertical
                 */
                function AxisResolver(vertical) {
                    if (vertical === void 0) { vertical = true; }
                    this.vertical = vertical;
                    this.propsMap = vertical ? VerticalProps : HorizontalProps;
                }
                /**
                 * @return {?}
                 */
                AxisResolver.prototype.clientHeightKey = function () {
                    return this.propsMap.clientHeight;
                };
                /**
                 * @return {?}
                 */
                AxisResolver.prototype.offsetHeightKey = function () {
                    return this.propsMap.offsetHeight;
                };
                /**
                 * @return {?}
                 */
                AxisResolver.prototype.scrollHeightKey = function () {
                    return this.propsMap.scrollHeight;
                };
                /**
                 * @return {?}
                 */
                AxisResolver.prototype.pageYOffsetKey = function () {
                    return this.propsMap.pageYOffset;
                };
                /**
                 * @return {?}
                 */
                AxisResolver.prototype.offsetTopKey = function () {
                    return this.propsMap.offsetTop;
                };
                /**
                 * @return {?}
                 */
                AxisResolver.prototype.scrollTopKey = function () {
                    return this.propsMap.scrollTop;
                };
                /**
                 * @return {?}
                 */
                AxisResolver.prototype.topKey = function () {
                    return this.propsMap.top;
                };
                return AxisResolver;
            }());
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * @record
             */
            /**
             * @record
             */
            /**
             * @record
             */
            /**
             * @record
             */
            /**
             * @param {?} alwaysCallback
             * @param {?} shouldFireScrollEvent
             * @param {?} isTriggeredCurrentTotal
             * @return {?}
             */
            function shouldTriggerEvents(alwaysCallback, shouldFireScrollEvent, isTriggeredCurrentTotal) {
                if (alwaysCallback && shouldFireScrollEvent) {
                    return true;
                }
                if (!isTriggeredCurrentTotal && shouldFireScrollEvent) {
                    return true;
                }
                return false;
            }
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * @param {?} __0
             * @return {?}
             */
            function createResolver(_a) {
                var windowElement = _a.windowElement, axis = _a.axis;
                return createResolverWithContainer({ axis: axis, isWindow: isElementWindow(windowElement) }, windowElement);
            }
            /**
             * @param {?} resolver
             * @param {?} windowElement
             * @return {?}
             */
            function createResolverWithContainer(resolver, windowElement) {
                /** @type {?} */
                var container = resolver.isWindow || (windowElement && !windowElement.nativeElement)
                    ? windowElement
                    : windowElement.nativeElement;
                return Object.assign({}, resolver, { container: container });
            }
            /**
             * @param {?} windowElement
             * @return {?}
             */
            function isElementWindow(windowElement) {
                /** @type {?} */
                var isWindow = ['Window', 'global'].some(function (obj) { return Object.prototype.toString.call(windowElement).includes(obj); });
                return isWindow;
            }
            /**
             * @param {?} isContainerWindow
             * @param {?} windowElement
             * @return {?}
             */
            function getDocumentElement(isContainerWindow, windowElement) {
                return isContainerWindow ? windowElement.document.documentElement : null;
            }
            /**
             * @param {?} element
             * @param {?} resolver
             * @return {?}
             */
            function calculatePoints(element, resolver) {
                /** @type {?} */
                var height = extractHeightForElement(resolver);
                return resolver.isWindow
                    ? calculatePointsForWindow(height, element, resolver)
                    : calculatePointsForElement(height, element, resolver);
            }
            /**
             * @param {?} height
             * @param {?} element
             * @param {?} resolver
             * @return {?}
             */
            function calculatePointsForWindow(height, element, resolver) {
                var axis = resolver.axis, container = resolver.container, isWindow = resolver.isWindow;
                var _a = extractHeightPropKeys(axis), offsetHeightKey = _a.offsetHeightKey, clientHeightKey = _a.clientHeightKey;
                // scrolled until now / current y point
                /** @type {?} */
                var scrolled = height +
                    getElementPageYOffset(getDocumentElement(isWindow, container), axis, isWindow);
                // total height / most bottom y point
                /** @type {?} */
                var nativeElementHeight = getElementHeight(element.nativeElement, isWindow, offsetHeightKey, clientHeightKey);
                /** @type {?} */
                var totalToScroll = getElementOffsetTop(element.nativeElement, axis, isWindow) +
                    nativeElementHeight;
                return { height: height, scrolled: scrolled, totalToScroll: totalToScroll, isWindow: isWindow };
            }
            /**
             * @param {?} height
             * @param {?} element
             * @param {?} resolver
             * @return {?}
             */
            function calculatePointsForElement(height, element, resolver) {
                var axis = resolver.axis, container = resolver.container;
                // perhaps use container.offsetTop instead of 'scrollTop'
                /** @type {?} */
                var scrolled = container[axis.scrollTopKey()];
                /** @type {?} */
                var totalToScroll = container[axis.scrollHeightKey()];
                return { height: height, scrolled: scrolled, totalToScroll: totalToScroll, isWindow: false };
            }
            /**
             * @param {?} axis
             * @return {?}
             */
            function extractHeightPropKeys(axis) {
                return {
                    offsetHeightKey: axis.offsetHeightKey(),
                    clientHeightKey: axis.clientHeightKey()
                };
            }
            /**
             * @param {?} __0
             * @return {?}
             */
            function extractHeightForElement(_a) {
                var container = _a.container, isWindow = _a.isWindow, axis = _a.axis;
                var _b = extractHeightPropKeys(axis), offsetHeightKey = _b.offsetHeightKey, clientHeightKey = _b.clientHeightKey;
                return getElementHeight(container, isWindow, offsetHeightKey, clientHeightKey);
            }
            /**
             * @param {?} elem
             * @param {?} isWindow
             * @param {?} offsetHeightKey
             * @param {?} clientHeightKey
             * @return {?}
             */
            function getElementHeight(elem, isWindow, offsetHeightKey, clientHeightKey) {
                if (isNaN(elem[offsetHeightKey])) {
                    /** @type {?} */
                    var docElem = getDocumentElement(isWindow, elem);
                    return docElem ? docElem[clientHeightKey] : 0;
                }
                else {
                    return elem[offsetHeightKey];
                }
            }
            /**
             * @param {?} elem
             * @param {?} axis
             * @param {?} isWindow
             * @return {?}
             */
            function getElementOffsetTop(elem, axis, isWindow) {
                /** @type {?} */
                var topKey = axis.topKey();
                // elem = elem.nativeElement;
                if (!elem.getBoundingClientRect) {
                    // || elem.css('none')) {
                    return;
                }
                return (elem.getBoundingClientRect()[topKey] +
                    getElementPageYOffset(elem, axis, isWindow));
            }
            /**
             * @param {?} elem
             * @param {?} axis
             * @param {?} isWindow
             * @return {?}
             */
            function getElementPageYOffset(elem, axis, isWindow) {
                /** @type {?} */
                var pageYOffset = axis.pageYOffsetKey();
                /** @type {?} */
                var scrollTop = axis.scrollTopKey();
                /** @type {?} */
                var offsetTop = axis.offsetTopKey();
                if (isNaN(window[pageYOffset])) {
                    return getDocumentElement(isWindow, elem)[scrollTop];
                }
                else if (elem.ownerDocument) {
                    return elem.ownerDocument.defaultView[pageYOffset];
                }
                else {
                    return elem[offsetTop];
                }
            }
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * @param {?} container
             * @param {?} distance
             * @param {?} scrollingDown
             * @return {?}
             */
            function shouldFireScrollEvent(container, distance, scrollingDown) {
                /** @type {?} */
                var remaining;
                /** @type {?} */
                var containerBreakpoint;
                if (container.totalToScroll <= 0) {
                    return false;
                }
                /** @type {?} */
                var scrolledUntilNow = container.isWindow ? container.scrolled : container.height + container.scrolled;
                if (scrollingDown) {
                    remaining =
                        (container.totalToScroll - scrolledUntilNow) / container.totalToScroll;
                    containerBreakpoint = distance.down / 10;
                }
                else {
                    /** @type {?} */
                    var totalHiddenContentHeight = container.scrolled + (container.totalToScroll - scrolledUntilNow);
                    remaining = container.scrolled / totalHiddenContentHeight;
                    containerBreakpoint = distance.up / 10;
                }
                /** @type {?} */
                var shouldFireEvent = remaining <= containerBreakpoint;
                return shouldFireEvent;
            }
            /**
             * @param {?} lastScrollPosition
             * @param {?} container
             * @return {?}
             */
            function isScrollingDownwards(lastScrollPosition, container) {
                return lastScrollPosition < container.scrolled;
            }
            /**
             * @param {?} lastScrollPosition
             * @param {?} container
             * @param {?} distance
             * @return {?}
             */
            function getScrollStats(lastScrollPosition, container, distance) {
                /** @type {?} */
                var scrollDown = isScrollingDownwards(lastScrollPosition, container);
                return {
                    fire: shouldFireScrollEvent(container, distance, scrollDown),
                    scrollDown: scrollDown
                };
            }
            /**
             * @param {?} position
             * @param {?} scrollState
             * @return {?}
             */
            /**
             * @param {?} totalToScroll
             * @param {?} scrollState
             * @return {?}
             */
            /**
             * @param {?} scrollState
             * @return {?}
             */
            /**
             * @param {?} scroll
             * @param {?} scrollState
             * @param {?} triggered
             * @param {?} isScrollingDown
             * @return {?}
             */
            /**
             * @param {?} totalToScroll
             * @param {?} scrollState
             * @param {?} isScrollingDown
             * @return {?}
             */
            /**
             * @param {?} scrollState
             * @param {?} scrolledUntilNow
             * @param {?} totalToScroll
             * @return {?}
             */
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var ScrollState = /** @class */ (function () {
                /**
                 * @param {?} __0
                 */
                function ScrollState(_a) {
                    var totalToScroll = _a.totalToScroll;
                    this.lastScrollPosition = 0;
                    this.lastTotalToScroll = 0;
                    this.totalToScroll = 0;
                    this.triggered = {
                        down: 0,
                        up: 0
                    };
                    this.totalToScroll = totalToScroll;
                }
                /**
                 * @param {?} position
                 * @return {?}
                 */
                ScrollState.prototype.updateScrollPosition = function (position) {
                    return (this.lastScrollPosition = position);
                };
                /**
                 * @param {?} totalToScroll
                 * @return {?}
                 */
                ScrollState.prototype.updateTotalToScroll = function (totalToScroll) {
                    if (this.lastTotalToScroll !== totalToScroll) {
                        this.lastTotalToScroll = this.totalToScroll;
                        this.totalToScroll = totalToScroll;
                    }
                };
                /**
                 * @param {?} scrolledUntilNow
                 * @param {?} totalToScroll
                 * @return {?}
                 */
                ScrollState.prototype.updateScroll = function (scrolledUntilNow, totalToScroll) {
                    this.updateScrollPosition(scrolledUntilNow);
                    this.updateTotalToScroll(totalToScroll);
                };
                /**
                 * @param {?} scroll
                 * @param {?} isScrollingDown
                 * @return {?}
                 */
                ScrollState.prototype.updateTriggeredFlag = function (scroll, isScrollingDown) {
                    if (isScrollingDown) {
                        this.triggered.down = scroll;
                    }
                    else {
                        this.triggered.up = scroll;
                    }
                };
                /**
                 * @param {?} totalToScroll
                 * @param {?} isScrollingDown
                 * @return {?}
                 */
                ScrollState.prototype.isTriggeredScroll = function (totalToScroll, isScrollingDown) {
                    return isScrollingDown
                        ? this.triggered.down === totalToScroll
                        : this.triggered.up === totalToScroll;
                };
                return ScrollState;
            }());
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * @param {?} config
             * @return {?}
             */
            function createScroller(config) {
                var scrollContainer = config.scrollContainer, scrollWindow = config.scrollWindow, element = config.element, fromRoot = config.fromRoot;
                /** @type {?} */
                var resolver = createResolver({
                    axis: new AxisResolver(!config.horizontal),
                    windowElement: resolveContainerElement(scrollContainer, scrollWindow, element, fromRoot)
                });
                /** @type {?} */
                var scrollState = new ScrollState({
                    totalToScroll: calculatePoints(element, resolver)
                });
                /** @type {?} */
                var options = {
                    container: resolver.container,
                    throttle: config.throttle
                };
                /** @type {?} */
                var distance = {
                    up: config.upDistance,
                    down: config.downDistance
                };
                return attachScrollEvent(options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(calculatePoints(element, resolver)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (positionStats) { return toInfiniteScrollParams(scrollState.lastScrollPosition, positionStats, distance); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_a) {
                    var stats = _a.stats;
                    return scrollState.updateScroll(stats.scrolled, stats.totalToScroll);
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_a) {
                    var fire = _a.fire, scrollDown = _a.scrollDown, totalToScroll = _a.stats.totalToScroll;
                    return shouldTriggerEvents(config.alwaysCallback, fire, scrollState.isTriggeredScroll(totalToScroll, scrollDown));
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_a) {
                    var scrollDown = _a.scrollDown, totalToScroll = _a.stats.totalToScroll;
                    scrollState.updateTriggeredFlag(totalToScroll, scrollDown);
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(toInfiniteScrollAction));
            }
            /**
             * @param {?} options
             * @return {?}
             */
            function attachScrollEvent(options) {
                /** @type {?} */
                var obs = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(options.container, 'scroll');
                // For an unknown reason calling `sampleTime()` causes trouble for many users, even with `options.throttle = 0`.
                // Let's avoid calling the function unless needed.
                // See https://github.com/orizens/ngx-infinite-scroll/issues/198
                if (options.throttle) {
                    obs = obs.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["sampleTime"])(options.throttle));
                }
                return obs;
            }
            /**
             * @param {?} lastScrollPosition
             * @param {?} stats
             * @param {?} distance
             * @return {?}
             */
            function toInfiniteScrollParams(lastScrollPosition, stats, distance) {
                var _a = getScrollStats(lastScrollPosition, stats, distance), scrollDown = _a.scrollDown, fire = _a.fire;
                return {
                    scrollDown: scrollDown,
                    fire: fire,
                    stats: stats
                };
            }
            /** @type {?} */
            var InfiniteScrollActions = {
                DOWN: '[NGX_ISE] DOWN',
                UP: '[NGX_ISE] UP'
            };
            /**
             * @param {?} response
             * @return {?}
             */
            function toInfiniteScrollAction(response) {
                var scrollDown = response.scrollDown, currentScrollPosition = response.stats.scrolled;
                return {
                    type: scrollDown ? InfiniteScrollActions.DOWN : InfiniteScrollActions.UP,
                    payload: {
                        currentScrollPosition: currentScrollPosition
                    }
                };
            }
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var InfiniteScrollDirective = /** @class */ (function () {
                /**
                 * @param {?} element
                 * @param {?} zone
                 */
                function InfiniteScrollDirective(element, zone) {
                    this.element = element;
                    this.zone = zone;
                    this.scrolled = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
                    this.scrolledUp = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
                    this.infiniteScrollDistance = 2;
                    this.infiniteScrollUpDistance = 1.5;
                    this.infiniteScrollThrottle = 150;
                    this.infiniteScrollDisabled = false;
                    this.infiniteScrollContainer = null;
                    this.scrollWindow = true;
                    this.immediateCheck = false;
                    this.horizontal = false;
                    this.alwaysCallback = false;
                    this.fromRoot = false;
                }
                /**
                 * @return {?}
                 */
                InfiniteScrollDirective.prototype.ngAfterViewInit = function () {
                    if (!this.infiniteScrollDisabled) {
                        this.setup();
                    }
                };
                /**
                 * @param {?} __0
                 * @return {?}
                 */
                InfiniteScrollDirective.prototype.ngOnChanges = function (_a) {
                    var infiniteScrollContainer = _a.infiniteScrollContainer, infiniteScrollDisabled = _a.infiniteScrollDisabled, infiniteScrollDistance = _a.infiniteScrollDistance;
                    /** @type {?} */
                    var containerChanged = inputPropChanged(infiniteScrollContainer);
                    /** @type {?} */
                    var disabledChanged = inputPropChanged(infiniteScrollDisabled);
                    /** @type {?} */
                    var distanceChanged = inputPropChanged(infiniteScrollDistance);
                    /** @type {?} */
                    var shouldSetup = (!disabledChanged && !this.infiniteScrollDisabled) ||
                        (disabledChanged && !infiniteScrollDisabled.currentValue) || distanceChanged;
                    if (containerChanged || disabledChanged || distanceChanged) {
                        this.destroyScroller();
                        if (shouldSetup) {
                            this.setup();
                        }
                    }
                };
                /**
                 * @return {?}
                 */
                InfiniteScrollDirective.prototype.setup = function () {
                    var _this = this;
                    if (hasWindowDefined()) {
                        this.zone.runOutsideAngular(function () {
                            _this.disposeScroller = createScroller({
                                fromRoot: _this.fromRoot,
                                alwaysCallback: _this.alwaysCallback,
                                disable: _this.infiniteScrollDisabled,
                                downDistance: _this.infiniteScrollDistance,
                                element: _this.element,
                                horizontal: _this.horizontal,
                                scrollContainer: _this.infiniteScrollContainer,
                                scrollWindow: _this.scrollWindow,
                                throttle: _this.infiniteScrollThrottle,
                                upDistance: _this.infiniteScrollUpDistance
                            }).subscribe(function (payload) { return _this.zone.run(function () { return _this.handleOnScroll(payload); }); });
                        });
                    }
                };
                /**
                 * @param {?} __0
                 * @return {?}
                 */
                InfiniteScrollDirective.prototype.handleOnScroll = function (_a) {
                    var type = _a.type, payload = _a.payload;
                    switch (type) {
                        case InfiniteScrollActions.DOWN:
                            return this.scrolled.emit(payload);
                        case InfiniteScrollActions.UP:
                            return this.scrolledUp.emit(payload);
                        default:
                            return;
                    }
                };
                /**
                 * @return {?}
                 */
                InfiniteScrollDirective.prototype.ngOnDestroy = function () {
                    this.destroyScroller();
                };
                /**
                 * @return {?}
                 */
                InfiniteScrollDirective.prototype.destroyScroller = function () {
                    if (this.disposeScroller) {
                        this.disposeScroller.unsubscribe();
                    }
                };
                return InfiniteScrollDirective;
            }());
            InfiniteScrollDirective.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                            selector: '[infiniteScroll], [infinite-scroll], [data-infinite-scroll]'
                        },] },
            ];
            /** @nocollapse */
            InfiniteScrollDirective.ctorParameters = function () { return [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
            ]; };
            InfiniteScrollDirective.propDecorators = {
                scrolled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
                scrolledUp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
                infiniteScrollDistance: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                infiniteScrollUpDistance: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                infiniteScrollThrottle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                infiniteScrollDisabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                infiniteScrollContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                scrollWindow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                immediateCheck: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                horizontal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                alwaysCallback: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                fromRoot: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
            };
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var InfiniteScrollModule = /** @class */ (function () {
                function InfiniteScrollModule() {
                }
                return InfiniteScrollModule;
            }());
            InfiniteScrollModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            declarations: [InfiniteScrollDirective],
                            exports: [InfiniteScrollDirective],
                            imports: [],
                            providers: []
                        },] },
            ];
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Angular library starter.
             * Build an Angular library compatible with AoT compilation & Tree shaking.
             * Written by Roberto Simonetti.
             * MIT license.
             * https://github.com/robisim74/angular-library-starter
             */
            /**
             * Entry point for all public APIs of the package.
             */
            /**
             * @fileoverview added by tsickle
             * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Generated bundle index. Do not edit.
             */
            //# sourceMappingURL=ngx-infinite-scroll.js.map
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/image-card/image-card.component.html": 
        /*!*******************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/image-card/image-card.component.html ***!
          \*******************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<nz-card [nzCover]=\"coverTemplate\"\n         [nzActions]=\"[actionSetting, actionEdit, actionEllipsis]\"\n         [nzHoverable]=\"true\"\n>\n  <nz-card-meta\n    nzTitle=\"{{img.title}}\"\n  ></nz-card-meta>\n</nz-card>\n<ng-template #coverTemplate>\n  <img src=\"{{img.pixelSrc}}\"/>\n  <img lazyLoad=\"{{img.src}}\">\n</ng-template>\n<ng-template #actionSetting>\n  <i nz-icon nzType=\"delete\" (click)=\"onDeleted(img)\"></i>\n</ng-template>\n<ng-template #actionEdit>\n  <i nz-icon nzType=\"edit\"\n     nz-popover\n     [nzPopoverContent]=\"editImageTitleTemplate\"\n     [(nzVisible)]=\"showPopover\"\n     nzTitle=\"Edit image title\"\n     nzPopoverTrigger=\"click\">\n  </i>\n</ng-template>\n<ng-template #actionEllipsis>\n  <i nz-icon nzType=\"more\" (click)=\"onShowMore(img)\"></i>\n</ng-template>\n\n<ng-template #editImageTitleTemplate>\n  <form nz-form [formGroup]=\"titleForm\" (ngSubmit)=\"submitForm(img)\" class=\"image-title-form\">\n    <nz-form-item>\n      <nz-form-control nzErrorTip=\"The title cant be empty\">\n        <input type=\"text\" nz-input formControlName=\"title\" placeholder=\"Insert title\" autofocus/>\n      </nz-form-control>\n    </nz-form-item>\n    <nz-form-item>\n      <nz-form-control>\n        <button nz-button nzType=\"primary\" style=\"float: right;\" [disabled]=\"titleForm.invalid\">Change</button>\n      </nz-form-control>\n    </nz-form-item>\n  </form>\n</ng-template>\n");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/features/gallery/gallery.component.html": 
        /*!***********************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/features/gallery/gallery.component.html ***!
          \***********************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<nz-layout class=\"gallery-page\">\n  <nz-header class=\"gallery-header\">\n    <nz-page-header nzTitle=\"My Gallery\" [nzSubtitle]=\"'Here you can find all your media'\"></nz-page-header>\n  </nz-header>\n  <nz-spin nzTip=\"Loading...\" [nzSpinning]=\"listLoading\" [nzDelay]=\"500\">\n    <nz-content class=\"gallery-content\" infiniteScroll (scrolled)=\"loadMore()\">\n      <div nz-row class=\"img-list-container\">\n        <div nz-col nzXs=\"12\" nzSm=\"12\" nzMd=\"8\" nzLg=\"6\" nzXl=\"6\"\n             style=\" padding: 15px; float: left!important;\"\n             *ngFor=\"let img of imgList\">\n          <app-image-card [img]=\"img\"\n                          (deleted)=\"onDelete($event)\"\n                          (showMore)=\"onShowMore($event)\"\n                          (titleChanged)=\"onTitleChanged($event)\">\n          </app-image-card>\n        </div>\n        <button\n          *ngIf=\"loadMoreSpinner\"\n          class=\"loading-button\"\n          nz-button nzType=\"link\"\n          nzLoading=\"true\"\n          nzSize=\"large\"\n          nzBlock=\"'true'\">\n          Loading...\n        </button>\n      </div>\n    </nz-content>\n  </nz-spin>\n</nz-layout>\n\n<nz-drawer\n  nzWrapClassName=\"image-detail-drawer\"\n  nzTitle=\"Image Info\"\n  [nzBodyStyle]=\"{ height: 'calc(100% - 55px)', overflow: 'auto'}\"\n  [nzVisible]=\"visible\"\n  (nzOnClose)=\"onClose()\"\n>\n  <div>\n    <nz-skeleton [nzActive]=\"true\" [nzLoading]=\"loadingImg\" [nzParagraph]=\"{ rows: 10 }\">\n      <nz-card [nzCover]=\"coverTemplate\" [nzBordered]=\"false\">\n        <nz-descriptions>\n          <nz-descriptions-item nzTitle=\"Id: \"> {{selectedImg?.id}}</nz-descriptions-item>\n        </nz-descriptions>\n        <nz-descriptions>\n          <nz-descriptions-item nzTitle=\"Created at: \"> {{selectedImg?.created_at | date}}</nz-descriptions-item>\n        </nz-descriptions>\n        <nz-descriptions>\n          <nz-descriptions-item nzTitle=\"Updated at: \"> {{selectedImg?.updated_at | date}}</nz-descriptions-item>\n        </nz-descriptions>\n        <nz-descriptions>\n          <nz-descriptions-item nzTitle=\"Tags: \">\n            <nz-tag style=\"margin-bottom: 5px;\" [nzColor]=\"'blue'\"\n                    *ngFor=\"let tag of selectedImg?.tags\">{{tag.title}}</nz-tag>\n          </nz-descriptions-item>\n        </nz-descriptions>\n        <ng-template #coverTemplate>\n          <img alt=\"example\" src=\"{{selectedImg?.urls?.small}}\"/>\n        </ng-template>\n      </nz-card>\n    </nz-skeleton>\n    <nz-divider></nz-divider>\n    <nz-skeleton [nzActive]=\"true\" [nzLoading]=\"loadingImg\" [nzAvatar]=\"true\">\n      <nz-card [nzBordered]=\"false\">\n        <nz-card-meta\n          [nzAvatar]=\"avatarTemplate\"\n          [nzTitle]=\"selectedImg?.user?.name\"\n          [nzDescription]=\"selectedImg?.user?.bio\"\n        ></nz-card-meta>\n        <ng-template #avatarTemplate>\n          <nz-avatar [nzSrc]=\"selectedImg?.user?.profile_image?.medium\" nzSize=\"large\"></nz-avatar>\n        </ng-template>\n      </nz-card>\n    </nz-skeleton>\n  </div>\n</nz-drawer>\n");
            /***/ 
        }),
        /***/ "./src/app/components/image-card/image-card.component.scss": 
        /*!*****************************************************************!*\
          !*** ./src/app/components/image-card/image-card.component.scss ***!
          \*****************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n}\n:host img {\n  position: absolute;\n  left: 0;\n  top: 0;\n  max-width: 100%;\n}\n:host .ng-lazyloaded {\n  opacity: 1;\n}\n:host ::ng-deep .ant-card {\n  background: transparent;\n}\n:host ::ng-deep .ant-card-actions {\n  background: transparent;\n  border-top: none;\n}\n:host ::ng-deep .ant-card-body {\n  background: #f0f2f5;\n  opacity: 1;\n  margin-top: -64px;\n  position: relative;\n}\n:host ::ng-deep .ant-card-cover {\n  width: auto;\n  height: 250px;\n  position: relative;\n  overflow: hidden;\n}\n.image-title-form {\n  width: 260px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hdmltYXNsYXRpMS9wcm9qZWN0cy9jbG91ZGluYXJ5L3NyYy9hcHAvY29tcG9uZW50cy9pbWFnZS1jYXJkL2ltYWdlLWNhcmQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvaW1hZ2UtY2FyZC9pbWFnZS1jYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsV0FBQTtBQ0RGO0FER0U7RUFDRSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsZUFBQTtBQ0RKO0FES0U7RUFDRSxVQUFBO0FDSEo7QURRSTtFQUNFLHVCQUFBO0FDTk47QURTSTtFQUNFLHVCQUFBO0VBQ0EsZ0JBQUE7QUNQTjtBRFVJO0VBQ0UsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQ1JOO0FEWUk7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUNWTjtBRGVBO0VBQ0UsWUFBQTtBQ1pGIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9pbWFnZS1jYXJkL2ltYWdlLWNhcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vdmFyaWFibGVzXCI7XG5cbjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgaW1nIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICB9XG5cblxuICAubmctbGF6eWxvYWRlZCB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuXG4gIDo6bmctZGVlcCB7XG5cbiAgICAuYW50LWNhcmQge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgfVxuXG4gICAgLmFudC1jYXJkLWFjdGlvbnMge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItdG9wOiBub25lO1xuICAgIH1cblxuICAgIC5hbnQtY2FyZC1ib2R5IHtcbiAgICAgIGJhY2tncm91bmQ6ICNmMGYyZjU7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgbWFyZ2luLXRvcDogLTY0cHg7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG5cbiAgICAuYW50LWNhcmQtY292ZXIge1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICBoZWlnaHQ6IDI1MHB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gIH1cbn1cblxuLmltYWdlLXRpdGxlLWZvcm0ge1xuICB3aWR0aDogMjYwcHg7XG59XG4iLCI6aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuOmhvc3QgaW1nIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbjpob3N0IC5uZy1sYXp5bG9hZGVkIHtcbiAgb3BhY2l0eTogMTtcbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWNhcmQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWNhcmQtYWN0aW9ucyB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItdG9wOiBub25lO1xufVxuOmhvc3QgOjpuZy1kZWVwIC5hbnQtY2FyZC1ib2R5IHtcbiAgYmFja2dyb3VuZDogI2YwZjJmNTtcbiAgb3BhY2l0eTogMTtcbiAgbWFyZ2luLXRvcDogLTY0cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWNhcmQtY292ZXIge1xuICB3aWR0aDogYXV0bztcbiAgaGVpZ2h0OiAyNTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uaW1hZ2UtdGl0bGUtZm9ybSB7XG4gIHdpZHRoOiAyNjBweDtcbn0iXX0= */");
            /***/ 
        }),
        /***/ "./src/app/components/image-card/image-card.component.ts": 
        /*!***************************************************************!*\
          !*** ./src/app/components/image-card/image-card.component.ts ***!
          \***************************************************************/
        /*! exports provided: ImageCardComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageCardComponent", function () { return ImageCardComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            // ANGULAR
            var ImageCardComponent = /** @class */ (function () {
                function ImageCardComponent(formBuilder) {
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
                /**
                 * angular init hook
                 */
                ImageCardComponent.prototype.ngOnInit = function () {
                    this.titleForm = this.formBuilder.group({
                        title: [this.img.title, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
                    });
                };
                /**
                 * emit the deleted img when delete icon is clicked
                 * @param img
                 */
                ImageCardComponent.prototype.onDeleted = function (img) {
                    this.deleted.emit(img);
                };
                /**
                 * emit the deleted img when show more icon is clicked
                 * @param img
                 */
                ImageCardComponent.prototype.onShowMore = function (img) {
                    this.showMore.emit(img);
                };
                /**
                 * emit the editable img with the text to replace the title
                 * emit only if the form is valid
                 * @param img
                 */
                ImageCardComponent.prototype.submitForm = function (img) {
                    if (this.titleForm.valid) {
                        this.showPopover = false;
                        // fire title changed with the new value
                        this.titleChanged.emit({ img: img, title: this.titleForm.controls['title'].value });
                    }
                };
                return ImageCardComponent;
            }());
            ImageCardComponent.ctorParameters = function () { return [
                { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }
            ]; };
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], ImageCardComponent.prototype, "img", void 0);
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
            /***/ 
        }),
        /***/ "./src/app/components/image-card/index.ts": 
        /*!************************************************!*\
          !*** ./src/app/components/image-card/index.ts ***!
          \************************************************/
        /*! exports provided: ImageCardComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _image_card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-card.component */ "./src/app/components/image-card/image-card.component.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageCardComponent", function () { return _image_card_component__WEBPACK_IMPORTED_MODULE_1__["ImageCardComponent"]; });
            /***/ 
        }),
        /***/ "./src/app/features/gallery/gallery-routing.module.ts": 
        /*!************************************************************!*\
          !*** ./src/app/features/gallery/gallery-routing.module.ts ***!
          \************************************************************/
        /*! exports provided: GalleryRoutingModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryRoutingModule", function () { return GalleryRoutingModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _gallery_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gallery.component */ "./src/app/features/gallery/gallery.component.ts");
            // ANGULAR
            // APP
            var routes = [
                {
                    path: '',
                    component: _gallery_component__WEBPACK_IMPORTED_MODULE_4__["GalleryComponent"]
                }
            ];
            var GalleryRoutingModule = /** @class */ (function () {
                function GalleryRoutingModule() {
                }
                return GalleryRoutingModule;
            }());
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
            /***/ 
        }),
        /***/ "./src/app/features/gallery/gallery.component.scss": 
        /*!*********************************************************!*\
          !*** ./src/app/features/gallery/gallery.component.scss ***!
          \*********************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = (".gallery-page .gallery-header {\n  background: transparent;\n}\n.gallery-page .loading-button:before {\n  background: transparent;\n}\n.gallery-page .gallery-content {\n  min-height: 100vh;\n}\n.gallery-page .img-list-container {\n  max-width: 1280px;\n  margin: 0 auto;\n}\n.image-detail-drawer {\n  width: 100% !important;\n  max-width: 400px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hdmltYXNsYXRpMS9wcm9qZWN0cy9jbG91ZGluYXJ5L3NyYy9hcHAvZmVhdHVyZXMvZ2FsbGVyeS9nYWxsZXJ5LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9mZWF0dXJlcy9nYWxsZXJ5L2dhbGxlcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSx1QkFBQTtBQ0FKO0FESUk7RUFDRSx1QkFBQTtBQ0ZOO0FETUU7RUFDRSxpQkFBQTtBQ0pKO0FET0U7RUFDRSxpQkFBQTtFQUNBLGNBQUE7QUNMSjtBRFNBO0VBQ0Usc0JBQUE7RUFDQSxnQkFBQTtBQ05GIiwiZmlsZSI6InNyYy9hcHAvZmVhdHVyZXMvZ2FsbGVyeS9nYWxsZXJ5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmdhbGxlcnktcGFnZSB7XG4gIC5nYWxsZXJ5LWhlYWRlciB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAubG9hZGluZy1idXR0b24ge1xuICAgICY6YmVmb3JlIHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgfVxuXG4gIC5nYWxsZXJ5LWNvbnRlbnQge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICB9XG5cbiAgLmltZy1saXN0LWNvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiAxMjgwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIH1cbn1cblxuLmltYWdlLWRldGFpbC1kcmF3ZXIge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuXG5cbiIsIi5nYWxsZXJ5LXBhZ2UgLmdhbGxlcnktaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG4uZ2FsbGVyeS1wYWdlIC5sb2FkaW5nLWJ1dHRvbjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbi5nYWxsZXJ5LXBhZ2UgLmdhbGxlcnktY29udGVudCB7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xufVxuLmdhbGxlcnktcGFnZSAuaW1nLWxpc3QtY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiAxMjgwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4uaW1hZ2UtZGV0YWlsLWRyYXdlciB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIG1heC13aWR0aDogNDAwcHg7XG59Il19 */");
            /***/ 
        }),
        /***/ "./src/app/features/gallery/gallery.component.ts": 
        /*!*******************************************************!*\
          !*** ./src/app/features/gallery/gallery.component.ts ***!
          \*******************************************************/
        /*! exports provided: GalleryComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryComponent", function () { return GalleryComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _services_gallery_sandbox_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/gallery.sandbox.service */ "./src/app/features/gallery/services/gallery.sandbox.service.ts");
            // ANGULAR
            var ITEMS_PER_PAGE = 12;
            var GalleryComponent = /** @class */ (function () {
                function GalleryComponent(sandbox) {
                    this.sandbox = sandbox;
                    /**
                     * array of images to display
                     */
                    this.imgList = [];
                    /**
                     * selected image for show more details
                     */
                    this.selectedImg = null;
                    /**
                     * show / hide img overlay
                     */
                    this.visible = false;
                    /**
                     * loader when getting selected img details
                     */
                    this.loadingImg = false;
                    /**
                     * loader when getting the lis of img
                     */
                    this.listLoading = true;
                    /**
                     * infinite scroll loader
                     */
                    this.loadMoreSpinner = false;
                    this.pageNumber = 1;
                }
                GalleryComponent.prototype.ngOnInit = function () {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
                        var _a, e_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = this;
                                    return [4 /*yield*/, this.sandbox.getList(this.pageNumber, ITEMS_PER_PAGE)];
                                case 1:
                                    _a.imgList = _b.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _b.sent();
                                    return [3 /*break*/, 3];
                                case 3:
                                    this.listLoading = false;
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                /**
                 * an cb for img remove
                 * remove the selected img from the array
                 * @param image
                 */
                GalleryComponent.prototype.onDelete = function (image) {
                    this.imgList = this.imgList.filter(function (item) { return item.id !== image.id; });
                };
                /**
                 * an cb for img show more
                 * extract the id of the img and open the show more overlay
                 * @param image
                 */
                GalleryComponent.prototype.onShowMore = function (image) {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
                        var _a, e_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    this.visible = true;
                                    this.loadingImg = true;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    _a = this;
                                    return [4 /*yield*/, this.sandbox.getPhoto(image.id)];
                                case 2:
                                    _a.selectedImg = _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_2 = _b.sent();
                                    return [3 /*break*/, 4];
                                case 4:
                                    this.loadingImg = false;
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                /**
                 * an cb for img edit
                 * find the selected img in the array and change the title
                 * @param $event
                 */
                GalleryComponent.prototype.onTitleChanged = function ($event) {
                    var img = $event.img, title = $event.title;
                    var originalImage = this.imgList.find(function (item) { return item.id === img.id; });
                    if (originalImage) {
                        originalImage.title = title;
                    }
                };
                /**
                 * a cb for the overlay close event
                 * close overlay and init selected image
                 */
                GalleryComponent.prototype.onClose = function () {
                    this.visible = false;
                    this.selectedImg = null;
                };
                /**
                 * load more images when scroll is getting to the distance
                 */
                GalleryComponent.prototype.loadMore = function () {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
                        var imgs, e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    imgs = [];
                                    this.loadMoreSpinner = true;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.sandbox.getList(++this.pageNumber, ITEMS_PER_PAGE)];
                                case 2:
                                    imgs = _a.sent();
                                    this.imgList = this.imgList.concat(imgs);
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_3 = _a.sent();
                                    return [3 /*break*/, 4];
                                case 4:
                                    this.loadMoreSpinner = false;
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                return GalleryComponent;
            }());
            GalleryComponent.ctorParameters = function () { return [
                { type: _services_gallery_sandbox_service__WEBPACK_IMPORTED_MODULE_2__["GallerySandboxService"] }
            ]; };
            GalleryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-gallery',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./gallery.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/features/gallery/gallery.component.html")).default,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./gallery.component.scss */ "./src/app/features/gallery/gallery.component.scss")).default]
                })
            ], GalleryComponent);
            /***/ 
        }),
        /***/ "./src/app/features/gallery/gallery.module.ts": 
        /*!****************************************************!*\
          !*** ./src/app/features/gallery/gallery.module.ts ***!
          \****************************************************/
        /*! exports provided: GalleryModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryModule", function () { return GalleryModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
            /* harmony import */ var _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ant-design/icons-angular/icons */ "./node_modules/@ant-design/icons-angular/fesm2015/ant-design-icons-angular-icons.js");
            /* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js");
            /* harmony import */ var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-infinite-scroll */ "./node_modules/ngx-infinite-scroll/modules/ngx-infinite-scroll.js");
            /* harmony import */ var _gallery_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gallery.component */ "./src/app/features/gallery/gallery.component.ts");
            /* harmony import */ var _gallery_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./gallery-routing.module */ "./src/app/features/gallery/gallery-routing.module.ts");
            /* harmony import */ var _components_image_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/image-card */ "./src/app/components/image-card/index.ts");
            // ANGULAR
            // VENDORS
            // APP
            var icons = [_ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_5__["DeleteOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_5__["EditOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_5__["MoreOutline"]];
            var GalleryModule = /** @class */ (function () {
                function GalleryModule() {
                }
                return GalleryModule;
            }());
            GalleryModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [
                        _gallery_component__WEBPACK_IMPORTED_MODULE_8__["GalleryComponent"],
                        _components_image_card__WEBPACK_IMPORTED_MODULE_10__["ImageCardComponent"]
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _gallery_routing_module__WEBPACK_IMPORTED_MODULE_9__["GalleryRoutingModule"],
                        ng_lazyload_image__WEBPACK_IMPORTED_MODULE_6__["LazyLoadImageModule"].forRoot({}),
                        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                        ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NgZorroAntdModule"],
                        ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_7__["InfiniteScrollModule"]
                    ],
                    providers: [
                        {
                            provide: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NZ_ICONS"], useValue: icons
                        }
                    ]
                })
            ], GalleryModule);
            /***/ 
        }),
        /***/ "./src/app/features/gallery/index.ts": 
        /*!*******************************************!*\
          !*** ./src/app/features/gallery/index.ts ***!
          \*******************************************/
        /*! exports provided: GalleryModule, GalleryComponent, GallerySandboxService, GalleryService */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _gallery_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gallery.module */ "./src/app/features/gallery/gallery.module.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GalleryModule", function () { return _gallery_module__WEBPACK_IMPORTED_MODULE_1__["GalleryModule"]; });
            /* harmony import */ var _gallery_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery.component */ "./src/app/features/gallery/gallery.component.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GalleryComponent", function () { return _gallery_component__WEBPACK_IMPORTED_MODULE_2__["GalleryComponent"]; });
            /* harmony import */ var _services_gallery_sandbox_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/gallery.sandbox.service */ "./src/app/features/gallery/services/gallery.sandbox.service.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GallerySandboxService", function () { return _services_gallery_sandbox_service__WEBPACK_IMPORTED_MODULE_3__["GallerySandboxService"]; });
            /* harmony import */ var _services_gallery_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/gallery.service */ "./src/app/features/gallery/services/gallery.service.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GalleryService", function () { return _services_gallery_service__WEBPACK_IMPORTED_MODULE_4__["GalleryService"]; });
            /***/ 
        }),
        /***/ "./src/app/features/gallery/services/gallery.sandbox.service.ts": 
        /*!**********************************************************************!*\
          !*** ./src/app/features/gallery/services/gallery.sandbox.service.ts ***!
          \**********************************************************************/
        /*! exports provided: GallerySandboxService */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GallerySandboxService", function () { return GallerySandboxService; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _gallery_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gallery.service */ "./src/app/features/gallery/services/gallery.service.ts");
            // ANGULAR
            var GallerySandboxService = /** @class */ (function () {
                function GallerySandboxService(galleryService) {
                    this.galleryService = galleryService;
                }
                /**
                 * get a pager options and return img card object
                 * @param page
                 * @param perPage
                 * @param orderBy
                 */
                GallerySandboxService.prototype.getList = function (page, perPage, orderBy) {
                    if (page === void 0) { page = 1; }
                    if (perPage === void 0) { perPage = 10; }
                    if (orderBy === void 0) { orderBy = 'latest'; }
                    return this.galleryService.getList(page, perPage, orderBy)
                        .then(function (res) { return res.map(function (img) {
                        return {
                            id: img.id,
                            title: img.description || 'Add a title',
                            src: "https://source.unsplash.com/" + img.id + "/290x250",
                            pixelSrc: "https://source.unsplash.com/" + img.id + "/5x5",
                            alt: img.alt_description
                        };
                    }); });
                };
                /**
                 * get a specific photo by id
                 * @param id
                 */
                GallerySandboxService.prototype.getPhoto = function (id) {
                    return this.galleryService.getPhoto(id);
                };
                return GallerySandboxService;
            }());
            GallerySandboxService.ctorParameters = function () { return [
                { type: _gallery_service__WEBPACK_IMPORTED_MODULE_2__["GalleryService"] }
            ]; };
            GallerySandboxService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
                    providedIn: 'root'
                })
            ], GallerySandboxService);
            /***/ 
        }),
        /***/ "./src/app/features/gallery/services/gallery.service.ts": 
        /*!**************************************************************!*\
          !*** ./src/app/features/gallery/services/gallery.service.ts ***!
          \**************************************************************/
        /*! exports provided: GalleryService */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryService", function () { return GalleryService; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _share_services_image_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../share/services/image.service */ "./src/app/share/services/image.service.ts");
            // ANGULAR
            var GalleryService = /** @class */ (function () {
                function GalleryService(imgApi) {
                    this.imgApi = imgApi;
                }
                /**
                 * get a pager options and return list of photos from the imgApi
                 * @param page
                 * @param perPage
                 * @param orderBy
                 */
                GalleryService.prototype.getList = function (page, perPage, orderBy) {
                    if (page === void 0) { page = 1; }
                    if (perPage === void 0) { perPage = 10; }
                    if (orderBy === void 0) { orderBy = 'latest'; }
                    return this.imgApi.getList(page, perPage, orderBy);
                };
                /**
                 * get a specific photo by id
                 * @param id
                 */
                GalleryService.prototype.getPhoto = function (id) {
                    return this.imgApi.getPhoto(id);
                };
                return GalleryService;
            }());
            GalleryService.ctorParameters = function () { return [
                { type: _share_services_image_service__WEBPACK_IMPORTED_MODULE_2__["ImageService"] }
            ]; };
            GalleryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
                    providedIn: 'root'
                })
            ], GalleryService);
            /***/ 
        })
    }]);
//# sourceMappingURL=features-gallery-es2015.js.map
//# sourceMappingURL=features-gallery-es5.js.map
//# sourceMappingURL=features-gallery-es5.js.map