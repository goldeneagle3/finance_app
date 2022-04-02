import { DaoBaseRepository } from "@core/dao/mongoose/DaoBaseRepo";
import { User } from "@entity/user.model";

export class UserDao extends DaoBaseRepository {
  constructor() {
    super(User);
  }

  async getByEmail(email: string) {
    let user = await User.findOne({ email });
    return user;
  }
}
