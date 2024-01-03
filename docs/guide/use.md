---
title: 快速上手
---


## 安装


使用 `npm`的方式安装:
```shell
$ npm install @change/amap-core
```

使用 `yarn`方式安装
```shell
$ yarn add @change/amap-core
```

## 使用

### 基本使用

```js
import AMapCore from '@change/amap-core';

const amapCore = new AMapCore();

const map = amapCore.getMap()
```