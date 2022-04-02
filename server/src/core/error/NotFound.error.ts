import { ErrorMessages } from "../utils/messages/error.messages";
import { CustomError } from "./BaseError.error";

export class NotFound extends CustomError {
  statusCode = 404;

  constructor(public errorMessage?: string) {
    super(errorMessage ? errorMessage : ErrorMessages.notFoundError);

    Object.setPrototypeOf(this, NotFound.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.errorMessage
          ? this.errorMessage
          : ErrorMessages.notFoundError,
      },
    ];
  }
}
