/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    DeviceEventEmitter,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from "./PopularPage";
import AsyncStorageTest from "../../AsyncStorageTest";
import MyPage from "./MyPage";
import Toast, {DURATION} from 'react-native-easy-toast';
import WebViewTest from "../../WebViewTest";

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_home',
        }

    }


    /**
     * 全局的一个Toast提示
     */
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('showToast', (text => {
            this.toast.show(text, DURATION.LENGTH_SHORT);
        }));
    }


    /**
     * 移除Toast的监听
     */
    componentWillUnmount() {
        this.listener && this.listener.remove();
    }


    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        title="Popular"
                        selectedTitleStyle={{color: "#2196f3"}}
                        selected={this.state.selectedTab === 'tb_home'}
                        renderIcon={() => <Image style={styles.tabIcon}
                                                 source={require('../../res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabIcon, {tintColor: '#2196f3'}]}
                                                         source={require('../../res/images/ic_polular.png')}/>}
                        badgeText="1"
                        onPress={() => this.setState({selectedTab: 'tb_home'})}>
                        <PopularPage/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="Trending"
                        selected={this.state.selectedTab === 'tb_profile'}
                        selectedTitleStyle={{color: "#2196f3"}}
                        renderIcon={() => <Image style={styles.tabIcon}
                                                 source={require('../../res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabIcon, {tintColor: '#2196f3'}]}
                                                         source={require('../../res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_profile'})}>
                        {/*<View style={styles.secondPage}>*/}
                        {/*</View>*/}
                        <AsyncStorageTest/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="Favorite"
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color: "#2196f3"}}
                        renderIcon={() => <Image style={styles.tabIcon}
                                                 source={require('../../res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabIcon, {tintColor: '#2196f3'}]}
                                                         source={require('../../res/images/ic_favorite.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                        <WebViewTest/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="Me"
                        selected={this.state.selectedTab === 'tb_me'}
                        selectedTitleStyle={{color: "#2196f3"}}
                        renderIcon={() => <Image style={styles.tabIcon}
                                                 source={require('../../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.tabIcon, {tintColor: '#2196f3'}]}
                                                         source={require('../../res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_me'})}>
                        <MyPage {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={toast => this.toast = toast}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    firstPage: {
        flex: 1,
        backgroundColor: 'red',
    },
    secondPage: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    thirdPage: {
        flex: 1,
        backgroundColor: 'pink',
    },
    fourPage: {
        flex: 1,
        backgroundColor: 'green',
    },
    tabIcon: {
        height: 22,
        width: 22,
    }
});