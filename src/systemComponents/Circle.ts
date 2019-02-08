import MyCanvasComponent from '../MyCanvasComponent';
import { Component} from 'vue-property-decorator';
import {
    Props,
    CommonType,
    commonProps,
    FillType,
    fillProps,
    StrokeType,
    strokepropsResponsive
} from '../props'

type ComponentType = {
    cx: number
    cy: number
    r: number
}
const componentProps: Props<ComponentType> = {
    props: {
        cx: Number,
        cy: Number,
        r: Number,
    }
}

@Component({
    mixins: [commonProps, fillProps, strokepropsResponsive, componentProps],
    extends: MyCanvasComponent,
    name: 'MyCanvasCircle'
})
export default class MyCanvasRect extends MyCanvasComponent<CommonType & FillType & StrokeType & ComponentType>{

    propsResponsive = [commonProps, fillProps, strokepropsResponsive, componentProps]

    
    draw(ctx: CanvasRenderingContext2D){
        let props = this.myProps

        ctx.save()
        ctx.beginPath()
        
        ctx.arc(props.cx, props.cy, props.r, 0, Math.PI * 2, false)
        props.drawFill(ctx)
        props.drawStroke(ctx)

        ctx.closePath()
        ctx.restore()
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let props = this.myProps

        ctx.beginPath()
        ctx.arc(props.cx, props.cy, props.r, 0, Math.PI * 2, false)
        let result = ctx.isPointInPath(x, y)
        ctx.closePath()

        return result ? [this] : []
    }
}