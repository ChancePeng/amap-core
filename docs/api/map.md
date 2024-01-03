---
title: map
order: 2
---

## 初始化工具

```js
import AMapCore from '@change/amap-core';

const amapCore = new AMapCore(map);
// 获取map实例
const map = amapCore.getMap();
```

## 获取操作实例对象



```js
import AMapCore from '@change/amap-core';

const amapCore = new AMapCore();
// 获取map实例
const map = amapCore.getMap();

// 添加一个遮罩
map.add(AMap.Polygon,{
  path:[]
})
```
