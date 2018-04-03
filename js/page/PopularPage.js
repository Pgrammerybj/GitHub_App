import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository from "../expand/dao/DataRepository"
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

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
            .catch(error => {
                this.setState({
                    resultData: JSON.stringify(error),
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
                <ScrollableTabView renderTabBar={() => <ScrollableTabBar/>}>
                    <Text tabLabel='Java' key='Java'/>
                    <Text tabLabel='Android' key='Android'/>
                    <Text tabLabel='Python' key='Python'/>
                    <Text tabLabel='Php' key='Php'/>
                </ScrollableTabView>
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