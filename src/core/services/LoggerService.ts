import { injectable } from "tsyringe";

export type LogData = {
  [key: string]: any
}

export type LogLevel = "error" | "info" | "debug"

class LogLevels {
  static Error = 3;
  static Info = 2;
  static Debug = 1;

  static parse(level: LogLevel) {
    switch (level) {
      case "error":
        return LogLevels.Error;
      case "info":
        return LogLevels.Info;
      case "debug":
        return LogLevels.Debug;
    }
  }
}

@injectable()
export default class LoggerService {
  private readonly level: number;

  constructor(level: LogLevel) {
    this.level = LogLevels.parse(level);
  }

  logError(data: LogData) {
    console.error({ level: "error", ...data });
  }

  logInfo(data: LogData) {
    if (this.level <= LogLevels.Info)
      console.info({ level: "info", ...data });
  }

  logDebug(data: LogData) {
    if (this.level <= LogLevels.Debug)
      console.debug({ level: "debug", ...data });
  }
}
