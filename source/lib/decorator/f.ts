import lodash from "lodash";
import { config, loadSgridConf } from "../utils/conf";

(Symbol as unknown as { metadata: symbol }).metadata ??=
  Symbol("Symbol.metadata");

function Value(key: string, defaultVal?: string) {
  return function (val, ctx: ClassFieldDecoratorContext) {
    if (ctx.kind !== "field") {
      throw new Error("sgrid/node/error " + ctx.kind + " must be field");
    }
    return function () {
      if (!config.loaded) {
        loadSgridConf();
        return getConfValue(key, defaultVal);
      }
      return getConfValue(key, defaultVal);
    };
  };
}

function getConfValue(key: string, defaultVal?: string) {
  return lodash.get(config.conf, key, defaultVal);
}

export { Value, getConfValue };
