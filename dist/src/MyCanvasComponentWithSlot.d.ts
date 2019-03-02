import MyCanvasComponent from './MyCanvasComponent';
import { VNode } from 'vue';
/**
 * 带子图形的图形
 * @export
 * @class MyCanvasComponentWithSlot
 * @extends {MyCanvasComponent<T>}
 * @template T
 */
export default class MyCanvasComponentWithSlot extends MyCanvasComponent {
    render(): VNode;
}
