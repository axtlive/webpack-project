<!--
 * @Description: React渲染原理
 * @Author: taotao.zhu@hand-china.com
 * @Date: 2020-04-06 15:28:44
 * @LastEditors: Axtlive
 * @LastEditTime: 2020-04-27 15:32:43
 -->

# 渲染原理

### 渲染： 生成用于显示的对象，以及将这些对象行程真实的DOM对象

+ React元素：React Element，通过React.createElement创建（JSX语法糖）
  - ```<div><h1>标题</h1></div>```
  - ```<App/ >```
+ React节点：专门用于渲染到UI界面的对象，React会通过React元素，创建React节点，ReactDOM一定是通过React节点来进行渲染的
+ 节点类型：
	- React DOM节点：创建该节点的React元素类型是一个字符串
	- React 组件节点：创建该节点的React元素类型是一个函数或是一个类
	- React 文本节点：由字符串、数字创建
	- React 空节点： 又null、undefined、true、false创建
	- React 数组节点：该节点由一个数组创建
+ 真是DOM： 通过document.createElement创建的DOM元素

----------------------------------------------------------------------------------------------------------

1. 通过参数的值创建节点
2. 根据不同的节点，做不同的事情
	+ 文本节点：通过document.createTextNode 创建真实的文本节点
	+ 空节点：什么都不做
	+ 数组节点：遍历数组，将数组的每一项递归创建节点（回到第一步进行反复操作，直到遍历结束）
	+ DOM节点：通过document.createElement创建真实的DOM对象,然后离职设置该真实DOM元素的各种属性，然后遍历对应React元素的children属性，递归操作（回到第一步进行反复操作，直到遍历结束）
	+ 组件节点
		- 函数组件：调用函数（该函数必须返回一个可以生成节点的内容），将该函数的返回结果递归生成节点（回到第一步进行反复操作，直到遍历结束）
		- 类组件：
			* 创建该类的实例
			* 立即调用对象的生命周期方法： static getDerivedStateFromProps
			* 运行改对象的render方法，拿到节点对象（将该节点递归操作，回到第一步进行反复操作）
			* 将该组件的 componentDidMount 加入到执行队列（先进先出，先进的先执行），当整个虚拟DOM树全部构建完毕，并且将真实的DOM对象加入到容器中后，执行该队列
3. 生成虚拟DOM树后，将该树保存起来，以便后续使用
4. 将之前生成的真实DOM对象，加入到容器中
			
			