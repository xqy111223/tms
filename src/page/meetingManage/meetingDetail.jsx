import React from 'react'
import {Breadcrumb,Icon} from 'antd'
import {withRouter} from 'react-router-dom'

import axios from '@/api/api'

@withRouter
class MeetingDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            meetingInfo: {}
        }
        this.switchType=this.switchType.bind(this);
        this.formatTime = this.formatTime.bind(this);
    }

    componentDidMount(){
        //查询当前会议的信息
        let path = this.props.location.pathname;
        let id = path.substring(path.lastIndexOf('/')+1);
        //根据id查询详情
        axios.get('/admin/meetings/'+ id).then(data=>{
            data = data.data;
            this.setState({meetingInfo: data});
        });
    }
    //转换类型
    switchType(type,n){
        switch(type){
            case "meetingType":
            if(n = 1){
                return '及时会议'
            }else if(n=2){
                return '预约会议'
            }
            break;
            case "status":
            if(n = 1){
                return '未开始'
            }else if(n=2){
                return '进行中'
            }else if(n=3){
                return '已结束'
            }
            break;
            case "callStatus":
            if(n = 1){
                return '未呼叫'
            }else if(n=2){
                return '呼叫成功'
            }else if(n=4){
                return '呼叫失败'
            }
            break;
            default:
                return ''
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
        const meetingInfo = this.state.meetingInfo;
        return (
            <div>
                <Breadcrumb className="mb30">
                    <Breadcrumb.Item><a href="/meetingManage"><Icon type='appstore'/> 会议管理</a></Breadcrumb.Item>
                    <Breadcrumb.Item>会议详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className='content'>
                    <div className='item'>
                        <div>会议名称:</div>
                        <div>{meetingInfo.meetingName}</div>
                    </div>
                    <div className='item'>
                        <div>会议类型:</div>
                        <div>{this.switchType("meetingType",meetingInfo.meetingType)}</div>
                    </div>
                    <div className='item'>
                        <div>会议状态:</div>
                        <div>{this.switchType("status",meetingInfo.status)}</div>
                    </div>
                    <div className='item'>
                        <div>呼叫状态:</div>
                        <div>{this.switchType("callStatus",meetingInfo.callStatus)}</div>
                    </div>
                    <div className='item'>
                        <div>mcu名称:</div>
                        <div>{meetingInfo.mcuName}</div>
                    </div>
                    
                    <div className='item'>
                        <div>开始时间:</div>
                        <div>{this.formatTime(meetingInfo.beginTime)}</div>
                    </div>
                    <div className='item'>
                        <div>结束时间:</div>
                        <div>{this.formatTime(meetingInfo.endTime)}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MeetingDetail