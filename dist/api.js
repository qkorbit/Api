/** ApiJS - (c) Orbit 2018 - MIT Licensed */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Api = factory());
}(this, (function () { 'use strict';

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
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var hasConsole = typeof console !== 'undefined';
function warn() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    if (hasConsole)
        console.warn.apply(console, arg);
}
function log() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    if (hasConsole)
        console.log.apply(console, arg);
}
function error() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    if (hasConsole)
        console.error.apply(console, arg);
}

function obj2formData(obj) {
    var data = new FormData();
    Object.keys(obj).forEach(function (key) { return data.append(key, obj[key]); });
    return data;
}
var copyProp = function (o, t) { return Object.keys(o).forEach(function (e) { return t[e] = o[e]; }); };
var Obj2QueryString = function (o) { return Object.keys(o).map(function (e) { return e + '=' + o[e]; }).join('&'); };
var queryStringMark = function (url) { return /\?/.test(url) ? '&' : '?'; };

var $head = document.getElementsByTagName('head')[0];
function generateCallbackID() {
    return "jsonp_" + Date.now() + "_" + Math.ceil(Math.random() * 100000);
}
function clearJsonp(id) {
    window[id] = undefined;
}
function removeScript(id) {
    $head.removeChild(document.getElementById(id));
}
function injectScript(id, src) {
    var script = document.createElement('script');
    script.id = id;
    script.setAttribute('src', src);
    $head.appendChild(script);
}
function createJsonp(_a) {
    var href = _a.href, timeout = _a.timeout, callbackName = _a.callbackName, callbackId = _a.callbackId;
    var id = callbackId || generateCallbackID();
    var src = "" + href + queryStringMark(href) + callbackName + "=" + id;
    return new Promise(function (resolve, reject) {
        var timeoutId = setTimeout(function () {
            error("JSONP request to " + src + " timed out");
            reject(src);
            clearJsonp(id);
            removeScript(id);
        }, timeout);
        window[id] = function (res) {
            resolve(res);
            if (timeoutId)
                clearTimeout(timeoutId);
            clearJsonp(id);
            removeScript(id);
        };
        injectScript(id, src);
    });
}

function setHeaders(xhr, headerList) {
    for (var key in headerList) {
        xhr.setRequestHeader(key, headerList[key]);
    }
}
function bindEvents(xhr, eventList) {
    Object.keys(eventList).forEach(function (event) {
        xhr.addEventListener(event, eventList[event]);
    });
    if (typeof eventList.uploadProgress === 'function' && xhr.upload) {
        xhr.upload.addEventListener('progress', eventList.uploadProgress);
    }
}
function createAjax(_a) {
    var url = _a.url, search = _a.search, input = _a.input, dataType = _a.dataType, methods = _a.methods, async = _a.async, withCredentials = _a.withCredentials, header = _a.header, timeout = _a.timeout, xhrEvent = _a.xhrEvent;
    var xhr = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        var data = dataType === 'json' ? search.slice(1) : obj2formData(input);
        xhr.withCredentials = withCredentials;
        xhr.timeout = timeout;
        xhr.open(methods, url, async);
        setHeaders(xhr, header);
        xhr.send(data);
        bindEvents(xhr, xhrEvent);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var rep = xhr.response;
                    if (typeof rep !== 'object') {
                        rep = JSON.parse(rep);
                    }
                    resolve(rep);
                }
                else {
                    reject(xhr);
                }
            }
        };
    });
}

var REGEXP_URL = /^([a-z][a-z\d\+\-\.]*:)?\/\//i;
var DEFAULT_OPTIONS = {
    domain: window.location.href,
    methods: 'GET',
    dataType: 'json',
    timeout: 10000,
    useMock: false,
    input: {},
    mock: {},
    callbackName: 'callback',
    callbackId: 0,
    withCredentials: false,
    urlModel: 0,
    debug: false,
    async: true,
    filter: function (n) { return n; },
    header: {},
    xhrEvent: {}
};

var Entity = (function () {
    function Entity(arg) {
        this.mixins(arg);
    }
    Entity.prototype.mixins = function (origin) {
        copyProp(origin, this);
    };
    Object.defineProperty(Entity.prototype, "href", {
        get: function () {
            return this.url + this.search;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "search", {
        get: function () {
            return queryStringMark(this.url) + Obj2QueryString(this.filter(this.input));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "url", {
        get: function () {
            var _a = this, urlModel = _a.urlModel, domain = _a.domain, namespace = _a.namespace;
            if (urlModel === 1) {
                return domain;
            }
            else {
                return REGEXP_URL.test(namespace) ? namespace : domain + namespace;
            }
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.send = function () {
        if (this.debug)
            log("" + this.namespace, this.input);
        if (this.useMock) {
            return Promise.resolve(this.mock);
        }
        else if (this.dataType === 'jsonp') {
            return createJsonp(this);
        }
        else {
            return createAjax(this);
        }
    };
    return Entity;
}());

var SET = {};
var COMMON = {};
var Api = {
    define: function (namespace, config) {
        if (config === void 0) { config = {}; }
        if (SET[namespace])
            warn("redefine " + namespace);
        SET[namespace] = new Entity(config);
    },
    config: function (config) {
        if (config === void 0) { config = {}; }
        copyProp(config, COMMON);
    },
    require: function (namespace, data, config) {
        if (data === void 0) { data = {}; }
        if (config === void 0) { config = {}; }
        if (!SET[namespace])
            this.define(namespace);
        var entity = SET[namespace];
        entity.mixins(__assign({}, DEFAULT_OPTIONS, COMMON, entity, config, { namespace: namespace, input: data }));
        return entity.send();
    },
    get: function (namespace) {
        return SET[namespace];
    }
};

return Api;

})));
