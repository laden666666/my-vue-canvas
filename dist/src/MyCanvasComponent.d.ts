import { VNode } from 'vue';
import MyCanvasBase from './MyCanvasBase';
import { IHistory } from './IMyCanvas';
/**
 * 普通图形
 * @export
 * @class MyCanvasComponent
 * @extends {MyCanvasBase}
 * @template T
 */
export default class MyCanvasComponent extends MyCanvasBase {
    type: 'MyCanvas:Conponent';
    /**
     * 默认的渲染函数，在render中仅将组建关联的属性get一下，这样让vue知道这些props是被依赖的
     * @returns
     * @memberOf MyComponent
     */
    render(): VNode;
    /**
     * 获取MyCanvas对象
     * @returns {VNode}
     * @memberOf MyCanvasComponent
     */
    getMyCanvas(): VNode & IHistory;
    /**
     * 注册vue的updated钩子，通知mycanvas更新
     */
    updated(): void;
    /**
     * 获得边界
     */
    bounds(): [number, number, number, number];
}
