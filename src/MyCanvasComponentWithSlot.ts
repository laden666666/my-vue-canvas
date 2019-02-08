import MyCanvasComponent from './MyCanvasComponent';
import { Component} from 'vue-property-decorator';
import { VNode } from 'vue';

/**
 * 带子图形的图形
 * @export
 * @class MyCanvasComponentWithSlot
 * @extends {MyCanvasComponent<T>}
 * @template T 
 */
@Component
export default class MyCanvasComponentWithSlot<T> extends MyCanvasComponent<T>{
    render(): VNode{
        return this.$createElement('object', {staticStyle:{"display": "none"}},[this.$slots.default])
        // return this.$createElement('div', {staticStyle:{"display": "none"}},[this.$slots.default])
    }
}