import { Subtitle1 } from "@fluentui/react-components";
import { EmojiSad24Regular } from "@fluentui/react-icons";

export default function RouteError() {
  return (
    <div className="flex flex-col items-center w-full pt-3">
      <EmojiSad24Regular />
      <Subtitle1>Can't load route</Subtitle1>
    </div>
  );
}
