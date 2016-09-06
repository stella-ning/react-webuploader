# react-webuploader ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
使用 webpack + react + es6 简单封装了 [webuploader](https://github.com/fex-team/webuploader) HTML5上传的部分. 并包含了文件队列，进度显示的功能.

---
# USAGE

## WebUploader模块
封装了WebUploader并能显示文件列表，和上传进度

### 引入
`import Webuploader form WebUploader.jsx;`

### 用法
`<WebUploader uploaderConfig={{server: 'url', pick: '#pick', auto: true}} styleConfig={{width: 200}}/>`

### 参数
- `uploaderConfig` {Object} [require] WebUploader的配置，可以查看[WebUploader_Uploader_options](http://fex.baidu.com/webuploader/doc/index.html#WebUploader_Uploader_options)
  - server {string} [require] 上传的服务器URL
  - pick {string} [require] 添加按钮的id，可以是类选择器或者id选择器
  - others {any} [optional] 其余选项可选
- `styleConfig` {Object} [optional] 原子元素Card的配置属性，详见Card模块
- `clsPrefix` {string} [optional] 类名前缀

## Card模块
文件列表的原子元素

### 引入
`import Webuploader form Card.jsx;`

### 用法
`<Card status={Status} percent={Number} {...others}>{children}</Card>`
- `percent` {number} [require] 进度状态，只当`status`为progress时有效
- `type` {string} [optional]·(round|square) 进度条形态
- `r` {number} [optional] 边框圆角弧度
- `gap` {number} [optional] 边框间隔大小
- `status` {string} [optional]·(complete|error|progress) 表示进度状态，可以在_Card.scss中扩展
- `width` {number} [optional] 卡片宽度，高度为了固定比例，是宽度的1.5倍
- `clsPrefix` {string} [optional] 类名前缀
- `others` {any} [optional] 用于覆盖原来的默认属性
---
# SCREEN RECORD

## TYPE: round
![TYPE: round](http://ww3.sinaimg.cn/large/0060lm7Tgw1f7jv1fj0f4g30ue0doe1i.gif)

## TYPE: square
![TYPE: square](http://ww1.sinaimg.cn/large/0060lm7Tgw1f7jv1mvc69g30ue0doe81.gif)

## onError
![upload onError](http://ww3.sinaimg.cn/large/0060lm7Tgw1f7jv1ma48lg30ue0donlx.gif)

# TODO
- [ ] 去除jQuery依赖
- [ ] 提取必须的组件，重构Webuploader为React组件
- [ ] 拆分视图与组件的联系，更独立的模块
- [ ] 优化API接口，并完成npm包
