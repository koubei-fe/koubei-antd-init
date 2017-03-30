口碑团队针对 Ant Design React，整理的一篇入门文档。

---

在开始之前，推荐先学习 [React](http://reactjs.cn/react/docs/getting-started-zh-CN.html) 和 [ES2015](http://es6.ruanyifeng.com/)，并确认 已经正确安装和配置了 [Node.js](https://nodejs.org/) v4.x 或以上。


## 标准开发

实际项目开发中，你会需要对 ES2015 和 JSX 代码的构建、调试、代理、打包部署等一系列工程化的需求。
我们提供了一套 `npm` + `webpack` 的开发工具链来辅助开发，下面我们用一个简单的实例来说明。

### 下载脚手架 demo

这是口碑针对 Ant Design React 开发的 demo，一个很有参考价值的 React 上手示例。

https://github.com/koubei-fe/koubei-antdm-init

```bash
$ cd ~ && mkdir git && cd git
$ git clone https://github.com/koubei-fe/koubei-antd-init.git
```

### 目录结构规范

```
.
├── .eslint
├── .gitignore
├── dist
├── node_modules
├── README.md
├── package.json
├── webpack.config.js
├── index.html
├── src
    ├── common
    ├── component
    ├── entry
```

### .eslint

设置 `eslint` 规则的配置文件。

### .webpack.config.js

webpack 配置文件，脚手架里面 `webpack.config.js` 是优化配置，如果对 webpack 构建不熟悉，不建议改动。

### package.json

npm 源依赖配置文件，其中 `devDependencies` 配置项，不建议改动。

### src

项目中所有 JS 源码应当存放在此目录下，且所有 JS 文件编写应当遵循 [Javascript 编码规范](https://github.com/airbnb/javascript)。

其中 common 目录下存放项目共用的模块和组件，component 目录存放具体的业务模块，如：shop、user，entry 目录下存放页面的入口文件。

### dist

dist 作为项目输出目录，包含所有编译生成的 css、js 文件，用于部署到各个环境。

### 使用组件

直接用下面的代码替换 `index.js` 的内容，用 React 的方式直接使用 antd 组件。

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

> 你可以在 [Ant Design官网](https://ant.design/components/button-cn/) 选用更多组件。
> 也可以使用口碑团队封装的业务组件 [Hermes React](http://hermes.koubei.com/components/img-upload/)

### 开发调试

安装项目依赖的 npm 模块

```bash
$ npm install
```

一键启动调试，访问 http://127.0.0.1:8001 查看效果。

```bash
$ npm start
```

### 构建和部署

```bash
$ npm run build
```

入口文件会构建到 `dist` 目录中，你可以自由部署到不同环境中进行引用。

> 上述例子用于帮助你理解 Ant Design React 的使用流程，并非真实的开发过程，你可以根据自己的项目开发流程进行接入。

## 兼容性

Ant Design React 支持所有的现代浏览器和 IE9+。

对于 IE 系列浏览器，需要提供 [es5-shim](https://github.com/es-shims/es5-shim) 和 [es6-shim](https://github.com/paulmillr/es6-shim) 等 Polyfills 的支持。如果你使用了 babel，强烈推荐使用 [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) 和 [babel-plugin-transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/)。

> 如果在 IE 浏览器中遇到 `startsWith` 的[问题](https://github.com/ant-design/ant-design/issues/3400#issuecomment-253181445)，请引入 [es6-shim](https://github.com/paulmillr/es6-shim) 或 [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 引入样式 -->
    <link rel="stylesheet" href="/index.css">
    <!-- Polyfills -->
    <!--[if lt IE 10]>
    <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
    <![endif]-->
    <!--[if lte IE 11]>
    <script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>
    <![endif]-->
  </head>
  <body>
  </body>
  <!-- 引入公用文件 -->
  <script src="/common.js"></script>
  <!-- 引入入口文件 -->
  <script src="/index.js"></script>
</html>
```

### 进阶

Ant-Tool：http://ant-tool.github.io/quick-start.html

