/** Shared boundary for the planned FastAPI API. Not a mock-auth implementation. */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
  ) {
    super(message);
  }
}
export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      body?.error?.message || "The request could not be completed.",
      response.status,
      body?.error?.code || "request_failed",
    );
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
