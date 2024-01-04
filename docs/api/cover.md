---
title: 遮罩(Cover)
order: 4
---

# Cover实例：

## id
```js
const cover = map.get(key)

console.log(cover.id)
```

## setTheme

```js
const cover = map.get(key)
cover.setTheme('default')
```

## destroy
```js
const cover = map.get(key)
cover.destroy()
```


# 方法：


## create
> 创建遮罩
```js

map.add(Constructor,opts)
```


### 参数 

|  参数   | 类型  | 描述 |
|  ----  | ----  | ----  |
| Constructor  | AMap.Overlay or AMap.Layer |遮罩构造器 |
| opts  | any | 构造器参数|

除了遮罩原有opts外，还包含以下options

|  参数   | 类型  | 描述 |
|  ----  | ----  | ----  |
| id  | string | 遮罩id |
| theme  | string | 遮罩使用的主题|


## add
> 添加遮罩
> 参数与 `create`相同，此方法创建遮罩后，将自动添加到地图
```js
map.add(Constructor,opts)
```

## get
获取遮罩

```js
map.get(key)
```
参数：

key (`string`)：遮罩id

## remove
移除遮罩

```js

map.remove(key)


```
参数：

key (`string`)：遮罩id

## setFitView
居中图层


```js

map.setFitView(key)

// or
const polygon = new AMap.Polygon();
map.setFitView(polygon)
// 此时类似于高德`AMap.Map.setFitView`方法



```

参数：

key (`string`|`AMap.Overlay`|`AMap.Layer`)