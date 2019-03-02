import MyCanvasComponent from '../MyCanvasComponent';
import { CommonProps, StrokeProps } from '../props';
declare const MyCanvasRect_base: import("vue-class-component/lib/declarations").VueClass<MyCanvasComponent & CommonProps & StrokeProps>;
export default class MyCanvasRect extends MyCanvasRect_base {
    x1: number | string;
    y1: number | string;
    x2: number | string;
    y2: number | string;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointinPath(x: any, y: any, ctx: CanvasRenderingContext2D): this[];
}
export {};
