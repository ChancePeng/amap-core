---
title: 遮罩分组(CoverGroup)
order: 5
---

## getGroup
> 获取分组
```js
map.getGroup(key)
```



参数：
key    
类型：`string`   
描述：group Key

## removeGroup
> 删除分组
```js
map.removeGroup(key)
```



参数：
key    
类型：`string`   
描述：group Key


## createOverlayGroup
> 创建overlayGroup

```js
map.createOverLayGroup(overlays,opts)
```
### 参数
|  参数   | 类型  | 描述 |
|  ----  | ----  | ----  |
| overlays  | any[] | 遮罩数组 |
| opts  | {id:string} | 分组id|


该方法类似于
```js
new AMap.OverlayGroup(overlays)
```



返回的实例，具有`AMap.OverlayGroup`的所有特性

还包含以下实例方法：

### destroy
> 销毁 `overlays`   
> 此方法会销毁创建的所有`overlays`

### setTheme
> 设置 `overlays` 主题 


参数：
接收一个`string`，为主题的key值


### findOverlays
> 在分组中查找

参数：
接收一个`Function`，此`Function`返回`boolean`值，

结果：
返回一个数组：数组第一项为查找到的`overlays`构成的 `overlayGroup`，第二项为剩余的`overlayGroup`

### setFitView
> 将当前分组 至于地图中央

## createLayers


> 创建 `layerGroup`
> 与 `createOverlayGroup` 类似

### findLayers
> 在分组中查找

参数：
接收一个`Function`，此`Function`返回`boolean`值，

结果：
返回一个数组：数组第一项为查找到的`layers`构成的 `layerGroup`，第二项为剩余的`layerGroup`