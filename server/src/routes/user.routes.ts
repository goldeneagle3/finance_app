import { Router, Request, Response } from "express";
import { logger } from "@utils/logging/winston/winston.logger";
import { UserController } from "@controllers/user.controller";
import { Params } from "@middleware/param.middleware";
import { requireSignin } from "@middleware/auth.middleware";
import { IsOwner } from "@middleware/owner.middleware";

export class UserRoute {
  public static path = "/users";
  private static instance: UserRoute;
  private userCtrl = new UserController();
  private router = Router();

  private constructor() {
    logger.info("[UserRoute] Creating users route.");

    this.router.param("userId", Params.userByID);

    this.router.post("/", this.create);
    this.router.get("/", this.list);
    this.router.get("/:userId", requireSignin, this.read);
    this.router.patch("/:userId", requireSignin, IsOwner.isUser, this.update);
    this.router.delete("/:userId", requireSignin, IsOwner.isUser, this.remove);
  }

  static get router() {
    if (!UserRoute.instance) {
      UserRoute.instance = new UserRoute();
    }
    return UserRoute.instance.router;
  }

  private create = this.userCtrl.create;
  private remove = this.userCtrl.remove;
  private list = this.userCtrl.list;
  private read = this.userCtrl.read;
  private update = this.userCtrl.update;
}
