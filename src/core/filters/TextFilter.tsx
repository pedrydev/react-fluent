import useCurrentChip from "@/core/filters/useCurrentChip.ts";
import useFilterChipFunctions from "@/core/filters/useFilterChipFunctions.ts";
import { Field, Input } from "@fluentui/react-components";

export default function TextFilter() {
  const chip = useCurrentChip();
  const { update } = useFilterChipFunctions();

  return (
    <Field key={chip.key} label={chip.label}>
      <Input onChange={(_, data) => update({ ...chip, data: data.value, value: data.value })}
             defaultValue={chip.data} />
    </Field>
  );
}
