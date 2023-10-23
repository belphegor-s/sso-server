import mongoose from "mongoose";
import { MONGO_URI } from "../utils/env";

const options = { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions;

export const ssoDb = mongoose.createConnection(`${MONGO_URI}`, options);

ssoDb.once("open", () => {
    console.log("Database connection established!");
});
