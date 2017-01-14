'use strict';

import Base from '../base';
import './index.less';
import html from './index.html';

/**
 * 角色类
 */
export default class Character extends Base {
  constructor(options) {
    super(options);

    this.type = options.type || 0; // 立绘编号

    this.id = super.seed();
    this.options = options || {};

    this.init();
  }

  /**
   * 初始化
   */
  init() {
  
  }

  /**
   * 销毁
   */
  destroy() {

  }

  /**
   * 渲染
   */
  render() {
    let render = super.parse(html);
    return render({
      id: this.id
    });
  }
}