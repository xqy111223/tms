import React from 'react'
import {Breadcrumb,Icon} from 'antd'
import {withRouter} from 'react-router-dom'

import axios from '@/api/api'

@withRouter
class UserDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            userInfo: {}
        }
        this.switchUserType=this.switchUserType.bind(this);
        this.formatTime = this.formatTime.bind(this);
    }

    componentDidMount(){
        //查询当前mcu的信息
        let path = this.props.location.pathname;
        let id = path.substring(path.lastIndexOf('/')+1);
        //根据id查询详情
        axios.get('/admin/users/'+ id).then(data=>{
            this.setState({userInfo: data.data});
        });
    }
    //转换用户类型
    switchUserType(n)
    {
        if(n===1){
            return "普通管理员"
        }else if(n===0){
            return "超级管理员"
        }
    }
    //时间转换
    formatTime(time){
        const date = new Date(time);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        const D = date.getDate() + ' ';
        const h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
        const m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
        const s = (date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds());
        return Y+M+D+h+m+s;
    }
    render (){
        const userInfo = this.state.userInfo;
        return (
            <div>
                <Breadcrumb className="mb30">
                    <Breadcrumb.Item><a href="/userManage"><Icon type='appstore'/> 用户管理</a></Breadcrumb.Item>
                    <Breadcrumb.Item>用户详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className='content'>
                    <div className='item'>
                        <div>用户名:</div>
                        <div>{userInfo.username}</div>
                    </div>
                    <div className='item'>
                        <div>用户类型:</div>
                        <div>{this.switchUserType(userInfo.userType)}</div>
                    </div>
                    <div className='item'>
                        <div>真实姓名:</div>
                        <div>{userInfo.realName}</div>
                    </div>
                    <div className='item'>
                        <div>创建人:</div>
                        <div>{userInfo.createUserId}</div>
                    </div>
                    <div className='item'>
                        <div>创建时间:</div>
                        <div>{this.formatTime(userInfo.createTime)}</div>
                    </div>
                    <div className='item'>
                        <div>更新人:</div>
                        <div>{userInfo.updateUserId}</div>
                    </div>
                    <div className='item'>
                        <div>更新时间:</div>
                        <div>{this.formatTime(userInfo.updateTime)}</div>
                    </div>
                    <div className='item'>
                        <div>密码:</div>
                        <div>{userInfo.password}</div>
                    </div>
                </div>
            </div>
        )
    }
}



export default UserDetail