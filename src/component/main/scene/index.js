'use strict';

import MainBase from '../mainbase';
import './index.less';
import html from './index.html';
import Frame from '../frame';
import Bg from '../../extra/bg';

/**
 * 场景类
 */
export default class Scene extends MainBase {
  constructor(options) {
    super(options);

    // 场景分类
    // 0 - 正常对话场景
    // 1 - 选地图场景
    this.type = options.type || 0;

    // 帧数组
    this.datas = [];

    // 当前所在场景
    this.nowIndex = 0;

    this.id = super.seed();
    this.options = options || {};

    this.init();
  }

  /**
   * 初始化
   */
  init() {
    let frames = this.options.frames || [];

    frames.forEach((frame) => {
      this.add(new Frame(frame));
    });

    // 背景
    let bg = this.options.bg || '';
    this.bg = new Bg({bg});
  }

  /**
   * 跳到对应帧
   */
  go(index) {
    super.go(index);

    // TODO
  }

  /**
   * 渲染
   */
  render() {
    // 渲染帧列表
    let content = this.datas.map((frame) => {
      return frame.render();
    });
    content = content.join('');

    // 渲染背景
    let bg = this.bg.render();

    // 渲染场景
    let render = super.parse(html);
    return render({
      id: this.id,
      bg,
      content
    });
  }
}