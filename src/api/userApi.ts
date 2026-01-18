// src/api/userApi.ts
import type { User, UsersApiResponse, PaginationParams } from '@/types';
import {
  mockFetchUsers,
  mockUpdateUserStatus,
} from '@/mocks/data';

const API_BASE = '/api';

/**
 * Fetch users with pagination and filters
 */
export const fetchUsers = async (
  params: PaginationParams
): Promise<UsersApiResponse> => {
  try {
    const searchParams = new URLSearchParams({
      page: String(params.page),
      pageSize: String(params.pageSize),
    });

    if (params.query) searchParams.set('query', params.query);
    if (params.status && params.status !== 'all') {
      searchParams.set('status', params.status);
    }

    const response = await fetch(`${API_BASE}/users?${searchParams}`);

    if (!response.ok) {
      throw new Error('API not available');
    }

    return await response.json();
  } catch {
    console.warn('API unavailable. Using mock users data.');
    return mockFetchUsers(params); // ✅ NO RED LINE
  }
};

/**
 * Update user status
 */
export const updateUserStatus = async (
  userId: string,
  status: 'active' | 'inactive'
): Promise<{ success: boolean; data: User; message: string }> => {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('API not available');
    }

    return await response.json();
  } catch {
    const updatedUser = mockUpdateUserStatus(userId, status);

    return {
      success: true,
      data: updatedUser as User,
      message: 'User status updated (mock)',
    };
  }
};

