import React from 'react'
import {Modal, Form, Input, Cascader, Button} from 'antd'

import {userType} from '@/commons/OptionData'


const UserManageModal = Form.create()
(
    (props) => {
        let { visible, hideModal, loading, handleOk, form, modalData, title,disabled } = props;
        const { getFieldDecorator } = form
        const FormItem = Form.Item
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14,
            },
        }
        
        return (
            <Modal
                visible={visible}
                wrapClassName="mcuEditModal"
                onCancel={hideModal}
                title={title}
                footer={[
                    <Button key="back" onClick={hideModal}>取消</Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        确定
                    </Button>,
                ]}
            >
                <Form layout="horizontal">
                    <FormItem label="用户名" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('username', {
                            initialValue: modalData.username,
                            rules: [
                                {
                                    required: true,
                                    message: "请输用户名称"
                                },
                            ],
                        })(<Input disabled={disabled}/>)}
                    </FormItem>
                    <FormItem label="用户类型" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('userType', {
                            //initialValue: modalData.userType ? [modalData.userType] : '',
                            //initialValue:  [modalData.userType],
                            initialValue: modalData.userType===0 ? [0] : [1],
                            rules: [
                                {
                                    required: true,
                                    message: "请选择用户类型类型"
                                },
                            ],
                        })(<Cascader
                            className="mr20"
                            placeholder='请选择用户类型'
                            options={userType.data}
                            onChange={this.userTypeChange}
                            disabled
                            changeOnSelect
                        />)}
                    </FormItem>
                    
                    <FormItem label="真实姓名" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('realName', {
                            initialValue: modalData.realName,
                            rules: [
                                {
                                    required: true,
                                    message: "请输入真实姓名",
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="重置密码" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('password', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: "请输入密码",
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    
                </Form>
            </Modal>
        );
    }

)
export default UserManageModal