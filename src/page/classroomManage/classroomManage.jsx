import React from 'react'
import {connect} from 'react-redux'
import {Cascader, Button, Table} from 'antd'
import axios from '@/api/api'
import {} from '@/page/loginUser/reducer/loginInfoReducer'
import { getTableList} from './reducer/classroomReducer'
import  ManageModal  from '@/components/addTerminalModel/modelManage'
import TermimalModal from './TerminalModal'

@connect(
    state=>({...state.loginInfo, ...state.classroom}),
    {getTableList}
)
class ClassroomManage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            areaCode: '',
            schoolCode: '',
            areaOptions: [],
            schoolOptions: [],
            showTip: 'hide',
            params: {pageNum: 1, pageSize: 10},
            tableSchoolCode: '', //用于保存查询列表的时候的code,给切换页数使用
        }
        this._getSchoolListByArea = this._getSchoolListByArea.bind(this);
        this._getAreaListByArea = this._getAreaListByArea.bind(this);
        this.loadAreaData = this.loadAreaData.bind(this);
        this.handleChangeTable = this.handleChangeTable.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.handleSchoolChange = this.handleSchoolChange.bind(this);
        this.handleSearchTable = this.handleSearchTable.bind(this);
        this.exportClassroomList = this.exportClassroomList.bind(this);
        this._vilidateSchool = this._vilidateSchool.bind(this);
    }

    componentDidMount(){
        if(this.props.areaCode){
            this._getAreaListByArea(this.props.areaCode);

            //获取学校下拉菜单的数据
            this._getSchoolListByArea(this.props.areaCode);
        }
    }

    //如果一开始props上面没有放入区域id的时候从这边走初始化区域学校数据
    componentWillReceiveProps(nextPros){

        if((!this.props.areaCode) && nextPros.areaCode){
            //获取区域下拉
            this._getAreaListByArea(nextPros.areaCode);

            //获取学校下拉菜单的数据
            this._getSchoolListByArea(nextPros.areaCode);
        }
    }

    //区域筛选时候
    handleAreaChange(value){
        let areaCode = value[value.length - 1];
        if(!areaCode){
            areaCode = this.props.areaCode;
        }
        this.setState({
            areaCode: areaCode,
        });

        //改变学校的列表
        this._getSchoolListByArea(areaCode);
    }

    //学校筛选时
    handleSchoolChange(value){
        if(value[0]){
            this.setState({
                schoolCode: value[0],
                showTip: 'hide',
            });
        }else{
            this.setState({schoolCode: ''});
        }
    }

    //查询学校列表
    handleSearchTable(){

        //如果没有查询的学校，提醒选择学校
        if(this._vilidateSchool()){
            let params = {...this.state.params, schoolCode: this.state.schoolCode}
            this.props.getTableList(params);
        }
    }

    //获取学校下拉菜单的数据
    _getSchoolListByArea(areaCode=''){
        axios.get('/admin/schools/_search',{
            params:{
                areaCode: areaCode,
            }
        }).then(data=>{
            let schoolList = [];
            if(data.state){
                data = data.data;
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

    //获取区域下拉数据
    _getAreaListByArea(areaCode=''){
        axios.get('/admin/areas/_search',{
            params: {
                parentCode: areaCode
            }
        }).then(data=>{
            if(data.state && data.data.length > 0){
                data = data.data;
                let areaList = [];
                data.map( v => {
                    let areaInfo = {};
                    areaInfo.value = v.areaCode;
                    areaInfo.label = v.areaName;
                    areaInfo.isLeaf = false;
                    areaList.push(areaInfo);
                });
                this.setState({areaOptions: areaList});
            }
        });
    }

    //获取区域的数据
    loadAreaData(selectedOptions){
        const targetOption = selectedOptions[selectedOptions.length - 1];
        let parentCode = targetOption.value

        //请求下级区域数据
        axios.get('/admin/areas/_search',{
            params: {
                parentCode: parentCode
            }
        }).then(data=>{
            let areaList = [];
            if(data.state && data.data.length > 0){
                data = data.data;
                data.map( v => {
                    let areaInfo = {};
                    areaInfo.value = v.areaCode;
                    areaInfo.label = v.areaName;
                    areaInfo.isLeaf = false;
                    areaList.push(areaInfo);
                });
                targetOption.children = areaList;
                this.setState({
                    areaOptions: [...this.state.areaOptions],
                });
            }
        })
    }

    //获取教室列表
    handleChangeTable(param){
        let params = {...this.state.params, schoolCode: this.state.tableSchoolCode, pageNum: param.current}
        this.props.getTableList(params);
    }

    //展示最选择区域的最末一级
    displayRender(label){
        return label[label.length - 1];
    }

    //导出教室列表
    exportClassroomList(){
        if(this._vilidateSchool()){
            axios.get('/admin/classrooms/_export',{
                params: {schoolCode: this.state.schoolCode}
            }).then();
        }
    }

    //校验是否选中了学校
    _vilidateSchool(){
        let flag = true;
        //如果没有查询的学校，提醒选择学校
        let schoolCode = this.state.schoolCode;
        if(schoolCode){
            this.setState({
                showTip: 'hide',
                tableSchoolCode: schoolCode,
            });
        }else{
            this.setState({showTip: ""});
            flag = false;
        } 
        return flag;
    }

    //点击编辑
    showAddTermimal(classroomCode){
        this.child.showModal('', classroomCode)
    }

    //点击查看终端
    viewTerminal(classroomCode){
        this.terminalChild.showModal(classroomCode);
    }
    // 为父组件调用子组件方法准备
    onRef = (ref) => {
        this.child = ref
    }
    onTerminalRef = (ref)=>{
        this.terminalChild = ref
    }

    render(){
        const columns = [{
            title: '教室名称',
            dataIndex: 'classroomName',
        }, {
            title: '教室code',
            dataIndex:'classroomCode',
        }, {
            title: '学校code',
            dataIndex: 'schoolCode',
        },{
            title: '操作',
            key: 'action',
            render: (text) => (
                <span>
                <a href={'/scheduleDetail/' + text.classroomCode}>查看课表</a>
                <span className="ant-divider" />
                <a href="#" onClick={this.viewTerminal.bind(this, text.classroomCode)}>查看终端</a>
                <span className="ant-divider" />
                <a href="#" onClick={this.showAddTermimal.bind(this, text.classroomCode)}>添加终端</a>
              </span>
            ),
        }];
        return (
            <div>
                <h2>请根据学校筛选想要查询的教室</h2>
                <div className="mb20">
                    <Cascader
                        className="mr20"
                        options={this.state.areaOptions}
                        loadData={this.loadAreaData}
                        onChange={this.handleAreaChange}
                        displayRender={this.displayRender}
                        placeholder='请选择区域'
                        changeOnSelect
                    />

                    <Cascader
                        allowClear={true}
                        className="mr20"
                        options={this.state.schoolOptions}
                        placeholder='请选择学校'
                        onChange={this.handleSchoolChange}
                        changeOnSelect
                    />
                    <Button type="primary" onClick={this.handleSearchTable}>查询</Button>
                    <i className={'red ml20 ' + this.state.showTip}>请选择要查询的学校</i>
                    <button 
                        type="button" 
                        className="ant-btn fr"
                        onClick={this.exportClassroomList}
                    >
                        导出教室列表
                    </button>
                </div>
                <Table
                    locale={{emptyText: '暂无数据'}}
                    columns={columns}
                    dataSource={this.props.tableList}
                    pagination={this.props.pagination}
                    onChange={this.handleChangeTable}
                />
                <ManageModal onRef={this.onRef} />
                <TermimalModal onRef={this.onTerminalRef}/>
            </div>
        );
    }
}

export default ClassroomManage