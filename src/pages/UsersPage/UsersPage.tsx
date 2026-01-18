import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Alert,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSnackbar } from 'notistack';

import { DynamicGrid, UserActions } from '@/components';
import { useUsers, useUpdateUserStatus } from '@/hooks';
import { userColumnMetadata } from '@/utils';
import { useDebounce } from '@/hooks/useDebounce';

import type { MRT_PaginationState } from 'material-react-table';
import type { User, ColumnMetadata } from '@/types';

export const UsersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  /* -------------------- INITIAL STATE FROM URL -------------------- */
  const initialPage = Number(searchParams.get('page') || 1) - 1;
  const initialStatus =
    (searchParams.get('status') as 'all' | 'active' | 'inactive') || 'all';
  const initialQuery = searchParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [statusFilter, setStatusFilter] =
    useState<'all' | 'active' | 'inactive'>(initialStatus);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: initialPage,
    pageSize: 10,
  });

  /* -------------------- DEBOUNCED SEARCH -------------------- */
  const debouncedSearch = useDebounce(searchQuery, 300);

  /* -------------------- SYNC STATE → URL -------------------- */
  useEffect(() => {
    setSearchParams({
      page: String(pagination.pageIndex + 1),
      status: statusFilter,
      query: debouncedSearch,
    });
  }, [pagination.pageIndex, statusFilter, debouncedSearch, setSearchParams]);

  /* -------------------- FETCH USERS -------------------- */
  const { data, isLoading, error, refetch } = useUsers({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    query: debouncedSearch,
    status: statusFilter,
  });

  /* -------------------- MUTATION -------------------- */
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateUserStatus();

  const handleToggleStatus = (
    userId: string,
    newStatus: 'active' | 'inactive'
  ) => {
    updateStatus(
      { userId, status: newStatus },
      {
        onSuccess: (response) => {
          enqueueSnackbar(response.message, { variant: 'success' });
        },
        onError: () => {
          enqueueSnackbar('Failed to update user status', {
            variant: 'error',
          });
        },
      }
    );
  };

  /* -------------------- HANDLERS -------------------- */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleStatusFilterChange = (
    value: 'all' | 'active' | 'inactive'
  ) => {
    setStatusFilter(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handlePaginationChange = (newPagination: MRT_PaginationState) => {
    setPagination(newPagination);
  };

  /* -------------------- COLUMNS -------------------- */
  const columnsWithActions: ColumnMetadata[] = [
    ...userColumnMetadata,
    {
      key: 'actions',
      header: 'Actions',
      type: 'string',
      width: 120,
    },
  ];

  const usersWithActions = (data?.data?.users || []).map((user: User) => ({
    ...user,
    actions: (
      <UserActions
        user={user}
        onToggleStatus={handleToggleStatus}
        isUpdating={isUpdating}
      />
    ),
  }));

  /* -------------------- ERROR UI -------------------- */
  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={() => refetch()}>
            Retry
          </Button>
        }
        sx={{ mt: 2 }}
      >
        Failed to load users. Please try again.
      </Alert>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) =>
                handleStatusFilterChange(
                  e.target.value as 'all' | 'active' | 'inactive'
                )
              }
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {data?.data?.totalCount || 0} users found
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper>
        <DynamicGrid
          data={usersWithActions}
          columns={columnsWithActions}
          isLoading={isLoading}
          totalCount={data?.data?.totalCount || 0}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      </Paper>
    </Box>
  );
};
