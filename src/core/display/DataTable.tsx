import {
  Button,
  Checkbox,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  Subtitle1,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  tokens
} from "@fluentui/react-components";
import { ArrowDown16Regular, ArrowRight16Regular, Settings20Regular } from "@fluentui/react-icons";
import { Fragment, ReactNode, useState } from "react";
import { useToggle } from "ahooks";
import useUniqueList from "@/core/form/useUniqueList.ts";
import FloatingBadge from "@/core/display/FloatingBadge.tsx";

export type TableData = { id: string } & {
  [key: string]: string | number | boolean
}

export interface TableColumn<T extends TableData> {
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

export type SelectionAction<T extends TableData> = Omit<TableRowAction, "onClick"> & {
  onClick: (selected: T[]) => void
}

export interface TableProps<T extends TableData> {
  getRowActions?: (model: T) => TableRowAction[];
  columns: TableColumn<T>[];
  onExpand?: (model: T) => ReactNode;
  rows: T[];
  secondaryActions?: ReactNode;
  selectable?: boolean;
  selectionActions?: SelectionAction<T>[];
  standalone?: boolean;
  title?: string;
}

const useStyles = makeStyles({
  actionCell: {
    cursor: "unset",
    textAlign: "center",
    width: "48px"
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground5
  },
  headerCell: {
    color: tokens.colorBrandBackground,
    cursor: "pointer"
  },
  title: {
    height: "32px"
  }
});

export default function DataTable<T extends TableData>({
                                                         getRowActions,
                                                         columns,
                                                         onExpand,
                                                         rows,
                                                         standalone = true,
                                                         secondaryActions = null,
                                                         selectable,
                                                         selectionActions = [],
                                                         title
                                                       }: TableProps<T>) {
  const styles = useStyles();

  const {
    state: visibleColumns,
    addOrRemove: toggleVisibleColumn
  } = useUniqueList({ initSelected: columns.map(c => c.key) });
  const { state: selected, setState: setSelected, addOrRemove: toggleSelected } = useUniqueList<T>({});
  const { state: expanded, addOrRemove: toggleExpanded } = useUniqueList<string>({});
  const [sortBy, setSortBy] = useState("");
  const [sortForward, { toggle }] = useToggle(true);

  let spanAllColumns = columns.length;
  if (selectable) spanAllColumns++;
  if (onExpand) spanAllColumns++;
  if (getRowActions) spanAllColumns++;

  const isAllSeelcted = () => {
    if (selected.length === 0)
      return false;

    if (rows.every(r => selected.some(s => r.id === s.id)))
      return true;

    return "mixed";
  };

  const handleHeaderCellClick = (column: TableColumn<T>) => {
    if (column.onSort) {
      if (sortBy === column.key) toggle();
      setSortBy(column.key.toString());
      column.onSort();
    }
  };

  return (
    <section className={`bg-white ${standalone && "shadow-md"}`}>
      <header className="p-2 flex justify-between">
        <div className="flex items-center space-x-2">
          {title && <Subtitle1 className={styles.title}>{title}</Subtitle1>}
          {columns.map(c => (
            <Checkbox
              key={c.key.toString()}
              checked={visibleColumns.includes(c.key)}
              label={c.label}
              onClick={() => toggleVisibleColumn(c.key)}
            />
          ))}
        </div>
        {secondaryActions}
      </header>
      <Table>
        <TableHeader className={styles.header}>
          <TableRow>
            {selectable && (
              <TableCell className={mergeClasses(styles.headerCell, styles.actionCell)} key="select-all">
                <Checkbox
                  checked={isAllSeelcted()}
                  onClick={() => isAllSeelcted() === true ? setSelected([]) : setSelected(rows)}
                />
              </TableCell>
            )}
            {onExpand && <TableHeaderCell className={mergeClasses(styles.headerCell, styles.actionCell)} />}
            {columns.filter(c => visibleColumns.includes(c.key)).map(c => (
              <TableHeaderCell
                className={styles.headerCell}
                key={c.key.toString()}
                onClick={() => handleHeaderCellClick(c)}
                sortDirection={sortBy !== c.key ? undefined : sortForward ? "descending" : "ascending"}
              >
                <span className="d-inline-block mr-2">{c.label}</span>
              </TableHeaderCell>
            ))}
            {getRowActions && (
              <TableCell className={mergeClasses(styles.headerCell, styles.actionCell)} key="actions">
                {selectionActions.length > 0 && selected.length > 0 && (
                  <Menu positioning={{ position: "below", align: "end", offset: { mainAxis: 6, crossAxis: 12 } }}>
                    <FloatingBadge count={selected.length}>
                      <MenuTrigger disableButtonEnhancement>
                        <Button
                          appearance="primary"
                          icon={<Settings20Regular />}
                          shape="circular"
                          size="small"
                          title="Selection actions" />
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
          {rows.map(r => (
            <Fragment key={r.id}>
              <TableRow>
                {selectable && (
                  <TableCell className={styles.actionCell} key="select">
                    <Checkbox checked={selected.some(s => s.id === r.id)} onClick={() => toggleSelected(r)} />
                  </TableCell>
                )}
                {onExpand && (
                  <TableCell className={styles.actionCell} key="expandRow">
                    <Button
                      appearance={expanded.includes(r.id) ? "primary" : undefined}
                      icon={expanded.includes(r.id) ? <ArrowDown16Regular /> : <ArrowRight16Regular />}
                      onClick={() => toggleExpanded(r.id)}
                      shape="rounded"
                      size="small"
                      title="Expand row" />
                  </TableCell>
                )}
                {columns.filter(c => visibleColumns.includes(c.key)).map(c => (
                  <TableCell key={`${r.id}-${c.key.toString()}`}>
                    {r[c.key]}
                  </TableCell>
                ))}
                {getRowActions && (
                  <TableCell className={styles.actionCell} key={`${r.id}-actions`}>
                    <Menu positioning={{ position: "below", align: "end", offset: { mainAxis: 6, crossAxis: 12 } }}>
                      <MenuTrigger disableButtonEnhancement>
                        <Button
                          appearance="primary"
                          icon={<Settings20Regular />}
                          shape="circular"
                          size="small"
                          title="Actions" />
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
                <TableRow>
                  <TableCell colSpan={spanAllColumns}>
                    {onExpand(r)}
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
