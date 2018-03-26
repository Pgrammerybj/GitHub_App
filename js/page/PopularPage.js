import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository from "../expand/dao/DataRepository"

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            resultData: ''
        };
        this.dataRepository = new DataRepository();
    }

    onLoad() {
        let url = this.getUrl(this.text);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    resultData: JSON.stringify(result),
                })
            })
            .catch(error=>{
                this.setState({
                    resultData:JSON.stringify(error),
                })
            })
    }

    getUrl(key) {
        return URL + key + QUERY_STR;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    style={{
                        backgroundColor: 'blue'
                    }}
                />
                <Text
                    onPress={() => {
                        this.onLoad()
                    }}
                    style={styles.tip}>获取数据</Text>
                <TextInput
                    style={{height: 40,borderWidth:1}}
                    onChangeText={text => this.text = text}
                />
                <Text style={styles.text_message}>
                    {this.state.resultData}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tip: {
        fontSize: 26,
    },
    text_message: {
        fontSize: 18,
    }
});