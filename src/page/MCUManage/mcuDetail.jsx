import React from 'react'
import {Breadcrumb,Icon} from 'antd'
import {withRouter} from 'react-router-dom'
import {canOptions, vendorOptions, MCUOptions} from '@/commons/OptionData'

import axios from '@/api/api'

@withRouter
class McuDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            mcuInfo: {}
        }
    }

    componentDidMount(){
        //查询当前mcu的信息
        let path = this.props.location.pathname;
        let id = path.substring(path.lastIndexOf('/')+1);

        //根据id查询详情
        axios.get('/admin/mcus/'+ id).then(data=>{
            if(data.state && data.data){
                data = data.data;
                this.setState({mcuInfo: data});
            }
        });
    }

    render (){
        const mcuInfo = this.state.mcuInfo;
        return (
            <div>
                <Breadcrumb className="mb30">
                    <Breadcrumb.Item><a href="/MCUManage"><Icon type='appstore'/> MCU管理</a></Breadcrumb.Item>
                    <Breadcrumb.Item>MCU详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className='content'>
                    <div className='item'>
                        <div>名称:</div>
                        <div>{mcuInfo.mcuName}</div>
                    </div>
                    <div className='item'>
                        <div>类型:</div>
                        <div>{MCUOptions.getText(mcuInfo.mcuType)}</div>
                    </div>
                    <div className='item'>
                        <div>厂商:</div>
                        <div>{vendorOptions.getText(mcuInfo.vendor)}</div>
                    </div>
                    <div className='item'>
                        <div>内网穿透能力:</div>
                        <div>{canOptions.getText(mcuInfo.canCrossIntranet)}</div>
                    </div>
                    <div className='item'>
                        <div>呼叫终端能力:</div>
                        <div>{canOptions.getText(mcuInfo.canInviteTerminal)}</div>
                    </div>
                    <div className='item'>
                        <div>用户名:</div>
                        <div>{mcuInfo.username}</div>
                    </div>
                    <div className='item'>
                        <div>密码:</div>
                        <div>{mcuInfo.password}</div>
                    </div>
                    <div className='item'>
                        <div>学校code:</div>
                        <div>{mcuInfo.schoolCode}</div>
                    </div>
                    <div className='item'>
                        <div>区域code:</div>
                        <div>{mcuInfo.areaCode}</div>
                    </div>
                    <div className='item'>
                        <div>网首地址:</div>
                        <div>{mcuInfo.gkAddress}</div>
                    </div>
                    <div className='item'>
                        <div>网首密码:</div>
                        <div>{mcuInfo.gkPassword}</div>
                    </div>
                    <div className='item'>
                        <div>后台管理地址:</div>
                        <div>{mcuInfo.adminUrl}</div>
                    </div>
                    <div className='item'>
                        <div>接口url:</div>
                        <div>{mcuInfo.interfaceUrl}</div>
                    </div>
                    <div className='item'>
                        <div>型号:</div>
                        <div>{mcuInfo.version}</div>
                    </div>
                    <div className='item'>
                        <div></div>
                        <div></div>
                    </div>
                    <div className='item'>
                        <div>序列号:</div>
                        <div>{mcuInfo.seqNum}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default McuDetail