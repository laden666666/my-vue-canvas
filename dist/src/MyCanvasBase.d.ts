import { Vue } from 'vue-property-decorator';
declare global {
    interface CanvasRenderingContext2D {
        getTransform(): number[];
    }
}
/**
 * 抽象类，基础类，用于定义通用的函数
 */
export default class MyCanvasBase extends Vue {
    /**
     * 记录Mycanvas的类型
     * @type {string}
     * @memberOf MyComponent
     */
    type: string;
    /**
     * 控件渲染的优先级
     * @type {number}
     * @memberOf MyCanvasBase
     */
    zIndex: number | string;
    /**
     * 控件渲染的优先级
     * @type {number}
     * @memberOf MyCanvasBase
     */
    readonly zIndexValue: number;
    /**
     * 判断点是否在图形的封闭集合中，仿convasContext2D.isPointinPath
     * @param {number} x                            点的x坐标（相对canvas左上角）
     * @param {number} y                            点的y坐标（相对canvas左上角）
     * @param {CanvasRenderingContext2D} ctx        convasContext2D
     * @returns {MyCanvasBase[]}                    包括当前图形（控件）和其自己子图形（控件）（包括子节点的子节点）所有符合图形（控件）的集合。需要确保是按照渲染顺序排序，最先渲染的图形（控件）放到最前面
     *
     * @memberOf MyCanvasBase
     */
    isPointinPath(x: number, y: number, ctx: CanvasRenderingContext2D): MyCanvasBase[];
    /**
     * 定义在超类的isPointinPath方法，因为vue+ts中super.isPointinPath存在无法访问super的问题（vue继承方式和ts的class继承方式不同导致的），因此使用superIsPointinPath代替super.isPointinPath
     * 这是一个递归方法，递归调用子类的isPointinPath，这样可以将$children的包含测试点的元素全部遍历出来
     * 一般PointinPath只匹配叶子节点，然后再myCanvas冒泡到父节点上
     * @param {number} x                            点的x坐标（相对canvas左上角）
     * @param {number} y                            点的y坐标（相对canvas左上角）
     * @param {CanvasRenderingContext2D} ctx        convasContext2D
     * @returns {MyCanvasBase[]}                    包括当前图形（控件）和其自己子图形（控件）（包括子节点的子节点）所有符合图形（控件）的集合。需要确保是按照渲染顺序排序，最先渲染的图形（控件）放到最前面
     * @memberOf MyCanvasBase
     */
    superIsPointinPath(x: number, y: number, ctx: CanvasRenderingContext2D): MyCanvasBase[];
    /**
     * 绘制函数。render函数仅是确定是否需要刷新，如果需要刷新会在updated钩子上面通知根节点刷新，然后递归调用各个图形（控件）的draw去绘制图形。
     * @protected
     * @param {CanvasRenderingContext2D} cxt
     * @memberOf MyCanvasComponent
     */
    draw(cxt: CanvasRenderingContext2D): void;
    currentTransform: number[];
    /**
     * 定义在超类的draw法，因为vue+ts中super.draw无法访问super（vue继承方式和ts的class继承方式不同导致的），因此使用superDraw代替super.draw
     * 递归调用各个图形（控件）的draw去绘制图形。
     * @protected
     * @param {CanvasRenderingContext2D} cxt
     * @memberOf MyCanvasComponent
     */
    superDraw(cxt: CanvasRenderingContext2D): void;
    /**
     * 坐标转换公式，将[x, y, 1]通过矩阵[[a, c, e],[b, d, f],[0, 0, 1]]转换。参考计算机图形学的平面坐标变换
     * 其中a b c d e f是DOMMatrix的6个参数。用于构建变换矩阵
     * @param {number} x                    变换点的x坐标
     * @param {number} y                    变换点的y坐标
     * @param {number} a                    变换矩阵的参数a
     * @param {number} b                    变换矩阵的参数b
     * @param {number} c                    变换矩阵的参数c
     * @param {number} d                    变换矩阵的参数d
     * @param {number} e                    变换矩阵的参数e
     * @param {number} f                    变换矩阵的参数f
     * @returns {{x: number, y: number}}    转换后的坐标
     * @memberOf MyCanvasBase
     */
    transformByMatrix(x: number, y: number, a: number, b: number, c: number, d: number, e: number, f: number): {
        x: number;
        y: number;
    };
}
