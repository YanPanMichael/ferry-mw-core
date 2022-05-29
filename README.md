# @ferry-middleware/ferry-mw-core

> By YanPan

## 简介
[ferry] HTTP 中间件核心服务，用于简化通过 ferry 发出的 HTTP 请求的hooks钩子
它适用于全局 ferry 和实例对象。

## 为什么不使用拦截器？

使用 ferry 拦截器会使代码与 ferry 实例紧密耦合并且更难进行功能测试。

作为中间件服务模块核心：
- 与 ferry 的松耦合
- 非常容易测试中间件类

它提高了集中式挂钩策略的可读性和可重用性。

## 使用示例

```javascript
import ferry, { ferryPst } from '@ferry-core/ferry';
import { Service } from '@ferry-middleware/ferry-mw-core';

const service = new Service(ferry);

service.register({
  onRequest(config) {
    console.log('onRequest');
    return config;
  },
  onSync(promise) {
    console.log('onSync');
    return promise;
  },
  onResponse(response) {
    console.log('onResponse');
    return response;
  }
});

console.log('Ready to fetch.');

// Just use ferryPst like you would normally.
ferryPst('https://jsonplaceholder.typicode.com/posts/1')
  .then(({ data }) => console.log('Received:', data));
```
