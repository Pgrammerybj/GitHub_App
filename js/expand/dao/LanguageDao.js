import React from 'react'
import {
    AsyncStorage,
} from 'react-native'
import Key from '../../../res/data/keys'

export let FLAG_LANGUAGE = {flag_language: 'flag_language_language', flag_key: 'flag_language_key'};

export default class LanguageDao {

    constructor(flag) {
        this.flag = flag
    }

    fetch() {
        return new Promise((resolve, reject) => {
                AsyncStorage.getItem(this.flag, (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    if (result) {
                        try {
                            resolve(JSON.parse(result));
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        //当用户第一次进入的时候，result肯定为空需要我们手动的导入默认的配置文件
                        let data = this.flag === FLAG_LANGUAGE.flag_key ? Key : null;
                        this.save(data);
                        resolve(data);
                    }
                })
            }
        );
    }

    save(data) {
        let stringData = JSON.stringify(data);
        AsyncStorage.setItem(this.flag, stringData, (error, result) => {
        })
    }

    remove(){
        AsyncStorage.removeItem(this.flag,(error) => {})
    }
}