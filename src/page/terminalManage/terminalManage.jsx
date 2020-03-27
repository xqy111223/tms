import React, { Component } from 'react';
import { Table, Cascader , Input, Button } from 'antd';
import { connect } from 'react-redux';
import { getTableList, getDetailData } from './reducer/terminalReducer'; //导入此页面的redux
import {vendorOptions, terminalType, modeOptions,callTypeOptios, canOptions} from '@/commons/OptionData'; //导入数据
import  ManageModal  from '@/components/addTerminalModel/modelManage'

import {confirm} from '@/commons/tipsModal'
import axios from '@/api/api'


@connect(
    state=>state.terminal,
    {getTableList,getDetailData,}
)

class TerminalManage extends Component{
    constructor(){
        super()
        this.state = {
            terminalName:'',
            terminalType:'',
            vendorType:'',
            dataId:''
        }
    }


    render(){
        //得到表格头部一行
        const columns = this.renderTableTitle();
        return(
            <div>
                <ManageModal onRef={this.onRef} />
                <div className="condition mb20">
                     <Cascader
                        className="mr20"
                        options={terminalType.data}
                        placeholder='请选择终端类型'
                        onChange={this.terminalTypeChange.bind(this)}
                        changeOnSelect
                    />
                   <Cascader
                        className="mr20"
                        options={vendorOptions.data}
                        placeholder='请选择产商类型'
                        onChange={this.vendorTypeChange.bind(this)}
                        changeOnSelect
                    /> 
                    <Input placeholder="请输入终端名称"
                           value={this.state.terminalName}
                           onChange={this.handleInputChange.bind(this)}
                           size='default' className='w140 mr20' />
                    <Button type="primary" onClick={this.clickQuery.bind(this)}>查询</Button>
                    <Button className="fr" onClick={this.clickAdd.bind(this)}>添加终端</Button>
                </div>
                <Table columns={columns}
                    locale={{emptyText: '暂无数据'}}
                    dataSource={this.props.tableList}
                    pagination={this.props.pagination}
                    onChange={this.searchTableList.bind(this)}
                />

            </div>
        )
    }
    // 为父组件调用子组件方法准备
    onRef = (ref) => {
        this.child = ref
    }

    //将页面初次加载数据获取到
    componentDidMount(){
        this.props.getTableList();//里面dispatch方法会重新渲染页面
    }

    //获取所有查询条参数
    getAllParams(){
        let params = {
            terminalName:this.state.terminalName,
            terminalType:this.state.terminalType,
            vendorType:this.state.vendorType,
            pageSize:this.props.pagination.pageSize,
            pageNum:this.props.pagination.pageNum,
        }
        return params;
    }
    //-------------------查询条件变化时,进行查询----------------
    //终端名字变化时
    handleInputChange(e){
        this.setState({
            terminalName:e.target.value
        })
    }
    //终端类型改变时
    terminalTypeChange(value){
    console.log(value)
        this.setState({
            terminalType:value[0]
        })
        let parms = this.getAllParams();
        parms = {...parms,terminalType:value[0]}
        this.props.getTableList(parms)
    }
    //厂商类型变化
    vendorTypeChange(value){
        this.setState({
            vendorType:value[0]
        })
        let parms = this.getAllParams();
        parms = {...parms,vendorType:value[0]}
        this.props.getTableList(parms)
    }
    clickQuery(){
        let parms = this.getAllParams()
        this.props.getTableList(parms)
   }
   searchTableList(pagination){
       console.log(pagination)
       let {current} ={...pagination}
       let parms = this.getAllParams()
       parms.pageNum = current
       this.props.getTableList(parms)
   }

   //-----------点击事件------------
   //点击添加
   clickAdd(){
       this.child.showModal()
   }
    //点击编辑
    showEdit(id){
        this.child.showModal(id)
    }
    // 点击删除
    delete(id){
        const _this = this;
        confirm('确定删除吗？', function(){
            //调用删除的方法
            axios.delete('/admin/terminals/' + id).then(data=>{
                if(data.state){
                    let params = _this.props.params;
                    _this.props.getTableList(params);
                }
            });
        });
    }

    // 渲染表格头部
    renderTableTitle(){
        const columns = [{
            title: '名称',
            dataIndex: 'terminalName',
        },  {
            title: '类型',
            dataIndex: 'terminalType',
            render:(text) => (
                terminalType.getText(text)
            )
        },{
            title: '教室标准code',
            dataIndex: 'classroomCode',
        },{
            title: '终端模式',
            dataIndex: 'mode',
            render: (text) => (
                modeOptions.getText(text)
            )
        },{
            title: 'ip',
            dataIndex: 'terminalIp',
        },{
            title: '端口号',
            dataIndex: 'terminalPort',
        },{
            title: '厂商',
            dataIndex: 'vendor',
            render: (text) => (
                vendorOptions.getText(text)
            )
        },{
            title: '呼叫类型',
            dataIndex: 'callType',
            render: (text) => (
                callTypeOptios.getText(text)
            )
        },{
            title: '内网穿透能力',
            dataIndex: 'canCrossIntranet',
            render: (text) => (
                canOptions.getText(text) 
            )
        },{
            title: '被呼叫能力',
            dataIndex: 'canInvited',
            render: (text) => (
                canOptions.getText(text)
              )
        },{
            title: '电话号码',
            dataIndex: 'phoneNumber',
        },{
            title: '邮箱',
            dataIndex: 'email',
        },{
            title: '序列号',
            dataIndex: 'seqNum',
        },{
            title: '版本号',
            dataIndex: 'version',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={this.showEdit.bind(this, text.id)}>编辑</a>
                    <span className="ant-divider" />
                    <a href="#" onClick={this.delete.bind(this, text.id)}>删除</a>
                    <span className="ant-divider" />
                    <a href={'/terminalDetail/' + text.id } rel="noopener noreferrer">查看详情</a>
                </span>
            ),
        }];

        return columns;
    }

}
export default TerminalManage;