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
    x: number
    y: number
    width: number
    height: number
}
const componentProps: Props<ComponentType> = {
    props: {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
    }
}

@Component({
    mixins: [commonProps, fillProps, strokepropsResponsive, componentProps],
    extends: MyCanvasComponent,
    name: 'MyCanvasRect'
})
export default class MyCanvasRect extends MyCanvasComponent<CommonType & FillType & StrokeType & ComponentType>{

    propsResponsive = [commonProps, fillProps, strokepropsResponsive, componentProps]

    
    draw(ctx: CanvasRenderingContext2D){
        let props = this.myProps

        ctx.save()
        ctx.beginPath()
        
        ctx.rect(props.x, props.y, props.width, props.height)
        props.drawFill(ctx)
        props.drawStroke(ctx)

        ctx.closePath()
        ctx.restore()
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let {myProps} = this

        ctx.beginPath()
        ctx.rect(myProps.x, myProps.y, myProps.width, myProps.height)
        let result = ctx.isPointInPath(x, y)
        ctx.closePath()

        return result ? [this] : []
    }
}