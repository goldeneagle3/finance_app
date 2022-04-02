// import { IDalCore } from "../IDao";

// export abstract class ToDaoBaseRepository implements IDalCore {
//   constructor(private model, private repository) {}

//   getModel() {
//     return this.repository(this.model);
//   }

//   async create(body: object, param?: string) {
//     const newData = await this.getModel().save(body);
//     return newData;
//   }

//   async read(param: string) {
//     const data = await this.getModel().findOne(param);
//     return data;
//   }

//   async list() {
//     const datas = await this.getModel().find();
//     return datas;
//   }

//   async update(body: object, param: string) {
//     const data = await this.getModel().findOne(param);
//     Object.assign(data, body);
//     await this.getModel().save(data);
//     return data;
//   }

//   async remove(param: string) {
//     const data = await this.getModel().findOne(param);
//     await this.repository(this.model).remove(data);
//     return "Data is deleted successfully.";
//   }
// }
