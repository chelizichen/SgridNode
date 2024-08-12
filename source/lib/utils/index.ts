import yaml from "js-yaml";
import path from "path";
import { readFileSync } from "fs";
import { camelCase } from "lodash";
import dayjs from "dayjs";
import { dates } from "../constant";

/**
 * @desc
 * 该函数用于加载SGridCloud运行时配置 ,
 * 中心配置由 process.env.SGRID_CONFIG 提供 ,
 * SGRID_TARGET_PORT 为提供的监听端口，在绑定时需要使用该端口，以免发生端口冲突问题
 * @info
 * 如果不使用 NewSgridServerCtx 启动服务，只想获得 中心配置的的功能，
 * 并且配置到 SgridCloud上时，可以使用该函数
 */
export function LoadSgridConf(): SimpConf {
  const SGRID_CONFIG = process.env.SGRID_CONFIG;
  if (SGRID_CONFIG && SGRID_CONFIG.length > 0) {
    const conf = yaml.load(SGRID_CONFIG) as SimpConf;
    process.env.SGRID_CONFIG = JSON.stringify(conf);
    return conf;
  }
  const isProd = process.env.SGRID_PRODUCTION;
  const cwd = process.cwd();
  const rootPath = isProd || cwd;
  const fileName = isProd ? "sgridProd.yml" : "sgrid.yml";
  const confPath = path.join(rootPath as string, fileName);
  const content = readFileSync(confPath, "utf-8");
  const conf = yaml.load(content) as SimpConf;
  process.env.SGRID_CONFIG = JSON.stringify(conf);
  return conf;
}

export function dto2tableFields<T = Record<string, unknown>>(dto): T {
  const tableRecord = {} as T;
  for (const key in dto) {
    const field_name = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    tableRecord[field_name] = dto[key];
  }
  return tableRecord as T;
}

export function dbRsu2Vo<T>(rsu): T {
  if (rsu === null || rsu === undefined) {
    return {} as T;
  }
  if (rsu instanceof Array) {
    return rsu.map((element) => {
      const tableRecord = {};
      for (const key in element) {
        const field_name = camelCase(key);
        tableRecord[field_name] = element[key];
      }
      return tableRecord;
    }) as T;
  } else {
    const tableRecord = {};
    for (const key in rsu) {
      const field_name = camelCase(key);
      tableRecord[field_name] = rsu[key];
    }
    return tableRecord as T;
  }
}

export function Now() {
  return dayjs().format(dates.FMT);
}

export function FMT_DAY(v) {
  return dayjs(v).format(dates.FMT);
}

export const Resp = {
  Ok: function (data) {
    return {
      code: 0,
      message: "ok",
      data,
    };
  },
  Error: function (code, message, data) {
    return {
      code,
      message,
      data,
    };
  },
};
