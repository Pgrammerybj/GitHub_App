import React from 'react';

export default class ArrayUtils {

    /**
     * 更新数组，若item已经存在数组中，则将他移除，否则添加进数组
     * @param array
     * @param item
     */
    static updateArray(array, item) {
        for (let i = 0; i < array.length; i++) {
            let temp = array[i];
            if (item === temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    /**
     * 数组Clone的方法
     * @param array 需要克隆的数组
     * @returns {*}
     */
    static clone(array) {
        if (!array) return [];
        let cloneArray = [];
        for (let i = 0; i < array.length; i++) {
            cloneArray[i] = array[i];
        }
        return cloneArray;
    }

    /**
     * 判断两个数组是否相同
     * @param arr1
     * @param arr2
     * @returns {boolean}
     */
    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr2.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    static remove(arr, item) {
        if (!arr) return;
        for (let i = 0; i < arr.length; i++) {
            if (item === arr[i]) arr.splice(i, 1);
        }
    }
}