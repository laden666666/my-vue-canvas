import { Component } from 'vue-property-decorator';
import MyCanvasBase from './MyCanvasBase'

/**
 * 控件
 * @export
 * @class MyCanvasControl
 * @extends {MyCanvasBase}
 */
@Component
export default class MyCanvasControl extends MyCanvasBase {
    type: 'MyCanvas:Control' = 'MyCanvas:Control'
}