import axios from 'axios'

const METHOD = {
  GET:'get',
  POST:'post'
}

axios.interceptors.request.use(
  config => {
		let n = window.location.hash.indexOf('?')
		if(n !== -1){
			config.headers.url = window.location.hash.substring(0,n)
		}else{
			config.headers.url = window.location.hash
		}
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          vm.$message({
            showClose: true,
            message: '请求错误！',
            type: 'error'
          });
          break
          
        case 401:
          err.message = '未授权，请登录'
          vm.$message({
            showClose: true,
            message: '未授权，请登录！',
            type: 'error'
          });
          break

        case 403:
          err.message = '拒绝访问'
          vm.$message({
            showClose: true,
            message: '拒绝访问！',
            type: 'error'
          });
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          vm.$message({
            showClose: true,
            message: `请求地址出错: ${err.response.config.url}`,
            type: 'error'
          });
          break

        case 408:
          err.message = '请求超时';
          vm.$message({
            showClose: true,
            message: `请求超时`,
            type: 'error'
          });
          break

        case 500:
          err.message = '服务器内部错误'
          vm.$message({
            showClose: true,
            message: `服务器内部错误`,
            type: 'error'
          });
          break

        case 501:
          err.message = '服务未实现'
          vm.$message({
            showClose: true,
            message: `服务未实现`,
            type: 'error'
          });
          break

        case 502:
          err.message = '网关错误'
          vm.$message({
            showClose: true,
            message: `网关错误`,
            type: 'error'
          });
          break

        case 503:
          err.message = '服务不可用'
          vm.$message({
            showClose: true,
            message: `服务不可用`,
            type: 'error'
          });
          break

        case 504:
          err.message = '网关超时'
          vm.$message({
            showClose: true,
            message: `网关超时`,
            type: 'error'
          });
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          vm.$message({
            showClose: true,
            message: `HTTP版本不受支持`,
            type: 'error'
          });
          break

        default:
      }
    }
    return Promise.reject(err)
  });
export default {
  fetch(myConfig){
    let defaultConfig = {
      apiUrl:'interface.api',
      method:METHOD.POST,
      params:null,
      isJson:true,
      needErrorCallback:false,
    }
    myConfig = Object.assign({}, defaultConfig, myConfig)
    myConfig.params.token = localStorage.getItem('taken')
    if (myConfig.params.sysType !== "001") {
    	myConfig.params.sysType = "002"
    }
    axios.defaults.baseURL = $baseUrl
    let RequestObj = {
      url:myConfig.apiUrl,
      // +'?'+Math.floor(Math.random()*100000)
      method:myConfig.method,
      timeout: 60000,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    };
    // 数据格式处理
    if (myConfig.method === METHOD.GET) {
      RequestObj.params = myConfig.params;
    } else if (myConfig.method === METHOD.POST) {
      if (myConfig.isJson) {
        // json格式
        RequestObj.headers['Content-Type'] = 'application/json;charset=UTF-8'
        RequestObj.data = myConfig.params
      } else {
        // 默认表单格式
        RequestObj.params = myConfig.params
      }
    }
    let n = window.location.host.search(':')
    let str = window.location.host + ""
    let host = str.slice(0, n)
    
    // let host = "jc.uat.gdhwater.com"
    if (host === '127.0.0.1')
      host = 'localhost'
    return new Promise((resolve ,reject)=>{
      axios(RequestObj).then(res=>{
        if(res.status===200){
          if(res.data.code !== 0){
            vm.$notify({
              title: '错误',
              message:res.data.description,
              type: 'error'
            })
            if(res.data.code===10000){
              
              if(this.host=='localhost'){
                window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'
              }else {
                window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://jc.uat.gdhwater.com/cas.htm'
              }

							// window.location.href='http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + host + ':8080/cas.htm'
            }
          }
          resolve(res.data)
        }
      },err=>{
        if(myConfig.needErrorCallback){
          reject(err)
        }
      }).catch(error=>{
        if (myConfig.needErrorCallback){
          reject(error)
        }
      })
    })
  }
}
