import { NewSgridServer, NewSgridServerCtx } from "sgridnode/build/main";
import { FrameworkController } from "./src";
import { SpaFile } from "./src/interceptor/static";
import express from "express";
function boost() {
  const ctx = NewSgridServerCtx();
  new SpaFile().use(ctx);
  const f = new FrameworkController(ctx);
  ctx.use("/api", f.router);
  NewSgridServer(ctx);
}

boost();
