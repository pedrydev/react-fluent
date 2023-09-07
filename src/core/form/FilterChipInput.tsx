import { Button, Field, makeStyles, Select } from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";
import { ReactNode, useState } from "react";
import FilterChipModel from "@/core/form/FilterChipModel.ts";
import FilterChipContext from "@/core/form/FilterChipContext.ts";

export type FilterChipInputOption = FilterChipModel & {
  component: ReactNode
}

export interface FilterChipInputProps {
  activeChips: FilterChipModel[];
  hidden: boolean;
  options: FilterChipInputOption[];
  onAdd: (model: FilterChipModel) => void;
  onRemove: (model: FilterChipModel) => void;
  onUpdate: (model: FilterChipModel) => void;
}

const useStyles = makeStyles({
  select: {
    width: "100%",
    "@media (min-width: 768px)": {
      minWidth: "240px",
      width: "auto"
    },
    "& select": {
      borderTopRightRadius: "0px",
      borderBottomRightRadius: "0px"
    }
  },
  button: {
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px"
  }
});

export default function FilterChipInput({
                                          activeChips,
                                          hidden,
                                          options,
                                          onAdd,
                                          onRemove,
                                          onUpdate
                                        }: FilterChipInputProps) {
  const [selectedKey, setSelectedKey] = useState("");
  const styles = useStyles();

  return (
    <div className="space-y-2">
      {!hidden && (
        <div className="flex space-x-2" key={hidden.toString()}>
          <Field label="Select filter">
            <div className="flex w-fit">
              <Select
                className={styles.select}
                onChange={(_, data) => setSelectedKey(data.value)}
                value={selectedKey}
              >
                <option value=""></option>
                {options.map(o => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </Select>
              <Button className={styles.button} icon={<Add24Regular />} title="Add filter" />
            </div>
          </Field>
          <FilterChipContext.Provider value={{ update: onUpdate }}>
            {selectedKey && options.find(o => o.key === selectedKey)?.component}
          </FilterChipContext.Provider>
        </div>
      )}
    </div>
  );
}
