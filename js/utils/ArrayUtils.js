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
}