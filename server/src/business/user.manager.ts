import { Request } from "express";

import { UserDao } from "@dal/user.dao";
import { IManager } from "./interface.manager";
import { Password } from "@utils/password/password.util";
import { DuplicateErrors } from "@core/error/Duplicate.error";

class UserManager implements IManager {
  private userDao = new UserDao();

  async create(body) {
    let { email, password } = body;

    const isExist = await this.userDao.getByEmail(email);
    if (isExist) {
      throw new DuplicateErrors()
    }

    const hash = await Password.hashPassword(password);

    return this.userDao.create({ ...body, password: hash });
  }

  list() {
    return this.userDao.list();
  }

  read(param: string) {
    return this.userDao.read(param);
  }

  update(body: Request<Body>, param: string) {
    return this.userDao.update(body, param);
  }

  remove(param: string) {
    return this.userDao.remove(param);
  }
}

export const userManager = new UserManager();
