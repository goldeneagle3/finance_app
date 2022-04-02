import { Request, Response, Router } from "express";

import { AuthRoute } from "@routes/auth.routes";
import { UserRoute } from "@routes/user.routes";
import { logger } from "@utils/logging/winston/winston.logger";
import { requireSignin } from "@middleware/auth.middleware";
import { ExpenseRoute } from "@routes/expense.routes";

export class ApiRoutes {
  public static path = "/api";
  private static instance: ApiRoutes;
  private router = Router();

  private constructor() {
    logger.info("[ApiRoute] Creating api routes.");

    this.router.get("/", this.homepage);
    this.router.use(UserRoute.path, UserRoute.router);
    this.router.use(AuthRoute.path, AuthRoute.router);
    this.router.use(requireSignin)
    this.router.use(ExpenseRoute.path, ExpenseRoute.router);
  }

  static get router() {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance.router;
  }

  /**
   * @swagger
   * components:
   *  schemas:
   *    Test_Entity:
   *      type: object
   *      properties:
   *        entity_id:
   *          type: string || number
   *          description: the auto-generated or serial id of the entity
   *        entity_name:
   *          type: string
   *          description: the name of the entity
   *      required:
   *        - name
   *      example:
   *        id: gQBOyGbxcQy6tEp0aZ78X
   *        name: My first Entity
   *    EntityNotFound:
   *      type: object
   *      properties:
   *        msg:
   *          type: string
   *          description: A message for the not found Entity
   *      example:
   *        msg: Entity was not found
   *
   *  parameters:
   *    Entity_Id:
   *      in: path
   *      name: id
   *      required: true
   *      schema:
   *        type: string
   *      description: the Entity id
   */

  /**
   * @swagger
   * tags:
   *  name: __SERVER_NAME__
   *  description: This is only a testing-purpose endpoint.
   */

  /**
   * @swagger
   * /api:
   *   get:
   *     summary: Test the application if it works properly.
   *     tags: [__SERVER_NAME__]
   *     responses:
   *       200:
   *         description: Congratulations! You are ready to develop your server right now.
   */
  private homepage = (req: Request, res: Response) => {
    res.status(200).json("Welcome to your Server!");
  };
}
