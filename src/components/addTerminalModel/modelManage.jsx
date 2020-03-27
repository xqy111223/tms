import React from 'react';
import { message } from 'antd';

import { connect } from 'react-redux';
import {  getDetailData, updateDate, getTableList} from '@/page/terminalManage/reducer/terminalReducer';//控制显示隐藏的flag变量
import axios from '@/api/api'
import TerModal from './model';

@connect(
    state=>state.terminal,
    {getDetailData, updateDate, getTableList}
)

class ManageModal extends React.Component {
    constructor(){
        super()
        this.state={
            visible: false,
            terminalId:'',
            classroomCode: '',
            requireFlag: false,
        }
        this.handleVendorChange = this.handleVendorChange.bind(this);
    }
    showModal = (id, classroomCode) => {
        this.setState({
          visible: true,
        });     
        if(id){
            this.setState({
              terminalId:id,
            })
            this.props.getDetailData(id)
        }else{
            this.setState({
              terminalId:'', 
            })
        }

        if(classroomCode){
            this.setState({classroomCode});
        }
    }
    handleCancel = () => {
        this.setState({
          visible:false,
        })
        this.form.resetFields();//每次关闭时清空表单
    };
    handleOk = () => {
        let _this = this
        const form = this.form
        let id = this.state.terminalId
        form.validateFieldsAndScroll((err, values) => {
            let params = {
              ...values,
              mode:values.mode[0],
              terminalType:values.terminalType[0], 
              vendor:values.vendor[0],
              canCrossIntranet:values.canCrossIntranet[0],
              canInvited:values.canInvited[0],
              callType:values.callType[0],
              terminalPort: values.terminalPort - 0,
            }
            if(!err){
                if(id){
                  //如果id存在 就是编辑
                  params.id = id
                  axios.put('/admin/terminals/' + id, params).then((data) => {
                      if(data.state){
                          this.props.updateDate(params)
                          _this.handleCancel()
                      }else{
                        message.error('编辑数据失败');
                      }
                  })
                }else{
                  //没有Id,就是新增，新增完成，重新获取list
                  axios.post('/admin/terminals', params).then((data) => {
                      if(data.state){
                        this.props.getTableList()
                        _this.handleCancel()
                      }else{
                          message.error('添加数据失败');
                      }
                        
                  })
                }
                
            }

        })
    }
    //为了拿到子组件的form
    getForm = (form) => {
      this.form = form
    }

    //改变厂商时，改变必填项
    handleVendorChange(value){
        if(value[0] == 1){
            this.setState({requireFlag: true});
        }else{
            this.setState({requireFlag: false});
        }
    }

    componentDidMount(){
      this.props.onRef(this)
  }
    render() {
        const visible = this.state.visible;
        let id = this.state.terminalId;
        let modelData = []
        let title = ''
        if(id){
            modelData = this.props.detailData 
            title = '编辑'
        }else{
            title = '新增'
        }
        return (
          <div>
              <TerModal
                  visible={visible}
                  title = {title}
                  classroomCode={this.state.classroomCode}
                  requireFlag={this.state.requireFlag}
                  handleVendorChange={this.handleVendorChange}
                  handleCancel={this.handleCancel.bind(this)}
                  handleOk={this.handleOk.bind(this)}
                  ref={this.getForm} 
                  data={modelData}
              >
              </TerModal>
          </div>
      );
    }
    
  }
export default ManageModal