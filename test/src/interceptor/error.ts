import { Resp } from "sgridnode/build/main"

export function errorHandler() {
  return (err, req, res, next) => {
    console.log("兜底日志 :: errorHandler", err) // 兜底日志
    res.json(Resp.Error(-13001, err.message, null))
  }
}

export function Handler(e:Error){
  console.log('eh',e.message);
  return e.message;
}