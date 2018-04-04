import React, {Component} from 'react';
import {
    View,
    Image,
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'
export default class WelcomePage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentDidMount(){
       this.timer = setTimeout(()=>{
            this.props.navigator.resetTo({
                component:HomePage
            })
        },2200);
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View>
                <NavigationBar
                    title={'Welcome'}
                    statusBar={{
                        backgroundColor:'#2196f3'
                    }}
                />
                <Image source={require('../../res/images/yangqi.png')}/>
                <Image style={{width:360,height:100}} source={require('../../res/images/python.jpg')}/>
            </View>
        );
    }

}