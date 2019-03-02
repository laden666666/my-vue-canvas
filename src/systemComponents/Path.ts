import MyCanvasComponent from '../MyCanvasComponent';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import {
    CommonProps,
    FillProps,
    StrokeProps,
    Transform2Props
} from '../props'
var SvgPath = require('svg-path-to-canvas').default

@Component({
    name: 'MyCanvasRect'
})
export default class MyCanvasRect extends Mixins(MyCanvasComponent, CommonProps, FillProps, StrokeProps, Transform2Props){

    @Prop(String) d: string

    _cachePath: string
    _cacheSvgPath: any
    
    draw(ctx: CanvasRenderingContext2D){

        if(!this._cachePath || this._cachePath != this.d){
            this._cacheSvgPath = new SvgPath(this.d)
            this._cachePath = this.d
        }

        ctx.save()
        ctx.beginPath()

        this.callTransformBegin(ctx)
        this._cacheSvgPath.to(ctx)
        // this.callTransformEnd(ctx)

        this.drawFill(ctx)
        this.drawStroke(ctx)

        ctx.closePath()
        ctx.restore()
    }

    isPointinPath(x, y, ctx: CanvasRenderingContext2D){
        let myProps = this

        ctx.beginPath()

        this.callTransformBegin(ctx)
        this._cacheSvgPath.to(ctx)
        // this.callTransformEnd(ctx)

        ctx.lineWidth = Number(myProps.strokeWidth)
        let result = ctx.isPointInStroke(x, y)
        ctx.closePath()

        return result ? [this] : []
    }

    bounds(): [number, number, number, number]{
        if(this._cacheSvgPath){
            return this._cacheSvgPath.bounds
        }
        return [0, 0, 0, 0]
    }
}