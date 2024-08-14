import _ from "lodash";
import e, { Router, Express, Request, Response, NextFunction } from "express";
import { error } from "console";
// import { errorMap } from "./e";

(Symbol as unknown as { metadata: symbol }).metadata ??=
  Symbol("Symbol.metadata");

type handle = (req: Request, res: Response, next?: NextFunction) => void;

function Controller(controllerPath: string) {
  return function (
    controller: new (ctx: Express) => {
      ctx: Express;
      router?: Partial<Router>;
    },
    context: ClassDecoratorContext
  ) {
    if (!controllerPath.startsWith("/")) {
      throw error("controllerPath must start with /");
    }
    const router = Router();
    _.set(controller.prototype, "router", router);
    _.set(context.metadata, "controllerPath", controllerPath);
    // handlers
    context.addInitializer(function () {});
  };
}

const Get = (relativePath: string, ...filterHandles: handle[]) => {
  return function (
    serviceHandle: handle,
    context: ClassMethodDecoratorContext
  ) {
    if (!relativePath.startsWith("/")) {
      throw error("relativePath must start with /");
    }
    context.addInitializer(function () {
      serviceHandle = serviceHandle.bind(this);
      for (let i = 0; i < filterHandles.length; i++) {
        filterHandles[i] = filterHandles[i].bind(this);
      }
      const controllerPath = _.get(context.metadata, "controllerPath");
      const router: Router = _.get(this, "router");
      router.get(
        controllerPath + relativePath,
        ...filterHandles,
        serviceHandle
      );
    });
  };
};

const Post = (relativePath: string, ...filterHandles: handle[]) => {
  return function (
    serviceHandle: handle,
    context: ClassMethodDecoratorContext
  ) {
    context.addInitializer(function () {
      serviceHandle = serviceHandle.bind(this);
      const controllerPath = _.get(context.metadata, "controllerPath");
      for (let i = 0; i < filterHandles.length; i++) {
        filterHandles[i] = filterHandles[i].bind(this);
      }
      const router: Router = _.get(this, "router");
      router.post(
        controllerPath + relativePath,
        ...filterHandles,
        serviceHandle
      );
    });
  };
};

export { Controller, Get, Post };
