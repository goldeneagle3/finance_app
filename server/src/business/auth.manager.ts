import dotenv from "dotenv";
import { env } from "process";

import { UserDao } from "@dal/user.dao";
import { JWTUtils } from "@utils/encryption/jwt.utils";
import { Password } from "@utils/password/password.util";
import { NotFound } from "@core/error/NotFound.error";

dotenv.config();

class AuthManager {
  private userDao = new UserDao();

  async signin(body) {
    const { email, password } = body;

    const user = await this.userDao.getByEmail(email);

    if (!user) throw new NotFound("User is not found!");

    await Password.comparePassword(user.password, password);

    const payload = { id: user.id, username: user.username };

    const token = JWTUtils.sign(payload, env.TOKEN, {
      expiresIn: "1h",
    });

    return { auth_token: token };
  }
}

export const authManager = new AuthManager();
