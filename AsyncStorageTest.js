import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, AsyncStorage} from 'react-native';
import NavigationBar from "./js/common/NavigationBar";
import Toast, {DURATION} from 'react-native-easy-toast'

const KEY_TEXT = 'key_text';
export default class AsyncStorageTest extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='AsyncStorageTest'
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                <TextInput style={{borderWidth: 1, height: 40, margin: 10}}
                           onChangeText={text => this.text = text}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text} onPress={() => this.addTab()}>Add</Text>
                    <Text style={styles.text} onPress={() => this.deleteTab()}>Delete</Text>
                    <Text style={styles.text} onPress={() => this.getTab()}>Get</Text>
                </View>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        )
    }

    addTab() {
        AsyncStorage.setItem(KEY_TEXT, this.text, (error) => {
            if (!error) {
                this.toast.show('保存成功！',DURATION.LENGTH_SHORT)
            } else {
                this.toast.show('保存失败：' + error,DURATION.LENGTH_SHORT)
            }
        })
    }

    deleteTab() {
        AsyncStorage.removeItem(KEY_TEXT, (error) => {
            if (!error) {
                this.toast.show('删除成功！',DURATION.LENGTH_SHORT)
            } else {
                this.toast.show('删除失败：' + error,DURATION.LENGTH_SHORT)
            }
        })
    }

    getTab() {
        AsyncStorage.getItem(KEY_TEXT, (error, result) => {
            if (!error) {
                if (!result) {
                    this.toast.show('没有内容',DURATION.LENGTH_SHORT)
                } else {
                    this.toast.show('获取成功：' + result,DURATION.LENGTH_SHORT)
                }
            } else {
                this.toast.show('获取失败：' + error,DURATION.LENGTH_SHORT)
            }
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18,
        padding: 10,
    },
});