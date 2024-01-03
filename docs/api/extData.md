---
title: 临时数据(ExtData)
order: 6
---


## getExtData
> 获取临时数据

```js
map.getExtData(key)
```

参数：
key(`string`): 数据key


## setExtData
> 设置临时数据

```js
map.getExtData(key,value)
```

参数：
key(`string`): 数据key
value(`any`): 数据


## clearExtData
> 设置临时数据

```js
map.clearExtData(key)
map.clearExtData()
```

参数：
key(`string`): 数据key
1. 传入`key`时，只清空对应`key`的数据
2. 不传key，初始化临时数据