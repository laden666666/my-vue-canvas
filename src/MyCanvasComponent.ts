import { VNode } from 'vue'
import { Component} from 'vue-property-decorator';
import MyCanvasBase from './MyCanvasBase'
import {Props} from './props';
import { IHistory } from './IMyCanvas';

/**
 * 普通图形
 * @export
 * @class MyCanvasComponent
 * @extends {MyCanvasBase}
 * @template T 
 */
@Component({
    inject: ['MyCanvas'],
})
export default class MyCanvasComponent<T extends Object> extends MyCanvasBase {
    type: 'MyCanvas:Conponent' = 'MyCanvas:Conponent'

    get myProps(): T{
        return this as any
    }

    /**
     * 用于在render中刷props的类，这是个桥接模式，方便props的刷新
     * @protected
     * @type {Props[]}
     * @memberOf MyCanvasComponent
     */
    protected propsResponsive: Props<any>[] = []

    /**
     * 默认的渲染函数，在render中仅将组建关联的属性get一下，这样让vue知道这些props是被依赖的
     * @returns 
     * @memberOf MyComponent
     */
    render(): VNode{
        this.propsResponsive.forEach(propsResponsiveItem=>{
            Object.keys(propsResponsiveItem.props).forEach(key=>{
                this[key + '']
            })
        })

        // 因为图形元素一定是叶子节点（没有slot和子元素），因此返回一个null
        return null
    }

    /**
     * 获取MyCanvas对象
     * @returns {VNode} 
     * @memberOf MyCanvasComponent
     */
    getMyCanvas(): VNode & IHistory{
        return this['MyCanvas']
    }

    /**
     * 注册vue的updated钩子，通知mycanvas更新
     */
    updated(){
        this.getMyCanvas().needUpdate = true
    }
}