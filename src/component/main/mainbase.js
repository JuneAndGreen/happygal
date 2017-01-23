'use strict';

import Base from '../base';

/**
 * 基类
 */
export default class MainBase extends Base {
  constructor(options) {
    super(options);
  }

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
    super.destroy();

    this.empty();
  }
}