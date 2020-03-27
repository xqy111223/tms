/**
 * 除了左侧菜单的路由配置都放在这边
 */
import pathToRegexp from 'path-to-regexp'

import McuDetail from '../page/MCUManage/mcuDetail'
import UserDetail from '../page/userManage/userDetail'
import ScheduleDetail from '../page/classroomManage/scheduleDetail'
import MeetingDetail from '../page/meetingManage/meetingDetail'
import TerminalDetail from '../page/terminalManage/terminalDetail'

const RouterConfig = {
     data: [{
        key: 'MCUManage',
        path: '/mcuDetail/:id',
        component: McuDetail,
     },{
        key: 'userManage',
        path: '/userDetail/:id',
        component: UserDetail,
     },{
        key: 'classroomManage',
        path: '/scheduleDetail/:id',
        component: ScheduleDetail,
     },{
        key: 'meetingManage',
        path: '/meetingDetail/:id',
        component: MeetingDetail,
     },{
        key: 'terminalManage',
        path: '/terminalDetail/:id',
        component: TerminalDetail,
     }],

     //根据路由名字获取路由信息
     getComponent: function(path){
        let routeInfo = null;
        this.data.map(v=>{
            const match = pathToRegexp(v.path).exec(path)
            if(match || v.path === path){
                routeInfo = v
            }
            return null;
        })

        return routeInfo;
     }
}
 export default RouterConfig