import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { BadRequest } from "@core/error/BadRequest.error";
import { ErrorMessages } from "@core/utils/messages/error.messages";

dotenv.config();

export class Password {
  static async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  }

  static async comparePassword(
    store: string,
    provide: string
  ): Promise<boolean> {
    const match = await bcrypt.compare(provide, store);
    if (!match) {
      throw new BadRequest(ErrorMessages.credentialsError);
    }
    return match;
  }
}
