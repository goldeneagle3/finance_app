import { ErrorMessages } from "../../core/utils/messages/error.messages";

export class Validation {
  static passwordValidation(password: string): boolean | Error {
    const isLength = password.length >= 8;
    if (!isLength) {
      throw new Error(ErrorMessages.passwordLength);
    } else {
      return true;
    }
  }
}
