import DailyRotateFile from "winston-daily-rotate-file";
import winston, { createLogger, format } from "winston";
import { resolve } from "path";
import { f_env } from "../constant";

// function usage
// const logger = new Logger();
// const log: Record<string, winston.Logger> = {};
// log.test.info("test");
// decorator usage
// @Component
// class LoggerComponent extends Logger {
//   test: winston.Logger;
//   constructor() {
//     super();
//     this.test = this.create("test");
//   }
// }
class Logger {
  private logDir: string;
  constructor() {
    if (
      !process.env[f_env.ENV_SGRID_LOG_DIR] &&
      !process.env[f_env.ENV_SGRID_CONFIG]
    ) {
      throw new Error("sgrid log dir not set");
    }
    this.logDir = process.env[f_env.ENV_SGRID_LOG_DIR];
  }

  protected create(logName: string) {
    const filePath = resolve(this.logDir, `${logName}.log`);
    return createLogger({
      level: "info", // 设置日志级别
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      transports: [
        new DailyRotateFile({
          filename: filePath.replace(/\.log$/, "-%DATE%.log"),
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        }),
      ],
    });
  }
}

export { Logger };
