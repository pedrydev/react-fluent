export type HelpItemModelType = "image" | "video" | "text"

export interface HelpItemModel {
  content: string;
  type: HelpItemModelType;
}

export default interface HelpModel {
  title: string;
  items: HelpItemModel[];
}
