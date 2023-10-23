import { obj } from "../types/global";

const validObj = (obj: obj) => Object.keys(obj)?.length > 0;

export default validObj;
