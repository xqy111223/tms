import React, { Component } from 'react'
import { Layout, Icon } from 'antd';
import {Route, withRouter, Redirect} from 'react-router-dom'

import HeaderUser from './layout/HeaderUser'
import SiderUser from './layout/SiderUser'
import MenuList from './layout/MenuList'
import RouterConfig from './commons/routerConfig'
import logoImg from './logo.png'

//获取布局的各个部分
const { Header, Sider, Content } = Layout;

@withRouter
class App extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const pathname = this.props.location.pathname;

    //根据当前的路由去找对应的跳转组件地址
    let pageInfo = null;
    MenuList.map(v=>(
      v.path == pathname && (pageInfo = v)
    ))

    //如果pageInfo为空，则去routeInfo获取路由信息
    if(!pageInfo){
      pageInfo = RouterConfig.getComponent(pathname); 
    }


    return (
      pageInfo ?
      (<div className="tms-layout">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo">
              <img alt="logo" src={logoImg}/>
              <span>TMS管理系统</span>
            </div>
            <SiderUser defaultSelectedKeys={pageInfo.key}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <HeaderUser/>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Route
              key={pageInfo.key}
              path={pageInfo.path}
              component={pageInfo.component}
            />
          </Content>
        </Layout>
      </Layout>
    </div>)
    : <Redirect to='/login'></Redirect>
  )}
}

export default App;
