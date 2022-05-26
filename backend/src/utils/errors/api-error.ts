import httpStatusCodes from 'http-status-codes';

export interface APIErrorData {
  code: number;
  message: string;
  description?: string;
}

export interface APIErrorResponse extends APIErrorData {
  error: string;
}

export default class APIError {
  public static format(data: APIErrorData): APIErrorResponse {
    return {
      code: data.code,
      error: httpStatusCodes.getStatusText(data.code),
      message: data.message,
      description: data.description,
    };
  }
}
