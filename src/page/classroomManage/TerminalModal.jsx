import React from 'react'
import {Modal, Table, Button} from 'antd'

import {vendorOptions, terminalType} from '@/commons/OptionData'; //导入数据
import axios from '@/api/api'

class TerminalModal extends React.Component {
    constructor(props){
        super(props);
       this.state = {
           visible: false,
           tableList: [],
           loading: false,
       } 
       this.showModal = this.showModal.bind(this);
       this.hideModal = this.hideModal.bind(this);
    }

    showModal(classroomCode){
        //查询终端列表
        axios.get('/admin/classrooms/'+ classroomCode +'/terminals')
            .then(data=>{
                if(data.state){
                    if(data.data.list.length > 0){
                        this.setState({tableList: data.data.list});
                    }else{
                        this.setState({tableList: []});
                    }
                }
            });
        this.setState({visible: true});
    }

    hideModal(){
        this.setState({visible: false});
    }

    handleOk(){

    }

    componentDidMount(){
        this.props.onRef(this);
    }

    render(){
        const columns = [{
            title: '名称',
            dataIndex: 'terminalName',
          }, {
            title: '类型',
            dataIndex:'terminalType',
            render: (text) => (
               terminalType.getText(text)
            )
          }, {
              title: '厂商',
              dataIndex: 'vendor',
              render: (text) => (
                  vendorOptions.getText(text)
              )
          },{
              title: '操作',
              dataIndex: 'id',
              render: (text) => (
                  <span>
                       <a href={'/terminalDetail/' + text }>查看详情</a>
                  </span>
              )
          }]
        return  (
            <div>
                <Modal
                    visible={this.state.visible}
                    wrapClassName="terminalModal"
                    title='终端详情'
                    onCancel={this.hideModal}
                    footer={[
                        <Button key="back" onClick={this.hideModal}>取消</Button>,
                        <Button key="submit" type="primary" loading={this.loading} onClick={this.handleOk}>
                            确定
                        </Button>,
                    ]}
                    >

                    <Table
                        locale={{emptyText: '暂无数据'}}
                        columns={columns}
                        dataSource={this.state.tableList}
                        pagination={false}
                    />

                </Modal>
            </div>
        )  
    }
}

export default TerminalModal