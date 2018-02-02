# ApiJS
[![Build Status](https://www.travis-ci.org/qkorbit/Api.svg?branch=master)](https://www.travis-ci.org/qkorbit/Api)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fqkorbit%2FApi.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fqkorbit%2FApi?ref=badge_shield)
[![Coverage Status](https://coveralls.io/repos/github/qkorbit/Api/badge.svg)](https://coveralls.io/github/qkorbit/Api)
> Api.js 是一款基于 promise 的 JavaScript（TypeScript）库，它对异步请求进行封装，提供常规的 ajax 请求和前端开发上的数据模拟

[English](/README.md)

## 特性

* 😃 简洁友好的使用方式
* 🐶 提供浏览器端发起 XMLHttpRequests 和 JSONP
* 🦄 前端开发中假数据模拟
* 🚀 轻量高效， <2Kb gziped
* 😛 支持 IE9+

## 快速开始

### 安装

Install with yarn

```bash
$ yarn add api-mock-js
```

or with npm

```bash 
$ npm install api-mock-js --save
```

### 使用

```javascript
import Api from 'api-mock-js'

// 全局配置
Api.config({
  domain: 'http://your.domain.com/api', // The baseURL
  dataType: 'jsonp'
})

// 定义 /edit 接口的假数据
Api.define('/edit', {
  input: {
    id: 0,
    name: '-_-'
  },
  mock: {
    code: 0,
    msg: '',
    data: {}
  }
})

Api.require('/edit', {
  id: 123,
  name: '--_--'
},{
  useMock: true
}).then(res => {
  console.log(res)
})

Api.require('/news', {
  date: '2017-12-12',
}).then(res => {
  console.log(res)
})

// 用 POST 方式请求 /user 接口
Api.require('/user', {
  id: 456
},{
  methods: 'POST',
  dataType: 'json',
  header: {
    "Content-type": "application/x-www-form-urlencoded"
  }
}).then(res => {
  console.log(res)
})

```

### Promises

ApiJS 依赖于原生 `ES6 Promise`，要在不支持该语法的浏览器中使用，可以引入 [polyfill](https://github.com/jakearchibald/es6-promise)

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fqkorbit%2FApi.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fqkorbit%2FApi)
