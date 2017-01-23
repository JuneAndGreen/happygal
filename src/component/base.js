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
   * 销毁
   */
  destroy() {
    this.empty();
  }

  /**
   * 生成id
   */
  seed() {
    return getId();
  }

  /**
   * 解析内容，生成渲染函数
   */
  parse(content) {
    return tpl.parse(content);
  }
}