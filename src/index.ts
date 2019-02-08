import Group from './systemComponents/Group'
import Rect from './systemComponents/Rect'
import Circle from './systemComponents/Circle'
import Line from './systemComponents/Line'
import Text from './systemComponents/Text'
import {VueConstructor} from 'vue'

declare function require(name: string): any

export default {
    install(vue: VueConstructor){
        vue.component('MCRect', Rect)
        vue.component('MCCircle', Circle)
        vue.component('MCGroup', Group)
        vue.component('MCLine', Line)
        vue.component('MCText', Text)
        vue.component('MyCanvas', require('./MyCanvas.vue').default)
    }
}