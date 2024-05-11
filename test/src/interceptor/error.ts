import { Resp } from "sgridnode/build/main"

export function errorHandler() {
    return (err, req, res, next) => {
      console.log("err", err)
      res.json(Resp.Error(-1, err.message, null))
    }
  }