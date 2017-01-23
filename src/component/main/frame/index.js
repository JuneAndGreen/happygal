'use strict';

import MainBase from '../mainbase';
import './index.less';
import html from './index.html';
import Character from '../character';
import Dialogue from '../../extra/dialogue';

/**
 * 帧类
 */
export default class Frame extends MainBase {
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
    let characters = this.options.characters || [];

    characters.forEach((character) => {
      this.add(new Character(character));
    });

    // 对话框
    let dialogue = this.options.dialogue || '';
    this.dialogue = new Dialogue({dialogue});
  }

  /**
   * 渲染
   */
  render() {
    // 渲染角色列表
    let content = this.datas.map((character) => {
      return character.render();
    });
    content = content.join('');

    // 渲染对话框
    let dialogue = this.dialogue.render();

    // 渲染帧
    let render = super.parse(html);
    return render({
      id: this.id,
      dialogue
    });
  }
}