/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    View,
    Navigator,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Boy from "./Boy";
import ListViewTest from "./ListViewTest";
import FetchTest from "./FetchTest";

export default class MyGithub extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_home',
        }

    }
    render() {
        return (
            <View style={styles.container}>
                {/*<TabNavigator>*/}
                    {/*<TabNavigator.Item*/}
                        {/*title="Home"*/}
                        {/*selectedTitleStyle={{color: "blue"}}*/}
                        {/*selected={this.state.selectedTab === 'tb_home'}*/}
                        {/*renderIcon={() => <Image style={styles.tabIcon}*/}
                                                 {/*source={require('./res/images/ic_polular.png')}/>}*/}
                        {/*renderSelectedIcon={() => <Image style={[styles.tabIcon, {tintColor: 'blue'}]}*/}
                                                         {/*source={require('./res/images/ic_polular.png')}/>}*/}
                        {/*badgeText="1"*/}
                        {/*onPress={() => this.setState({selectedTab: 'tb_home'})}>*/}
                        {/*<View style={styles.firstPage}>*/}
                        {/*</View>*/}
                    {/*</TabNavigator.Item>*/}
                    {/*<TabNavigator.Item*/}
                        {/*title="Profile"*/}
                        {/*selected={this.state.selectedTab === 'tb_profile'}*/}
                        {/*selectedTitleStyle={{color: "blue"}}*/}
                        {/*renderIcon={() => <Image style={styles.tabIcon}*/}
                                                 {/*source={require('./res/images/ic_trending.png')}/>}*/}
                        {/*renderSelectedIcon={() => <Image style={[styles.tabIcon, {tintColor: 'blue'}]}*/}
                                                         {/*source={require('./res/images/ic_trending.png')}/>}*/}
                        {/*onPress={() => this.setState({selectedTab: 'tb_profile'})}>*/}
                        {/*<View style={styles.secondPage}>*/}
                        {/*</View>*/}
                    {/*</TabNavigator.Item>*/}
                    {/*<TabNavigator.Item*/}
                        {/*title="Favorite"*/}
                        {/*selected={this.state.selectedTab === 'tb_favorite'}*/}
                        {/*selectedTitleStyle={{color: "blue"}}*/}
                        {/*renderIcon={() => <Image style={styles.tabIcon}*/}
                                                 {/*source={require('./res/images/ic_favorite.png')}/>}*/}
                        {/*renderSelectedIcon={() => <Image style={[styles.tabIcon, {tintColor: 'blue'}]}*/}
                                                         {/*source={require('./res/images/ic_favorite.png')}/>}*/}
                        {/*onPress={() => this.setState({selectedTab: 'tb_favorite'})}>*/}
                        {/*<View style={styles.thirdPage}>*/}
                        {/*</View>*/}
                    {/*</TabNavigator.Item>*/}
                    {/*<TabNavigator.Item*/}
                        {/*title="Me"*/}
                        {/*selected={this.state.selectedTab === 'tb_me'}*/}
                        {/*selectedTitleStyle={{color: "blue"}}*/}
                        {/*renderIcon={() => <Image style={styles.tabIcon} source={require('./res/images/ic_my.png')}/>}*/}
                        {/*renderSelectedIcon={() => <Image style={[styles.tabIcon, {tintColor: 'blue'}]}*/}
                                                         {/*source={require('./res/images/ic_my.png')}/>}*/}
                        {/*onPress={() => this.setState({selectedTab: 'tb_me'})}>*/}
                        {/*<View style={styles.fourPage}>*/}
                        {/*</View>*/}
                    {/*</TabNavigator.Item>*/}
                {/*</TabNavigator>*/}

                {/*<Navigator*/}
                    {/*initialRoute={{*/}
                        {/*component:Boy,*/}
                    {/*}}*/}
                    {/*renderScene={(route, navigator)=>{*/}
                        {/*let Component = route.component;*/}
                        {/*return <Component navigator={navigator} {...route.params}/>*/}
                    {/*}}*/}
                {/*/>*/}


                {/*<ListViewTest/>*/}

                <FetchTest/>


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

AppRegistry.registerComponent('MyGithub', () => MyGithub);
