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

## 2. Promise

多层回调函数的相互嵌套，就形成了**回调地狱**：

<img src="https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/image-20220316185535927.png" alt="image-20220316185535927" style="zoom: 67%;" />

+ 代码耦合性太强，难以维护
+ 大量冗余的代码相互嵌套，代码的可读性变差

为了解决回调地狱的问题，ES6（ECMAScript 2015）中新增了 **Promise** 的概念。

### 2.1 Promise 基本概念

**Promise 是一个构造函数**

+ 我们可以创建 Promise 的实例：`const p = new Promise()`
+ new 出来的 Promise 实例对象，**代表一个异步操作**

**Promise.prototype 上包含一个 .then() 方法**

+ 每一次 new Promise() 构造函数得到的实例对象，都可以通过原型链的方式访问到 .then() 方法，例如 `p.then()`

**.then() 方法用来预先指定成功和失败的回调函数**

+ `p.then(成功的回调函数，失败的回调函数)`
+ ` p.then(result => { }, error => { })`
+ 调用 .then() 方法时，<u>成功的回调函数是必选的</u>、失败的回调函数是可选的

### 2.2 读取文件示例

#### 2.2.1 then-fs 的基本使用

由于 node.js 官方提供的 fs 模块仅支持以回调函数的方式读取文件，不支持 Promise 的调用方式。因此，需要先运行如下的命令，安装 **then-fs** 这个第三方包，从而支持我们基于 Promise 的方式读取文件的内容：

```sh
npm install then-fs
```

调用 then-fs 提供的 `readFile()` 方法，可以异步地读取文件的内容，它的返回值是 Promise 的实例对象。因此可以调用 `.then()` 方法为每个 Promise 异步操作指定成功和失败之后的回调函数。示例代码如下：

```js
import thenFs from 'then-fs'  // 从第三方库中导入 thenFs

thenFs.readFile('./files/1.txt', 'utf8').then((r1) => {console.log(r1)})
thenFs.readFile('./files/2.txt', 'utf8').then((r2) => {console.log(r2)})
thenFs.readFile('./files/3.txt', 'utf8').then((r3) => {console.log(r3)})
```

注意，**上述的代码无法保证文件的读取顺序**，需要做进一步的改进！

#### 2.2.2 基于 Promise 按顺序读取文件的内容

**.then 方法的特性**：如果上一个 .then() 方法中**返回了一个新的 Promise 实例**对象，则可以通过下一个 .then() 继续进行处理。通过 .then() 方法的**链式调用**，就解决了回调地狱的问题。

Promise 支持链式调用，从而来解决回调地狱的问题。示例代码如下：

```javascript {5,9,13}
import thenFs from 'then-fs'

thenFs
  .readFile('./files/11.txt', 'utf8')
  .then((r1) => {
    console.log(r1)
    return thenFs.readFile('./files/2.txt', 'utf8')
  })
  .then((r2) => {
    console.log(r2)
    return thenFs.readFile('./files/3.txt', 'utf8')
  })
  .then((r3) => {
    console.log(r3)
  })
```

#### 2.2.3 通过 .catch 捕获错误

在 Promise 的链式操作中如果发生了错误，可以使用 `Promise.prototype.catch` 方法进行捕获和处理：

```javascript {5}
import thenFs from 'then-fs'

thenFs
  .readFile('./files/1.txt', 'utf8')
  .catch((err) => {
    console.log(err.message)
  })
  .then((r1) => {
    console.log(r1)
    return thenFs.readFile('./files/2.txt', 'utf8')
  })
  .then((r2) => {
    console.log(r2)
    return thenFs.readFile('./files/3.txt', 'utf8')
  })
  .then((r3) => {
    console.log(r3)
  })
```

+ 当读取 `1.txt` 发生失败后，错误会被 `.catch` 捕获并处理，之后再调用后面的 `then` 方法

### 2.3 `Promise.all()` 方法

`Promise.all()` 方法会发起并行的 Promise 异步操作，**等所有的异步操作全部结束后**才会执行下一步的 .then  操作（等待机制）。

```javascript
import thenFs from 'then-fs'

const promiseArr = [
  thenFs.readFile('./files/3.txt', 'utf8'),
  thenFs.readFile('./files/2.txt', 'utf8'),
  thenFs.readFile('./files/1.txt', 'utf8'),
]

Promise.all(promiseArr).then(result => {
    console.log(result)
})
```

+ 注意：数组中 Promise 实例的顺序，就是最终结果的顺序！

### 2.4 `Promise.race()` 方法

`Promise.race()` 方法会发起并行的 Promise 异步操作，**只要任何一个异步操作完成，就立即执行下一步的 .then 操作**（赛跑机制）。示例代码如下：

```javascript
import thenFs from 'then-fs'

const promiseArr = [
  thenFs.readFile('./files/3.txt', 'utf8'),
  thenFs.readFile('./files/2.txt', 'utf8'),
  thenFs.readFile('./files/1.txt', 'utf8'),
]

Promise.race(promiseArr).then(result => {
  console.log(result)
})
```

### 2.5 基于 Promise 封装读文件的方法

方法的封装要求：

1. 方法的名称要定义为 `getFile`
2. 方法接收一个**形参 fpath**，表示要读取的文件的路径
3. 方法的**返回值**为 Promise 实例对象

其基本定义如下：

```javascript
function getFile(fpath) {
    return new Promise();  // 方法的返回值为 Promise 的实例对象
}
```

+ `new Promise()` 只是创建了一个形式上的异步操作。

#### 2.5.1 创建具体的异步操作

如果想要创建具体的异步操作，则需要在 `new Promise()` 构造函数期间，**传递一个 function 函数，将具体的异步操作定义到 function 函数内部**。示例代码如下：

```javascript
import fs from 'fs'

function getFile(fpath) {
  return new Promise(function () {
    fs.readFile(fpath, 'utf8', (err, dataStr) => { })
  })
}
```

#### 2.5.2 获取 .then 的两个实参

通过 `.then()` 指定的成功和失败的回调函数，可以在 function 的**形参中**进行接收，示例代码如下：

![image-20220320143725613](https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/image-20220320143725613.png)

Promise 异步操作的结果，可以调用 resolve 或 reject 回调函数进行处理。示例代码如下：

```javascript
function getFile(fpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
      if (err) return reject(err)
      resolve(dataStr)
    })
  })
}
```

至此，我们的封装完成了，现在我们测试一下：

```javascript
getFile('./files/11.txt')
  .then((r1) => {
    console.log(r1)
  })
  .catch((err) => console.log(err.message))
```

## 3. async / await

// TODO