import React, { Component } from 'react';
import AppLayout from '../AppLayout';
import store from './store';
import ShopForm from './ShopForm';

export default class ShopEdit extends Component {
  constructor(props) {
    super(props);
    this.shop = store.getShop(this.props.params.id);
  }

  render() {
    return <AppLayout><ShopForm isEdit={true} shop={this.shop} router={this.props.router}/></AppLayout>;
  }
}
