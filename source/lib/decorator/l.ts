// TheadLock
// only one server can use 
import { f_env } from "../constant";

export function ThreadLock():boolean{
    if(process.env[f_env.ENV_SGRID_CONFIG]){
        return process.env[f_env.ENV_PROCESS_INDEX] == "1"
    }
    // development environment
    return true
  }



export function WithThreadLock(){
    return function(val:any,ctx:ClassMethodDecoratorContext){
        if(ctx.kind !== "method"){
            throw new Error("sgrid/node/error " + ctx.kind + " must be method")
        }
        ctx.addInitializer(function () {
            val = val.bind(this)
        })
        return async function(...args:any){
            if(!ThreadLock()){
                return
            }
            return await val(...args)
        }
    }
}