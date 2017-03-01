import React, { PropTypes } from 'react';
import store from './store';
import AppLayout from '../AppLayout';
import { formatTime } from '../../common/utils';
import { PAY_TYPE_TEXT } from './config';
import './table.less';

const ShopView = (props) => {
  const shop = store.getShop(props.params.id);
  return (
    <AppLayout>
      <table className="kb-detail-table">
        <tbody>
          <tr>
            <td className="kb-detail-table-label">品牌</td>
            <td>{shop.brandName || ''}</td>
            <td className="kb-detail-table-label">创建时间</td>
            <td>{formatTime(shop.createTime)}</td>
            <td className="kb-detail-table-label">默认收款方式</td>
            <td>{PAY_TYPE_TEXT[shop.payType]}</td>
          </tr>
          <tr>
            <td className="kb-detail-table-label">品类</td>
            <td>{shop.categoryName || ''}</td>
            <td className="kb-detail-table-label">最后一次修改</td>
            <td>{formatTime(shop.shopLastModified)}</td>
            <td className="kb-detail-table-label">收款账户</td>
            <td>{shop.receiveUserId || ''}</td>
          </tr>
          <tr>
            <td className="kb-detail-table-label">门店联系方式</td>
            <td>{shop.mobileNo}</td>
          </tr>
        </tbody>
      </table>
    </AppLayout>
  );
};

ShopView.propTypes = {
  params: PropTypes.object,
};

export default ShopView;
