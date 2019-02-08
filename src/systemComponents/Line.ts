import MyCanvasComponent from '../MyCanvasComponent';
import { Component} from 'vue-property-decorator';
import {
    Props,
    CommonType,
    commonProps,
    StrokeType,
    strokepropsResponsive
} from '../props'

type ComponentType = {
    x1: number
    y1: number
    x2: number
    y2: number
}
const componentProps: Props<ComponentType> = {
    props: {
        x1: Number,
        y1: Number,
        x2: Number,
        y2: Number,
    }
}

@Component({
    mixins: [commonProps, strokepropsResponsive, componentProps],
    extends: MyCanvasComponent,
    name: 'MyCanvasLine'
})
export default class MyCanvasRect extends MyCanvasComponent<CommonType & StrokeType & ComponentType>{

    propsResponsive = [commonProps, strokepropsResponsive, componentProps]

    
    draw(ctx: CanvasRenderingContext2D){
        let props = this.myProps

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(props.x1, props.y1)
        ctx.lineTo(props.x2, props.y2)
        props.drawStroke(ctx)

        ctx.closePath()
        ctx.restore()
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let {myProps} = this

        ctx.beginPath()
        ctx.moveTo(myProps.x1, myProps.y1)
        ctx.lineTo(myProps.x2, myProps.y2)
        ctx.lineWidth = myProps.strokeWidth
        let result = ctx.isPointInStroke(x, y)
        ctx.closePath()

        return result ? [this] : []
    }
}