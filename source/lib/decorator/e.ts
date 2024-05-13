import { Resp } from "../utils";
import { Request,Response } from "express";

export function WithErrorHandler(h: ErrorHand) {
    return function (val: any, ctx: ClassMethodDecoratorContext) {
        if (ctx.kind !== "method") {
            throw new Error("sgrid/node/error " + ctx.kind + " must be method");
        }
        ctx.addInitializer(function () {
            val = val.bind(this);
        });
        return async function (req:Request,res:Response) {
            try {
                await val(req,res);
            } catch (e) {
                const resp = h(e);
                res.send(Resp.Error(-1,resp,null));
            }
        };
    };
}
