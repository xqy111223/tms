import React from 'react'
import {withRouter} from 'react-router-dom' 
import {connect} from 'react-redux'

import {initLoginInfo} from './reducer/loginInfoReducer'

import axios from '@/api/api'


@withRouter
@connect(
    state=>state.loginInfo,
    {initLoginInfo}
)
class LoginUser extends React.Component{

    componentWillMount(){

        const pathname = this.props.location.pathname;

        //如果是登录页面，就不获取登录信息
        if(pathname !== '/login'){

            //获取登录用户的信息
            axios.get('/admin/users/_self').then(data=>{
                if(data.state){
                    this.props.history.push(pathname);
                    this.props.initLoginInfo(data.data);
                }else{
                    this.props.history.push('/login');
                }
            });
        }


    }

    render(){
        return null;
    }
}
export default LoginUser