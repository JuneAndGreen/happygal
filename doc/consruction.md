## 结构

### 主要

* Game（游戏）
* Chapter（章节）
* Section（片段）
* Scene（场景）
* Frame（帧）

### 其他

* Character（角色）
* Dialogue（对话框）
* Bg（背景）
* Word（文字）

## Game

游戏，单例，由若干个章节组成的树。

> 每个Game可以同时包含1-n个Chapter。

实例方法：

* pause()：暂停
* start()：开始
* stop()：结束
* save()：保存
* load()：读取

## Chapter

章节，以片段为节点拼成的有向图，也可以是树。

> 每个Chapter可以同时包含1-n个Section。

## Section

片段，包含若干个同类型的场景，通常片段与片段间的间隔就是出现不同类型片段或分支点的情形。

> 每个正常剧情Section可以同时包含1-n个Scene。

实例属性：

* type[Number]：分类，0 - 正常剧情，2 - 地点选择，3 - 其他

实例方法：

* next()：下一个片段

## Scene

场景，包含若干个帧。和背景是1对1关系，一个背景必定属于一个场景，一个场景也只会包含一个背景。

> 每个Scene可以同时包含1-n个Frame和1个Bg。

实例属性：



实例方法：

* next()：下一个场景

实例事件：

* end：当前帧已播完

## Frame

帧，

> 每个Frame可以同时包含0-3个Character和0-n个Dialogue。
> 当Character为0个时，处于展示cg模式。

实例属性：

* characters[Array<Character>]：角色列表
* dialogues[Array<Dialogue>]：对话框列表
* bg[Bg]：背景

实例方法：

* next()：下一帧

实例事件：

* end：当前帧已播完

## Character

实例属性：

* name[String]：本名
* nick[Array<String>]：昵称列表

实例方法：

* think()：思考
* say()：说话
* enter()：出现
* leava()：离开

## Dialogue

实例属性：

* type[Number]：分类，0 - 场景说明，2 - 心理活动，3 - 对白
* words[Array<Word>]：文字列表

## Bg

## Word

