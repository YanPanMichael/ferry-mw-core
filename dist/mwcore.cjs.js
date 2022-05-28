/*!
* @ferry-middleware/ferry-mw-core with v0.1.0
* Author: yanpan
* Built on 2022-05-28, 19:44:14
* Released under the MIT License Copyright (c) 2022
*/
'use strict';/**
 * @property {Array} middlewares stack
 * @property {FerryInstance} http
 * @property {Function} originalAdapter
 */
var HttpMiddlewareService = /** @class */ (function () {
    /**
     * @param {FerryInstance} [ferry]
     */
    function HttpMiddlewareService(ferry) {
        this.middlewares = [];
        this._updateChain();
        this.setHttp(ferry);
    }
    /**
     * @param {FerryInstance} ferry
     * @returns {HttpMiddlewareService}
     */
    HttpMiddlewareService.prototype.setHttp = function (ferry) {
        var _this = this;
        this.unsetHttp();
        if (ferry) {
            this.http = ferry;
            this.originalAdapter = ferry.defaults.adapter;
            ferry.defaults.adapter = function (config) { return _this.adapter(config); };
        }
        return this;
    };
    /**
     * @returns {HttpMiddlewareService}
     */
    HttpMiddlewareService.prototype.unsetHttp = function () {
        if (this.http) {
            this.http.defaults.adapter = this.originalAdapter;
            this.http = null;
        }
        return this;
    };
    /**
     * @param {Object|HttpMiddleware} [middleware]
     * @returns {boolean} true if the middleware is already registered.
     */
    HttpMiddlewareService.prototype.has = function (middleware) {
        return this.middlewares.indexOf(middleware) > -1;
    };
    /**
     * Adds a middleware or an array of middlewares to the stack.
     * @param {Object|HttpMiddleware|Array} [middlewares]
     * @returns {HttpMiddlewareService}
     */
    HttpMiddlewareService.prototype.register = function (middlewares) {
        var _this = this;
        // eslint-disable-next-line no-param-reassign
        if (!Array.isArray(middlewares))
            middlewares = [middlewares];
        // Test if middlewares are registered more than once.
        middlewares.forEach(function (middleware) {
            if (!middleware)
                return;
            if (_this.has(middleware)) {
                throw new Error('Middleware already registered');
            }
            _this.middlewares.push(middleware);
            _this._addMiddleware(middleware);
        });
        return this;
    };
    /**
     * Removes a middleware from the registered stack.
     * @param {Object|HttpMiddleware} [middleware]
     * @returns {HttpMiddlewareService}
     */
    HttpMiddlewareService.prototype.unregister = function (middleware) {
        if (middleware) {
            var index = this.middlewares.indexOf(middleware);
            if (index > -1) {
                this.middlewares.splice(index, 1);
            }
            this._updateChain();
        }
        return this;
    };
    /**
     * Removes all the middleware from the stack.
     * @returns {HttpMiddlewareService}
     */
    HttpMiddlewareService.prototype.reset = function () {
        this.middlewares.length = 0;
        this._updateChain();
        return this;
    };
    /**
     * @param config
     * @returns {Promise}
     */
    HttpMiddlewareService.prototype.adapter = function (config) {
        return this.chain.reduce(function (acc, _a) {
            var onResolve = _a[0], onError = _a[1];
            return acc.then(onResolve, onError);
        }, Promise.resolve(config));
    };
    /**
     *
     * @param {Object} middleware
     * @private
     */
    HttpMiddlewareService.prototype._addMiddleware = function (middleware) {
        this.chain.unshift([
            middleware.onRequest && (function (conf) { return middleware.onRequest(conf); }),
            middleware.onRequestError && (function (error) { return middleware.onRequestError(error); }),
        ]);
        this.chain.push([
            middleware.onResponse && (function (response) { return middleware.onResponse(response); }),
            middleware.onResponseError && (function (error) { return middleware.onResponseError(error); }),
        ]);
    };
    /**
     * @private
     */
    HttpMiddlewareService.prototype._updateChain = function () {
        var _this = this;
        this.chain = [[function (conf) { return _this._onSync(_this.originalAdapter.call(_this.http, conf)); }, undefined]];
        this.middlewares.forEach(function (middleware) { return _this._addMiddleware(middleware); });
    };
    /**
     * @param {Promise} promise
     * @returns {Promise}
     * @private
     */
    HttpMiddlewareService.prototype._onSync = function (promise) {
        return this.middlewares.reduce(function (acc, middleware) { return (middleware.onSync ? middleware.onSync(acc) : acc); }, promise);
    };
    return HttpMiddlewareService;
}());var index = {
    Service: HttpMiddlewareService,
    version: '0.1.0',
};module.exports=index;