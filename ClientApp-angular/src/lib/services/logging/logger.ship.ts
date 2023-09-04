import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { PUSH_API_LOG } from "src/lib/store/actions";
import { AppState } from "src/lib/store/reducers";
import { asString, Logger, LogLevel } from "./logger";

@Injectable()
export class ApiLogger extends Logger {
  constructor(private store: Store<AppState>) {
    super();
    this.minLogLevel = LogLevel[environment.logLevel as keyof typeof LogLevel];
  }

  private minLogLevel: LogLevel;

  protected log(level: LogLevel, message: string): void {
    if (level >= this.minLogLevel) {
      this.store.dispatch(
        PUSH_API_LOG({
          level: asString(level),
          message: message
        }))
    }
  }
}
