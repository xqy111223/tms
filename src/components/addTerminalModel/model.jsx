import React from 'react';
import { Form, Input, Button, Cascader, Modal} from 'antd';
import {vendorOptions,terminalType, canOptions,callTypeOptios,} from '@/commons/OptionData'; //导入数据

import { modeOptions } from '@/commons/OptionData';
import NumericInput from '@/components/NumericInput'
const FormItem = Form.Item;

class MyModal extends React.Component{
    constructor(){
        super()
        this.state={
        }
    }
   
    render() {
        const fromItemLayout = {
            labelCol: { span:6 }, //左边label占的宽度
            wrapperCol: { span:14 },//右边输入框占的宽度
        }
        let {visible,title, handleCancel, handleOk, form, data, classroomCode, requireFlag, handleVendorChange} = this.props
        const { getFieldDecorator } = form
        

        return(
            <Modal
                visible={visible}
                title={title}
                onCancel={handleCancel}
                wrapClassName="mcuEditModal"
                footer={[
                    <Button key="back" onClick={handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" htmlType="submit" onClick={handleOk}>
                        确定
                    </Button>,
                ]}>
                 <Form>
                    <FormItem {...fromItemLayout} label="终端名称" hasFeedback>
                        { getFieldDecorator('terminalName', {
                            initialValue: data.terminalName || '',
                            rules:[{required: true, message:'请输入终端名称'}]
                        })( <Input />) }
                    </FormItem>
                     <FormItem {...fromItemLayout} label="教室标准code" hasFeedback>
                        { getFieldDecorator('classroomCode', {
                            initialValue: classroomCode || data.classroomCode || '',
                            rules:[{required: true, message:'请输入教室标准code'}]
                        })( <Input />) }
                    </FormItem>
                    <FormItem {...fromItemLayout} label="终端类型" hasFeedback>
                        { getFieldDecorator('terminalType', {
                            initialValue: data.terminalType ? [data.terminalType] : [2],
                        })(
                            <Cascader
                            options={terminalType.data}
                            placeholder='请选择终端类型'
                            changeOnSelect
                        />
                        )}
                    </FormItem>
                     <FormItem {...fromItemLayout} label="供应商" hasFeedback>
                        { getFieldDecorator('vendor', {
                            initialValue: data.callType ? [data.callType] : [2],
                        })(
                           <Cascader
                            options={vendorOptions.data}
                            placeholder='请选择厂商类型'
                            onChange={handleVendorChange}
                            changeOnSelect
                          />
                        )}
                    </FormItem>
                      <FormItem {...fromItemLayout} label="终端端口号" hasFeedback>
                        { getFieldDecorator('terminalPort', {
                            initialValue: data.terminalPort,
                        })( <NumericInput placeholder="请输入数字"/>) }
                    </FormItem>
                    <FormItem {...fromItemLayout} label="终端ip" hasFeedback>
                        { getFieldDecorator('terminalIp', {
                            initialValue: data.terminalIp,
                        })( <Input />) }
                    </FormItem>
                    <FormItem {...fromItemLayout} label="终端模式" hasFeedback>
                        { getFieldDecorator('mode', {
                            initialValue: data.mode === 0 || data.mode ? [data.mode] : [0],
                        })(
                            <Cascader
                            options={modeOptions.data}
                            placeholder='请选择终端模式'
                            changeOnSelect
                          />
                        ) }
                    </FormItem>
                    <FormItem {...fromItemLayout} label="内网穿透能力" hasFeedback>
                        {getFieldDecorator('canCrossIntranet',{
                            initialValue:data.canCrossIntranet ? [data.canCrossIntranet] : ['N'],
                        })(
                            <Cascader
                            options={canOptions.data}
                            placeholder='请选择内网穿透能力'
                            changeOnSelect
                          />
                        )}
                    </FormItem>
                     <FormItem {...fromItemLayout} label="呼叫能力" hasFeedback>
                         {getFieldDecorator('canInvited',{
                             initialValue:data.canInvited ? [data.canInvited] : ['Y'],
                         })(
                             <Cascader
                                 options={canOptions.data}
                                 placeholder='请选择内网穿透能力'
                                 changeOnSelect
                             />
                         )}
                     </FormItem>
                     <FormItem {...fromItemLayout} label="呼叫类型" hasFeedback>
                         {getFieldDecorator('callType',{
                             initialValue: data.callType === 0 || data.callType ? [data.callType] : [0]  ,
                         })(
                             <Cascader
                                 options={callTypeOptios.data}
                                 placeholder='请选择呼叫类型'
                                 changeOnSelect
                             />
                         )}
                     </FormItem>
                     <FormItem {...fromItemLayout} label="用户名" hasFeedback>
                         {getFieldDecorator('username',{
                             initialValue: data.username || ''  ,
                             rules:[{required: requireFlag, message:'请选择呼叫类型'}]
                         })(
                             <Input />
                         )}
                     </FormItem>
                     <FormItem {...fromItemLayout} label="密码" hasFeedback>
                         {getFieldDecorator('password',{
                             initialValue: data.password === 0 || ''  ,
                             rules:[{required: requireFlag, message:'请选择呼叫类型'}]
                         })(
                             <Input />
                         )}
                     </FormItem>
                    <FormItem {...fromItemLayout} label="电话" >
                        { getFieldDecorator('phoneNumber', {
                            initialValue: data.phoneNumber,
                            rules:[{pattern:/^1(3|4|5|7|8)\d{9}$/ ,message:'请输入正确的手机号'}]
                        })( <Input />) }
                    </FormItem>
                    <FormItem {...fromItemLayout} label="Email" >
                        { getFieldDecorator('email', {
                            initialValue: data.email,
                            rules:[{pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                message:'请输入正确的邮箱地址'}]
                        })( <Input />) }
                    </FormItem>
                    <FormItem {...fromItemLayout} label="终端序列号" >
                        { getFieldDecorator('seqNum', {
                            initialValue: data.seqNum,
                            rules:[{ message:'请输入终端序列号'}]
                        })( <Input />) }
                    </FormItem>
                    <FormItem {...fromItemLayout} label="终端序版本号" >
                        { getFieldDecorator('version', {
                            initialValue: data.version,
                            rules:[{ message:'请输入版本号'}]
                        })( <Input />) }
                    </FormItem>
                </Form>
            </Modal>
           
        )
    }
}

const TerModal = Form.create()(MyModal)
export default TerModal
