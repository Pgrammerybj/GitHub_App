import React from 'react';
import {
    TouchableOpacity,
    Image, StyleSheet, Text,
} from 'react-native';

export default class ViewUtils {

    static getLeftButton(callBack) {
        return <TouchableOpacity
            onPress={callBack}>
            <Image style={styles.back_page_icon}
                   source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
        </TouchableOpacity>
    }

    static getRightTextButton(message, callBack) {
        return <TouchableOpacity
            onPress={callBack}>
            <Text style={styles.text_save}>{message}</Text>
        </TouchableOpacity>
    }
}


const styles = StyleSheet.create({
    back_page_icon: {
        width: 22,
        height: 22,
        margin: 5,
    },
    text_save: {
        fontSize: 16,
        margin: 5,
        color: 'white',
    }
});
