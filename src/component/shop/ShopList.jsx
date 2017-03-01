import React, { Component } from 'react';
import store from './store'
import { Table, Icon, Popconfirm, message } from 'antd';
import AppLayout from '../AppLayout';
import './shop.less'

class ShopList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopList: store.getList()
		};
	}

	handleDelete(id) {
	  store.delShop(id);
	  message.success('门店已删除');
	  this.reload();
  }

  reload() {
	  this.setState({
	    shopList: store.getList()
    })
  }

	render() {
    const columns = [
      {
        title: '门店名称',
        dataIndex: 'shopName',
        key: 'shopName'
      },
      {
        title: '品牌名称',
        dataIndex: 'brandName',
        key: 'brandName'
      },
      {
        title: '门店地址',
        key: 'address',
        render: (text, record) => (
          <span>
            {record.provinceName + record.cityName + record.districtName + record.address}
          </span>
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href={"#/shop/view/" + record.shopId}><Icon type="eye"/></a>
            <span className="ant-divider"/>
            <a href={"#/shop/edit/" + record.shopId}><Icon type="edit"/></a>
            <span className="ant-divider"/>
            <Popconfirm title="确定删除此门店？" onConfirm={this.handleDelete.bind(this, record.shopId)} okText="删除" cancelText="取消">
              <a><Icon type="delete"/></a>
            </Popconfirm>
        </span>
        )
      }
    ];
    return <AppLayout><Table rowKey="shopId" columns={columns} dataSource={this.state.shopList}/></AppLayout>;
	}
}

export default ShopList;
