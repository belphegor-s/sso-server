import mongoose from "mongoose";

const options = { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions;

export const ssoDb = mongoose.createConnection(`mongodb://127.0.0.1:27017/sso`, options);

ssoDb.once("open", () => {
    console.log("Database connection established!");
});
