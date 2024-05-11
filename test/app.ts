import { NewSgridServer, NewSgridServerCtx } from "sgridnode/build/main";
import { FrameworkController } from "./src";
import { errorHandler } from "./src/interceptor/error";


function boost(){
    const ctx = NewSgridServerCtx()
    const f = new FrameworkController(ctx)
    ctx.use('/api',f.router);
    ctx.use(errorHandler);
    NewSgridServer(ctx)
}

boost()

process.on("uncaughtException", (err) => {
    console.error(err)
  })
  
  process.on("unhandledRejection", (reason, p) => {
    console.error(reason, p)
  })
  