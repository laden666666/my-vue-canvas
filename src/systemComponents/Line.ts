import MyCanvasComponent from '../MyCanvasComponent';
import { Component, Prop, Mixins} from 'vue-property-decorator';
import {
    StrokeProps,
} from '../props'

@Component({
    name: 'MyCanvasLine'
})
export default class MyCanvasRect extends Mixins(MyCanvasComponent, StrokeProps) {

    @Prop([Number, String]) x1: number | string
    @Prop([Number, String]) y1: number | string
    @Prop([Number, String]) x2: number | string
    @Prop([Number, String]) y2: number | string

    
    draw(ctx: CanvasRenderingContext2D){
        let props = this

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(Number(props.x1), Number(props.y1))
        ctx.lineTo(Number(props.x2), Number(props.y2))
        props.drawStroke(ctx)

        ctx.closePath()
        ctx.restore()
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let myProps = this

        ctx.beginPath()
        ctx.moveTo(Number(myProps.x1), Number(myProps.y1))
        ctx.lineTo(Number(myProps.x2), Number(myProps.y2))
        ctx.lineWidth = Number(myProps.strokeWidth)
        let result = ctx.isPointInStroke(x, y)
        ctx.closePath()

        return result ? [this] : []
    }
}