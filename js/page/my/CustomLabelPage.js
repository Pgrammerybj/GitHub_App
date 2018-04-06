import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, View, Alert} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';
import ArrayUtils from '../../utils/ArrayUtils';

export default class CustomLabelPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.ChangeValues = [];
        this.state = {
            dataArray: []
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData()
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    /**
     * 检测是否保存修改
     */
    onSave(flag) {
        if (this.ChangeValues.length !== 0) {
            if (flag === 'left') {
                Alert.alert('Flag', 'Whether to save the modified data?')
                Alert.alert(
                    null,
                    'Whether to save the modified data?',
                    [
                        {text: 'Cancel', onPress: () => this.props.navigator.pop()},
                        {
                            text: 'OK', onPress: () => {
                                this.languageDao.save(this.state.dataArray);
                                this.props.navigator.pop();
                            }
                        },
                    ], {cancelable: false}
                )
            } else {
                this.languageDao.save(this.state.dataArray);
                this.props.navigator.pop();
            }
        }else {
            this.props.navigator.pop();
        }
    }

    onRemove() {
        this.languageDao.remove();
    }

    onClick(date) {
        date.checked = !date.checked;
        ArrayUtils.updateArray(this.ChangeValues, date)
    }

    renderView() {

        if (!this.state.dataArray || this.state.dataArray.length === 0) return;
        let len = this.state.dataArray.length;
        let views = [];
        for (let i = 0, j = len - 2; i <= j; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? null : this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}/>
            </View>
        );
        return views;
    }

    renderCheckBox(date) {
        let leftText = date.name;
        return (
            <CheckBox
                style={{flex: 1, margin: 10,}}
                leftText={leftText}
                isChecked={date.checked}
                onClick={() => this.onClick(date)}
                checkedImage={<Image source={require('../my/img/ic_check_box.png')} style={styles.checkBox}/>}
                unCheckedImage={<Image source={require('../my/img/ic_check_box_outline_blank.png')}
                                       style={styles.checkBox}/>}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'自定义标签'}
                    statusBar={{backgroundColor: '#2196f3'}}
                    leftButton={ViewUtils.getLeftButton(() => this.onSave('left'))}
                    rightButton={ViewUtils.getRightTextButton("Save", () => this.onSave('right'))}
                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
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
            flexDirection: 'row',
        },
        line: {
            height: 0.3,
            backgroundColor: '#9b9b9b',
        },
        checkBox: {
            tintColor: '#2196f3',
        }
    })
;