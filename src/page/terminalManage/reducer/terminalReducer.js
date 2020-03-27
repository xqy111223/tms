import axios from '@/api/api' // 导入我们封装好的axios对象

const QUERY_TABLE = 'INIT_TABLE' //获取表格信息
const GET_DETAIL = 'GET_DETAIL' //获取详情数据
const UPDATA = 'UPDATA'  //更新数据
const initState = {
    tableList:[],
    pagination:{},
    detailData:{},
}

function tableList(data) {
    let pagination = {total:data.total, pageSize:data.pageSize, current:data.pageNum}
    return {
        type: QUERY_TABLE,
        tableList: data.list,
        pagination,
    }
}
function updataTable(params,tableList){
    tableList = tableList.map( (item) => (
        item.id === params.id ? {...item, ...params} : item
    ))
    return {type:UPDATA, tableList:tableList}
}
//页面的reducer
export function terminal (state=initState, action){
    switch(action.type){
        case QUERY_TABLE:
            return {...state, tableList: action.tableList, pagination: action.pagination}
        case GET_DETAIL:
            return {...state, detailData: action.detailData };
        case UPDATA:
            return {...state, tableList: action.tableList}
        default:
            return state
    }
}


//查询获取表格数据
const  getTableList = function (params = {pageSize:10,pageNum :1}) {
    return (dispatch,getState) => {
        axios.get('/admin/terminals/_search', {
            params: params
        }).then(data => {
            if(data.state){
                dispatch(tableList(data.data))
            }
        });
    }

}

//根据id获取每条数据
const getDetailData = function (id) {
    return(dispatch, getState) => {
        axios.get('/admin/terminals/'+ id)
        .then( data =>{
                if(data.state){
                    dispatch({type:GET_DETAIL,detailData:data.data})
                }
            }
        )
    }
}

//编辑某条数据
const updateDate = function (updataData) {
    return(dispatch,getState) => {
        dispatch(updataTable(updataData, getState().terminal.tableList))       
    }
}

export {getTableList, getDetailData, updateDate}


