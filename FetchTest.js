import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import NavigationBar from "./js/common/NavigationBar";
import HttpUtils from './HttpUtils';

export default class FetchTest extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            result: '',
        };
    }

    onLoad(url) {
        // fetch(url)
        //     .then(response => response.json())
        //     .then(result => {
        //             this.setState({
        //                 result: result
        //             });
        //         }
        //     )
        //     .catch(error=>{
        //         this.setState({
        //             result:JSON.stringify(error),
        //         })
        //     })

        HttpUtils.get(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    };

    onSubmit(url, data) {
        // fetch(url, {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(response => response.json())
        //     .then(result => {
        //         this.setState({
        //             result: JSON.stringify(result)
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             result: JSON.stringify(error)
        //         })
        //     })

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
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='Fetch的使用'
                    statusBar={{
                        backgroundColor: 'blue',
                    }
                    }
                />
                <Text onPress={() => this.onLoad('http://rap.taobao.org/mockjsdata/11793/test')}>
                    点击获取数据
                </Text>
                <Text onPress={() => this.onSubmit('http://rap.taobao.org/mockjsdata/11793/submit',
                    {
                        userName: 'JackYang',
                        password: '123456',
                    })}>
                    提交数据
                </Text>
                <Text style={styles.text}>返回的结果：{this.state.result}</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
    }
});
