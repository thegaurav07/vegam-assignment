// src/mocks/data.ts
import type { User, UsersApiResponse, PaginationParams } from '@/types';

/* ---------------- MOCK USERS ---------------- */

let mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  userId: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: Math.random() > 0.3 ? 'active' : 'inactive',
  createdAt: new Date().toISOString(),
  groups: [],
}));

/* ---------------- FETCH USERS (MOCK) ---------------- */

export const mockFetchUsers = (
  params: PaginationParams
): UsersApiResponse => {
  let filtered = [...mockUsers];

  if (params.query) {
    const q = params.query.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }

  if (params.status && params.status !== 'all') {
    filtered = filtered.filter((u) => u.status === params.status);
  }

  const totalCount = filtered.length;

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  const start = (page - 1) * pageSize;

  return {
    data: {
      users: filtered.slice(start, start + pageSize),
      totalCount,
    },
  };
};

/* ---------------- UPDATE STATUS (MOCK) ---------------- */

export const mockUpdateUserStatus = (
  userId: string,
  status: 'active' | 'inactive'
): User | null => {
  const index = mockUsers.findIndex((u) => u.userId === userId);
  if (index === -1) return null;

  mockUsers[index] = { ...mockUsers[index], status };
  return mockUsers[index];
};


