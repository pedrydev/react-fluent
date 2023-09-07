import { Body1, Body1Stronger, Button, Field, makeStyles, Select, tokens } from "@fluentui/react-components";
import { Add24Regular, Dismiss12Regular } from "@fluentui/react-icons";
import { ReactNode, useState } from "react";
import FilterChipModel from "@/core/filters/FilterChipModel.ts";
import { CurrentFilterChipContext, FilterChipFunctionsContexts } from "@/core/filters/FilterChipContexts.ts";

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
  addChipButton: {
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px"
  },
  chip: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground2BrandPressed
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
  const styles = useStyles();

  const [selectedChip, setSelectedChip] = useState<FilterChipModel | undefined>();

  const handleAddChip = () => {
    if (selectedChip?.data) {
      if (activeChips.some(c => c.key === selectedChip.key)) {
        onUpdate(selectedChip);
      } else {
        onAdd(selectedChip);
      }
      setSelectedChip(undefined);
    }
  };

  const handleSelectChip = (key: string) => {
    const chipIndex = activeChips.findIndex(c => c.key === key);
    if (chipIndex === -1) {
      // @ts-ignore
      setSelectedChip(options.find(o => o.key === key));
    } else {
      setSelectedChip(activeChips[chipIndex]);
    }
  };

  return (
    <div className="space-y-2">
      {!hidden && (
        <div className="flex space-x-2" key={hidden.toString()}>
          <Field label="Select filter">
            <div className="flex w-fit">
              <Select
                className={styles.select}
                onChange={(_, data) => handleSelectChip(data.value)}
                value={selectedChip?.key ?? ""}
              >
                <option value=""></option>
                {options.map(o => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </Select>
              <Button className={styles.addChipButton} icon={<Add24Regular />} onClick={handleAddChip}
                      title="Add filter" />
            </div>
          </Field>
          <FilterChipFunctionsContexts.Provider value={{ update: setSelectedChip }}>
            <CurrentFilterChipContext.Provider value={selectedChip!}>
              {selectedChip && options.find(o => o.key === selectedChip.key)?.component}
            </CurrentFilterChipContext.Provider>
          </FilterChipFunctionsContexts.Provider>
        </div>
      )}
      {activeChips.length > 0 && (
        <div className="flex space-x-2">
          {activeChips.map(c => (
            <div
              key={`${c.key}`}
              className={`flex space-x-2 cursor-pointer px-4 rounded-full ${styles.chip}`}
              onClick={() => handleSelectChip(c.key)}
            >
              <Body1Stronger>{c.label}: </Body1Stronger>
              <Body1>{c.value}</Body1>
              <Button appearance="subtle" icon={<Dismiss12Regular />} onClick={() => onRemove(c)} shape="circular"
                      size="small" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
