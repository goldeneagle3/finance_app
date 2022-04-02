export interface IManager {
  create: (requestBody, param?) => object;
  read: (requestParam: string) => Promise<object>;
  update?: (requestBody, requestParam: string) => Promise<object>;
  list?: () => Promise<object[]>;
  remove: (requestParam: string) => Promise<string>;
}
