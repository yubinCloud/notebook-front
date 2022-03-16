---
title: ES6 模块化与异步编程
permalink: /base/es6-modeule-and-async
date: 2022/03/16
---

## 1. ES6 模块化

### 1.1 前端的模块化规范

在 ES6 模块化规范诞生之前，JavaScript 社区已经尝试并提出了 AMD、CMD、CommonJS 等模块化规范。但是，这些由社区提出的模块化标准，还是存在一定的差异性与局限性，**并不是浏览器与服务器通用的模块化标准**，例如：

+ AMD 和 CMD 适用于浏览器端的 Javascript 模块化 【已废弃】
+ CommonJS 适用于服务器端的 Javascript 模块化

> node.js 遵循了 **CommonJS** 的模块化规范。其中：
>
> + 导入其它模块使用 `require()` 方法
> + 模块对外共享成员使用 `module.exports` 对象

太多的模块化规范给开发者增加了学习的难度与开发的成本。因此，**大一统的 ES6 模块化**规范诞生了！

### 1.2 ES6 的模块化规范

ES6 模块化规范是浏览器端与服务器端**通用的模块化开发规范**。ES6 模块化规范中定义：

+ 每个 js 文件都是一个独立的模块
+ 导入其它模块成员使用 **import** 关键字
+ 向外共享模块成员使用 **export** 关键字

> **如何在 node.js 中体验 ES6 模块化**？<u>node.js 中默认仅支持 CommonJS 模块化规范</u>，若想基于 node.js 体验与学习 ES6 的模块化语法，可以按照如下两个步骤进行配置：
>
> 1. 确保安装了 v14.15.1 或更高版本的 node.js
> 2. 在 package.json 的根节点中添加 `"type": "module"` 节点

### 1.3 ES6 模块化的基本语法