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
  Table as FTable,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  tokens
} from "@fluentui/react-components";
import { Settings20Regular } from "@fluentui/react-icons";
import { ReactNode, useState } from "react";
import { useToggle } from "ahooks";
import useUniqueList from "@/core/form/useUniqueList.ts";
import { FluentIcon } from "@fluentui/react-icons/lib/utils/createFluentIcon";
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
  Icon: FluentIcon;
  label: string;
  onClick: () => void;
}

export type SelectionAction<T extends TableData> = Omit<TableRowAction, "onClick"> & {
  onClick: (selected: T[]) => void
}

export interface TableProps<T extends TableData> {
  getRowActions?: (model: T) => TableRowAction[];
  columns: TableColumn<T>[];
  rows: T[];
  secondaryActions?: ReactNode;
  selectable?: boolean;
  selectionActions?: SelectionAction<T>[];
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

export default function Table<T extends TableData>({
                                                     getRowActions,
                                                     columns,
                                                     rows,
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
  const [sortBy, setSortBy] = useState("");
  const [sortForward, { toggle }] = useToggle(true);

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
    <section className="bg-white shadow-md">
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
      <FTable>
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
                          <MenuItem key={`${sa.label}-selection-action`} icon={<sa.Icon />}>
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
            <TableRow key={r.id}>
              {selectable && (
                <TableCell className={styles.actionCell} key="select">
                  <Checkbox checked={selected.some(s => s.id === r.id)} onClick={() => toggleSelected(r)} />
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
                          <MenuItem key={`${r.id}-action-${a.label}`} icon={<a.Icon />} onClick={() => a.onClick()}>
                            {a.label}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </FTable>
    </section>
  );
}
