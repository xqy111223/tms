import React from 'react'
import {Table, Breadcrumb, Icon, Calendar, Input, DatePicker} from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import axios from '@/api/api'
import utils from '@/utils/utils'
import './scheduleDetail.less'


moment.locale('zh-cn')
class ScheduleDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableList: [],
            daySeqList: [],
            classroomCode: '',
            nowDate: '',
            begingTime: 0,
            endTime: 0,
        }

        this.getScheduleList = this.getScheduleList.bind(this);
        this._getDaySeqList = this._getDaySeqList.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount(){
        //获取当前查询的教室id
        let pathname = this.props.location.pathname;
        let classroomCode = pathname.substring(pathname.lastIndexOf('/')+1);
        this.setState({classroomCode});


        //获取当前时间
        let nowDate = moment().format('YYYY-MM-DD');
        this.setState({nowDate});
        
    }

    componentDidMount(){

        //获取课表头部的时间
        this._getDaySeqList();
    }

    //获取课表详情
    getScheduleList(beginTime, endTime){
        const _this = this;
        let classroomCode = this.state.classroomCode;
        if(classroomCode){
            axios.get('/admin/classrooms/' + classroomCode + '/schedules',{
                params: {
                    beginTime: beginTime, 
                    endTime: endTime,
                    receiveFlag: 'N',
                }
            }).then(data=>{
                if(data.state && data.data.list && data.data.list.length > 0){
                    data = data.data;

                    //获取一天最多的节次
                    let maxClassSeq = data.list.reduce(function(a , b){
                        let firstSeq = a.classSeq || a;
                        let lastSeq = b.classSeq || b;
                        return lastSeq > firstSeq ? lastSeq : firstSeq;
                    });

                    //按照节次组装数据
                    let schedulesList = [];
                    for(let a=1; a<=maxClassSeq; a++){
                        let classListObj = {};
                        classListObj.classSeq = utils.toChinese(a);
                        data.list.map(v=>{
                            if(v.classSeq === a){
                                classListObj[v.daySeq] = v;
                            }
                            return v;
                        });

                        schedulesList.push(classListObj);
                    }

                    this.setState({tableList: schedulesList});
                }else{
                    this.setState({tableList: []});
                }
            });
        }
    }

    //点击选择日期
    handleSelect(data){
        const beginTime = moment(data).format('YYYY-MM-DD');
        const beginDateFormate = moment(data).format('MM月DD日'); 

        //修改展示的当前日期
        this.setState({nowDate :beginTime});

        let changeFlag = true;

        //判断是否改变了当前周，如果改变了重新渲染头部日期和课表数据
        this.state.daySeqList.map(v=>(
            v === beginDateFormate && (changeFlag = true)
        ))

        if(changeFlag){
            //改变当前的课表头部时间和课表数据
            this._getDaySeqList(beginTime);
        }

    }

    //根据时间获取当周的日期
    _getDaySeqList(beginTime){
        let beginDate = new Date();
        if(beginTime){
            beginDate = new Date(beginTime);
        }
        
        beginTime = beginDate.getTime();
        let beginDaySeq = beginDate.getDay() === 0 ? 7 : beginDate.getDay();

        let daySeqList = [];
        let daySeqTimeList = [];

        //计算当前周的前几天
        for(let i=(beginDaySeq-1); i>0; i--){
            let dayTime = beginTime - i*24*60*60*1000
            daySeqList.push(moment(dayTime).format('MM月DD日'));
            daySeqTimeList.push(dayTime);
        }
        //计算当前周的后几天
        for(let i=0; i<=7-beginDaySeq; i++){
            let dayTime = beginTime + i*24*60*60*1000;
            daySeqList.push(moment(dayTime).format('MM月DD日'));
            daySeqTimeList.push(dayTime);
        }
        this.setState({
            daySeqList: daySeqList,
            begingTime: daySeqList[0],
            endTime: daySeqList[6],
        });

        //获取课表数据
        this.getScheduleList(daySeqTimeList[0], daySeqTimeList[6]);

    }

    render(){
        const daySeqList = this.state.daySeqList;
        const columns = [{
            title: '节次',
            dataIndex: 'classSeq',
            width: '100px',
          }, {
            title: '星期一',
            children:[{
                title: daySeqList[0],
                key: 1,
                className: 'center',
                render: (text) => {
                    let subjectName = text['1'] && text['1']['subjectName'];
                    let teacherName = text['1'] && text['1']['teacherName'];
                    let classlevelName = text['1'] && text['1']['classlevelName'];
                    return (
                        <span>
                            <p>{subjectName}</p>
                            <p>{teacherName}</p>
                            <p>{classlevelName}</p>
                        </span>
                    )
                }
            }],
          },{
            title: '星期二',
            children:[{
                title: daySeqList[1],
                key: 2,
                className: 'center',
                render: (text) => {
                    let subjectName = text['2'] && text['2']['subjectName'];
                    let teacherName = text['2'] && text['2']['teacherName'];
                    let classlevelName = text['2'] && text['2']['classlevelName'];
                    return (
                        <span>
                            <p>{subjectName}</p>
                            <p>{teacherName}</p>
                            <p>{classlevelName}</p>
                        </span>
                    )
                }
            }],
          },{
            title: '星期三',
            children:[{
                title: daySeqList[2],
                key: '3',
                className: 'center',
                render: (text) => {
                    let subjectName = text['3'] && text['3']['subjectName'];
                    let teacherName = text['3'] && text['3']['teacherName'];
                    let classlevelName = text['3'] && text['3']['classlevelName'];
                    return (
                        <span>
                            <p>{subjectName}</p>
                            <p>{teacherName}</p>
                            <p>{classlevelName}</p>
                        </span>
                    )
                }
            }],
          },{
            title: '星期四',
            children:[{
                title: daySeqList[3],
                key: 4,
                className: 'center',
                render: (text) => {
                    let subjectName = text['4'] && text['4']['subjectName'];
                    let teacherName = text['4'] && text['4']['teacherName'];
                    let classlevelName = text['4'] && text['4']['classlevelName'];
                    return (
                        <span>
                            <p>{subjectName}</p>
                            <p>{teacherName}</p>
                            <p>{classlevelName}</p>
                        </span>
                    )
                }
            }],
          },{
            title: '星期五',
            children:[{
                title: daySeqList[4],
                key: 5,
                className: 'center',
                render: (text) => {
                    let subjectName = text['5'] && text['5']['subjectName'];
                    let teacherName = text['5'] && text['5']['teacherName'];
                    let classlevelName = text['5'] && text['5']['classlevelName'];
                    return (
                        <span>
                            <p>{subjectName}</p>
                            <p>{teacherName}</p>
                            <p>{classlevelName}</p>
                        </span>
                    )
                }
            }],
          },{
            title: '星期六',
            children:[{
                title: daySeqList[5],
                key: 6,
                className: 'center',
                render: (text) => {
                    let subjectName = text['6'] && text['6']['subjectName'];
                    let teacherName = text['6'] && text['6']['teacherName'];
                    let classlevelName = text['6'] && text['6']['classlevelName'];
                    return (
                        <span>
                            <p>{subjectName}</p>
                            <p>{teacherName}</p>
                            <p>{classlevelName}</p>
                        </span>
                    )
                }
            }],
          },{
            title: '星期日',
            children:[{
                title: daySeqList[6],
                key: 7,
                className: 'center',
                render: (text) => {
                    let subjectName = text['7'] && text['7']['subjectName'];
                    let teacherName = text['7'] && text['7']['teacherName'];
                    let classlevelName = text['7'] && text['7']['classlevelName'];
                    return (
                        <span>
                            <p>{subjectName}</p>
                            <p>{teacherName}</p>
                            <p>{classlevelName}</p>
                        </span>
                    )
                }
            }],
          }];
        const dateFormat = 'YYYY-MM-DD'
        return (
            <div className="schedule-detail">
                <Breadcrumb className="mb30">
                    <Breadcrumb.Item><a href="/classroomManage"><Icon type='book'/> 教室管理</a></Breadcrumb.Item>
                    <Breadcrumb.Item>课表详情</Breadcrumb.Item>
                </Breadcrumb>
                <DatePicker 
                    className="mb20"
                    placeholder="请选择课表时间"
                    onChange={this.handleSelect} 
                    defaultValue={moment(this.state.nowDate, dateFormat)}
                />
                <Table 
                    bordered
                    className="scheduleTable"
                    locale={{emptyText: '暂无课程'}}
                    pagination={false}
                    columns={columns} 
                    dataSource={this.state.tableList} 
                    onChange={this.getTableList}
                />
            </div>
        );
    }
}

export default ScheduleDetail