import lodash from 'lodash'
;import { f_env } from '../constant';
(Symbol as unknown as { metadata: symbol }).metadata ??= Symbol("Symbol.metadata")

function Value(key:string,defaultVal?:string){
    return function(val,ctx:ClassFieldDecoratorContext){
        if(ctx.kind !== "field"){
            throw new Error("sgrid/node/error " + ctx.kind + " must be field")
        }
        return function(){
            const conf = process.env[f_env.ENV_SGRID_CONFIG]
            const toConf = JSON.parse(conf)
            return lodash.get(toConf,key,defaultVal)
        }        
    }
}

export {
    Value
}

