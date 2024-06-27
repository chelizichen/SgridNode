import express, { Express } from "express";
import { NewError, f_env } from "./constant";
import { LoadSgridConf } from "./utils";
import _ from "lodash";

export function NewSgridServerCtx(): Express {
  const app = express();
  app.use(express.json());
  const conf = LoadSgridConf();
  const port = process.env[f_env.ENV_SGRID_TARGET_PORT] || conf.server.port;
  try {
    console.log("conf", JSON.stringify(conf));
    app.set(f_env.ENV_SGRID_TARGET_PORT, port);
    app.set(f_env.ENV_SGRID_CONFIG, conf);
  } catch (e) {
    NewError(-1, "read storage error");
  }
  return app;
}

export function NewSgridServer(ctx: Express) {
  const port = ctx.get(f_env.ENV_SGRID_TARGET_PORT);
  return ctx.listen(port, function () {
    console.log("server started at localhost:" + port);
  });
}
