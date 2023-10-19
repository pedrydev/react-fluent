import { Button, Field, makeStyles, Select, shorthands, Tag, tokens } from '@fluentui/react-components';
import { Add24Regular, BinRecycle24Regular, Dismiss12Regular } from '@fluentui/react-icons';
import { ReactNode, useState } from 'react';
import FilterChipModel from '@/core/filters/FilterChipModel.ts';
import { CurrentFilterChipContext, FilterChipFunctionsContexts } from '@/core/filters/FilterChipContexts.ts';

export type FilterChipInputOption = FilterChipModel & {
  component: ReactNode
}

export interface FilterChipInputProps {
  activeChips: FilterChipModel[];
  hidden: boolean;
  options: FilterChipInputOption[];
  onAdd: (model: FilterChipModel) => void;
  onRemove: (model: FilterChipModel) => void;
  onRemoveAll: () => void;
  onUpdate: (model: FilterChipModel) => void;
}

const useStyles = makeStyles({
  select: {
    width: '100%',
    '@media (min-width: 768px)': {
      minWidth: '240px',
      width: 'auto',
    },
    '& select': {
      ...shorthands.borderRadius('0px'),
    },
  },
  addChipButton: {
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
  },
  removeChipsButton: {
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  },
  chip: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground2BrandPressed,
  },
});

export default function FilterChipInput({
                                          activeChips,
                                          hidden,
                                          options,
                                          onAdd,
                                          onRemove,
                                          onRemoveAll,
                                          onUpdate,
                                        }: FilterChipInputProps) {
  const styles = useStyles();

  const [selectedChip, setSelectedChip] = useState<FilterChipModel | undefined>();

  const addChipButtonDisabled = selectedChip === undefined
    || selectedChip === null
    || selectedChip.data === undefined
    || selectedChip.data === ''
    || selectedChip.value === undefined
    || selectedChip.value === '';

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
    <div className='space-y-2'>
      {!hidden && (
        <div className='flex space-x-2' key={hidden.toString()}>
          <Field label='Select filter'>
            <div className='flex w-fit'>
              <Button
                className={styles.removeChipsButton}
                disabled={activeChips.length === 0}
                icon={<BinRecycle24Regular />}
                onClick={onRemoveAll}
                title='Remove filter chips'
              />
              <Select
                className={styles.select}
                onChange={(_, data) => handleSelectChip(data.value)}
                value={selectedChip?.key ?? ''}
              >
                <option value=''></option>
                {options.map(o => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </Select>
              <Button
                className={styles.addChipButton}
                disabled={addChipButtonDisabled}
                icon={<Add24Regular />}
                onClick={handleAddChip}
                title='Add filter' />
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
        <div className='flex space-x-2'>
          {activeChips.map(c => (
            <Tag
              key={`${c.key}`}
              appearance='brand'
              className='hover:cursor-pointer'
              dismissible
              dismissIcon={
                <Dismiss12Regular
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onRemove(c);
                  }} />
              }
              onClick={() => handleSelectChip(c.key)}
              shape='circular'
            >
              {c.label}: {c.value}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}
