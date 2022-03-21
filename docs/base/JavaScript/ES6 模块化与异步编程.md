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

```javascript
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

```javascript
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

```javascript {4}
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

async/await 是 ES8（ECMAScript 2017）引入的新语法，用来**简化 Promise 异步操作**。

> `.then` 链式调用解决了回调地狱的问题，但也有代码冗余、阅读性差、 不易理解的缺点。

使用 async/await 简化 Promise 异步操作的示例代码如下：

```javascript
import thenFs from 'then-fs'

async function getAllFile() {
  console.log('B')
  const r1 = await thenFs.readFile('./files/1.txt', 'utf8')
  console.log(r1)
  const r2 = await thenFs.readFile('./files/2.txt', 'utf8')
  console.log(r2)
  const r3 = await thenFs.readFile('./files/3.txt', 'utf8')
  console.log(r3)
}
```

使用**注意事项**：

+ 如果在 function 中使用了 await，则 function **必须**被 async 修饰
+ 在 async 方法中，**第一个 await 之前的代码会同步执行**，await **之后的代码会异步执行**，参考该示例：

```javascript
import thenFs from 'then-fs'

console.log('A')

async function getAllFile() {
  console.log('B')
  const r1 = await thenFs.readFile('./files/1.txt', 'utf8')
  const r2 = await thenFs.readFile('./files/2.txt', 'utf8')
  const r3 = await thenFs.readFile('./files/3.txt', 'utf8')
  console.log(r1, r2, r3)
  console.log('D')
}

getAllFile()
console.log('C')
```

执行结果为：

```
A
B
C
111 222 333
D
```

原因是首先执行 `console.log('A')`，然后调用 `getAllFile()`，该函数在第一个 await 之前是同步执行，因此执行 `console.log('B')` ，而后后面的代码需要异步执行，因此主线程退出该函数的执行，先去执行 `console.log('C')`，当异步操作执行完毕后，便继续执行了剩下的两个打印操作。

## 4. EventLoop

### 4.1 同步任务与异步任务

JavaScript 是一门单线程执行的编程语言。也就是说，同一时间只能做一件事情。

![image-20220320163659215](https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/image-20220320163659215.png)

单线程执行任务队列的问题： 如果前一个任务非常耗时，则后续的任务就不得不一直等待，从而导致**程序假死的问题**。

为了防止某个耗时任务导致程序假死的问题，JavaScript 把待执行的任务分为了两类：

1. 同步任务（synchronous）
   + 又叫做非耗时任务，指的是在主线程上排队执行的那些任务
   + 只有前一个任务执行完毕，才能执行后一个任务
2. 异步任务（asynchronous）
   + 又叫做耗时任务，异步任务由 JavaScript **委托给宿主环境**进行执行
   + 当异步任务执行完成后，会通知 JavaScript 主线程执行异步任务的回调函数

### 4.2 同步任务和异步任务的执行过程

<img src="https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/image-20220320164328594.png" alt="image-20220320164328594" style="zoom:80%;" />

1. 同步任务由 JavaScript 主线程次序执行
2. 异步任务**委托给**宿主环境执行
3. 已完成的异步任务**对应的回调函数**，会被**加入到任务队列中**等待执行
4. JavaScript 主线程的**执行栈被清空后**，会读取任务队列中的回调函数，次序执行
5. JavaScript 主线程不断重复上面的第 4 步

### 4.3 EventLoop 基本概念

JavaScript 主线程**从“任务队列”中读取**异步任务的回调函数，**放到执行栈中**依次执行。这 个过程是循环不断的，所以整个的这种运行机制又称为 **EventLoop**（事件循环）。

结合 EventLoop 分析输出的顺序：

```javascript
import thenFs from 'then-fs'

console.log('A')
thenFs.readFile('./files/1.txt', 'utf8').then(dataStr => {
    console.log('B')
})
setTimeout(() => {
    console.log('C')
}, 0)
console.log('D')
```

正确结果：ADCB，原因：

+ A 和 D 属于同步任务，会根据代码的先后顺序依次被执行
+ C 和 B 属于异步任务。它们的回调函数会被加入到任务队列中，等待主线程空闲时再执行

## 5. 宏任务和微任务

JavaScript 把异步任务又做了进一步的划分，异步任务又分为两类：

1. **宏任务**（macrotask）
   + 异步 Ajax 请求
   + setTimeout、setInterval
   + 文件操作
   + 其它宏任务
2. **微任务**（microtask）
   + Promise.then、.catch 和 .finally
   + process.nextTick
   + 其它微任务

宏任务和微任务的**执行顺序**：每一个宏任务执行完之后，都会检查是否存在待执行的微任务，如果有，则执行完所有微任务之后，再继续执行下一个宏任务。

::: tip 面试题

分析以下代码输出的顺序：

```javascript
setTimeout(function () {
    console.log('1')
})

new Promise(function (resolve) {
    console.log('2')
    resolve()
}).then(function () {
    console.log('3')
})

console.log('4')
```

正确输出顺序：2431

分析：

+ 先执行所有的同步任务：第 6 和 12 行
+ 再执行微任务：第 9 行
+ 再执行下一个宏任务：第 2 行

:::



