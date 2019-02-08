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
    fontSize: number
    fontFimaly: string
}
const componentProps: Props<ComponentType> = {
    props: {
        x: Number,
        y: Number,
        fontSize: Number,
        fontFimaly: String,
    }
}

@Component({
    mixins: [commonProps, fillProps, strokepropsResponsive, componentProps],
    extends: MyCanvasComponent,
    name: 'MyCanvasText'
})
export default class MyCanvasRect extends MyCanvasComponent<CommonType & FillType & StrokeType & ComponentType>{

    propsResponsive = [commonProps, fillProps, strokepropsResponsive, componentProps]

    
    draw(ctx: CanvasRenderingContext2D){
        let text = this.$slots.default && this.$slots.default.length ? this.$slots.default[0].text : ''
        if(text){
            let props = this.myProps

            ctx.save()
            ctx.beginPath()

            ctx.font =  `normal ${(props.fontSize || 12)}px ${props.fontFimaly || 'Arial'}`
            ctx.textBaseline = 'top';
    
            props.drawText(ctx, props.x, props.y, text)
            props.strokeText(ctx, props.x, props.y, text)
    
            ctx.closePath()
            ctx.restore()
        }
        
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let props = this.myProps

        ctx.beginPath()
        let result = ctx.isPointInPath(x, y)
        ctx.closePath()

        return result ? [this] : []
    }
}