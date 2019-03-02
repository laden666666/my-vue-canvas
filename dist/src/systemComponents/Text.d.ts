import MyCanvasComponent from '../MyCanvasComponent';
import { CommonProps, FillProps, StrokeProps } from '../props';
declare const MyCanvasRect_base: import("vue-class-component/lib/declarations").VueClass<MyCanvasComponent & CommonProps & FillProps & StrokeProps>;
export default class MyCanvasRect extends MyCanvasRect_base {
    x: number | string;
    y: number | string;
    fontSize: number | string;
    fontFimaly: string;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointinPath(x: any, y: any, ctx: CanvasRenderingContext2D): this[];
}
export {};
