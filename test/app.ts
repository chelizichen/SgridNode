import { NewSgridServer, NewSgridServerCtx } from "sgridnode/build/main";
import { FrameworkController } from "./src";

function boost() {
  const ctx = NewSgridServerCtx();
  const f = new FrameworkController(ctx);
  ctx.use("/api", f.router);
  NewSgridServer(ctx);
}

boost();
