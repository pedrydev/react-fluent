import { Link as FLink, Subtitle1 } from "@fluentui/react-components";
import { EmojiSad24Regular } from "@fluentui/react-icons";
import usePalette from "@/core/styles/usePalette.ts";
import { Link } from "react-router-dom";

export default function NotFound() {
  const palette = usePalette();
  return (
    <div className="flex flex-col items-center pt-4 w-full">
      <EmojiSad24Regular className={palette.textError} />
      <Subtitle1>Not found</Subtitle1>
      <Link to="/">
        <FLink>Go home</FLink>
      </Link>
    </div>
  );
}
