/**
 * 提示弹窗的公共封装
 */

import React from 'react'
import { Modal, message } from 'antd';

class TipsModal extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Modal title="Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          okText="OK" cancelText="Cancel"
        >
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </div>
    );
  }
}
//export default TipsModal;

const confirm = function(content, onOk) {
  Modal.confirm({
    title: '提示',
    content: content,
    okText: '确定',
    cancelText: '取消',
    onOk: function(){
        onOk();
    }
  });
}


export {TipsModal, confirm}

