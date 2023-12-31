import {
  Body1,
  Body1Strong,
  Button,
  Checkbox,
  Input,
  makeStyles,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  Select,
  Subtitle1,
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableHeader,
  TableHeaderCell,
  TableRow,
  tokens,
} from '@fluentui/react-components';
import { ArrowDown16Regular, ArrowLeft16Regular, ArrowRight16Regular, Settings20Regular } from '@fluentui/react-icons';
import { Fragment, ReactNode, useState } from 'react';
import { useToggle } from 'ahooks';
import useUniqueList from '@/core/form/useUniqueList.ts';
import FloatingBadge from '@/core/display/FloatingBadge.tsx';

export type TableData = { id: string } & {
  [key: string]: string | number | boolean
}

export interface TableColumn<T extends TableData> {
  actions?: ReactNode[];
  key: keyof T;
  label: string;
  onSort?: () => void;
  renderRow?: (model: T) => ReactNode;
}

export interface TableRowAction {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export type SelectionAction<T extends TableData> = Omit<TableRowAction, 'onClick'> & {
  onClick: (selected: T[]) => void
}

export interface PageSize {
  setValue: (value: number) => void;
  options: number[];
  value: number;
}

export interface Pagination {
  onPrev: () => void;
  onNext: () => void;
  page: number;
  pageSize: PageSize;
  total: number;
}

export interface TableProps<T extends TableData> {
  columns: TableColumn<T>[];
  getRowActions?: (model: T) => TableRowAction[];
  hideSelectColumns?: boolean;
  onExpand?: (model: T) => ReactNode;
  pagination?: Pagination;
  rows: T[];
  secondaryActions?: ReactNode;
  selectionActions?: SelectionAction<T>[];
  standalone?: boolean;
  title?: string;
}

const useStyles = makeStyles({
  actionCell: {
    cursor: 'unset',
    width: '28px',
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground5,
  },
  headerCell: {
    color: tokens.colorBrandBackground,
    cursor: 'pointer',
  },
  bodyRow: {
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
  },
  expandedRow: {
    ':active': {
      backgroundColor: 'inherit',
    },
    ':hover': {
      backgroundColor: 'inherit',
    },
  },
  emptyRow: {
    height: '66px',
  },
  title: {
    height: '32px',
  },
});

export default function DataTable<T extends TableData>({
                                                         getRowActions,
                                                         columns,
                                                         hideSelectColumns,
                                                         onExpand,
                                                         pagination,
                                                         rows,
                                                         standalone = true,
                                                         secondaryActions = null,
                                                         selectionActions = [],
                                                         title,
                                                       }: TableProps<T>) {
  const styles = useStyles();

  const [visibleColumns, setVisibleColumns] = useState<Record<string, string[]>>({ column: columns.map(c => c.label) });
  const [columnSearch, setColumnSearch] = useState('');
  const { state: selected, setState: setSelected, addOrRemove: toggleSelected } = useUniqueList<T>({});
  const { state: expanded, addOrRemove: toggleExpanded } = useUniqueList<string>({});
  const [sortBy, setSortBy] = useState('');
  const [sortForward, { toggle }] = useToggle(true);

  let spanAllColumns = visibleColumns.column.length;
  if (onExpand) spanAllColumns++;
  if (getRowActions) spanAllColumns += 2;

  const isAllSeelcted = () => {
    if (!rows.some(r => selected.some(s => r.id === s.id)))
      return false;

    if (rows.every(r => selected.some(s => r.id === s.id)))
      return true;

    return 'mixed';
  };

  const getLastPage = () => {
    // @ts-ignore
    const lastPage = (pagination.total / pagination.pageSize.value).toFixed(0);
    return lastPage === '0' ? '1' : lastPage;
  };

  const handleHeaderCellClick = (column: TableColumn<T>) => {
    if (column.onSort) {
      if (sortBy === column.key) toggle();
      setSortBy(column.key.toString());
      column.onSort();
    }
  };

  return (
    <section className={`bg-white ${standalone && 'shadow-md'}`}>
      {(title || !hideSelectColumns) && (
        <header className='p-2 flex justify-between'>
          <div className='flex items-center'>
            {title && <Subtitle1 className={styles.title}>{title}</Subtitle1>}
          </div>
          <div className='flex items-center space-x-2'>
            {!hideSelectColumns && (
              <Menu positioning={{ position: 'below', align: 'end', offset: { mainAxis: 6 } }}>
                <MenuTrigger disableButtonEnhancement>
                  <MenuButton>{visibleColumns.column.length} selected columns</MenuButton>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList
                    checkedValues={visibleColumns}
                    onCheckedValueChange={(_, { checkedItems }) => setVisibleColumns({ column: checkedItems })}
                  >
                    <Input
                      onChange={(_, data) => setColumnSearch(data.value)}
                      placeholder='Filter by name'
                      value={columnSearch} />
                    <MenuDivider />
                    {columns.filter(c => c.label.toLowerCase().includes(columnSearch.toLowerCase())).map(c => (
                      <MenuItemCheckbox key={c.label} name='column' value={c.label}>{c.label}</MenuItemCheckbox>
                    ))}
                  </MenuList>
                </MenuPopover>
              </Menu>
            )}
            {secondaryActions}
          </div>
        </header>
      )
      }
      <Table>
        <TableHeader className={styles.header}>
          <TableRow>
            {getRowActions && (
              <TableCell className={mergeClasses(styles.headerCell, styles.actionCell)} key='select-all'>
                <Checkbox
                  checked={isAllSeelcted()}
                  onClick={() => isAllSeelcted() === true ? setSelected(selected.filter(s => !rows.some(r => s.id === r.id))) : setSelected(selected.concat(rows))}
                />
              </TableCell>
            )}
            {onExpand && <TableHeaderCell className={mergeClasses(styles.headerCell, styles.actionCell)} />}
            {columns.filter(c => visibleColumns.column.includes(c.label)).map(c => (
              <TableHeaderCell
                className={styles.headerCell}
                key={c.key.toString()}
                onClick={() => handleHeaderCellClick(c)}
                sortDirection={sortBy !== c.key ? undefined : sortForward ? 'descending' : 'ascending'}
              >
                <span className='d-inline-block mr-2'>{c.label}</span>
              </TableHeaderCell>
            ))}
            {getRowActions && (
              <TableCell align='center' className={mergeClasses(styles.headerCell, styles.actionCell)} key='actions'>
                {selectionActions.length > 0 && selected.length > 0 && (
                  <Menu positioning={{ position: 'below', align: 'end', offset: { mainAxis: 6 } }}>
                    <FloatingBadge count={selected.length}>
                      <MenuTrigger disableButtonEnhancement>
                        <Button
                          appearance='primary'
                          icon={<Settings20Regular />}
                          shape='rounded'
                          size='small'
                          title='Selection actions' />
                      </MenuTrigger>
                    </FloatingBadge>
                    <MenuPopover>
                      <MenuList>
                        {selectionActions.map(sa => (
                          <MenuItem key={`${sa.label}-selection-action`} icon={sa.icon}>
                            {sa.label}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                )}
              </TableCell>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow className={styles.emptyRow}>
              <TableCell className='text-center' colSpan={spanAllColumns}>
                <Body1Strong>No hay datos para mostrar</Body1Strong>
              </TableCell>
            </TableRow>
          ) : rows.map(r => (
            <Fragment key={r.id}>
              <TableRow className={styles.bodyRow} appearance={selected.some(s => s.id === r.id) ? 'brand' : 'none'}>
                {getRowActions && (
                  <TableCell className={styles.actionCell} key='select'>
                    <Checkbox checked={selected.some(s => s.id === r.id)} onClick={() => toggleSelected(r)} />
                  </TableCell>
                )}
                {onExpand && (
                  <TableCell className={styles.actionCell} key='expandRow'>
                    <Button
                      appearance={expanded.includes(r.id) ? 'primary' : undefined}
                      icon={expanded.includes(r.id) ? <ArrowDown16Regular /> : <ArrowRight16Regular />}
                      onClick={() => toggleExpanded(r.id)}
                      size='small'
                      title='Expand row' />
                  </TableCell>
                )}
                {columns.filter(c => visibleColumns.column.includes(c.label)).map(c => (
                  <TableCell key={`${r.id}-${c.key.toString()}`}>
                    {c.renderRow ? c.renderRow(r) : r[c.key]}
                    {c.actions && (
                      <TableCellActions>
                        <div className='flex space-x-1'>
                          {c.actions.map((a, i) => (
                            <Fragment key={`${r.id}-${c.key.toString()}-action-${i}`}>
                              {a}
                            </Fragment>
                          ))}
                        </div>
                      </TableCellActions>
                    )}
                  </TableCell>
                ))}
                {getRowActions && (
                  <TableCell className={styles.actionCell} key={`${r.id}-actions`}>
                    <Menu positioning={{ position: 'below', align: 'end', offset: { mainAxis: 6 } }}>
                      <MenuTrigger disableButtonEnhancement>
                        <Button
                          appearance='primary'
                          icon={<Settings20Regular />}
                          shape='rounded'
                          size='small'
                          title='Actions' />
                      </MenuTrigger>
                      <MenuPopover>
                        <MenuList>
                          {getRowActions(r).map(a => (
                            <MenuItem key={`${r.id}-action-${a.label}`} icon={a.icon} onClick={() => a.onClick()}>
                              {a.label}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </MenuPopover>
                    </Menu>
                  </TableCell>
                )}
              </TableRow>
              {expanded.includes(r.id) && (
                <TableRow className={styles.expandedRow}>
                  <TableCell colSpan={spanAllColumns}>
                    {onExpand(r)}
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
        {pagination && (
          <tfoot>
          <tr className='h-11'>
            <td className='px-2' colSpan={spanAllColumns}>
              <div className='flex items-center justify-end space-x-2'>
                <Select
                  onChange={(_, data) => pagination.pageSize.setValue(parseInt(data.value))}
                  size='small'
                  value={pagination.pageSize.value}
                >
                  {pagination.pageSize.options.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </Select>
                <Body1>{pagination.page} - {getLastPage()} Total: {pagination.total}</Body1>
                <Button
                  appearance='transparent'
                  disabled={pagination.page === 1}
                  icon={<ArrowLeft16Regular />}
                  onClick={pagination.onPrev}
                  size='small' />
                <Button
                  appearance='transparent'
                  disabled={pagination.page.toString() === (pagination.total / pagination.pageSize.value).toFixed(0)}
                  icon={<ArrowRight16Regular />}
                  onClick={pagination.onNext}
                  size='small' />
              </div>
            </td>
          </tr>
          </tfoot>
        )}
      </Table>
    </section>
  );
}
