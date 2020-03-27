import axios from '../../../api/api' // 导入我们封装好的axios对象

const INIT_TABLE = 'INIT_TABLE' //获取表格信息
const UPDATE_PARAMS = 'UPDATE_PARAMS' //更新查询条件
const initState = {
    meetinglist: [],
    pagination:{},
    params: {pageNum: 1, pageSize: 10},
}
//reduce 函数
export function meetingManage (state=initState, action){
    switch(action.type){
        case INIT_TABLE:
            return {...state, meetinglist: action.meetinglist,pagination: action.pagination}
        case UPDATE_PARAMS:
            return {...state, params: action.params}
        default:
            return state
    }
}
//获取列表
function initTableList(data){
    let pagination = {total:data.total, pageSize:data.pageSize, current:data.pageNum}
    return {
        type: INIT_TABLE,
        meetinglist: data.list,
        pagination
    }
}

//meeting列表请求接口
export function getTableList(params){
    return (dispatch, getState)=>{
        axios.get('/admin/meetings',{
            params: params
        })
        .then(data=>{
                if(data.state){
                    dispatch(initTableList(data.data));
                }
            });
    }
}

//User列表查询接口
export function searchTableList(params){
    return (dispatch, getState)=>{
        axios.get('/admin/meetings/_search',{
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





