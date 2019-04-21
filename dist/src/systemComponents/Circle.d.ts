import MyCanvasComponent from '../MyCanvasComponent';
import { FillProps, StrokeProps, FigureProps } from '../props';
declare const MyCanvasRect_base: import("vue-class-component/lib/declarations").VueClass<MyCanvasComponent & FillProps & StrokeProps & FigureProps>;
export default class MyCanvasRect extends MyCanvasRect_base {
    r: number | string;
    readonly rValue: number;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointinPath(x: any, y: any, ctx: CanvasRenderingContext2D): this[];
    bounds(): [number, number, number, number];
}
export {};
