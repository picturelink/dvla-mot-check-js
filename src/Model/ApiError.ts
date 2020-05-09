
/**
 * Represents an error thrown when the MOT History API returns an invalid response.
 */
export class ApiError extends Error {
  /** The HTTP status code returned by the MOT History API. */
  public statusCode: number;

  /** The error object returned by the MOT History API. */
  public error: unknown;

  /**
   *  Creates an instance of the APIError class.
   * @param message The error message.
   * @param statusCode The HTTP status code returned by the MOT History API.
   * @param error The error object returned by the MOT History API.
   */
  constructor(message: string, statusCode: number, error: unknown) {
    super(message);

    this.statusCode = statusCode;
    this.error = error;
  }
}
