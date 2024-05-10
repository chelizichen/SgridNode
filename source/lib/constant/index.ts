/**
 * @description
 * framewoork constant
 */
export enum f_env {
  ENV_SGRID_CONFIG = "SGRID_CONFIG", // SGRID CONFIG
  ENV_SGRID_TARGET_PORT = "SGRID_TARGET_PORT",
  ENV_SGRID_SERVER_INDEX = "SGRID_SERVER_INDEX",
}

export enum dates {
  FMT = "YYYY-MM-DD HH:mm:ss",
}

export const NewError = function (code: number, msg: string) {
  return {
    code: code || -1,
    msg,
  };
};
