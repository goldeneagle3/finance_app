import { Router } from "express";
import { logger } from "@utils/logging/winston/winston.logger";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoute {
  public static path = "/auth";
  private static instance: AuthRoute;
  private authCtrl = new AuthController();
  private router = Router();

  private constructor() {
    logger.info("[AuthRoute] Creating authentication route.");

    this.router.post("/signin", this.signin);
  }

  static get router() {
    if (!AuthRoute.instance) {
      AuthRoute.instance = new AuthRoute();
    }
    return AuthRoute.instance.router;
  }

  private signin = this.authCtrl.signin;
}
