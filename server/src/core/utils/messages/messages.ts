export abstract class Messages {
  static startServer(port): string {
    return `Server started at http://localhost:${port}`;
  }

  static paramIdError(id:string):string{
    return `${id} by this id is not found.`
  }
}
