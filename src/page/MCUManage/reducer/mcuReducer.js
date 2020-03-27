import axios from '@/api/api' // 导入我们封装好的axios对象

const INIT_TABLE = 'INIT_TABLE' //获取表格信息
const UPDATE_TABLE = 'UPDATE_TABLE' //编辑某条数据
const UPDATE_PARAMS = 'UPDATE_PARAMS' //更新查询条件

const initState = {
    tableList: [],
    pagination: {},
    params: {pageNum: 1, pageSize: 10},
}

export function mcu (state=initState, action){
    switch(action.type){
        case INIT_TABLE:
            return {...state, tableList: action.tableList, pagination: action.pagination}
        case UPDATE_TABLE:
            return {...state, tableList: action.tableList}
        case UPDATE_PARAMS:
            return {...state, params: action.params}
        default:
            return state
    }
}

//获取列表
function tableList(data){
    let pagination = {total: data.total, pageSize: data.pageSize, current: data.pageNum}
    return {type: INIT_TABLE, tableList: data.list, pagination}
}

//编辑列表中的某一条数
function updateTable(params, tableList){
    //改变tableList中的相应数据，使他成为编辑保存的数据
    tableList = tableList.map(data=>(
        data.id === params.id ? {...data, ...params} : data
    ));
    return {type: UPDATE_TABLE, tableList};
}

//获取muc查询列表
export function getTableList(params){
    return (dispatch, getState)=>{
        axios.get('/admin/mcus/_search', {
            params: params
          }).then(data => {
              if(data.state){
                dispatch(tableList(data.data)); 
              }
          });
    }
}

//编辑某条数据
export function editMcuInfo(params){
    return (dispatch, getState) =>{
        dispatch(updateTable(params, getState().mcu.tableList));
    }
}

//更新查询的条件
export function updateParams(params){
    return (dispatch, getState) => {
        dispatch({type: UPDATE_PARAMS, params});
    }
}
