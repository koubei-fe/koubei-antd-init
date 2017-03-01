import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import './user.less'
const FormItem = Form.Item;

class Login extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
	  this.props.form.validateFields();
  }

	handleSubmit(e) {
	  // prevent from native form submit action
	  e.preventDefault();
	  this.props.router.push('/shop/list');
  }

	render() {
	  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
	  const hasError = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);
	  const userNameError = isFieldTouched('userName') && getFieldError('userName');
	  const passwordError = isFieldTouched('password') && getFieldError('password');
		return (
		  <div className="kb-user-login">
        <h1>登录</h1>
        <hr className="horizontal-line"/>
        <Form inline onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{
                required: true
              }]
            })(
              <Input addonBefore={<Icon type="user"/>} placeholder="请输入用户名"/>
            )}
          </FormItem>
          <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true
              }]
            })(
              <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="请输入密码"/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" disabled={hasError(getFieldsError())}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Login);
