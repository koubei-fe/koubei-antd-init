import React, { Component, PropTypes } from 'react';
import store from './store';
import Picture from './Picture';
import brands from './data/brands';
import areas from './data/areas';
import category from './data/category';
import { PAY_TYPE, PAY_TYPE_TEXT } from './config';

import {
  Form,
  Input,
  Radio,
  Cascader,
  Select,
  Col,
  Button,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;

const getTreeNodes = (values, tree) => {
  const nodes = [];
  let levelList = tree;
  values.forEach(v => {
    if (!levelList) {
      return;
    }
    const node = levelList.find(n => n.value === v);
    if (node) {
      nodes.push(node);
      levelList = node.children;
    }
  });
  return nodes;
};

const getBrandName = brandId => brands.find(brand => brand.id === brandId).name;

const getCategoryName = categoryIds => {
  const categoryTreeNodes = getTreeNodes(categoryIds, category);
  return categoryTreeNodes.reduce(
    (acc, node) => (acc === '' ? node.label : `${acc} - ${node.label}`),
    '');
};

class ShopForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { validateFieldsAndScroll } = this.props.form;
    this.setState({
      submitting: true,
    });
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const areaFields = getTreeNodes(values.residence, areas);
        const shopInfo = {
          ...this.props.shop,
          brandId: values.brandId,
          brandName: getBrandName(values.brandId),
          shopName: values.shopName,
          provinceId: areaFields[0].value,
          provinceName: areaFields[0].label,
          cityId: areaFields[1].value,
          cityName: areaFields[1].label,
          districtId: areaFields[2] ? areaFields[2].value : '',
          districtName: areaFields[2] ? areaFields[2].label : '',
          categoryIds: values.categoryIds,
          categoryName: getCategoryName(values.categoryIds),
          address: values.address,
          mobileNo: values.mobileNo,
          payType: values.payType[0],
          receiveUserId: values.receiveUserId,
        };
        if (this.props.isEdit) {
          store.saveShop(shopInfo.shopId, shopInfo);
        } else {
          store.addShop(shopInfo);
        }
        this.props.router.push('shop/list');
      } else {
        this.setState({
          submitting: false,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          required
          label="品牌名称"
        >
          {
            getFieldDecorator('brandId', {
              initialValue: this.props.shop.brandId,
              rules: [{
                required: true,
              }],
            })(
              <Select
                showSearch
                placeholder="select a brand"
                optionFilterProp="title"
              >
                {brands.map(b => <Option key={b.id} title={b.name}>{b.name}</Option>)}
              </Select>
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          required
          label="门店名称"
        >
          {
            getFieldDecorator('shopName', {
              initialValue: this.props.shop.shopName,
              rules: [{
                required: true,
                message: 'Please input shop name.',
              }],
            })(
              <Input style={{ width: '50%' }} placeholder="e.g. 海底捞" />
            )
          }
          <p className="shop-form-extra">
            <span className="warnning">请勿填错格式，导致开店失败。</span>
            正确示例如下：
            <br />1.老何炒面: 主店名=老何炒面，分店名不填
            <br />2.肯德基(大学城店): 主店名=肯德基，分店名=大学城店
            <br />3.兰州拉面(人民美食广场): 主店名=兰州拉面，分店名=人民美食广场
            <br /><span className="warnning">括号不需要填写</span>
          </p>
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="地址"
        >
          {
            getFieldDecorator('residence', {
              initialValue: [
                this.props.shop.provinceId,
                this.props.shop.cityId,
                this.props.shop.districtId,
              ],
              rules: [{
                required: true,
              }],
            })(
              <Cascader
                options={areas}
              />
            )
          }
          <FormItem style={{ margin: '5px 0 0' }}>
            {
              getFieldDecorator('address', {
                initialValue: this.props.shop.address,
                rules: [{
                  required: true,
                }],
              })(
                <Input />
              )
            }
          </FormItem>
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="品类"
        >
          {
            getFieldDecorator('categoryIds', {
              initialValue: this.props.shop.categoryIds,
            })(
              <Cascader
                options={category}
              />
            )
          }
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="门店电话"
        >
          <InputGroup>
            <Col span="6">
              <FormItem>
                {
                  getFieldDecorator('mobileNo', {
                    initialValue: this.props.shop.mobileNo,
                    validateFirst: true,
                    rules: [{
                      required: true,
                      message: '此项必填',
                    }],
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem>
                {
                  getFieldDecorator('mobileNo2', {})(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem>
                {
                  getFieldDecorator('mobileNo3', {})(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem>
                {
                  getFieldDecorator('mobileNo4', {})(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
          </InputGroup>
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="收款方式"
        >
          {
            getFieldDecorator('payType', {
              initialValue: this.props.shop.payType || PAY_TYPE.SELF,
              rules: [{
                required: true,
              }],
            })(
              <RadioGroup>
                <Radio value={PAY_TYPE.SELF}>{PAY_TYPE_TEXT[PAY_TYPE.SELF]}</Radio>
                <Radio value={PAY_TYPE.SCAN}>{PAY_TYPE_TEXT[PAY_TYPE.SCAN]}</Radio>
              </RadioGroup>
            )
          }
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="品牌Logo"
          required
        >
          <Picture />
          <p className="shop-form-extra">
            <span className="warnning">仅支持上传一张，LOGO将在支付宝-口碑页面展示。</span>
            不可有水印、须实景图，如上传装修效果图则将被驳回。不超过10M，格式：bmp，png，jpeg，gif。
            建议尺寸在500px＊500px以上（更容易通过审核）
          </p>
        </FormItem>

        <FormItem
          {...formItemLayout}
          required
          label="收款帐号"
        >
          {
            getFieldDecorator('receiveUserId', {
              initialValue: this.props.shop.receiveUserId,
              rules: [{
                required: true,
              }],
            })(
              <Input />
            )
          }
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={this.state.submitting}>提交</Button>
        </FormItem>
      </Form>
    );
  }
}

ShopForm.propTypes = {
  form: PropTypes.object,
  shop: PropTypes.object,
  isEdit: PropTypes.bool,
  router: PropTypes.object,
};

export default Form.create()(ShopForm);
