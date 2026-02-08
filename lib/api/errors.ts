/**
 * Custom error classes for API services
 */

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public serviceName?: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class RateLimitError extends APIError {
  constructor(serviceName: string) {
    super(
      `Rate limit exceeded for ${serviceName}. Please try again later.`,
      429,
      serviceName,
    );
    this.name = "RateLimitError";
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string, serviceName: string) {
    super(
      `${resource} not found on ${serviceName}. Please check your username/ID.`,
      404,
      serviceName,
    );
    this.name = "NotFoundError";
  }
}

export class NetworkError extends APIError {
  constructor(serviceName: string) {
    super(
      `Network error while fetching data from ${serviceName}. Please check your connection.`,
      0,
      serviceName,
    );
    this.name = "NetworkError";
  }
}

/**
 * Handle fetch errors and convert to appropriate error types
 */
export function handleAPIError(error: unknown, serviceName: string): never {
  if (error instanceof Response) {
    if (error.status === 404) {
      throw new NotFoundError("Resource", serviceName);
    }
    if (error.status === 429 || error.status === 403) {
      throw new RateLimitError(serviceName);
    }
    throw new APIError(
      `${serviceName} API error: ${error.statusText}`,
      error.status,
      serviceName,
    );
  }

  if (error instanceof TypeError && error.message.includes("fetch")) {
    throw new NetworkError(serviceName);
  }

  if (error instanceof Error) {
    throw new APIError(error.message, undefined, serviceName);
  }

  throw new APIError("Unknown error occurred", undefined, serviceName);
}
