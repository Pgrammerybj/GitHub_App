import React, {Component} from 'react';
import {
    ListView,
    View,
    Text,
    Image,
    TouchableOpacity,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import NavigationBar from "./js/common/NavigationBar";
import Toast, {DURATION} from "react-native-easy-toast";

const ITEM_DATA = [
    'row 1', 'row 2', 'row 3', 'row 4', 'row 5',
    'row 6', 'row 7', 'row 8', 'row 9', 'row 10',
    'row 11', 'row 12', 'row 13', 'row 14', 'row 15'];

export default class ListViewTest extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows(ITEM_DATA),
            isRefreshing: true,
        };
        this.onRefreshing();
    }

    onRefreshing() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({
                isRefreshing: false,
            });
        }, 3000);
    }

    renderRow(itemData) {
        return <View style={styles.lv_item}>
            <TouchableOpacity
                onPress={() => {
                    this.toast.show('点击了：' + itemData, DURATION.LENGTH_SHORT);
                }}
            >
                <Text style={styles.lv_text}>{itemData}</Text>
            </TouchableOpacity>
        </View>
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}/>
    }

    renderFooter() {
        return <View>
            <Image style={styles.images}
                   source={{uri: 'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}}/>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'ListViewTest'}
                    statusBar={{
                        backgroundColor: 'blue',
                    }}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(itemData) => this.renderRow(itemData)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    renderFooter={() => this.renderFooter()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onRefreshing()}
                            progressBackgroundColor={'#ffffff'}
                            colors={['#ff0000', '#00ff00', '#0000ff', '#123456']}
                        />
                    }
                />
                <Toast ref={toast => {
                    this.toast = toast
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lv_item: {
        height: 50,
    },
    lv_text: {
        fontSize: 18,
    },
    line: {
        height: 1,
        backgroundColor: 'grey'
    },
    images: {
        height: 160,
        width: 400,
    },
});