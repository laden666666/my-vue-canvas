import MyCanvasComponent from '../MyCanvasComponent';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import {
    CommonProps,
    FillProps,
    StrokeProps,
} from '../props'

@Component({
    name: 'MyCanvasRect'
})
export default class MyCanvasRect extends Mixins(MyCanvasComponent, CommonProps, FillProps, StrokeProps){

    @Prop([Number, String]) x: number | string
    @Prop([Number, String]) y: number | string
    @Prop([Number, String]) width: number | string
    @Prop([Number, String]) height: number | string

    
    draw(ctx: CanvasRenderingContext2D){
        let props = this

        ctx.save()
        ctx.beginPath()
        
        ctx.rect(Number(props.x), Number(props.y), Number(props.width), Number(props.height))
        props.drawFill(ctx)
        props.drawStroke(ctx)

        ctx.closePath()
        ctx.restore()
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let myProps = this

        ctx.beginPath()
        ctx.rect(Number(myProps.x), Number(myProps.y), Number(myProps.width), Number(myProps.height))
        let result = ctx.isPointInPath(x, y)
        ctx.closePath()

        return result ? [this] : []
    }

    bounds(): [number, number, number, number]{
        return [Number(this.x), Number(this.y), 
            Number(this.x) + Number(this.width), Number(this.y) + Number(this.height)]
    }
}