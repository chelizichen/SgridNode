import { Controller, Get, Autowired, Value, Resp } from "sgridnode/build/main";
import { Request, Response, Express, Router } from "express";
import { FrameworkService } from "./framework.service";
import loggerComponent from "../components/logger";
import { cwd } from "process";
import path from "path";
@Controller("/framework")
class FrameworkController {
  public ctx: Express;
  public router: Router | undefined;

  @Autowired(loggerComponent) logger: loggerComponent;
  @Autowired(FrameworkService) frameworkService: FrameworkService;

  @Value("server.name") serverName: string;

  constructor(ctx: Express) {
    this.ctx = ctx;
  }

  @Get("/hello")
  async hello(req: Request, res: Response) {
    this.logger.data("req.url ", req.url);
    res.json(
      Resp.Ok(this.serverName + " :: hello ::" + this.frameworkService.greet())
    );
  }

  @Get("/error")
  async errorTest(req: Request, res: Response) {
    this.logger.data("req.url ", req.url);
    res.json(
      Resp.Ok(
        this.serverName + " :: hello ::" + this.frameworkService.createError()
      )
    );
  }

  @Get("/version")
  async version(req: Request, res: Response) {
    const pkg = require(path.resolve(cwd(),'package.json'))
    res.json(
      Resp.Ok(
        pkg.version
      )
    );
  }
  
}

export { FrameworkController };
