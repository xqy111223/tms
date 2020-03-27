import React from 'react'
import { Table, Input,Cascader,Button } from 'antd'
import DateRange from './dateRange'
import {getTableList,searchTableList,updateParams} from './reducer/meetingManageReducer'
import {connect} from 'react-redux'
import {meetingType,meetingStatus,callStatus} from '@/commons/OptionData';


@connect(
  state=>state.meetingManage,
  {getTableList,searchTableList,updateParams}
)
class MeetingManage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      meetingType:'',
      meetingStatus:'',
      callStatus:'',
      beginTime:'',
      endTime:'',
    }
    this.meetingTypeChange = this.meetingTypeChange.bind(this);
    this.meetingStatusChange = this.meetingStatusChange.bind(this);
    this.callStatusChange = this.callStatusChange.bind(this);
    this.clickQueryPage = this.clickQueryPage.bind(this);
  }
  //页面加载完成
  componentDidMount(){
    this.props.getTableList();
  }
  //触发onChange事件
  meetingTypeChange(value){
    this.setState({
      meetingType: value[0]
    })
    let params = this.props.params;
    params = {...params,meetingType: value[0]}
    this.props.updateParams(params);
    this.props.searchTableList(params);
  }
  meetingStatusChange(value){
    //console.log(value);
    this.setState({
      status: value[0]
    })
    let params = this.props.params;
    params = {...params,status: value[0]}
    this.props.updateParams(params);
    this.props.searchTableList(params);
  }
  callStatusChange(value){
    //console.log(value);
    this.setState({
      callStatus: value[0]
    })
    let params = this.props.params;
    params = {...params,callStatus: value[0]}
    this.props.updateParams(params);
    this.props.searchTableList(params);
  }
  //点击查询按钮
  clickQuery(){
    let params = this.props.params;
    console.log(params);
    this.props.searchTableList(params);
  }
  //点击翻页
  clickQueryPage(page){
    let params = this.props.params;
    params = {...params, pageNum: page.current}
    this.props.updateParams(params);
    this.props.getTableList(params);
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
  //渲染表格头部
  renderTableTitle(){
    const columns =[{
      title: '会议名称',
      dataIndex: 'meetingName',
      key: 'meetingName',
    },{
      title: '会议类型',
      dataIndex: 'meetingType',
      key: 'meetingType',
      render: (text) => (
        meetingType.getText(text)
      )
    },  {
      title: '会议状态',
      dataIndex: 'status',
      key: 'meetingStatus',
      render: (text) => (
        meetingStatus.getText(text)
      )
    }, {
      title: '呼叫状态',
      dataIndex: 'callStatus',
      key: 'callStatus',
      render: (text) => (
        callStatus.getText(text)
      )
    }, {
      title: 'mcu 名称',
      dataIndex: 'mcuName',
      key: 'mcuName',
    }, {
      title: '开始时间',
      dataIndex: 'beginTime',
      key: 'beginTime',
      render: (text) => (
        this.formatTime(text)
      )
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text) => (
        this.formatTime(text)
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text) => (
        <span>
          <a href={'/meetingDetail/' + text.id}>查看详情</a>
        </span>
      ),
    }];
    return columns;
  }
  render(){
    //获取标题信息
    //console.log(this.props);
    const columns = this.renderTableTitle()
    return(
      <div>
        <div className="condition mb20">
          <Cascader options = {meetingType.data}
                className="mr20"
                placeholder="会议类型"
                onChange={this.meetingTypeChange} 
                changeOnSelect
          />
          <Cascader options = {meetingStatus.data}
                className="mr20"
                placeholder="会议状态"
                onChange={this.meetingStatusChange} 
                changeOnSelect
          />
          <Cascader options = {callStatus.data}
                className="mr20"
                placeholder="呼叫状态"
                onChange={this.callStatusChange} 
                changeOnSelect
          />
          <DateRange />
          <Button type="primary" onClick={()=>{this.clickQuery()}}>查询</Button> 
        </div>
        <Table 
          locale={{emptyText: '暂无数据'}}
          columns={columns} 
          dataSource={this.props.meetinglist}
          pagination={this.props.pagination}
          onChange={this.clickQueryPage}
         />
      </div>
    )
  }

}
export default MeetingManage
