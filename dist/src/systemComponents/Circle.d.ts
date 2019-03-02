import MyCanvasComponent from '../MyCanvasComponent';
import { CommonProps, FillProps, StrokeProps } from '../props';
declare const MyCanvasRect_base: import("vue-class-component/lib/declarations").VueClass<MyCanvasComponent & CommonProps & FillProps & StrokeProps>;
export default class MyCanvasRect extends MyCanvasRect_base {
    cx: number | string;
    cy: number | string;
    r: number | string;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointinPath(x: any, y: any, ctx: CanvasRenderingContext2D): this[];
    bounds(): [number, number, number, number];
}
export {};
