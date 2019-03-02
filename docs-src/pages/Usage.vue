<template>
    <Doc>
        <H1>初始化</H1>
        <P>使用Vue.use安装<Strong>my-vue-canvas</Strong>库。</P>
        <Code :code="`import Vue from 'vue'
import MyCanvas from 'my-vue-canvas'

Vue.use(MyCanvas)
`"></Code>

        <H2>创建canvas</H2>
        <P>使用<Strong>MyCanvas</Strong>标签创建canvas，然后使用<Strong>my-vue-canvas</Strong>的内置标签创建图形即可。</P>
        <Demo :demo="init"></Demo>

        <H2>丰富的内置标签</H2>
        <P><Strong>my-vue-canvas</Strong>提供了多种标签供我们创建复杂的视图，这些标签可以像DOM元素那样，支持Vue的响应式渲染，带给我们如图开发DOM一样的canvas开发体验。</P>
        <Demo :demo="demo"></Demo>
    </Doc>
</template>
<script>
import init from '../demo/usage/init'
import demo from '../demo/usage/demo'
export default {
    data(){
        return {
            init,
            demo
        }
    }
}
</script>
