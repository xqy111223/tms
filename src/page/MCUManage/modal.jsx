import React from 'react'
import {Modal, Form, Input, Cascader, Button} from 'antd'

import {MCUOptions, vendorOptions, canOptions} from '@/commons/OptionData'


const McuModal = Form.create()
(
    (props) => {
        let { visible, hideModal, loading, handleOk, form, modalData, title, 
            areaOptions, schoolOptions, loadAreaData, handleAreaChange, requireVersionFlag, handleVendorChange } = props;
        const { getFieldDecorator } = form;
        const FormItem = Form.Item
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14,
            },
        }

        //展示最选择区域的最末一级
        let displayRender = function(label){
            return label[label.length - 1];
        }

        //默认选中的区域
        let areaPath = modalData && modalData.areaPath;
        let selectArea = (modalData && areaPath) ? areaPath : '';

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
                    <FormItem label="名称" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('mcuName', {
                            initialValue: modalData.mcuName || '',
                            rules: [
                                {
                                    required: true,
                                    message: "请输名称"
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="类型" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('mcuType', {
                            initialValue: modalData.mcuType ? [modalData.mcuType] : '',
                            rules: [
                                {
                                    required: true,
                                    message: "请选择MCU类型"
                                },
                            ],
                        })(<Cascader
                            className="mr20"
                            options={MCUOptions.data}
                            placeholder='请选择MCU类型'
                            changeOnSelect
                        />)}
                    </FormItem>
                    <FormItem label="厂商" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('vendor', {
                            initialValue: modalData.vendor ? [modalData.vendor] : '',
                            rules: [
                                {
                                    required: true,
                                    message: "请选择厂商类型"
                                },
                            ],
                        })(<Cascader
                            options={vendorOptions.data}
                            placeholder='请选择厂商类型'
                            onChange={handleVendorChange}
                            changeOnSelect
                        />)}
                    </FormItem>
                    <FormItem label="内网穿透能力" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('canInviteTerminal', {
                            initialValue: modalData.canInviteTerminal ? [modalData.canInviteTerminal] : '',
                            rules: [
                                {
                                    required: true,
                                    message: "请选择内网穿透能力",
                                },
                            ],
                        })(<Cascader
                            options={canOptions.data}
                            placeholder='请选择内网穿透能力'
                            changeOnSelect
                        />)}
                    </FormItem>
                    <FormItem label="呼叫终端能力" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('canCrossIntranet', {
                            initialValue: modalData.canCrossIntranet ? [modalData.canCrossIntranet] : '',
                            rules: [
                                {
                                    required: true,
                                    message: "请选择呼叫终端能力",
                                },
                            ],
                        })(<Cascader
                            options={canOptions.data}
                            placeholder='请选择呼叫终端能力'
                            changeOnSelect
                        />)}
                    </FormItem>
                    <FormItem label="用户名" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('username', {
                            initialValue: modalData.username,
                            rules: [
                                {
                                    required: true,
                                    message: "请输入用户名",
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="密码" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('password', {
                            initialValue: modalData.password,
                            rules: [
                                {
                                    required: true,
                                    message: "请输入密码",
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="区域" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('areaCode', {
                            initialValue: selectArea,
                            rules: [
                                {
                                    required: true,
                                    message: "请选择区域",
                                },
                            ],
                        })(<Cascader
                            options={areaOptions}
                            placeholder='请选择区域'
                            loadData={loadAreaData}
                            onChange={handleAreaChange}
                            displayRender={displayRender}
                            changeOnSelect
                        />)}
                    </FormItem>
                    <FormItem label="学校" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('schoolCode', {
                            initialValue: modalData.schoolCode ? [modalData.schoolCode] : '',
                        })(<Cascader
                            options={schoolOptions}
                            placeholder='请选择学校'
                        />)}
                    </FormItem>
                    <FormItem label="网首地址" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('gkAddress', {
                            initialValue: modalData.gkAddress,
                            rules: [
                                {
                                    required: true,
                                    message: "请输入网首地址",
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="网首密码" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('gkPassword', {
                            initialValue: modalData.gkPassword,
                            rules: [
                                {
                                    required: true,
                                    message: "请输入网首密码",
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="后台管理地址" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('adminUrl', {
                            initialValue: modalData.adminUrl,
                            rules: [
                                {
                                    required: true,
                                    message: "请输入后台管理地址",
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="接口url" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('interfaceUrl', {
                            initialValue: modalData.interfaceUrl,
                            rules: [
                                {
                                    required: true,
                                    message: "请输入接口url",
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="型号" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('version', {
                            initialValue: modalData.version,
                            rules: [
                                {
                                    required: requireVersionFlag,
                                    message: "请输入型号",
                                },
                            ],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="序列号" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('seqNum', {
                            initialValue: modalData.seqNum,
                        })(<Input/>)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }

)
export default McuModal