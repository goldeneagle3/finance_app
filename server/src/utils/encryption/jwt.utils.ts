import jwt from "jsonwebtoken";

export class JWTUtils {
  static sign(payload: object, secretkey: string, expire: object) {
    return jwt.sign(payload, secretkey, expire);
  }

  static verify(token: string, secretkey: string, expire?: object) {
    return jwt.verify(token, secretkey, expire);
  }
}
