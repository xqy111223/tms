//合并所有的reducer 并且返回
import {mcu} from '@/page/MCUManage/reducer/mcuReducer'
import {terminal} from '@/page/terminalManage/reducer/terminalReducer'
import {userManage} from '@/page/userManage/reducer/userManageReducer'
import {loginInfo} from '@/page/loginUser/reducer/loginInfoReducer'
import {classroom} from '@/page/classroomManage/reducer/classroomReducer'
import {meetingManage} from '@/page/meetingManage/reducer/meetingManageReducer'
import { combineReducers } from 'redux'
export default combineReducers({mcu,userManage, terminal, loginInfo, classroom,meetingManage});