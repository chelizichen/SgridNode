export const errorMap = new Map();

export function WithErrorHandler(h: ErrorHand) {
  return function (val: any, ctx: ClassMethodDecoratorContext) {
    if (ctx.kind !== "method") {
      throw new Error("sgrid/node/error " + ctx.kind + " must be method");
    }
    errorMap.set(ctx.name, h);
  };
}
