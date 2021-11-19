import { REST } from "../common";

export default {
  getHeadLines(category: string, region: string): Promise<any> {
    return REST.get(`/top-headlines/category/${category}/${region}.json`);
  },
};
