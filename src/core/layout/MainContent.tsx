import { PropsWithChildren, Suspense } from "react";
import { Spinner } from "@fluentui/react-components";

export default function MainContent({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex-1 px-4 py-2">
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner appearance="primary" label="Loading" labelPosition="below" size="medium" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
