import HelpModel from "@/core/help/HelpModel.ts";

export default class HelpService {
  static get(path: string) {
    return new Promise<HelpModel>((res) => {
      setTimeout(() => {
        res({
          title: "Help for: " + path,
          items: [
            { content: "A text", type: "text" }
          ]
        });
      }, 2000);
    });
  }
}
