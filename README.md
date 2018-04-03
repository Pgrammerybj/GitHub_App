# GitHub_App(开发笔记)
2018.03.07:
使用TabNavigator来实验Tab栏的结构，完成页面的切换

2018.03.15:
* 使用Navigator来实现路由
* 自定义NavigationBar组件

2018.03.16
* 测试官网的ListView，尝试了下拉刷新和添加Footer

2018.03.19
* 使用官方提供的Fetch测试Post/Get网络请求，基于业务简单的封装了HttpUtils

Get请求
```$xslt
  /**
     * get请求
     * @param url
     * @returns {Promise<any>}
     */
    static get(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    resolve(result)
                })
                .catch(error=>{
                    reject(error)
                });
        });
    }

```
Post请求
```$xslt
 /**
     * Post请求数据
     * @param url
     * @param data
     * @returns {Promise<any>}
     */
    static post(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'post',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
                .then(response=>response.json())
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error);
                })
        });
    }
```

调用
```$xslt
 HttpUtils.post(url, data)
            .then(resultData => {
                this.setState({
                    result: JSON.stringify(resultData)
                })
            })
            .catch(errorData => {
                this.setState({
                    result: JSON.stringify(errorData)
                })
            })
```

2018.03.26
* 添加启动页面
* 修改启动流程
* 测试GitHub搜索API

2018.04.03
* 添加了"最热"模块数据和展示
* 抽取了item的统一样式
