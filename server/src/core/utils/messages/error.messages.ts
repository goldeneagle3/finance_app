import { Messages } from "./messages";

export class ErrorMessages extends Messages {
  public static passwordLength: string =
    "Password length must be 8 chars at least.";
  public static dbError: string =
    "Encounter an error when connecting db.";
  public static duplicateError: string =
    "This data already present in the database.";
  public static notFoundError: string =
    "404 Not Found";
  public static authenticationError: string =
    "Authentication Error";
  public static authorizationError: string =
    "Authorization Error";
  public static credentialsError: string =
    "Wrong Credential Error";
}
