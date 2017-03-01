import React, { Component, PropTypes } from 'react';
import AppLayout from '../AppLayout';
import store from './store';
import ShopForm from './ShopForm';

export default class ShopEdit extends Component {
  constructor(props) {
    super(props);
    this.shop = store.getShop(this.props.params.id);
  }

  render() {
    return (
      <AppLayout><ShopForm isEdit shop={this.shop} router={this.props.router} /></AppLayout>
    );
  }
}

ShopEdit.propTypes = {
  router: PropTypes.object,
  params: PropTypes.object,
};
