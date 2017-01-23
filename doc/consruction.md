## 结构

### 主要

* Game(游戏)
* Section(片段)
* Scene(场景)
* Frame(帧)
* Character(角色)

### 其他

* Dialogue(对话框)
* Bg(背景)

## Game

每个Game可以同时包含0-n个Section。

## Section

每个Section可以同时包含0-n个Scene。

## Scene

每个Scene可以同时包含0-n个Frame和1个Bg。

Scene有以下两类：

* 正常对话场景
* 选地图场景

## Frame

每个Frame可以同时包含0-3个Character和0-1个Dialogue。

当Character为0个时，处于展示cg模式。

## Character