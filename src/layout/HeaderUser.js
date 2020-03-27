import React from 'react'
import { Menu, Icon, Dropdown} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginOut} from '../page/loginUser/reducer/loginInfoReducer'

@withRouter
@connect(
    state=>state.loginInfo,
    {loginOut}
)
class HeaderUser extends React.Component{
    constructor(props){
        super(props);
        this.state={}
        this.handleLoginOut = this.handleLoginOut.bind(this);
    }

    //登出操作
    handleLoginOut(){
        localStorage.setItem('username', '');
        localStorage.setItem('authorizationToken', '');

        this.props.history.push( '/login')
    }
    render(){
        const userProp = (
        <Menu>
            <Menu.Item>
            <a onClick={this.handleLoginOut}>退出登录</a>
            </Menu.Item>
        </Menu> 
        );

        return (
            <div className="login-user">
                <Dropdown 
                    className="login-user"
                    overlay={userProp}
                >
                <div className="login-info">
                    <Icon type="user" className="login-user-img"/> {this.props.realName} 
                </div>
                </Dropdown>
            </div>
        );
    }
}
export default HeaderUser;