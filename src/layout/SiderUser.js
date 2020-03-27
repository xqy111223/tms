import React from 'react'
import {Menu, Icon} from 'antd'
import {Link, withRouter} from 'react-router-dom'

import MenuList from './MenuList'

//左侧菜单列表

@withRouter
class SiderUser extends React.Component{
    render (){
        return (
            <div>
                <Menu 
                    theme="dark" 
                    mode="inline" 
                    defaultSelectedKeys={[this.props.defaultSelectedKeys]}
                    style={{ height: '100%' }}
                >
                    {MenuList.map(v=>(
                        <Menu.Item key={v.key}>
                            <Link to={v.path}>
                                <Icon type={v.icon}/>
                                <span className="nav-text">{v.title}</span>
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default SiderUser