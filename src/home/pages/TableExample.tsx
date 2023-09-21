import { Button, Field, Input } from '@fluentui/react-components';
import {
  Add24Regular,
  BinRecycle24Regular,
  Delete20Regular,
  Edit16Regular,
  EyeTracking24Regular,
  Filter24Regular,
  FilterDismiss24Regular,
  MoreHorizontal16Regular,
  PreviewLink16Regular,
  Search24Regular,
} from '@fluentui/react-icons';
import { useToggle } from 'ahooks';
import FilterChipInput, { FilterChipInputOption } from '@/core/filters/FilterChipInput.tsx';
import DataTable, { TableColumn, TableData } from '@/core/display/DataTable.tsx';
import TextFilter from '@/core/filters/TextFilter.tsx';
import useFilterChips from '@/core/filters/useFilterChips.ts';
import { useState } from 'react';
import usePageSize from '@/core/display/usePageSize.ts';

interface Product extends TableData {
  name: string;
  rating: number;
  price: number;
  supplier: string;
  category: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    rating: 1,
    price: 100,
    supplier: 'Supplier 1',
    category: 'Cateogory 1',
  },
  {
    id: '2',
    name: 'Product 2',
    rating: 2,
    price: 200,
    supplier: 'Supplier 2',
    category: 'Cateogory 2',
  },
  {
    id: '3',
    name: 'Product 3',
    rating: 3,
    price: 300,
    supplier: 'Supplier 3',
    category: 'Cateogory 3',
  },
  {
    id: '4',
    name: 'Product 4',
    rating: 4,
    price: 400,
    supplier: 'Supplier 4',
    category: 'Cateogory 4',
  },
  {
    id: '5',
    name: 'Product 5',
    rating: 5,
    price: 500,
    supplier: 'Supplier 5',
    category: 'Cateogory 5',
  },
  {
    id: '6',
    name: 'Product 6',
    rating: 6,
    price: 600,
    supplier: 'Supplier 6',
    category: 'Cateogory 6',
  },
  {
    id: '7',
    name: 'Product 7',
    rating: 7,
    price: 700,
    supplier: 'Supplier 7',
    category: 'Cateogory 7',
  },
  {
    id: '8',
    name: 'Product 8',
    rating: 8,
    price: 800,
    supplier: 'Supplier 8',
    category: 'Cateogory 8',
  },
  {
    id: '9',
    name: 'Product 9',
    rating: 9,
    price: 900,
    supplier: 'Supplier 9',
    category: 'Cateogory 9',
  },
  {
    id: '10',
    name: 'Product 10',
    rating: 10,
    price: 1000,
    supplier: 'Supplier 10',
    category: 'Cateogory 10',
  },
];

const columns: TableColumn<Product>[] = [
  {
    key: 'name',
    label: 'Nombre',
    onSort: () => console.log('name'),
  },
  {
    key: 'category',
    label: 'Categoria',
  },
  {
    actions: [
      <Button
        appearance='subtle'
        icon={<PreviewLink16Regular />}
        shape='circular' size='small'
        title='View supplier' />,
      <Button
        appearance='subtle'
        icon={<MoreHorizontal16Regular />}
        shape='circular'
        size='small'
        title='More' />,
    ],
    key: 'supplier',
    label: 'Proveedor',
  },
  {
    key: 'rating',
    label: 'Rating',
  },
  {
    key: 'price',
    label: 'Precio',
  },
];

export default function TableExample() {
  const [filtersOpen, { toggle }] = useToggle();
  const [page, setPage] = useState(1);
  const pageSize = usePageSize(5, [5, 10, 20]);
  const filterChipList = useFilterChips();
  const filterChipOptions: FilterChipInputOption[] = [
    {
      label: 'Test',
      key: 'test',
      component: (
        <TextFilter />
      ),
    },
  ];

  return (
    <div className='space-y-4'>
      <div className='flex space-x-4'>
        <div className='grid grid-cols-4 gap-2 flex-1'>
          <Field label='Field 1'>
            <Input />
          </Field>
          <Field label='Field 2'>
            <Input />
          </Field>
          <Field label='Field 3'>
            <Input />
          </Field>
          <Field label='Field 4'>
            <Input />
          </Field>
        </div>
        <div className='flex items-end justify-end'>
          <div className='flex space-x-2'>
            <Button appearance='primary' icon={<Search24Regular />} shape='rounded' title='Search' />
            <Button
              appearance={filtersOpen ? 'primary' : undefined}
              icon={filtersOpen ? <FilterDismiss24Regular /> : <Filter24Regular />}
              onClick={toggle}
              shape='rounded'
              title={filtersOpen ? 'Hide filters' : 'Show filters'} />
            <Button icon={<BinRecycle24Regular />} shape='rounded' title='Clean filters' />
          </div>
        </div>
      </div>
      <FilterChipInput
        activeChips={filterChipList.filterChips}
        hidden={!filtersOpen}
        options={filterChipOptions}
        onAdd={filterChipList.add}
        onRemove={filterChipList.remove}
        onRemoveAll={filterChipList.removeAll}
        onUpdate={filterChipList.update}
      />
      <DataTable
        columns={columns}
        getRowActions={(model) => [{
          icon: <Edit16Regular />,
          label: 'Edit',
          onClick: () => console.info(`Editing ${model.name}`),
        }]}
        onExpand={model => (
          <span>Hi from product {model.name}</span>
        )}
        pagination={{
          page,
          pageSize,
          onPrev: () => setPage(page - 1),
          onNext: () => setPage(page + 1),
          total: products.length,
        }}
        secondaryActions={(
          <div className='flex space-x-2'>
            <Button icon={<Add24Regular />} shape='rounded' title='Add' />
            <Button icon={<EyeTracking24Regular />} shape='rounded' title='Include deleted' />
          </div>
        )}
        selectable
        selectionActions={[
          {
            icon: <Delete20Regular />,
            label: 'Delete',
            onClick: console.log,
          },
        ]}
        title='Example table'
        rows={products.slice((page - 1) * 5, page * 5)}
      />
    </div>
  );
}
