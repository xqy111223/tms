import React from 'react'
import {connect} from 'react-redux'
import {message} from 'antd'

import axios from '@/api/api'
import UserManageModal from './modal'
import {editUserInfo, getTableList} from './reducer/userManageReducer'

@connect(
    state=> state.userManage,
    {editUserInfo, getTableList}
)
class ManageModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            loading: false,
            userId: '', //当前编辑的userId,如果是新建，则为空
            title: '',
            modalData : {},
            disabled:false,
        }

        this.handleOk = this.handleOk.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    showModal(userId){
        this.setState({userId: userId});
        //请求页面数据详情
        if(userId){
            axios.get('/admin/users/'+ userId).then(data=>{
                if(data.state){
                    data = data.data;
                    this.setState({modalData: data, title: '编辑', visible: true,disabled:true});
                }
                
            });
            this.setState({title: '编辑',disabled:true});
        }else{
            this.setState({visible: true, title: '新增',disabled:false});
        }
    }

    hideModal(){
        this.setState({visible: false,modalData: {}});
        //每次关闭时清空表单
        this.form.resetFields();
    }


    handleOk (){
        const form = this.form;
        const id = this.state.userId;
        this.setState({ loading: true });
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //如果存在id就是编辑，不存在就是新增
                //console.log(values);
                let params = {...values, 
                    username:values.username,
                    userType: values.userType[0],
                    realName:values.realName,
                    password:values.password,
                }
                
                if(id){
                    //console.log(params);
                    params.id = this.state.userId;
                    axios.put('/admin/users/' + id, params).then(data=>{
                        if(data.state){
                            data = data.data;
                            this.setState({ loading: false });
                        
                            //将列表的数据替换
                            this.props.editUserInfo(data);
                            this.hideModal();
                        }else{
                            message.error('编辑数据失败');
                        }
                    });
                }else{
                    axios.post('/admin/users', params).then(data=>{
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
                <UserManageModal
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    title={this.state.title}
                    hideModal={this.hideModal}
                    handleOk={this.handleOk}
                    loading={this.loading}
                    modalData={this.state.modalData}
                    disabled = {this.state.disabled}
                />
            </div>
        );
    }
}

export default ManageModal
