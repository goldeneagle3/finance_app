import mongoose from "mongoose";
import { IDalCore } from "../IDao";

export class DaoBaseRepository implements IDalCore {
  constructor(private model: typeof mongoose.Model) {}

  async create(body: object) {
    const newData = new this.model(body);
    await newData.save();

    return newData;
  }

  async list() {
    const datas = await this.model.find();
    return datas;
  }

  async read(filter: string): Promise<object> {
    const data = await this.model.findById(filter);

    return data;
  }

  async update(body: object, filter: string) {
    const data = await this.model.findById(filter);
    Object.assign(data, body);
    await data.save();
    return data;
  }

  async remove(filter: string) {
    await this.model.findByIdAndDelete(filter);
    return "Data deleted successfully.";
  }
}

// export const daoBaseRepository = new DaoBaseRepository();
