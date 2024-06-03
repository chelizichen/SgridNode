import { NewSgridServerCtx, NewSgridServer } from "./lib";
import { Controller, Get, Post, PreHandle } from "./lib/decorator/h";
import { Component, Autowired } from "./lib/decorator/di";
import { dbRsu2Vo, dto2tableFields, FMT_DAY, Now, Resp } from "./lib/utils";
import { ThreadLock, WithThreadLock } from "./lib/decorator/l";
import { Value } from "./lib/decorator/f";
import { WithErrorHandler } from "./lib/decorator/e";
import { WithStatic } from "./lib/decorator/st";
/**
 * About Sgrid Framework
 */
export { NewSgridServerCtx, NewSgridServer };

/**
 * About Http Controller
 */
export { Controller, Get, Post, PreHandle };

/**
 * About DI
 */
export { Component, Autowired };

/**
 * About Storage
 */
export { dto2tableFields, dbRsu2Vo, Now, FMT_DAY, Resp };

/**
 * About ThreadLock
 */
export { ThreadLock, WithThreadLock };

/**
 * About Framework Like Spring
 */
export { Value };

export { WithErrorHandler };

export { WithStatic };
/**
 * @demo 
@Controller("/nginx")
class SgridController {
  public ctx: Express
  public router: Router | undefined
  constructor(ctx: Express) {
    this.ctx = ctx
  }

  @Post("/expansionPreview")
  @PreHandle([NginxExpansionValidate, validateMiddleWare])
  async previewNginx(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as NginxExpansionDto
      const resp = NginxExpansion(body)
      res.send(Resp.Ok(resp))
    } catch (e) {
      next(e)
    }
  }
}

function boost() {
  const ctx = NewSgridServerCtx()
  initHistroyDir()
  const conf = ctx.get(f_env.ENV_SGRID_CONFIG)
  const servant = path.join("/", conf.server.name.toLowerCase())
  const sgridController = new SgridController(ctx)
  ctx.use(servant, sgridController.router!)
  ctx.use(errorHandler())
  NewSgridServer(ctx)
}
 */
