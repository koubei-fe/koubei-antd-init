import React, { Component } from 'react';
import ShopEntity from './ShopEntity';
import AppLayout from '../AppLayout';
import ShopForm from './ShopForm';

export default class ShopAdd extends Component {
  constructor(props) {
    super(props);
    this.shop = new ShopEntity();
  }

  render() {
    return <AppLayout><ShopForm isEdit={false} shop={this.shop} router={this.props.router}/></AppLayout>;
  }
}
