import MyCanvasComponent from '../MyCanvasComponent';
import { Component, Prop, Mixins} from 'vue-property-decorator';
import {
    FillProps,
    StrokeProps,
    FigureProps
} from '../props'

@Component({
    name: 'MyCanvasCircle'
})
export default class MyCanvasRect extends Mixins(MyCanvasComponent, FillProps, StrokeProps, FigureProps){

    @Prop([Number, String]) r: number | string
    get rValue(){
        return Number(this.r)
    }
    
    draw(ctx: CanvasRenderingContext2D){
        let props = this

        ctx.save()
        ctx.beginPath()
        
        this.figure(ctx)
        ctx.arc(0, 0, Number(props.rValue), 0, Math.PI * 2, false)
        props.drawFill(ctx)
        props.drawStroke(ctx)

        ctx.closePath()
        ctx.restore()
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let props = this

        ctx.beginPath()
        
        this.figure(ctx)
        ctx.arc(0, 0, Number(props.rValue), 0, Math.PI * 2, false)
        let result = ctx.isPointInPath(x, y)
        ctx.closePath()

        return result ? [this] : []
    }

    bounds(): [number, number, number, number]{
        return [-this.rValue, -this.rValue, this.rValue, this.rValue]
    }
}