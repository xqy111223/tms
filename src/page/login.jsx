import React from 'react'
import { Form, Input, Row, Button, message} from 'antd';

import axios from '../api/api'
import logoImg from '../logo.png'

const FormItem = Form.Item

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showTips : 'hide',
        }
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk() {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post('/portal/auth', {
                        password: values.password,
                        username: values.username
                }).then(data=>{
                    if(data.state){
                        //如果登录成功，就跳转到列表页面
                        window.location.href = '/MCUManage';
                    }else{
                        this.setState({showTips: ''});
                    }
                });
            }
        });
    }

    render (){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-pla">
                <div className="login-logo">
                    <img src={logoImg} alt=""/>
                    <span>TMS管理系统</span> 
                </div>
                <form>
                    <FormItem hasFeedback>
                        {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message:"请输入用户名"
                            },
                        ],
                        })(<Input onPressEnter={this.handleOk} placeholder="用户名" />)}
                    </FormItem>
                    <FormItem hasFeedback>
                        {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message:"请输入密码"
                            },
                        ],
                        })(<Input type="password" onPressEnter={this.handleOk} placeholder="密码" />)}
                    </FormItem>
                    <Row>
                        <Button type="primary" onClick={this.handleOk}>
                        登录
                        </Button>
                        <span className={'red '+ this.state.showTips}>用户名或密码错误</span>
                    </Row>
                </form>
            </div>
        );
    }
}

const Login = Form.create()(LoginForm);
export default Login