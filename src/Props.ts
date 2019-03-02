import Vue from 'vue'
import { Component, Prop, Mixins } from 'vue-property-decorator';

// zIndex属性
@Component
export class CommonProps extends Vue {
    @Prop([Number, String]) public zIndex: number | string
}

// fill相关属性
@Component
export class FillProps extends Vue {
    @Prop() public fill: string
    drawFill(ctx: CanvasRenderingContext2D){
        if(this.fill){
            ctx.fillStyle = this.fill
            ctx.fill()
        }
    }
    drawText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string){
        if(this.fill){
            ctx.fillStyle = this.fill
            ctx.fillText(text, x, y)
        }
    }
}

// Stroke相关属性
@Component
export class StrokeProps extends Vue {
    @Prop([String, Number]) public strokeWidth: number | string
    @Prop() public stroke: string
    drawStroke(ctx: CanvasRenderingContext2D){
        if(this.stroke){
            if(this.strokeWidth){
                ctx.lineWidth = Number(this.strokeWidth)
            }
            ctx.strokeStyle = this.stroke
            ctx.stroke()
        }
    }
    strokeText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string){
        if(this.stroke){
            if(this.strokeWidth){
                ctx.lineWidth = Number(this.strokeWidth)
            }
            ctx.strokeStyle = this.stroke
            ctx.strokeText(text, x, y)
        }
    }
}

// Transform相关属性
type TransformSetting = ['translate' | 'rotate' | 'scale', any, any]
@Component
export class TransformProps extends Vue {
    @Prop() public transform: Array<TransformSetting>
    
    callTransform(ctx: CanvasRenderingContext2D){
        if(this.transform){
            this.transform.forEach((transformSetting: TransformSetting)=>{
                if(transformSetting[0] === 'translate'){
                    ctx.translate(transformSetting[1], transformSetting[2])
                } else if(transformSetting[0] === 'rotate'){
                    ctx.rotate(transformSetting[1])
                } else if(transformSetting[0] === 'scale'){
                    ctx.scale(transformSetting[1], transformSetting[2] || transformSetting[1])
                }
            })
        }
    }
}


// Transform相关属性
@Component
export  class Transform2Props extends Vue {
    @Prop() public anchor: number | String | [number, number]
    @Prop() public scale: number | String | [number, number]
    @Prop() public rotate: number | String

    @Prop() public x: number | String
    @Prop() public y: number | String

    callTransformBegin(ctx: CanvasRenderingContext2D){
        let bounds: [number, number, number, number] = (this as any).bounds()
        let anchor = Array.isArray(this.anchor) ? this.anchor : 
            [Number(this.anchor || 0.5), Number(this.anchor || 0.5)]

        ctx.translate(bounds[0] + (bounds[2] - bounds[0]) * anchor[0], 
            bounds[1] + (bounds[3] - bounds[1]) * anchor[1])
    
    
        let rotate = Number(this.rotate || 0)
        ctx.rotate(rotate)
        let scale = Array.isArray(this.scale) ? this.scale : [Number(this.scale || 1), Number(this.scale || 1)]
        ctx.scale(scale[0], scale[1])

        ctx.translate((bounds[0] + (bounds[2] - bounds[0]) * anchor[0]) * -2, 
            (bounds[1] + (bounds[3] - bounds[1]) * anchor[1]) * -2)

        if(this.y || this.x){
            ctx.translate(Number(this.x || 0), Number(this.y || 0))
                
        }
    }
    // callTransformEnd(ctx: CanvasRenderingContext2D){
    //     if(this.scale || this.rotate){
    //         let bounds: [number, number, number, number] = (this as any).bounds()
    //         let anchor = Array.isArray(this.anchor) ? this.anchor : 
    //             [Number(this.anchor || 0.5), Number(this.anchor || 0.5)]

    //         ctx.translate((bounds[2] - bounds[0]) * anchor[0],
    //             (bounds[3] - bounds[1]) * anchor[1])
    //     }
    // }
}