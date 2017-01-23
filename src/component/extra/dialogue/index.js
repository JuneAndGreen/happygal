'use strict';

import ExtraBase from '../extrabase';
import './index.less';
import html from './index.html';

/**
 * 背景类
 */
export default class Dialogue extends ExtraBase {
  constructor(options) {
    super(options);

    this.id = super.seed();
    this.options = options || {};

    this.init();
  }

  /**
   * 初始化
   */
  init() {
    this.dialogue = this.options.dialogue || '';
  }

  /**
   * 渲染
   */
  render() {
    // 渲染背景
    let dialogue = this.dialogue;

    let render = super.parse(html);
    return render({
      id: this.id,
      dialogue
    });
  }
}