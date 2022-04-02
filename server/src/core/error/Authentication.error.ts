import { ErrorMessages } from "../utils/messages/error.messages";
import { CustomError } from "./BaseError.error";

export class AuthenticationErrors extends CustomError {
  message = ErrorMessages.authenticationError;
  statusCode = 401;

  constructor() {
    super(ErrorMessages.authenticationError);

    Object.setPrototypeOf(this, AuthenticationErrors.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
