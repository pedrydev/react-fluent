// Optional: Record only one time
import { inject, injectable } from "tsyringe";
import LoggerService from "@/core/services/LoggerService.ts";

const tracked = new Set<string>();

@injectable()
export default class TrackService {
  constructor(@inject(LoggerService) private readonly logger: LoggerService) {
  }

  recordEvent(event: string, data: any) {
    const key = JSON.stringify({ ...data, "_track": "event" });
    if (!tracked.has(key)) {
      this.logger.logInfo({ event, ...data });
      tracked.add(key);
    }
  }

  recordView(data: any) {
    const key = JSON.stringify({ ...data, "_track": "view" });
    if (!tracked.has(key)) {
      this.logger.logInfo(data);
      tracked.add(key);
    }
  }
}
