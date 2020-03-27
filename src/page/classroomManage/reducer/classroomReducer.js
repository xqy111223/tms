import axios from '@/api/api'

const INIT_TABLE = 'INIT_TABLE'

const initState = {
    tableList: [],
    pagination: {},
}

export function classroom(state=initState, action){
    switch (action.type){
        case INIT_TABLE :
            return {...state, ...action.payload}
        default :
            return state
    }
}

export function getTableList(params){
    return (dispatch)=>{
        axios.get('/admin/classrooms/_search',{
            params: params
        }).then(data=>{
            if(data.state && data.data.list.length>0){
                data = data.data;
                let pagination = {total: data.total, pageSize: data.pageSize, current: data.pageNum}
                let payload = {tableList: data.list, pagination: pagination}
                dispatch({type: INIT_TABLE, payload})
            }
        });
    }
}