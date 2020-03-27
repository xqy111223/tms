//对axios的请求做一个配置
//所有的请求都会添加一个state返回字段，state=ture为成功，state=false为失败

import axios from 'axios'
//axios.defauls.baseURL = 'xxx' //默认的请求地址
axios.defaults.withCredentials = true  //允许跨域携带cookie
axios.defaults.timeout = 100000  //配置超时时间
const ROOT = 'http://tms.server.com:30080' //设置请求的根路径
//const ROOT = '' //设置请求的根路径

// // axios拦截器
 axios.interceptors.request.use(config => {
    let token = window.localStorage.getItem("authorizationToken");  //从缓存中取token
    let url = config.url;

    let regExp = /(\/_export)+($|\?{1})+/ig;
    let flag = regExp.test(url);
    if(flag){
      config.responseType = 'blob';
    }
    
    //修改请求地址，不全路径
    config.url = ROOT + config.url;
    if (token) {
      config.headers['Authorization-Bearer'] = token;   //将token放到请求头发送给服务器
    }else{
      //如果不是登录接口，并且没有token,就直接跳转到登录页面
      if(url != '/portal/auth'){
        window.location.href = '/login';
      }
    }
    return config
 })
 
axios.interceptors.response.use(response => {

    //如果是导出操作,就模拟a标签导出
    let regExp = /(\/_export)+($|\?{1})+/ig;
    let flag = regExp.test(response.config.url);
    if(flag){
      let date = new Date();
        let filefix = date.getFullYear() + '-' + date.getMonth() + '-' 
          + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        let blob = new Blob([response.data]); //创建一个blob对象
        let a = document.createElement('a'); //创建一个<a></a>标签
         a.href = URL.createObjectURL(blob); // response is a blob
        a.download = filefix + "下载文件.xlsx";  //文件名称
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();

            return response;
    }
    
    //如果是正常数据
  if (response.data.code === "succ") {

    //如果接口返回数据中有authorizationToken，说明是登录的时候给的数据，就需要将token记录在localstorage中
    var authorizationToken = response.data.data ? response.data.data.authorizationToken || response.data.data['Authorization-update'] || '' : ''; 
    if(authorizationToken){
      localStorage.setItem("authorizationToken", authorizationToken);
    }

    return {...response.data, state: true};

  }else{
    return {...response.data, state: false};
  }

    
})
 
export default axios