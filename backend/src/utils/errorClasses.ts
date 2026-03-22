import { ErrorType } from "@interfaces/responseEntity";

export abstract class ErrorVS extends Error {
  abstract readonly status: number;
  readonly type: ErrorType;
  protected constructor(message: string, defaultType: ErrorType, customType?: ErrorType) {
    super(message);
    this.name = this.constructor.name;
    this.type = customType || defaultType
  }
}

class ValidationError extends ErrorVS {
  readonly status = 400;
  constructor(message: string, type?: ErrorType) {
    super(message, 'VS_VALIDATION', type)
  }
}

class UnauthorizedError extends ErrorVS {
  readonly status = 403;
  constructor(message: string, type?: ErrorType) {
    super(message, 'VS_UNAUTHORIZED', type);
  }
}

class NotFoundError extends ErrorVS {
  readonly status = 404;
  constructor(message: string, type?: ErrorType) {
    super(message, 'VS_NOT_FOUND', type)
  }
}

class ConflictError extends ErrorVS {
  readonly status = 409;
  constructor(message: string, type?: ErrorType) {
    super(message, 'VS_CONFLICT', type)
  }
}

class InvalidCredentialsError extends ErrorVS {
  readonly status = 401;
  constructor(message: string, type?: ErrorType) {
    super(message, 'VS_INVALID', type)
  }
}

class ManyRequestsError extends ErrorVS {
  readonly status = 429;
  constructor(message: string, type?: ErrorType) {
    super(message, 'VS_MANY_REQUESTS', type)
  }
}

class ServerError extends ErrorVS {
  readonly status = 500;
  constructor(message: string, type?: ErrorType) {
    super(message, 'VS_SERVER_ERROR', type)
  }
}

export default {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InvalidCredentialsError,
  ManyRequestsError,
  ServerError
}