import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { asString, Logger, LogLevel } from "./logger";

@Injectable()
export class ConsoleLogger extends Logger {
  constructor() {
    super();
    this.minLogLevel = LogLevel[environment.logLevel as keyof typeof LogLevel];
  }

  private minLogLevel: LogLevel;

  protected log(level: LogLevel, message: string): void {
    if (level >= this.minLogLevel) {

      const log = `${asString(level)} | ${message}`;

      if (level === LogLevel.ERROR) {
        console.error(log);
      }
      else if (level === LogLevel.WARN) {
        console.warn(log);
      }
      else {
        console.log(log);
      }
    }
  }
}
