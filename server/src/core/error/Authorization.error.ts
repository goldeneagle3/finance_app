import { ErrorMessages } from "../utils/messages/error.messages";
import { CustomError } from "./BaseError.error";

export class AuthorizationErrors extends CustomError {
  public static message = ErrorMessages.authorizationError;
  public statusCode = 403;

  constructor() {
    super(ErrorMessages.authorizationError);

    Object.setPrototypeOf(this, AuthorizationErrors.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
