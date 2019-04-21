import MyCanvasComponent from '../MyCanvasComponent';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import {
    FillProps,
    StrokeProps,
    FigureProps
} from '../props'

@Component({
    name: 'MyCanvasRect'
})
export default class MyCanvasRect extends Mixins(MyCanvasComponent, FillProps, StrokeProps, FigureProps){

    @Prop([Number, String]) width: number | string
    @Prop([Number, String]) height: number | string

    get widthValue(): number{
        return Number(this.width)
    }
    get heightValue(): number{
        return Number(this.height)
    }

    draw(ctx: CanvasRenderingContext2D){
        let props = this

        ctx.save()
        ctx.beginPath()

        props.figure(ctx)
        ctx.rect(-this.widthValue / 2, -this.heightValue / 2, this.widthValue, this.heightValue)
        props.drawFill(ctx)
        props.drawStroke(ctx)

        ctx.closePath()
        ctx.restore()
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let myProps = this

        ctx.beginPath()

        myProps.figure(ctx)
        ctx.rect(-this.widthValue / 2, -this.heightValue / 2, this.widthValue, this.heightValue)
        let result = ctx.isPointInPath(x, y)
        ctx.closePath()

        return result ? [this] : []
    }

    bounds(): [number, number, number, number]{
        return [-this.widthValue / 2, -this.heightValue / 2, this.widthValue / 2, this.heightValue / 2]
    }
}