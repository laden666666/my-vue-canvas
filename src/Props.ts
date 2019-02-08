type GetProps<T> = {
    [name in keyof T]?: any
}

export type Props<T> = {
    props: GetProps<T>,
    methods?: {
        [fnName: string] : any
    }
}


export type CommonType = {
    zIndex: number
}
export const commonProps: Props<CommonType> = {
    props: {
        'zIndex': {
            type: Number
        },
    },
}

export type FillType = {
    fill: string
    drawFill(ctx: CanvasRenderingContext2D)
    drawText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string)
}
export const fillProps: Props<FillType> = {
    props: {
        'fill': {
            type: String
        },
    },
    methods: {
        drawFill(ctx: CanvasRenderingContext2D){
            if(this.fill){
                ctx.fillStyle = this.fill
                ctx.fill()
            }
        },
        drawText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string){
            if(this.fill){
                ctx.fillStyle = this.fill
                ctx.fillText(text, x, y)
            }
        },
    }
}

export type StrokeType = {
    strokeWidth: number
    stroke: string
    drawStroke(ctx: CanvasRenderingContext2D)
    strokeText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string)
}
export const strokepropsResponsive: Props<StrokeType> = {
    props: {
        strokeWidth: {
            type: Number  
        },
        stroke: {
            type: String
        }
    },
    methods: {
        drawStroke(ctx: CanvasRenderingContext2D){
            if(this.stroke){
                if(this.strokeWidth){
                    ctx.lineWidth = this.strokeWidth
                }
                ctx.strokeStyle = this.stroke
                ctx.stroke()
            }
        },
        strokeText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string){
            if(this.stroke){
                if(this.strokeWidth){
                    ctx.lineWidth = this.strokeWidth
                }
                ctx.strokeStyle = this.stroke
                ctx.strokeText(text, x, y)
            }
        },
    }
}