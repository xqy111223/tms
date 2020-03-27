/**
 * 存放下拉选项的公共数据
 */


//mcu类型
const MCUOptions = {
    data: [{
        value: 1,
        label: '硬MCU',
        },{
        value: 2,
        label: '软MCU', 
        },{
        value: 3,
        label: '云端MCU',
    }],
    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}

//厂商类型
const vendorOptions = {
    data: [{
        value: 1,
        label: '大华',
    },{
        value: 2,
        label: '软MCU',
    }],

    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}

//终端类型
const terminalType = {
    data: [{
        value:1,
        label:'H323'
    },{
        value:2,
        label:'软终端'
    },{
        value:99,
        label:'推流终端',
    }],

    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}

//终端模式
const modeOptions = {
    data:[{
        value:0,
        label:'互动',
    },{
        value:1,
        label:'纯观摩',
    },{
        value:2,
        label:'互动观摩'
    }],
    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}
//呼叫类型
const callTypeOptios = {
    data:[{
        value:0,
        label:'主动呼叫'
    },{
        value:1,
        label:'被动呼叫'
    }],
    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}

//能力
const canOptions = {
    data: [{
        value: 'Y',
        label: '有',
    },{
        value: 'N',
        label: '无',
    }],

    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}
//用户类型
const userType = {
    data:[{
        value:0,
        label:'超级管理员',
        
    },
    {
        value:1,
        label:'普通管理员',
    }],

    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}
//会议类型
const meetingType = {
    data:[{
        value:1,
        label:'及时会议',
        
    },
    {
        value:2,
        label:'预约会议',
    }],

    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}
//会议状态
const meetingStatus = {
    data:[{
        value:1,
        label:'未开始',
        
    },
    {
        value:2,
        label:'进行中',
    },
    {
        value:3,
        label:'已结束',
    }],

    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}
//呼叫类型
const callStatus = {
    data:[{
        value:1,
        label:'未呼叫',
        
    },
    {
        value:2,
        label:'呼叫成功',
    },
    {
        value:4,
        label:'呼叫失败',
    }],

    getText: function(value){
        return this.data.map(v=>(
            v.value === value ? v.label : ''
        ))
    }
}



export {MCUOptions, vendorOptions, terminalType, modeOptions,callTypeOptios, canOptions,userType,meetingType,meetingStatus,callStatus};
