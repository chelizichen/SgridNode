import { Autowired, Component, Value } from "../../../source/main";
import loggerComponent from "../components/logger";

@Component()
export class FrameworkService {
  @Autowired(loggerComponent) logger: loggerComponent;
  @Value("server.name") serverName: string;

  constructor() {
    console.log("framework service init");
    console.log("this.serverName", this.serverName);
  }

  msg = "greet";

  greet() {
    // this.createError();
    this.logger.data("data :: ", this.msg);
    return this.msg;
  }

  createError() {
    throw new Error("framework service error");
  }
}
