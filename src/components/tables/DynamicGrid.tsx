import { useMemo, type FC, type ReactNode } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
} from 'material-react-table';
import { Chip, Box } from '@mui/material';
import type { ColumnMetadata, User, Group } from '@/types';
import { formatDate } from '@/utils';

interface DynamicGridProps {
  data: User[];
  columns: ColumnMetadata[];
  isLoading?: boolean;
  totalCount: number;
  pagination: MRT_PaginationState;
  onPaginationChange: (pagination: MRT_PaginationState) => void;
}

/**
 * Renders cell content based on column type
 */
const renderCellByType = (
  value: unknown,
  columnMeta: ColumnMetadata
): ReactNode => {
  switch (columnMeta.type) {
    case 'string':
      return value as string;

    case 'badge': {
      const status = value as 'active' | 'inactive';
      return (
        <Chip
          label={status}
          size="small"
          color={status === 'active' ? 'success' : 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
      );
    }

    case 'date':
      return formatDate(value as string, columnMeta.format);

    case 'chiplist': {
      const groups = value as Group[];

      if (!Array.isArray(groups) || groups.length === 0) {
        return <span style={{ color: '#999' }}>No groups</span>;
      }

      return (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {groups.map((group) => (
            <Chip
              key={group.groupName}
              label={group.groupName}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      );
    }

    default:
      return String(value ?? '');
  }
};

export const DynamicGrid: FC<DynamicGridProps> = ({
  data,
  columns,
  isLoading = false,
  totalCount,
  pagination,
  onPaginationChange,
}) => {
  const tableColumns = useMemo<MRT_ColumnDef<User>[]>(() => {
    return columns.map((colMeta) => ({
      accessorKey: colMeta.key,
      header: colMeta.header,
      size: colMeta.width,
      enableSorting: colMeta.sorting ?? false,
      enablePinning: Boolean(colMeta.pinned),
      Cell: ({ cell }) => renderCellByType(cell.getValue(), colMeta),
    }));
  }, [columns]);

  const table = useMaterialReactTable({
    columns: tableColumns,
    data,

    manualPagination: true,
    rowCount: totalCount,

    enableRowSelection: false,
    enableColumnFilters: false,
    enableGlobalFilter: false,

    state: {
      isLoading,
      pagination, // ✅ MRT v2 correct
    },

    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function' ? updater(pagination) : updater;
      onPaginationChange(next);
    },

    muiTableContainerProps: {
      sx: { maxHeight: '600px' },
    },

    muiTableBodyRowProps: {
      sx: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      },
    },
  });

  return <MaterialReactTable table={table} />;
};


