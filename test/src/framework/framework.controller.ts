import { NextFunction, Request, Response, Express, Router } from "express";
import { Controller, Get, Autowired } from "sgridnode/build/main";
import { FrameworkService } from "./framework.service";
import { Value } from "sgridnode/build/lib/decorator/f";
import loggerComponent from "../components/logger";
@Controller("/framework")
class FrameworkController {
    public ctx: Express;
    public router: Router | undefined;

    @Autowired(loggerComponent) logger: loggerComponent;
    @Autowired(FrameworkService) frameworkService: FrameworkService;

    @Value("server.name") serverName: string;

    constructor(ctx: Express) {
        this.ctx = ctx;
        this.frameworkService = new FrameworkService();
    }

    @Get("/hello")
    async hello(req: Request, res: Response, next: NextFunction) {
        this.logger.data("req.url ", req.url);
        res.send(this.serverName + " :: hello ::" + this.frameworkService.greet());
    }
}

export { FrameworkController };
