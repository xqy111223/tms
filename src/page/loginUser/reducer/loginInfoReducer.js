const INIT_LOGIN = 'INIT_LOGIN'
const LOGIN_OUT = 'LOGIN_OUT'

const initState={
    realName: '',
    userId: '',
    userType: '',
    username: '',
    areaCode: '',
}
export function loginInfo(state=initState, action){
    switch (action.type){
        case INIT_LOGIN :
            return {...state, ...action.payload};
        case LOGIN_OUT:
            return {};
        default:
            return state;
    }
}

export function initLoginInfo(data){
    return (dispatch)=>(
        dispatch({type: INIT_LOGIN, payload: data})
    )
}
export function loginOut(){
    return (dispatch)=>(
        dispatch({type: LOGIN_OUT})
    )
}