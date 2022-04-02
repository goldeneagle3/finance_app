export interface IDalCore {
  create: (body: object, param?: string) => Promise<object>;
  read: (filter: string) => Promise<object | unknown>;
  update: (body: object, filter: string) => Promise<object | unknown>;
  remove: (filter: string) => Promise<string>;
  list: () => Promise<object[] | unknown>;
}
