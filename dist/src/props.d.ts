import Vue from 'vue';
export declare class FillProps extends Vue {
    fill: string;
    drawFill(ctx: CanvasRenderingContext2D): void;
    drawText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string): void;
}
export declare class StrokeProps extends Vue {
    strokeWidth: number | string;
    readonly strokeWidthValue: number;
    stroke: string;
    drawStroke(ctx: CanvasRenderingContext2D): void;
    strokeText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string): void;
}
declare type TransformSetting = ['translate' | 'rotate' | 'scale', any, any];
export declare class TransformProps extends Vue {
    transform: Array<TransformSetting>;
    callTransform(ctx: CanvasRenderingContext2D): void;
}
export declare class FigureProps extends Vue {
    anchor: number | String | [number, number];
    scale: number | String | [number, number];
    rotate: number | String;
    x: number | String;
    y: number | String;
    figure(ctx: CanvasRenderingContext2D): void;
}
export {};
