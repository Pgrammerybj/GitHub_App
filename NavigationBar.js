import React, {Component, PropTypes} from 'react';
import {
    Text,
    View,
    Platform,
    StyleSheet,
    StatusBar,
} from 'react-native';

//定义状态栏和导航条的高度
const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;

const StatusBarShape = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden: PropTypes.bool,
};

export default class NavigationBar extends Component {

    static propTypes = {
        style: View.propTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        // hide: PropTypes.boolean,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar: PropTypes.shape(StatusBarShape),
    };

    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            // hide: false,
        }
    };

    render() {
        //状态栏
        let statusBar = <View style={[styles.statusBar, this.props.statusBar]}>
            <StatusBar {...this.props.statusBar}/>
        </View>;
        //标题
        let titleView = this.props.titleView ? this.props.titleView :
            <Text style={styles.textTitle}>{this.props.title}</Text>
        let content = <View style={styles.navBar}>
            {this.props.leftButton}
            <View style={styles.textViewContainer}>
                {titleView}
            </View>
            {this.props.rightButton}
        </View>;
        return (
            <View style={styles.container}>
                {statusBar}
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    textViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    textTitle: {
        color: 'white',
        fontSize: 20,
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    }
});