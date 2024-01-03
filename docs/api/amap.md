---
title: 高德
order: 3
---

## 获取高德map实例

```js
const mapInstance = map.getMap();
// 可调用原生高德map api
// 例如获取中心点
mapInstance.getCenter()
```

## 设置高德map实例

amap-core依赖于高德map实例，相关操作需绑定map实例

```js

import AMapCore from '@change/amap-core';
// 初始化时设置
const amapCore = new AMapCore(mapInstance);

// 获取map实例
const map = amapCore.getMap();

// 通过map实例设置高德map实例
map.setMap(mapInstance)

```