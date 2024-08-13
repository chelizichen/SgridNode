import yaml from "js-yaml";
import path from "path";
import { readFileSync } from "fs";

export type SGRID_CONF = Record<string, any>; // 假设 SGRID_CONF 是一个对象类型

export const config = {
  loaded: false,
  conf: null as SGRID_CONF | null,
};

/**
 * 加载 SgridCloud 运行时配置。
 *
 * 如果环境变量 SGRID_CONFIG 已设置，则直接使用该配置。
 * 否则，根据生产环境标志从文件系统加载配置。
 *
 * @returns 返回配置对象。
 */
export function loadSgridConf(): SGRID_CONF {
  if (config.loaded) {
    return config.conf!;
  }

  let conf: SGRID_CONF;

  const SGRID_CONFIG = process.env.SGRID_CONFIG;
  if (SGRID_CONFIG) {
    try {
      conf = yaml.load(SGRID_CONFIG) as SGRID_CONF;
    } catch (error) {
      throw new Error("Failed to parse SGRID_CONFIG environment variable.");
    }
  } else {
    const isProd = Boolean(process.env.SGRID_PRODUCTION);
    const fileName = isProd ? "sgridProd.yml" : "sgrid.yml";
    const confPath = path.join(process.cwd(), fileName);

    try {
      const content = readFileSync(confPath, "utf-8");
      conf = yaml.load(content) as SGRID_CONF;
    } catch (error) {
      throw new Error(`Failed to read configuration file: ${confPath}`);
    }
  }

  config.conf = conf;
  config.loaded = true;

  return conf;
}
