type ApiError<T = null> = {
  errorType: string;
  message: string;
  details: T[];
};

type ValidationErrorDetails = {
  property: string;
  value: string;
  messages: string[];
}

export type ValidationError = ApiError<ValidationErrorDetails>;
export type AuthorizationError = ApiError;
export type NotFoundError = ApiError;
export type ConflictError = ApiError;
