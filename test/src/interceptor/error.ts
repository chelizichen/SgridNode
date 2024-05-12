import { Resp } from "sgridnode/build/main"

export function errorHandler() {
  return (err, req, res, next) => {
    console.log("err", err) // 兜底日志
    res.json(Resp.Error(-1, err.message, null))
  }
}