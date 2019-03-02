import MyCanvasComponent from '../MyCanvasComponent';
import { CommonProps, FillProps, StrokeProps, Transform2Props } from '../props';
declare const MyCanvasRect_base: import("vue-class-component/lib/declarations").VueClass<MyCanvasComponent & CommonProps & FillProps & StrokeProps & Transform2Props>;
export default class MyCanvasRect extends MyCanvasRect_base {
    d: string;
    _cachePath: string;
    _cacheSvgPath: any;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointinPath(x: any, y: any, ctx: CanvasRenderingContext2D): this[];
    bounds(): [number, number, number, number];
}
export {};
