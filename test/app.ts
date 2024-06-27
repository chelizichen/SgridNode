import { NewSgridServer, NewSgridServerCtx } from "sgridnode/build/main";
import { FrameworkController } from "./src";
import express from "express";
function boost() {
  const ctx = NewSgridServerCtx();
  const f = new FrameworkController(ctx);
  ctx.use("/api", f.router);
  NewSgridServer(ctx);
}

boost();
