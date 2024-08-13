import { Component, Value } from "../../../source/main";

@Component()
class loggerComponent {
  @Value("server.name") serverName: string;

  constructor() {
    process.on("uncaughtException", (err) => {
      this.error(err);
    });

    process.on("unhandledRejection", (reason, p) => {
      this.error(reason, p);
    });
    console.log("this.serverName", this.serverName);
  }
  info(...args) {
    console.log("loggerComponent :: info :: ", ...args);
  }

  data(...args) {
    console.log("loggerComponent :: data :: ", ...args);
  }

  error(...args) {
    console.log("loggerComponent :: error ::", ...args);
  }
}

export default loggerComponent;
