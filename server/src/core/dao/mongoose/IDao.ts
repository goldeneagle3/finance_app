export interface IDalCore {
  create: ( body: object) => Promise<string>;
  read: (filter: string) => Promise<object>;
  update: ( body: object, filter: string) => Promise<object>;
  delete: (filter: string) => Promise<string>;
  list: () => Promise<object[]>;
}
