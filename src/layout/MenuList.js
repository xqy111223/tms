//存放左侧菜单的配置数据和对应的数据渲染处理
import MCUManage from '../page/MCUManage/MCUManage'
import TerminalManage from '../page/terminalManage/terminalManage'
import userManage from '../page/userManage/userManage'
import ClassroomManage from '../page/classroomManage/classroomManage';
import meetingManage from '../page/meetingManage/meetingManage'

const MenuList = [
    {
        key: 'MCUManage',
        title: 'MCU管理',
        path: '/MCUManage',
        icon: 'appstore',
        component: MCUManage,
        hasChildren: false, //是否有二级菜单
    },{
        key: 'terminalManage',
        title: '终端管理',
        path: '/terminalManage',
        icon: 'share-alt',
        component: TerminalManage,
        hasChildren: false, //是否有二级菜单
    },{
        key: 'classroomManage',
        title: '教室管理',
        path: '/classroomManage',
        icon: 'book',
        component: ClassroomManage,
        hasChildren: false, //是否有二级菜单
    },{
        key: 'meetingManage',
        title: '会议管理',
        path: '/meetingManage',
        icon: 'video-camera',
        component: meetingManage,
        hasChildren: false, //是否有二级菜单
    },{
        key: 'userManage',
        title: '用户管理',
        path: '/userManage',
        icon: 'user',
        component: userManage,
        hasChildren: false, //是否有二级菜单
    }

    /* 如果有多级菜单的数据格式 例子如下
    userList: [
        {
            key: 'userList2',
            title: '用户管理2',
            url: 'userList2',
            component: 'UserList2',
            hasChildren: false, //是否有三级菜单 
        }
    ] */
]
export default MenuList;

