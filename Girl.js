import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from "./NavigationBar";

export default class Girl extends Component {

    renderBarButton(imageUrl) {
        return <TouchableOpacity
            onPress={() => {
                this.props.navigator.pop();
            }}>
            <Image style={styles.back_page_icon} source={imageUrl}/>
        </TouchableOpacity>
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Girl'}
                    statusBar={{
                        backgroundColor: 'blue',
                    }}
                    leftButton={
                        this.renderBarButton(require('./res/images/ic_arrow_back_white_36pt.png'))
                    }
                    rightButton={
                        this.renderBarButton(require('./res/images/ic_star.png'))
                    }
                />
                <Text style={styles.text}>I am Girl</Text>
                <Text style={styles.text}>{this.props.word}</Text>
                <Text onPress={() => {
                    this.props.onCallBack("女孩回赠一盒巧克力给男孩");
                    this.props.navigator.pop();
                }}>回赠一盒巧克力给男孩</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
        fontSize: 22
    },
    back_page_icon: {
        width: 22,
        height: 22,
        margin: 5,
    }
});
