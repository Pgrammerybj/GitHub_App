import {
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native'

export default class DataRepository {

    /**
     * 获取数据，先走本地再走网络
     * @param url
     * @returns {Promise<any>}
     */
    fetchRepository(url) {
        return new Promise(((resolve, reject) => {
            //获取本地数据
            this.fetchLocalRepository(url)
                .then(result => {
                    if (result && result.items && DataRepository.checkDate(result.update_time)) {
                        resolve(result);
                        DeviceEventEmitter.emit('showToast', '显示缓存数据');
                    } else {
                        this.fetchNetRepository(url)
                            .then(result => {
                                resolve(result);
                                DeviceEventEmitter.emit('showToast', '显示网络数据');
                            })
                            .catch(e => {
                                reject(e);
                            })
                    }
                })
                .catch(e => {
                    this.fetchNetRepository(url)
                        .then(result => {
                            resolve(result);
                            DeviceEventEmitter.emit('showToast', '显示网络数据');
                        })
                        .catch(e => {
                            reject(e);
                        })
                })
        }));
    }

    /**
     * 获取URL所在本地的缓存
     * @param url
     * @returns {Promise<any>}
     */
    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        });
    }

    /**
     * 从网络获取URL的数据
     * @param url
     * @returns {Promise<any>}
     */
    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    if (!result) {
                        reject(new Error('responseDate Is Null'));
                        return;
                    }
                    resolve(result.items);
                    DataRepository.saveRepository(url, result.items);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    /**
     * 保存从网络获取的数据到本地
     * @param url
     * @param items
     * @param callBack
     */
    static saveRepository(url, items, callBack) {
        if (!url || !items) return;
        //包装原始数据，添加一个保存的时间标识
        let packDate = {items: items, update_time: new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(packDate), callBack);

    }

    /**
     * 判断存储的数据是否过时
     * @param longTime 数据保存的时间戳
     * @return {boolean}
     */
    static checkDate(longTime) {
        let cDate = new Date();
        let sDate = new Date();
        sDate.setTime(longTime);
        if (cDate.getMonth() !== sDate.getMonth()) return false;
        if (cDate.getDay() !== sDate.getDay()) return false;
        return cDate.getHours() - sDate.getHours() < 4;

    }
}