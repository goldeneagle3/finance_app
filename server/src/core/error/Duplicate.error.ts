import { ErrorMessages } from "../utils/messages/error.messages";
import { CustomError } from "./BaseError.error";

export class DuplicateErrors extends CustomError {
  statusCode = 409;

  constructor() {
    super(ErrorMessages.duplicateError);

    Object.setPrototypeOf(this, DuplicateErrors.prototype);
  }

  serializeErrors() {
    return [{ message: ErrorMessages.duplicateError }];
  }
}
