import { NewSgridServer, NewSgridServerCtx } from "../source/main";
import { FrameworkController } from "./src";
import express from "express";
function boost() {
  const ctx = NewSgridServerCtx();
  const f = new FrameworkController(ctx);
  ctx.use("/api", f.router);
  ctx.use("/web", express.static("./public/dist"));
  NewSgridServer(ctx);
}

boost();
