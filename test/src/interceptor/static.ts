import path from "path";
import { WithStatic } from "../../../source/lib/decorator/st";
import { cwd } from "process";
export class SpaFile extends WithStatic {
  staticHandle(): [string, string] {
    const filePath = path.resolve(cwd(), "public");
    return ["/web", filePath];
  }
}
