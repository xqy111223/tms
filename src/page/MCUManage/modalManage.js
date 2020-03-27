import React from 'react'
import {connect} from 'react-redux'

import axios from '@/api/api'
import McuModal from './modal'
import {editMcuInfo, getTableList} from './reducer/mcuReducer'
import {} from '@/page/loginUser/reducer/loginInfoReducer'
import {message} from 'antd';

@connect(
    state=>({...state.mcu, ...state.loginInfo}),
    {editMcuInfo, getTableList}
)
class ManageModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            loading: false,
            mcuId: '', //当前编辑的mcuId,如果是新建，则为空
            title: '',
            modalData : {},
            areaOptions: [],
            schoolOptions: [],
            selectedOptions: [], //给编辑回填区域下拉用
            requireVersionFlag: false, //类型是否必填
        }

        this.handleOk = this.handleOk.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.loadAreaData = this.loadAreaData.bind(this);
        this._getAreaListByArea = this._getAreaListByArea.bind(this);
        this._getSchoolListByArea = this._getSchoolListByArea.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.getAreaListOption = this.getAreaListOption.bind(this);
        this.handleVendorChange = this.handleVendorChange.bind(this);
    }

    showModal(mcuId){
        this.setState({mcuId: mcuId});

        if(mcuId){
            //请求页面数据详情
            axios.get('/admin/mcus/'+ mcuId).then(data=>{
                if(data.state){
                    data = data.data;
                    this.setState({modalData: data, title: '编辑', visible: true});

                    //获取学校下拉框
                    this._getSchoolListByArea(data.areaCode);

                    //获取区域的下拉框
                    if(data.areaPath){
                        this.getAreaListOption(data.areaPath, data.areaCode);
                    }
                }
            });

            this.setState({title: '编辑'});
        }else{
            //获取区域下拉数据
            this._getAreaListByArea(this.props.areaCode);
            //获取学校下拉框
            this._getSchoolListByArea(this.props.areaCode);
            this.setState({visible: true, title: '新增'});
        }

    }

    //区域筛选时候
    handleAreaChange(value){
        const selectAreaCode = value[value.length - 1];

        //改变学校的列表
        this._getSchoolListByArea(selectAreaCode);
    }

    //获取级联的区域下拉数据
    getAreaListOption(areaPath){
        axios.get('/admin/areas/'+ areaPath[0]).then(data=>{
            if(data.state){
                let selectedOptions = [];
                data = data.data;
                let areaList = [];
                let areaInfo = {};
                areaInfo.value = data.areaCode;
                areaInfo.label = data.areaName;
                areaInfo.isLeaf = false;
                areaList.push(areaInfo);

                if(data.areaCode === areaPath[0]){
                    selectedOptions = [areaInfo];
                    this.setState({selectedOptions: [areaInfo]});
                }
                this.setState({areaOptions: areaList});

                if(areaPath.length > 1){
                    //获取区域下级下拉
                    this.loadAreaData(selectedOptions, areaPath, 1);
                }
            }
          });
        
    }


    //获取区域的数据
    loadAreaData(selectedOptions, areaPath, level, that){
        let _this = this;
        if(that){
            _this = that;
        }
        const targetOption = selectedOptions[selectedOptions.length - 1];
        let parentCode = targetOption.value
    
        //请求下级区域数据
        axios.get('/admin/areas/_search',{
          params: {
            parentCode: parentCode
          }
        }).then(data=>{
          if(data.state){
            //选中的option
            let selectOptions = _this.state.selectedOptions;

            data = data.data;
            let areaList = [];
            if(data && data.length > 0){
              data.map( v => {
                let areaInfo = {};
                areaInfo.value = v.areaCode;
                areaInfo.label = v.areaName;
                areaInfo.isLeaf = false;
                areaList.push(areaInfo);

                if(level){
                    if(v.areaCode === areaPath[level]){
                        selectOptions.push(areaInfo);
                        _this.setState({selectedOptions: selectOptions});
                    }
                }
              });
              targetOption.children = areaList;
              _this.setState({
                  areaOptions: [..._this.state.areaOptions],
              });
            }

            //子级有下级的话,就循环展示区域的数据
            if(areaPath && areaPath.length > 2 && level < areaPath.length -1){
                level ++;
                _this.loadAreaData(selectOptions, areaPath, level, _this);
            }
          }
        })
    
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
    axios.get('/admin/areas/'+ areaCode).then(data=>{
      if(data.state){
        data = data.data;
        let areaList = [];
        let areaInfo = {};
        areaInfo.value = data.areaCode;
        areaInfo.label = data.areaName;
        areaInfo.isLeaf = false;
        areaList.push(areaInfo);
        this.setState({areaOptions: areaList});
      }
    });
  }

    hideModal(){
        this.setState({visible: false, modalData: {}});
        //每次关闭时清空表单
        this.form.resetFields();
    }

    handleVendorChange(value){
        if(value[0] == 1){
           this.setState({requireVersionFlag: true}); 
        }else{
           this.setState({requireVersionFlag: false}); 
        }
    }


    handleOk (){
        const form = this.form;
        const id = this.state.mcuId;
        this.setState({ loading: true });
        form.validateFieldsAndScroll((err, values) => {
            let params = {...values, 
                canCrossIntranet: values.canCrossIntranet[0],
                canInviteTerminal: values.canInviteTerminal[0],
                mcuType: values.mcuType[0],
                vendor: values.vendor[0],
                areaCode: values.areaCode[values.areaCode.length - 1],
                schoolCode: values.schoolCode[0],
                id: this.state.mcuId,
            }
            if (!err) {

                //如果存在id就是编辑，不存在就是新增
                if(id){
                    axios.put('/admin/mcus/' + id, params).then(data=>{
                        if(data.state){
                            this.setState({ loading: false });

                            //将列表的数据替换
                            this.props.editMcuInfo(params);
                            
                            this.hideModal();
                        }else{
                            message.error('编辑数据失败');
                        }
                    });
                }else{
                    axios.post('/admin/mcus', params).then(data=>{
                        if(data.state){
                            this.setState({ loading: false });

                            //将列表的数据替换
                            let params = this.props.params;
                            this.props.getTableList(params);
                            
                            this.hideModal();
                        }else{
                            message.error('添加数据失败');
                        }
                    });
                }
            }
        })
    }


    componentDidMount(){
      this.props.onRef(this)
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render(){
        return (
            <div>
                <McuModal
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    title={this.state.title}
                    requireVersionFlag={this.state.requireVersionFlag}
                    hideModal={this.hideModal}
                    handleOk={this.handleOk}
                    loading={this.loading}
                    modalData={this.state.modalData}
                    areaOptions={this.state.areaOptions}
                    schoolOptions={this.state.schoolOptions}
                    loadAreaData={this.loadAreaData}
                    handleAreaChange={this.handleAreaChange}
                    handleVendorChange={this.handleVendorChange}
                />
            </div>
        );
    }
}

export default ManageModal
