import MyCanvasComponentWithSlot from '../MyCanvasComponentWithSlot';
import { CommonProps, TransformProps } from '../props';
declare const MyCanvasRect_base: import("vue-class-component/lib/declarations").VueClass<MyCanvasComponentWithSlot & CommonProps & TransformProps>;
export default class MyCanvasRect extends MyCanvasRect_base {
    x: number | string;
    y: number | string;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointinPath(x: any, y: any, ctx: CanvasRenderingContext2D): import("../MyCanvasBase").default[];
}
export {};
