/**
 * @description
 * framewoork constant
 */
export enum f_env {
  ENV_SGRID_CONFIG = "SGRID_CONFIG", // SGRID CONFIG
  ENV_SGRID_TARGET_PORT = "SGRID_TARGET_PORT",
  ENV_PROCESS_INDEX = "SGRID_PROCESS_INDEX",
  ENV_SGRID_LOG_DIR = "SGRID_LOG_DIR",
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
