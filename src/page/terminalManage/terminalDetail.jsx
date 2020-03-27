import React from 'react'
import {Breadcrumb,Icon} from 'antd'
import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux';

import axios from '@/api/api'
import {getDetailData} from './reducer/terminalReducer'
import {vendorOptions,terminalType,modeOptions, canOptions, callTypeOptios} from '@/commons/OptionData'; //导入数据

@withRouter

@connect(
    state=>state.terminal,
    {getDetailData}
)

class TerminalDetail extends React.Component{
    constructor(){
        super();
        this.state = {
            detailData: {}
        }
    }
    componentDidMount(){
         //查询当前mcu的信息
         let path = this.props.location.pathname;
         let id = path.substring(path.lastIndexOf('/')+1);
 
         //根据id查询详情
        this.props.getDetailData(id)
    }
    render(){
        const data = this.props.detailData
        console.log(data)
        if(data){
            data.terminalType = terminalType.getText(data.terminalType)
            data.vendor = vendorOptions.getText(data.vendor)
            data.mode = modeOptions.getText(data.mode)
            data.canCrossIntranet = canOptions.getText(data.canCrossIntranet)
            data.canInvited = canOptions.getText(data.canInvited)
            data.callType = callTypeOptios.getText(data.callType)
        }

        return(
            <div>
                <Breadcrumb className="mb30">
                    <Breadcrumb.Item><a href="/terminalManage"><Icon type='appstore'/> 终端管理</a></Breadcrumb.Item>
                    <Breadcrumb.Item>终端详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className='content'>
                    <div className='item'>
                        <div>终端名称:</div>
                        <div>{data.terminalName}</div>
                    </div>
                    <div className='item'>
                        <div>终端类型:</div>
                        <div>{data.terminalType}</div>
                    </div>
                    <div className='item'>
                        <div>厂商:</div>
                        <div>{data.vendor}</div>
                    </div>
                    <div className='item'>
                        <div>终端模式:</div>
                        <div>{data.mode}</div>
                    </div>
                    <div className='item'>
                        <div>终端ip:</div>
                        <div>{data.terminalIp}</div>
                    </div>
                    <div className='item'>
                        <div>终端端口号:</div>
                        <div>{data.vendor}</div>
                    </div>
                    <div className='item'>
                        <div>内网穿透能力:</div>
                        <div>{data.canCrossIntranet}</div>
                    </div>
                    <div className='item'>
                        <div>被呼叫能力:</div>
                        <div>{data.canInvited}</div>
                    </div>
                    <div className='item'>
                        <div>呼叫类型:</div>
                        <div>{data.callType}</div>
                    </div>
                    <div className='item'>
                        <div>教室标准code:</div>
                        <div>{data.classroomCode}</div>
                    </div>
                    <div className='item'>
                        <div>创建时间:</div>
                        <div>{data.createTime}</div>
                    </div>
                    <div className='item'>
                        <div>创建人:</div>
                        <div>{data.createUserId}</div>
                    </div>
                    <div className='item'>
                        <div>电话号码:</div>
                        <div>{data.phoneNumber}</div>
                    </div>
                    <div className='item'>
                        <div>邮箱地址:</div>
                        <div>{data.email}</div>
                    </div>
                    <div className='item'>
                        <div>更新人:</div>
                        <div>{data.updateUserId}</div>
                    </div>
                    <div className='item'>
                        <div>更新时间:</div>
                        <div>{data.updateTime}</div>
                    </div>
                    <div className='item'>
                        <div>版本号:</div>
                        <div>{data.version}</div>
                    </div>
                    </div>
            </div>
        )
    }
}
export default TerminalDetail