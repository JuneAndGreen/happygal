'use strict';

import tpl from '../lib/tpl';
import {
  getId
} from '../lib/util';

/**
 * 基类
 */
export default class Base {
  constructor(options) {}

  /**
   * 跳到对应子项
   */
  go(index) {
    this.nowIndex = index;
  }

  /**
   * 增加子项
   */
  add(data) {
    this.datas.push(data);
  }

  /**
   * 删除子项
   */
  del(index) {
    let arr = this.datas.splice(index, 1);
    if(arr[0]) arr[0].destroy();
  }

  /**
   * 清空子项
   */
  empty() {
    this.datas.forEach((data) => {
      data.destroy();
    });
    this.datas.length = 0;
  }

  /**
   * 销毁
   */
  destroy() {
    this.empty();
  }

  seed() {
    return getId();
  }

  parse(content) {
    return tpl.parse(content);
  }
}