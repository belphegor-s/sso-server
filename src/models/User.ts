import { Schema } from "mongoose";
import { ssoDb } from "../config/db";

export interface User {
    username: string;
    password: string;
}

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const UserModel = ssoDb.model("user", UserSchema);

export default UserModel;
