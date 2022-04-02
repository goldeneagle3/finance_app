import { ErrorMessages } from "../utils/messages/error.messages";
import { CustomError } from "./BaseError.error";

export class DBConnectionError extends CustomError {
  statusCode = 500;
  reason = ErrorMessages.dbError;

  constructor() {
    super("DB Error");

    // Only because we are extending a built-in class(Error)
    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
