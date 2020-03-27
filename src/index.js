import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk' //用于异步请求
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import reducers from './reducer' //合并后的reducer
import './index.less';
import App from './App';
import Login from './page/login'
import LoginUser from './page/loginUser/loginUser'
require ('./commons/config') //加载公共配置

//const store = createStore(reducers, applyMiddleware(thunk));
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));

ReactDOM.render(
    (<div className='all-height'>
        <Provider store={store}>
            <BrowserRouter>
                <div className="all-height">
                    <LoginUser/>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route component={App}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    </div>)
    , document.getElementById('root'));
registerServiceWorker();
