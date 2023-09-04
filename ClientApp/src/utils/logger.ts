export interface ILogger {
  log(message: string, ...params: any[]): void;
  warn(message: string, ...params: any[]): void;
  error(message: string, ...params: any[]): void;
}

class ConsoleLogger implements ILogger {
  log = (message: string, ...params: any[]): void => console.log(message, params);
  warn = (message: string, ...params: any[]): void => console.warn(message, params);
  error = (message: string, ...params: any[]): void => console.error(message, params);
}

class NullLogger implements ILogger {
  log(message: string, ...params: any[]): void { }
  warn(message: string, ...params: any[]): void { }
  error(message: string, ...params: any[]): void { }
}

const loggerProvider = import.meta.env.VITE_USE_NULL_LOGGER === "true"
  ? new NullLogger()
  : new ConsoleLogger();

export const Logger: ILogger = loggerProvider;
