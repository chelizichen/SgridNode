import _ from "lodash";
import e, { Router, Express, Request, Response } from "express";
import { errorMap } from "./e";

(Symbol as unknown as { metadata: symbol }).metadata ??=
  Symbol("Symbol.metadata");

type handle = (req: Request, res: Response) => void;

export const CONSTANT = {
  INTERFACE: "____sgrid@interface____",
  ROUTER_MAP: "____sgrid@router<>map____",
  HANDL_PATH_MAP: "____sgrid@handle<>path____",
  MEHOD_PATH_MAP: "____sgrid@method<>path____",
  READY_TO_LOAD_CONTROLLER: "____sgrid@read<>to<>load<>controller___",
};

function Controller(i: string) {
  return function (
    controller: new (ctx: Express) => {
      ctx: Express;
      router?: Partial<Router>;
    },
    context: ClassDecoratorContext
  ) {
    _.set(context.metadata!, CONSTANT.INTERFACE, i);
    _.set(context.metadata!, CONSTANT.ROUTER_MAP, new Map());
    _.set(controller.prototype, "router", Router());
    context.addInitializer(function () {
      setImmediate(() => {
        const rm = _.get(context.metadata, CONSTANT.ROUTER_MAP) as Map<
          string,
          Array<handle>
        >;
        const mpm = _.get(context.metadata, CONSTANT.MEHOD_PATH_MAP) as Map<
          string,
          string
        >;
        const r = _.get(controller.prototype, "router");
        rm.forEach((value, key) => {
          console.log("func array :: ", value);

          const p = i + key;
          if (mpm.get(key) == "post") {
            r.post(p, ...value);
          }
          if (mpm.get(key) == "get") {
            r.get(p, ...value);
          }
          console.log(mpm.get(key), p);
        });
      });
    });
  };
}

const Get = (r: string) => {
  return function (value: handle, context: ClassMethodDecoratorContext) {
    const mpm = setSingaleMap(r, context, value);
    mpm.set(r, "get");
    context.addInitializer(function () {
      value = value.bind(this);
      setHandleFunc(r, context, value);
    });
  };
};

const Post = (r: string) => {
  return function (value: handle, context: ClassMethodDecoratorContext) {
    const mpm = setSingaleMap(r, context, value);
    mpm.set(r, "post");
    context.addInitializer(function () {
      value = value.bind(this);
      setHandleFunc(r, context, value);
    });
  };
};

const PreHandle = (h: Array<unknown>) => {
  return function (value: handle, context: ClassMethodDecoratorContext) {
    context.addInitializer(function () {
      value = value.bind(this);
      const hmp = _.get(
        context.metadata,
        CONSTANT.HANDL_PATH_MAP
      ) as unknown as WeakMap<handle, string>;
      const r = hmp.get(value) as string; // path
      const rm = _.get(context.metadata, CONSTANT.ROUTER_MAP) as unknown as Map<
        string,
        Array<handle>
      >;
      if (!rm.get(r)) {
        rm.set(r, []);
      }
      const ar = rm.get(r) || [];
      const newAr = [...(h as handle[]), ...ar];

      rm.set(r, newAr);
    });
  };
};

function setHandleFunc(r, context, value) {
  const rm = _.get(context.metadata, CONSTANT.ROUTER_MAP) as Map<
    string,
    Array<handle>
  >;
  if (!rm.get(r)) {
    rm.set(r, []);
  }
  const rr = rm.get(r);
  const errorHandleFunc = errorMap.get(context.name);
  rr.push(async function (req, res) {
    try {
      const data = await value(req, res);
      res.json(data);
    } catch (e) {
      if (errorHandleFunc) {
        const errHandleResp = errorHandleFunc(e);
        res.json(errHandleResp);
      } else {
        res.json({
          code: -10001,
          message: "@sgrid/node unhandle error",
        });
      }
    }
  });
}

function setSingaleMap(r, context, value): Map<string, string> {
  if (!_.get(context.metadata!, CONSTANT.HANDL_PATH_MAP)) {
    _.set(context.metadata!, CONSTANT.HANDL_PATH_MAP, new WeakMap());
  }
  if (!_.get(context.metadata!, CONSTANT.MEHOD_PATH_MAP)) {
    _.set(context.metadata!, CONSTANT.MEHOD_PATH_MAP, new Map());
  }
  const hmp = _.get(context.metadata, CONSTANT.HANDL_PATH_MAP) as WeakMap<
    handle,
    string
  >;
  hmp.set(value, r);
  const mpm = _.get(context.metadata, CONSTANT.MEHOD_PATH_MAP) as Map<
    string,
    string
  >;
  return mpm;
}

export { Controller, Get, Post, PreHandle };
