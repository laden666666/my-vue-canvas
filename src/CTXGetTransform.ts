/**
 * 这是一个对还没有实现getTransform浏览器做一个getTransform兼容。用于获得transform。
 */
declare function require<T>(name: string): T
var mat2d = require<any>('gl-matrix/esm/mat2d');
var vec2 = require<any>('gl-matrix/esm/vec2');

export default function monkeyPatchCtxToAddGetTransform(ctx) {

    var mat = mat2d.create();
    var stack = [];
    var v2scratch = [0, 0];
    var m3scratch = mat2d.create();

    ctx.getTransform = function tGetTransform() {
        return mat;
    };

    ctx.pointToWorld = function tTransformScreenToWorld(out, vec) {
        mat2d.invert(m3scratch, mat);
        vec2.transformMat2d(out, vec, m3scratch);
        return out;
    };

    ;(function(save) {
        ctx.save = function tSave(){
            stack.push(mat2d.clone(mat));
            return save.call(ctx);
        };
    })(ctx.save);

    ;(function(restore) {
        ctx.restore = function tRestore(){
            mat = stack.pop();
            return restore.call(ctx);
        };
    })(ctx.restore);

    ;(function(scale) {
        ctx.scale = function tScale(sx, sy){
            v2scratch[0] = sx;
            v2scratch[1] = sy;
            mat2d.scale(mat, mat, v2scratch);
            return scale.call(ctx, sx, sy);
        };
    })(ctx.scale);

    ;(function(rotate) {
        ctx.rotate = function tRotate(radians){
            mat2d.rotate(mat, mat, radians);
            return rotate.call(ctx, radians);
        };
    })(ctx.rotate);

    ;(function(translate) {
        ctx.translate = function tTranslate(dx, dy){
            v2scratch[0] = dx;
            v2scratch[1] = dy;

            mat2d.translate(mat, mat, v2scratch);
            return translate.call(ctx, dx, dy);
        };
    })(ctx.translate);

    ;(function(transform) {
        ctx.transform = function tTransform(a, b, c, d, e, f){
            m3scratch[0] = a;
            m3scratch[1] = b;
            m3scratch[2] = c;
            m3scratch[3] = d;
            m3scratch[4] = e;
            m3scratch[5] = f;

            mat2d.multiply(mat, mat, m3scratch);
            return transform.call(ctx, a, b, c, d, e, f);
        };
    })(ctx.transform);

    ;(function(setTransform) {
        ctx.setTransform = function tSetTransform(a, b, c, d, e, f){
            mat[0] = a;
            mat[1] = c;
            mat[2] = e;
            mat[3] = b;
            mat[4] = d;
            mat[5] = f;
            
            return setTransform.call(ctx, a, b, c, d, e, f);
        };
    })(ctx.setTransform);

    return ctx;
}
