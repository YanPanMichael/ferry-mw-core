/**
 * @property {Array} middlewares stack
 * @property {BFetchInstance} http
 * @property {Function} originalAdapter
 */
export default class HttpMiddlewareService {
    middlewares: any[];
    http: any;
    originalAdapter: any;
    chain: any[];
    /**
     * @param {BFetchInstance} [bfetch]
     */
    constructor(bfetch: any);
    /**
     * @param {BFetchInstance} bfetch
     * @returns {HttpMiddlewareService}
     */
    setHttp(bfetch: any): this;
    /**
     * @returns {HttpMiddlewareService}
     */
    unsetHttp(): this;
    /**
     * @param {Object|HttpMiddleware} [middleware]
     * @returns {boolean} true if the middleware is already registered.
     */
    has(middleware: any): boolean;
    /**
     * Adds a middleware or an array of middlewares to the stack.
     * @param {Object|HttpMiddleware|Array} [middlewares]
     * @returns {HttpMiddlewareService}
     */
    register(middlewares: any): this;
    /**
     * Removes a middleware from the registered stack.
     * @param {Object|HttpMiddleware} [middleware]
     * @returns {HttpMiddlewareService}
     */
    unregister(middleware: any): this;
    /**
     * Removes all the middleware from the stack.
     * @returns {HttpMiddlewareService}
     */
    reset(): this;
    /**
     * @param config
     * @returns {Promise}
     */
    adapter(config: any): any;
    /**
     *
     * @param {Object} middleware
     * @private
     */
    _addMiddleware(middleware: any): void;
    /**
     * @private
     */
    _updateChain(): void;
    /**
     * @param {Promise} promise
     * @returns {Promise}
     * @private
     */
    _onSync(promise: any): any;
}
