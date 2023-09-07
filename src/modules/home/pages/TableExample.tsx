import { Button, Field, Input } from "@fluentui/react-components";
import {
  Add24Regular,
  BinRecycle24Regular,
  Delete20Regular,
  Edit16Regular,
  EyeTracking24Regular,
  Filter24Regular,
  FilterDismiss24Regular,
  Search24Regular
} from "@fluentui/react-icons";
import { useToggle } from "ahooks";
import useUniqueList from "@/core/form/useUniqueList.ts";
import FilterChipInput, { FilterChipInputOption } from "@/core/form/FilterChipInput.tsx";
import FilterChipModel from "@/core/form/FilterChipModel.ts";
import Table, { TableColumn, TableData } from "@/core/display/Table.tsx";

interface Product extends TableData {
  name: string;
  rating: number;
  price: number;
  supplier: string;
  category: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Product 1",
    rating: 1,
    price: 100,
    supplier: "Supplier 1",
    category: "Cateogory 1"
  },
  {
    id: "2",
    name: "Product 2",
    rating: 2,
    price: 200,
    supplier: "Supplier 2",
    category: "Cateogory 2"
  },
  {
    id: "3",
    name: "Product 3",
    rating: 3,
    price: 300,
    supplier: "Supplier 3",
    category: "Cateogory 3"
  },
  {
    id: "4",
    name: "Product 4",
    rating: 4,
    price: 400,
    supplier: "Supplier 4",
    category: "Cateogory 4"
  },
  {
    id: "5",
    name: "Product 5",
    rating: 5,
    price: 500,
    supplier: "Supplier 5",
    category: "Cateogory 5"
  }
];

const columns: TableColumn<Product>[] = [
  {
    key: "name",
    label: "Nombre",
    onSort: () => console.log("name")
  },
  {
    key: "category",
    label: "Categoria"
  },
  {
    key: "supplier",
    label: "Proveedor"
  },
  {
    key: "rating",
    label: "Rating"
  },
  {
    key: "price",
    label: "Precio"
  }
];

export default function TableExample() {
  const [filtersOpen, { toggle }] = useToggle();
  const filterChipList = useUniqueList<FilterChipModel>({});
  const filterChipOptions: FilterChipInputOption[] = [
    {
      label: "Test",
      key: "test",
      component: (
        <Field label="Test">
          <Input />
        </Field>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="grid grid-cols-4 gap-2 flex-1">
          <Field label="Field 1">
            <Input />
          </Field>
          <Field label="Field 2">
            <Input />
          </Field>
          <Field label="Field 3">
            <Input />
          </Field>
          <Field label="Field 4">
            <Input />
          </Field>
        </div>
        <div className="flex items-end justify-end">
          <div className="flex space-x-2">
            <Button appearance="primary" icon={<Search24Regular />} shape="circular" title="Search" />
            <Button
              appearance={filtersOpen ? "primary" : undefined}
              icon={filtersOpen ? <FilterDismiss24Regular /> : <Filter24Regular />}
              onClick={toggle}
              shape="circular"
              title={filtersOpen ? "Hide filters" : "Show filters"} />
            <Button icon={<BinRecycle24Regular />} shape="circular" title="Clean filters" />
          </div>
        </div>
      </div>
      <FilterChipInput
        activeChips={filterChipList.state}
        hidden={!filtersOpen}
        options={filterChipOptions}
        onAdd={filterChipList.add}
        onRemove={filterChipList.remove}
        onUpdate={filterChipList.update}
      />
      <Table
        columns={columns}
        getRowActions={(model) => [{
          Icon: Edit16Regular,
          label: "Edit",
          onClick: () => console.info(`Editing ${model.name}`)
        }]}
        secondaryActions={(
          <div className="flex space-x-2">
            <Button icon={<Add24Regular />} shape="circular" title="Add" />
            <Button icon={<EyeTracking24Regular />} shape="circular" title="Include deleted" />
          </div>
        )}
        selectable
        selectionActions={[
          {
            Icon: Delete20Regular,
            label: "Delete",
            onClick: console.log
          }
        ]}
        title="Example table"
        rows={products}
      />
    </div>
  );
}
