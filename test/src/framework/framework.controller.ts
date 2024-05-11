import { NextFunction,Request,Response,Express,Router } from "express";
import { Controller, Get } from "sgridnode/build/main";
import { FrameworkService } from "./framework.service";
import { Autowired } from "sgridnode/build/main";

@Controller('/framework')
class FrameworkController{
    public ctx :Express
    public router: Router | undefined

    @Autowired(FrameworkService) frameworkService : FrameworkService
    
    constructor(ctx:Express){
        this.ctx = ctx
        this.frameworkService = new FrameworkService()
    }

    @Get("/hello")
    async hello(req:Request,res:Response,next:NextFunction) {
        res.send("hello " + this.frameworkService.greet())
    }
}

export {
    FrameworkController
}