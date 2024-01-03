---
title: 主题(Theme)
order: 7
---

## getTheme
> 获取主题值

```js
map.getTheme(key)
```

参数：
key(`string`): 主题 key

## setTheme
> 设置主题

```js
map.setTheme(key,value)
```

参数：   
#### key 
(`string`): 主题 key   
#### value
(`Record<string,any>`) 主题对应的值

## clearTheme
> 清空主题

```js
// 初始化整个theme
map.clearTheme();
// 初始化单个theme
map.clearTheme(key)
```

参数：   
#### key 
(`string`): 主题 key   

