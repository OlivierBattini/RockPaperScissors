import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpError {
  /**
   * 400 Bad Request
   */
  public static badRequest(message?: string): never {
    throw new HttpException(
      message ? message : 'Bad request',
      HttpStatus.BAD_REQUEST,
    );
  }

  /**
   * 401 Unauthorized
   */
  public static unauthorized(message?: string): never {
    throw new HttpException(
      message ? message : 'Unauthorized',
      HttpStatus.UNAUTHORIZED,
    );
  }

  /**
   * 402 Payment Required
   */
  public static paymentRequired(message?: string): never {
    throw new HttpException(
      message ? message : 'Payment Required',
      HttpStatus.PAYMENT_REQUIRED,
    );
  }

  /**
   * 403 Forbidden
   */
  public static forbidden(message?: string): never {
    throw new HttpException(
      message ? message : 'Forbidden',
      HttpStatus.FORBIDDEN,
    );
  }

  /**
   * 409 Conflict
   */
  public static conflict(message?: string): never {
    throw new HttpException(
      message ? message : 'Conflict',
      HttpStatus.CONFLICT,
    );
  }

  /**
   * 500 Internal Server Error
   */
  public static internalServerError(message?: string): never {
    throw new HttpException(
      message ? message : 'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
