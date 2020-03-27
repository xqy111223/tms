import React from 'react'
import { Table, Cascader, Button, message } from 'antd';
import {getTableList, updateParams} from './reducer/mcuReducer'
import {} from '@/page/loginUser/reducer/loginInfoReducer'
import {connect} from 'react-redux'

import axios from '@/api/api'
import {MCUOptions, vendorOptions, canOptions} from '@/commons/OptionData'
import ManageModal from './modalManage'
import {TipsModal, confirm} from '@/commons/tipsModal'

@connect(
  state=>({...state.mcu, ...state.loginInfo}),
  {getTableList, updateParams}
)
class MCUManage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      areaCode: '',
      schoolCode: '',
      mcuType: '',
      vendor: '',
      areaOptions: [],
      schoolOptions: [],
      vendorOptions,
      mcuList: [],
    }

    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.handleMcuChange = this.handleMcuChange.bind(this);
    this.handleVendorChange = this.handleVendorChange.bind(this);
    this.loadAreaData = this.loadAreaData.bind(this);
    this.deleteMcu = this.deleteMcu.bind(this);
    this._getSchoolListByArea = this._getSchoolListByArea.bind(this);
    this._searchMcuTableList = this._searchMcuTableList.bind(this);
  }

  //区域筛选时候
  handleAreaChange(value, selectedOptions){
    const selectAreaCode = value[value.length - 1];
    this.setState({
      areaCode: selectAreaCode
    });

    //改变学校的列表
    this._getSchoolListByArea(selectAreaCode);

    //重新获取mcu列表数据
    let params = this.props.params;
    params = {...params, areaCode: selectAreaCode}
    this.props.updateParams(params);
    this.props.getTableList(params);
  }

  //学校筛选时
  handleSchoolChange(value){
    this.setState({
      schoolCode: value[0]
    });

    let params = this.props.params;
    params = {...params, schoolCode: value[0]}
    this.props.updateParams(params);
    this.props.getTableList(params);

  }

  //mcu筛选时
  handleMcuChange(value){
    this.setState({
      mcuType: value[0]
    });

    let params = this.props.params;
    params = {...params, mcuType: value[0]}
    this.props.updateParams(params);
    this.props.getTableList(params);
  }

  //厂商筛选时
  handleVendorChange(value){
    this.setState({
      vendor: value[0]
    });

    let params = this.props.params;
    params = {...params, vendor: value[0]}
    this.props.updateParams(params);
    this.props.getTableList(params);
  }

  //展示编辑mcu弹窗
  showEditOrAddMcu(id){
    this.setState({editMucId: id || ""});

    //调用子组件的展示弹窗的方法
    this.child.showModal(id)
  }

  //删除mcu操作
  deleteMcu(id){
    const _this = this;
    confirm('确定删除吗？', function(){
      //调用删除的方法
      axios.delete('/admin/mcus/' + id).then(data=>{
        if(data.state){
          let params = _this.props.params;
          _this.props.getTableList(params);
          message.success('删除数据成功');          
        }else{
          message.success('删除数据失败');          
        }
      });
    });
  }


  //获取区域的数据
  loadAreaData(selectedOptions){
    const targetOption = selectedOptions[selectedOptions.length - 1];
    let parentCode = targetOption.value

    //请求下级区域数据
    axios.get('/admin/areas/_search',{
      params: {
        parentCode: parentCode
      }
    }).then(data=>{
      if(data.state){
        data = data.data;
        let areaList = [];
        if(data && data.length > 0){
          data.map( v => {
            let areaInfo = {};
            areaInfo.value = v.areaCode;
            areaInfo.label = v.areaName;
            areaInfo.isLeaf = false;
            areaList.push(areaInfo);
          });
          targetOption.children = areaList;
          this.setState({
              areaOptions: [...this.state.areaOptions],
          });
        }
      }
    })

  }

  //展示最选择区域的最末一级
  displayRender(label){
    return label[label.length - 1];
  }

  //获取学校下拉菜单的数据
  _getSchoolListByArea(areaCode=''){
    axios.get('/admin/schools/_search',{
      params:{
        areaCode: areaCode,
      }
    }).then(data=>{
      if(data.state){
        data = data.data;
        let schoolList = [];
        data.map(v => {
          let schoolInfo = {};
          schoolInfo.value = v.schoolCode;
          schoolInfo.label = v.schoolName
          schoolList.push(schoolInfo);
        });
        this.setState({schoolOptions: schoolList});
      }
    });
  }

  _getAreaListByArea(areaCode=''){
    axios.get('/admin/areas/_search',{
      params: {
        parentCode: areaCode
      }
    }).then(data=>{
      if(data.state){
        data = data.data;
        let areaList = [];
        data.map( v => {
          let areaInfo = {};
          areaInfo.value = v.areaCode;
          areaInfo.label = v.areaName;
          areaInfo.isLeaf = false;
          areaList.push(areaInfo);
        });
        this.setState({areaOptions: areaList});
      }
    });
  }

  onRef = (ref) => {
    this.child = ref
  }

  _searchMcuTableList(page){
    let params = this.props.params;
    params = {...params, pageNum: page.current}
    this.props.updateParams(params);
    this.props.getTableList(params);
  }


  componentDidMount(){
    if(this.props.areaCode){
      //获取区域下拉
      this._getAreaListByArea(this.props.areaCode);

      //获取学校下拉菜单的数据
      this._getSchoolListByArea(this.props.areaCode);
    }

    //请求mcu列表数据
    this.props.getTableList();
  }

  //如果一开始props上面没有放入区域id的时候从这边走初始化区域学校数据
  componentWillReceiveProps(nextPros){

    if((!this.props.areaCode) && nextPros.areaCode){
      //获取区域下拉
      this._getAreaListByArea(nextPros.areaCode);

      //获取学校下拉菜单的数据
      this._getSchoolListByArea(nextPros.areaCode);
    }
  }

  render(){
    const columns = [{
      title: '名称',
      dataIndex: 'mcuName',
    }, {
      title: '类型',
      key:'mcuType',
      render: (text) => (
        MCUOptions.getText(text.mcuName)
      )
    }, {
      title: '厂商',
      key: 'vendor',
      render: (text) => (
        vendorOptions.getText(text.vendor)
      )
    },{
      title: '型号',
      dataIndex: 'version',
    },{
      title: '内网穿透能力',
      key: 'canCrossIntranet',
      render: (text) => (
        canOptions.getText(text.canCrossIntranet)
      )
    },{
      title: '呼叫终端能力',
      key: 'canInviteTerminal',
      render: (text) => (
        canOptions.getText(text.canInviteTerminal)
      )
    },{
      title: '序列号',
      dataIndex: 'seqNum',
    },{
      title: '操作',
      key: 'action',
      render: (text) => (
        <span>
          <a href="#" onClick={this.showEditOrAddMcu.bind(this, text.id)}>编辑</a>
          <span className="ant-divider" />
          <a href="#" onClick={this.deleteMcu.bind(this, text.id)}>删除</a>
          <span className="ant-divider" />
          <a href={'/mcuDetail/' + text.id}>查看详情</a>
        </span>
      ),
    }];

    return (
      <div>
        <div className="mb20">
          <Cascader
            className="mr20"
            options={this.state.areaOptions}
            loadData={this.loadAreaData}
            onChange={this.handleAreaChange}
            displayRender={this.displayRender}
            placeholder='请选择区域'
            changeOnSelect
          />

          <Cascader
            className="mr20"
            options={this.state.schoolOptions}
            placeholder='请选择学校'
            onChange={this.handleSchoolChange}
            changeOnSelect
          />
          <Cascader
            className="mr20"
            options={MCUOptions.data}
            placeholder='请选择MCU类型'
            onChange={this.handleMcuChange}
            changeOnSelect
          />

          <Cascader
            options={vendorOptions.data}
            placeholder='请选择厂商类型'
            onChange={this.handleVendorChange}
            changeOnSelect
          />

          <Button className="fr" onClick={this.showEditOrAddMcu.bind(this, '')}>添加MCU</Button>
        </div>

        <Table
          locale={{emptyText: '暂无数据'}}
          columns={columns}
          dataSource={this.props.tableList}
          pagination={this.props.pagination}
          onChange={this._searchMcuTableList}
        />
        <ManageModal
          modalVisible={this.state.modalVisible}
          hideModal={this.hideEditOrAddMcu}
          onRef={this.onRef}
        />
        <TipsModal/>
      </div>
  )

  };

}
export default MCUManage
