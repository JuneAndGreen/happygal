'use strict';

import Base from '../base';
import './index.less';
import html from './index.html';
import Section from '../section';

/**
 * 游戏类
 */
export default class Game extends Base {
  constructor(options) {
    super(options);

    // 片段数组
    this.datas = [];

    // 当前所在片段
    this.nowIndex = 0;

    this.id = super.seed();
    this.options = options || {};

    this.init();
  }

  /**
   * 初始化
   */
  init() {
    let sections = this.options.sections || [];

    sections.forEach((section) => {
      this.add(new Section(section));
    });
  }

  /**
   * 跳到对应片段
   */
  go(index) {
    super.go(index);

    // TODO
  }

  /**
   * 渲染
   */
  render(parent) {
    parent = document.querySelector(parent);

    let content = this.datas.map((section) => {
      return section.render();
    });
    content = content.join('');

    let render = super.parse(html);
    parent.innerHTML = render({
      id: this.id,
      content
    });
  }
}