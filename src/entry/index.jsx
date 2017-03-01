import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Router, Route, hashHistory } from 'react-router';
import userRoutes from '../component/user/routes';
import shopRoutes from '../component/shop/routes';

const RouteArray = [{
  path: '/',
  onEnter: (nextState, replace) => replace('/user/login'),
}]
.concat(userRoutes)
.concat(shopRoutes);

const RouteCollection = RouteArray.map((props, index) => <Route {...props} key={index} />);

ReactDOM.render(<div>
  <div style={{ width: 998, margin: '0 auto', position: 'relative' }}>
    <Router history={hashHistory}>
      {RouteCollection}
    </Router>
  </div>
</div>, document.getElementById('react-content'));
