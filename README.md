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

2018.04.04
* 添加了AsyncStorage的测试Demo，AsyncStorageTest.js
* 准备收拾行李去北京西啦
```angular2html
addTab() {
        AsyncStorage.setItem(KEY_TEXT, this.text, (error) => {
            if (!error) {
                this.toast.show('保存成功！',DURATION.LENGTH_SHORT)
            } else {
                this.toast.show('保存失败：' + error,DURATION.LENGTH_SHORT)
            }
        })
    }

    deleteTab() {
        AsyncStorage.removeItem(KEY_TEXT, (error) => {
            if (!error) {
                this.toast.show('删除成功！',DURATION.LENGTH_SHORT)
            } else {
                this.toast.show('删除失败：' + error,DURATION.LENGTH_SHORT)
            }
        })
    }

    getTab() {
        AsyncStorage.getItem(KEY_TEXT, (error, result) => {
            if (!error) {
                if (!result) {
                    this.toast.show('没有内容',DURATION.LENGTH_SHORT)
                } else {
                    this.toast.show('获取成功：' + result,DURATION.LENGTH_SHORT)
                }
            } else {
                this.toast.show('获取失败：' + error,DURATION.LENGTH_SHORT)
            }
        })
    }
```
