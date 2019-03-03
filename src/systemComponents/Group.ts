import MyCanvasComponentWithSlot from '../MyCanvasComponentWithSlot';
import { Component, Prop, Mixins} from 'vue-property-decorator';
import { 
    TransformProps
} from '../props'

@Component({
    name: 'MyCanvasGroup'
})
export default class MyCanvasRect extends Mixins(MyCanvasComponentWithSlot, TransformProps){

    @Prop([Number, String]) x: number | string
    @Prop([Number, String]) y: number | string

    draw(ctx: CanvasRenderingContext2D){
        let props = this

        ctx.save()
        // 位移变换
        if(props.x != null || props.y != null){
            ctx.translate(props.x ? Number(props.x) : 0, props.y ? Number(props.y) : 0)
        }

        this.callTransform(ctx)

        // 递归渲染子控件
        this.superDraw(ctx)
        ctx.restore()
    }
    
    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let props = this
        ctx.save()
        if(props.x != null || props.y != null){
            ctx.translate(props.x ? Number(props.x) : 0, props.y ? Number(props.y) : 0)
        }
        this.callTransform(ctx)
        let arr = this.superIsPointinPath(x, y, ctx)
        ctx.restore()
        return arr
    }
}