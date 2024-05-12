/**
 * @description Ioc
 */
const AutowiredContainer = new WeakMap()

export function Component(){
    return function(val:new ()=>void,ctx:ClassDecoratorContext){
        const instance = AutowiredContainer.get(val)
        if(!instance){
            const instance = new val()
            AutowiredContainer.set(val,instance)
        }

    }    
}

export function Autowired(val:new ()=>void){
    return function(_,ctx:ClassFieldDecoratorContext){
        if(ctx.kind !== "field"){
            throw new Error("sgrid/node/error " + ctx.kind + " must be field")
        }
        return function(){
            return AutowiredContainer.get(val)
        }
    }    
}

