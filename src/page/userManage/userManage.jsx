import React from 'react'
import { Table, Input,Cascader,Button,message } from 'antd'
import {getTableList,searchTableList,updateParams} from './reducer/userManageReducer'
import {connect} from 'react-redux'

import axios from '@/api/api'
import {userType} from '@/commons/OptionData';
import ManageModal from './modalManage'
import {TipsModal, confirm} from '@/commons/tipsModal'

@connect(
  state=>state.userManage,
  {getTableList,searchTableList,updateParams}
)
class UserManage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      realName:'',
      userType:'',
      pageSize : '',
      pageNum : '', 
      userId:'',
    }
    this.userTypeChange = this.userTypeChange.bind(this)
    this.clickQueryPage = this.clickQueryPage.bind(this)
    this.clickQuery = this.clickQuery.bind(this)
  }

  //页面初次渲染时加载
  componentDidMount(){
    //获取列表数据
    this.props.getTableList();

  }

  
  /********************添加/查看/编辑/删除---操作***********************/
  onRef = (ref) => {
    this.child = ref
  }
  //展示编辑user弹窗
  showEditOrAddUser(id){
    this.setState({editUserId: id || ""});

    //调用子组件的展示弹窗的方法
    this.child.showModal(id)
  }
  //删除mcu操作
  deleteUser(id){
    const _this = this;
    confirm('确定删除吗？', function(){
      //调用删除的方法
      axios.delete('/admin/users/' + id).then(data=>{
        if(data.state){
          let params = _this.props.params;
          _this.props.searchTableList(params);
          message.success('删除数据成功');
        }else{
          message.success('删除数据失败');
        }
      });
    });
  }

 
  
  /*************查询条件变化是进行查询**************/
  searchNameChange(e){
    //console.log(e.target.value);
    this.setState({
      realName:e.target.value
    })
  }
  //用户类型切换
  userTypeChange(value) {
    let params = this.getAllParams();
    params = {...params, userType:value[0]}
    this.setState({
        userType:value[0]
    })
    this.props.updateParams(params);
    this.props.searchTableList(params)
    //console.log(params);
  }
  //点击分页控件时
  clickQueryPage = (pagination) => {
    let params = this.getAllParams()
    params = {...params, pageNum: pagination.current}
    this.setState({pageNum: pagination.current});
    this.props.getTableList(params)
    //console.log(params);
  }
  //点击条件查询按钮
  clickQuery(){
    let params = this.getAllParams()
    this.props.updateParams(params);
    this.props.searchTableList(params)
    //console.log(params);
  }
  //获取所有查询参数
  getAllParams(){
    let params = {
      realName : this.state.realName,
      userType : this.state.userType,
      pageSize : this.props.pagination.pageSize,
      pageNum : this.props.pagination.current 
    }
    return params;
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
  // 渲染表格头部
  renderTableTitle(){
    const columns =[{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },{
      title: '用户类型',
      dataIndex: 'userType',
      key: 'userType',
      render: (text) => (
        userType.getText(text)
      )
    },  {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => (
        this.formatTime(text)
      )
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text) => (
        this.formatTime(text)
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text) => (
        <span>
          <a href="#" onClick={this.showEditOrAddUser.bind(this, text.id)}>编辑</a>
          <span className="ant-divider" />
          <a href="#" onClick={this.deleteUser.bind(this, text.id)}>删除</a>
          <span className="ant-divider" />
          <a href={'/userDetail/' + text.id}>查看详情</a>
        </span>
      ),
    }];
    return columns;
  }
  render(){
    //获取标题信息
    //console.log(this.props);
    const columns = this.renderTableTitle()
    return (
      <div>
        <div className="condition mb20">
          <Cascader options = {userType.data}
                className="mr20"
                placeholder="用户类型"
                onChange={this.userTypeChange} 
                changeOnSelect
          />
          <Input placeholder="真实名称"
                value={this.state.realName}
                onChange = {(e)=>{this.searchNameChange(e)}}
                className="mr20 w140"
          />
          <Button type="primary" onClick={()=>{this.clickQuery()}}>查询</Button> 
          <Button className="fr" onClick={this.showEditOrAddUser.bind(this, '')}>添加用户</Button>
        </div>
        <Table 
          locale={{emptyText: '暂无数据'}}
          columns={columns} 
          dataSource={this.props.tablelist}
          pagination={this.props.pagination}
          onChange={this.clickQueryPage}
         />
        <ManageModal
          modalVisible={this.state.modalVisible}
          hideModal={this.hideEditOrAddMcu}
          onRef={this.onRef}
        />
        
        <TipsModal/>
      </div>
      )
  }
}
export default UserManage