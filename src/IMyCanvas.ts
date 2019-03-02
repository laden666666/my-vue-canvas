import MyCanvasComponent from './MyCanvasComponent';
export interface IHistory{
    needUpdate: boolean

    addRenderComponentList(Component: MyCanvasComponent);
}