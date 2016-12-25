'use strict';

import Base from '../base';
import './index.less';
import html from './index.html';
import Scene from '../scene';

/**
 * 片段类
 */
export default class Section extends Base {
  constructor(options) {
    super(options);

    // 场景数组
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
    let scenes = this.options.scenes || [];

    scenes.forEach((scene) => {
      this.add(new Scene(scene));
    });
  }

  /**
   * 跳到对应场景
   */
  go(index) {
    super.go(index);

    // TODO
  }
  
  /**
   * 渲染
   */
  render() {
    let content = this.datas.map((scene) => {
      return scene.render();
    });
    content = content.join('');

    let render = super.parse(html);
    return render({
      id: this.id,
      content
    });
  }
}