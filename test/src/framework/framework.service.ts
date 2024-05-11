import { Component } from "sgridnode/build/main";

@Component()
export class FrameworkService {
  msg = "greet";
  greet() {
    return this.msg;
  }
}
