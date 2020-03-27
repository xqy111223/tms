import axios from '../../../api/api' // 导入我们封装好的axios对象

const INIT_TABLE = 'INIT_TABLE' //获取表格信息
const UPDATE_TABLE = 'UPDATE_TABLE' //编辑某条数据
const UPDATE_PARAMS = 'UPDATE_PARAMS' //更新查询条件
const initState = {
    tablelist: [],
    pagination:{},
    params: {pageNum: 1, pageSize: 10},
}
//reduce 函数
export function userManage (state=initState, action){
    switch(action.type){
        case INIT_TABLE:
            return {...state, tablelist: action.tablelist,pagination: action.pagination}
        case UPDATE_PARAMS:
            return {...state, params: action.params}
        case UPDATE_TABLE:
            return {...state, tablelist: action.tablelist}
        default:
            return state
    }
}
//获取列表
function initTableList(data){
    let pagination = {total:data.total, pageSize:data.pageSize, current:data.pageNum}
    return {
        type: INIT_TABLE,
        tablelist: data.list,
        pagination
    }
}

//编辑列表中的某一条数
function updateTable(params,tablelist){
    console.log(tablelist);
    //改变tableList中的相应数据，使他成为编辑保存的数据
    tablelist = tablelist.map(data=>(
        data.id === params.id ? {...data,...params} : data
    ));
    return {type: UPDATE_TABLE, tablelist};
}
//User列表请求接口
export function getTableList(params){
    return (dispatch, getState)=>{
        axios.get('/admin/users',{
            params: params
        })
        .then(data=>{
                if(data.state){
                    dispatch(initTableList(data.data));
                }
            });
    }
}
//编辑用户信息
export function editUserInfo(params){
    return (dispatch, getState) =>{
        dispatch(updateTable(params, getState().userManage.tablelist));
    }
}

//User列表查询接口
export function searchTableList(params){
    return (dispatch, getState)=>{
        axios.get('/admin/users/_search',{
            params: params
        })
        .then(data=>{
            if(data.state){
                dispatch(initTableList(data.data));
            }
        });
    }
}
//更新查询的条件
export function updateParams(params){
    return (dispatch, getState) => {
        dispatch({type: UPDATE_PARAMS, params});
    }
}





