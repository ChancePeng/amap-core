---
title: 描述
order: 1
nav:
  title: API文档
---

### 使用之前 <Badge>info</Badge>

> `amap-core`依赖于高德地图的map实例对象，在使用之前，请确保，您已获取到了`AMap.Map`并且与`core`绑定

### 注意 getMap方法

```js
(new Core()).getMap()
```

此`getMap()`方法为获取`core`中的`map`可操作实例，并非 高德地图中的`AMap.Map`

如果想获取`AMap.Map`,
您需要再次调用`getMap()`方法


```js
(new Core()).getMap().getMap()
```