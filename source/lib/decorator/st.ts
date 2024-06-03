import express, { Express } from "express";

export abstract class WithStatic {
  abstract staticHandle(): [string, string];

  use(ctx: Express): void;
  use(ctx: Express) {
    const paths = this.staticHandle();
    ctx.use(paths[0], express.static(paths[1]));
  }
}
