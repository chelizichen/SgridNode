import { camelCase } from "lodash";
import dayjs from "dayjs";
import { dates } from "../constant";

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
