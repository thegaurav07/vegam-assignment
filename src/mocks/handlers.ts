import { http, HttpResponse, delay } from 'msw';
import {
  mockFetchUsers,
  mockUpdateUserStatus,
} from './data';

export const handlers = [
  // GET /api/users - Fetch users with pagination and filters
  http.get('/api/users', async ({ request }) => {
    // Simulate network delay
    await delay(500);

    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
    const query = url.searchParams.get('query') ?? '';
    const status =
      (url.searchParams.get('status') as 'all' | 'active' | 'inactive') ??
      'all';

    const result = mockFetchUsers({
      page,
      pageSize,
      query,
      status,
    });

    return HttpResponse.json({
      data: {
        users: result.data.users,
        totalCount: result.data.totalCount,
      },
    });
  }),

  // PATCH /api/users/:id - Update user status
  http.patch('/api/users/:id', async ({ params, request }) => {
    // Simulate network delay
    await delay(300);

    const { id } = params;
    const body = (await request.json()) as {
      status: 'active' | 'inactive';
    };

    const updatedUser = mockUpdateUserStatus(
      id as string,
      body.status
    );

    if (!updatedUser) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      data: updatedUser,
      message: `User status updated to ${body.status}`,
    });
  }),
];

