import { Autowired, Component } from "sgridnode/build/main";
import loggerComponent from "../components/logger";

@Component()
export class FrameworkService {
  @Autowired(loggerComponent) logger: loggerComponent

  msg = "greet";
  greet() {
    this.logger.data('data :: ', this.msg)
    return this.msg;
  }
}
