<template>
    <canvas ref="canvas"
        @contextmenu.stop.prevent
        @click="callEvent('on-click', $event)" 
        @mousedown="callEvent('on-mousedown', $event)" 
        @mouseup="callEvent('on-mouseup', $event)" 
        @mouseout="callEvent('on-mouseout', $event)" 
        @mousemove="callInOutEvent('on-mouseenter', 'on-mousemove', 'on-mouseout', $event)" 
        @touchstart="callEvent('on-touchstart', $event)" 
        @touchmove="callEvent('on-touchmove', $event)" 
        @touchend="callEvent('on-touchend', $event)" 
        :width="width"
        :height="height"
    >
        <slot></slot>
    </canvas>
</template>
<script>
import MyCanvasControl from '../myCanvas/MyCanvasControl'
import CTXGetTransform from './CTXGetTransform'
export default {
    props: {
        width: {
            type: String,
            default: '400px'
        },
        height: {
            type: String,
            default: '300px'
        },
        backgourndColor: {
            type: String,
            default: '#fff'
        }
    },
    data(){
        return {
            type: 'MyCanvas'
        }
    },
    created(){
        // 创建非响应式属性
        this.needUpdate = false
        // 一次渲染的id，用于取消渲染
        this._updateID
        // 记录上一次保存的图形，用于做使用
        this._lastInComponentMap = {}
    },
    extends: MyCanvasControl,
    provide() {
        return {
            MyCanvas: this
        }
    },
    updated(){
        this.needUpdate = true
    },
    mounted(){
        this.needUpdate = true
        cancelAnimationFrame(this._updateID)
        this._updateID = requestAnimationFrame(this.canvasRender.bind(this))
    },
    destroyed(){
        this._context = null
        cancelAnimationFrame(this._updateID)
    },
    methods: {
        // 渲染相关
        /**
         * 获得canvas上线文
         */
        getContext(){
            if(!this._context){
                this._context = CTXGetTransform(this.$el.getContext('2d'))
            }
            return this._context
        },
        /**
         * 在requestAnimationFrame
         */
        canvasRender(){
            let context = this.getContext()
            if(this.needUpdate){
                try{
                    this.clearCanvas()
                    this.draw(context)
                } catch(e){
                    console.error(e)
                }
                this.needUpdate = false
            }
            cancelAnimationFrame(this._updateID)
            this._updateID = requestAnimationFrame(this.canvasRender.bind(this))
        },
        /**
         * 清空画布
         */
        clearCanvas(){
            let context = this.getContext()
            context.clearRect(0, 0, this.$el.width, this.$el.height); 
        },
        /**
         * 给定指定点，查找该点命中的所有子组件，并把所有命中的子组件按照渲染顺序返回
         */
        getPointInComponents(x, y){
            let context = this.getContext()
            let findComp = this.isPointinPath(x, y, context)

            return findComp.reverse()
        },
        /**
         * 根据事件名，对子组件列表，做事件dispatch。
         */
        emitEvent(enentName, e, arr){
            each: for(let i = 0 ; i < arr.length; i++){

                // 是否捕获了事件，如果捕获了事件就不再查找
                let capture = false

                // 遍历每一个子组件的到MyCanvas祖先控件，看有这些祖先控件没有绑定了事件的响应方法。
                bubble: for(let item = arr[i]; ; item = item.$parent){

                    // 如果遍历到MyCanvas以外的祖先组件，表示已经超出了mycanvas的范围，遍历下一个子组件
                    if(!item || !item.type || !item.type.startsWith('MyCanvas:')){
                        break bubble
                    }

                    // 如果哪个子组件的哪个祖先组件绑定了事件响应方法，就让该子组件dispatchEvent事件，同时退出循环
                    if(item.$listeners && item.$listeners[enentName]){
                        // // 创建
                        // var evt = document.createEvent('HTMLEvents');
                        // // 初始化
                        // evt.initEvent(enentName, true, true);
                        // evt.dataset = e
                        // arr[i].$el.dispatchEvent(evt);

                        // 捕获了资源，开始向上冒泡
                        capture = true

                        // 阻止冒泡的事件
                        let isBubble = true
                        let stop = ()=>{ isBubble = false }
                        // 事件发生源
                        let target = arr[i]
                        // 绑定事件的控件
                        let currentTarget = item
                        currentTarget.$emit(enentName, {
                            target,
                            currentTarget,
                            stop,
                            ...e
                        })

                        // 如果冒泡，继续向上查找；否则直接退出
                        if(isBubble){
                            continue bubble
                        } else {
                            break each
                        }
                    }
                    
                }

                // 如果已经捕获了事件，就不在继续查找
                if(capture){
                    break each
                }
            }
        },
        /**
         * 事件触发
         */
        callEvent(eventName, e){
            let arr = this.getPointInComponents(e.offsetX, e.offsetY)
            this.emitEvent(eventName, {
                x: e.offsetX,
                y: e.offsetY,
                button: e.buttons ? e.buttons ? e.button : -1 : 0,
                ctrlKey: e.ctrlKey,
                metaKey: e.metaKey,
                shiftKey: e.shiftKey,
                altKey: e.altKey,
            }, arr)
        },
        /**
         * 移入移出事件触发
         * 注意：这个函数非纯函数，仅能给一个事件用
         */
        callInOutEvent(inEventName, moveEventName, outEventName, e){

            let lastInComponentMap = this._lastInComponentMap

            let moveArr = []
            let inArr = []

            // 缓存本次查询的到
            this._lastInComponentMap = this.getPointInComponents(e.offsetX, e.offsetY).reduce((map, comp)=>{
                map[comp._uid] = comp

                // 记录已经移出的控件和新进来的控件，用lastInComponentMap检查控件是否已经进来
                // 并将未移出的控件删除（这样lastInComponentMap仅保留移出的控件）
                if(lastInComponentMap[comp._uid]){
                    moveArr.push(comp)
                    delete lastInComponentMap[comp._uid]
                } else {
                    inArr.push(comp)
                }

                return map
            },{})

            // 获得已经移出的控件，做移出事件响应
            let removeArr = Object.values(lastInComponentMap)
            if(removeArr.length){
                this.emitEvent(outEventName, {
                    x: e.offsetX,
                    y: e.offsetY,
                    ctrlKey: e.ctrlKey,
                    metaKey: e.metaKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    button: e.buttons ? e.button : -1,
                }, removeArr, false)
            }

            // 获得已经移出的控件，做移入事件响应
            if(inArr.length){
                this.emitEvent(inEventName, {
                    x: e.offsetX,
                    y: e.offsetY,
                    ctrlKey: e.ctrlKey,
                    metaKey: e.metaKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    button: e.buttons ? e.button : -1,
                }, inArr, false)
            }

            // 为出去的控件做移动事件响应
            if(moveArr.length){
                this.emitEvent(moveEventName, {
                    x: e.offsetX,
                    y: e.offsetY,
                    ctrlKey: e.ctrlKey,
                    metaKey: e.metaKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    button: e.buttons ? e.button : -1,
                }, moveArr, false)
            }
        },
    },

}
</script>
