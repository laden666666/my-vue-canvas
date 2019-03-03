import MyCanvasComponent from '../MyCanvasComponent';
import { Component, Prop, Mixins} from 'vue-property-decorator';
import {
    FillProps,
    StrokeProps,
} from '../props'

@Component({
    name: 'MyCanvasCircle'
})
export default class MyCanvasRect extends Mixins(MyCanvasComponent, FillProps, StrokeProps){

    @Prop([Number, String]) cx: number | string
    @Prop([Number, String]) cy: number | string
    @Prop([Number, String]) r: number | string
    
    draw(ctx: CanvasRenderingContext2D){
        let props = this

        ctx.save()
        ctx.beginPath()
        
        ctx.arc(Number(props.cx), Number(props.cy), Number(props.r), 0, Math.PI * 2, false)
        props.drawFill(ctx)
        props.drawStroke(ctx)

        ctx.closePath()
        ctx.restore()
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let props = this

        ctx.beginPath()
        ctx.arc(Number(props.cx), Number(props.cy), Number(props.r), 0, Math.PI * 2, false)
        let result = ctx.isPointInPath(x, y)
        ctx.closePath()

        return result ? [this] : []
    }

    bounds(): [number, number, number, number]{
        let props = this
        return [Number(props.cx) - Number(props.r), Number(props.cy) - Number(props.r), 
            Number(props.cx) + Number(props.r), Number(props.cy) + Number(props.r)]
    }
}