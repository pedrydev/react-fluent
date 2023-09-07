import { useState } from "react";
import { PageSize } from "@/core/display/DataTable.tsx";

export default function usePageSize(value = 10, options = [10, 20, 50, 100]): PageSize {
  const [pageSize, setPageSize] = useState(value);

  return { options, setValue: setPageSize, value: pageSize };
}
