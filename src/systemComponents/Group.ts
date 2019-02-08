import MyCanvasComponentWithSlot from '../MyCanvasComponentWithSlot';
import { Component} from 'vue-property-decorator';
import { 
    Props,
    CommonType,
    commonProps,
} from '../props'

type ComponentType = {
    x: number
    y: number
}
const componentResponsive: Props<ComponentType> = {
    props: {
        x: Number,
        y: Number,
    }
}

@Component({
    mixins: [commonProps, componentResponsive],
    name: 'MyCanvasGroup'
})
export default class MyCanvasRect extends MyCanvasComponentWithSlot<CommonType & ComponentType>{

    propsResponsive = [commonProps, componentResponsive]

    draw(ctx: CanvasRenderingContext2D){
        let props = this.myProps

        ctx.save()
        // 位移变换
        ctx.transform(1, 0, 0, 1, props.x || 0, props.y || 0)

        // 递归渲染子控件
        this.superDraw(ctx)
        ctx.restore()
    }
    
    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let {myProps} = this
        ctx.save()
        ctx.translate(myProps.x || 0, myProps.y || 0)
        let arr = this.superIsPointinPath(x, y, ctx)
        ctx.restore()
        return arr
    }
}