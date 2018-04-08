import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import CustomLabelPage from "./my/CustomLabelPage";
import NavigationBar from "../common/NavigationBar";
import SortLabelPage from "./my/SortLabelPage";

export default class MyPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'My'}
                    statusBar={{backgroundColor: '#2196f3'}}
                />
                <Text
                    style={styles.text_style}
                    onPress={() => {
                        this.props.navigator.push({
                            component: CustomLabelPage,
                            params: {...this.props}
                        })
                    }}
                >
                    自定义标签页
                </Text>
                <Text
                    style={styles.text_style}
                    onPress={() => {
                        this.props.navigator.push({
                            component: SortLabelPage,
                            params: {...this.props}
                        })
                    }}
                >
                    标签排序页
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_style: {
        alignSelf:'center',
        fontSize: 18,
    }
});