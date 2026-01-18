import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, updateUserStatus } from '@/api';
import type { PaginationParams, User, UsersApiResponse } from '@/types';

export const userQueryKeys = {
  all: ['users'] as const,
  list: (params: PaginationParams) => ['users', 'list', params] as const,
};

export const useUsers = (params: PaginationParams) => {
  return useQuery<UsersApiResponse>({
    queryKey: userQueryKeys.list(params),
    queryFn: () => fetchUsers(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: 'active' | 'inactive';
    }) => updateUserStatus(userId, status),

    onMutate: async ({ userId, status }) => {
      await queryClient.cancelQueries({ queryKey: userQueryKeys.all });

      const previousQueries = queryClient.getQueriesData<UsersApiResponse>({
        queryKey: userQueryKeys.all,
      });

      previousQueries.forEach(([queryKey, data]) => {
        if (!data) return;

        queryClient.setQueryData<UsersApiResponse>(queryKey, {
          ...data,
          data: {
            ...data.data,
            users: data.data.users.map((user: User) =>
              user.userId === userId ? { ...user, status } : user
            ),
          },
        });
      });

      return { previousQueries };
    },

    onError: (_err, _vars, context) => {
      context?.previousQueries?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};
