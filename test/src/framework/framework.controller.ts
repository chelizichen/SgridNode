import { NextFunction,Request,Response,Express,Router } from "express";
import { Controller, Get, Autowired } from "sgridnode/build/main";
import { FrameworkService } from "./framework.service";
import { Value } from 'sgridnode/build/lib/decorator/f'
@Controller('/framework')
class FrameworkController{
    public ctx :Express
    public router: Router | undefined

    @Autowired(FrameworkService) frameworkService : FrameworkService
    @Value("server.name") serverName:string

    constructor(ctx:Express){
        this.ctx = ctx
        this.frameworkService = new FrameworkService()
    }

    @Get("/hello")
    async hello(req:Request,res:Response,next:NextFunction) {
        res.send(this.serverName +  " :: hello ::" + this.frameworkService.greet())
    }
}

export {
    FrameworkController
}