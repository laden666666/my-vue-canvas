import MyCanvasComponent from '../MyCanvasComponent';
import { FillProps, StrokeProps } from '../props';
declare const MyCanvasRect_base: import("vue-class-component/lib/declarations").VueClass<MyCanvasComponent & FillProps & StrokeProps>;
export default class MyCanvasRect extends MyCanvasRect_base {
    x: number | string;
    y: number | string;
    fontSize: number | string;
    fontFimaly: string;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointinPath(x: any, y: any, ctx: CanvasRenderingContext2D): this[];
}
export {};
