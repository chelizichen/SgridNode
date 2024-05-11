import { NextFunction,Request,Response,Express,Router } from "express";
import { Controller, Get } from "sgridnode/build/main";
import { FrameworkService } from "./framework.service";

@Controller('/framework')
class FrameworkController{
    public ctx :Express
    public frameworkService : FrameworkService
    public router: Router | undefined

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