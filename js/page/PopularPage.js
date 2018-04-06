import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    RefreshControl,
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository from "../expand/dao/DataRepository"
import RepositoryCell from '../common/RepositoryCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='Popular'
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                <ScrollableTabView
                    tabBarBackgroundColor='#2196f3'
                    tabBarActiveTextColor='white'
                    tabBarInactiveTextColor='#F5FFFA'
                    tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                    renderTabBar={() => <ScrollableTabBar/>}>
                    <PopularTab tabLabel='Java' key='Java'/>
                    <PopularTab tabLabel='Android' key='Android'/>
                    <PopularTab tabLabel='Python' key='Python'/>
                    <PopularTab tabLabel='Php' key='Php'/>
                </ScrollableTabView>
            </View>
        );
    }
}

class PopularTab extends Component {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            resultData: '',
            isRefreshing: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
        this.dataRepository = new DataRepository();
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad() {
        this.setState({isRefreshing: true});
        let url = URL + this.props.tabLabel + QUERY_STR;
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
                    isRefreshing:false,
                })
            })
            .catch(error => {
                this.setState({
                    resultData: JSON.stringify(error),
                })
            })
    }

    static renderRow(data) {
        return (
            <RepositoryCell data={data}/>
        )
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => PopularTab.renderRow(data)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onLoad()}
                            progressBackgroundColor={'#ffffff'}
                            colors={['#ff0000','#2196f3','#B03060','#6A5ACD']}
                        />
                    }
                />
            </View>
        )
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