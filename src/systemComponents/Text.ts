import MyCanvasComponent from '../MyCanvasComponent';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import {
    CommonProps,
    FillProps,
    StrokeProps,
} from '../props'

@Component({
    name: 'MyCanvasText'
})
export default class MyCanvasRect extends Mixins(MyCanvasComponent, CommonProps, FillProps, StrokeProps){

    @Prop([Number, String]) x: number | string
    @Prop([Number, String]) y: number | string
    @Prop([Number, String]) fontSize: number | string
    @Prop() fontFimaly: string
    
    draw(ctx: CanvasRenderingContext2D){
        let text = this.$slots.default && this.$slots.default.length ? this.$slots.default[0].text : ''
        if(text){
            let props = this

            ctx.save()
            ctx.beginPath()

            ctx.font =  `normal ${(props.fontSize || 12)}px ${props.fontFimaly || 'Arial'}`
            ctx.textBaseline = 'top';
    
            props.drawText(ctx, Number(props.x), Number(props.y), text)
            props.strokeText(ctx, Number(props.x), Number(props.y), text)
    
            ctx.closePath()
            ctx.restore()
        }
        
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        ctx.beginPath()
        let result = ctx.isPointInPath(x, y)
        ctx.closePath()

        return result ? [this] : []
    }
}