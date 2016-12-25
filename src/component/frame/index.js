'use strict';

import Base from '../base';
import './index.less';
import html from './index.html';
import Person from '../person';

/**
 * 帧类
 */
export default class Frame extends Base {
  constructor(options) {
    super(options);

    // 片段数组
    this.datas = [];

    this.id = super.seed();
    this.options = options || {};

    this.init();
  }

  /**
   * 初始化
   */
  init() {
    let people = this.options.people || [];

    people.forEach((person) => {
      this.add(new Person(person));
    });
  }

  /**
   * 渲染
   */
  render() {
    let dialogue = this.options.dialogue || '';
    let content = this.datas.map((person) => {
      return person.render();
    });
    content = content.join('');

    let render = super.parse(html);
    return render({
      id: this.id,
      dialogue
    });
  }
}