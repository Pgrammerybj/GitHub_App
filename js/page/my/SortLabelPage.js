import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableHighlight} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../utils/ArrayUtils';
import SortableListView from 'react-native-sortable-listview'


export default class SortLabelPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: [],
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData()
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.getCheckedItem(result);
            })
            .catch(error => {
                console.log(error)
            });
    }

    getCheckedItem(result) {
        this.dataArray = result;
        let checkedArray = [];
        for (let i = 0; i < result.length; i++) {
            let len = result[i];
            if (len.checked) checkedArray.push(len);
        }
        this.setState({
            checkedArray: checkedArray
        });
        //拷贝一份已经选择的标签做排序的模板数据
        this.originalCheckedArray = ArrayUtils.clone(checkedArray);
    }

    onSave() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'标签排序'}
                    statusBar={{backgroundColor: '#2196f3'}}
                    leftButton={ViewUtils.getLeftButton(() => this.onSave())}
                    rightButton={ViewUtils.getRightTextButton("Save", () => this.onSave())}
                />
                <SortableListView
                    style={{flex: 1}}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={(row) => <SortCell data={row}/>}
                />
            </View>
        );
    }
}

class SortCell extends Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={this.props.data.checked ? styles.item : styles.hidden}
                {...this.props.sortHandlers}>
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                    <Image source={require('./img/ic_sort.png')} resizeMode='stretch' style={{
                        opacity: 1,
                        width: 16,
                        height: 16,
                        marginRight: 10,
                        tintColor: '#2196F3'
                    }}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text_name: {
        fontSize: 30,
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    line: {
        height: 0.3,
        backgroundColor: '#9b9b9b',
    },
    checkBox: {
        tintColor: '#2196f3',
    }
});