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

ES6 的模块化主要包含如下 3 种用法：

1. 默认导出与默认导入
2. 按需导出与按需导入
3. 直接导入并执行模块中的代码

#### 1.3.1 默认导出与默认导入

**默认导出**语法：`export default 默认导出的成员`

```js
let n1 = 10
let n2 = 20
function show() {}

export default {
  n1,
  show
}
```

+ 每个模块中，<u>只允许使用唯一的一次 export default</u>，否则会报错！

**默认导入**语法：` import 接收名称 from '模块标识符'`

```js
// 从 '默认导出.js' 模块中导入 export default 向外共享的成员
// 并使用 m1 进行接收
import m1 from './默认导出.js'

// 打印结果： `{ n1: 10, show: [Function: show]}`
console.log(m1)
```

+ 默认导入时的<u>接收名称可以任意名称</u>，只要是合法的成员名称即可

#### 1.3.2 按需导出与按需导入

**按需导出**语法： `export 按需导出的成员`

```js
export let s1 = 'aaa'
export let s2 = 'ccc'
export function say() {}
```

**按需导入**语法： `import { s1 } from '模块标识符’`

```js
import { s1, s2, say } from './按需导出.js'

console.log(s1)
```

::: warning 注意事项

+ 每个模块中可以使用**多次**按需导出
+ 按需**导入的成员名称**必须和按需**导出的名称**保持**一致**
+ 按需导入时，可以使用 **as 关键字**进行重命名
+ 按需导入可以和默认导入一起使用

:::

#### 1.3.3 直接导入并执行模块中的代码

如果**只想单纯地执行某个模块中的代码**，并不需要得到模块中向外共享的成员。此时，可以直接导入并执行模块代码，示例代码如下：

```js
// 直接导入并执行该模块的代码，并不需要得到模块向外共享的成员
import './something.js'
```

