# Export一个服务实例

```javascript
import ferry from '@ferry-core/ferry';
import { Service } from '@ferry-middleware/ferry-mw-core';
import i18n from './i18n';
import { LocaleMiddleware, OtherMiddleware } from './middlewares';

// Create a new service instance
const service = new Service(ferry);

// Then register your middleware instances.
service.register([
  new LocaleMiddleware(i18n),
  new OtherMiddleware()
]);

export default service;
```
