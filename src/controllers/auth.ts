import { Request, Response } from "express";
import { hash } from "bcryptjs";
import UserModel from "../models/User";
import * as jwt from "jsonwebtoken";
import { obj } from "../types/global";
import validObj from "../utils/validObj";
import { JWT_SECRET_KEY } from "../utils/env";

export const register = async (req: Request, res: Response) => {
    let success = false,
        msg = "",
        status = 200,
        data = {};
    try {
        const username = (req.body?.username && typeof req.body?.username === "string" && req.body?.username?.trim()) || "",
            password = (req.body?.password && typeof req.body?.password === "string" && req.body?.password?.trim()) || "";

        if (!username) {
            msg = "Username is Invalid!";
            status = 422;
            throw new Error(msg);
        } else if (!password) {
            msg = "Password is Invalid!";
            status = 422;
            throw new Error(msg);
        }

        const hashedPassword = await hash(password, 12);
        const userData = await UserModel.create({ username, password: hashedPassword });

        if (userData) {
            success = true;
            msg = "Successfully registered User";
            data = {
                id: userData._id,
                username: userData.username,
            };
        }
    } catch (e) {
        console.error(`Error occured in register controller -> `, e);
        msg = msg || "Internal Server Error!";
        status = status || 500;
    } finally {
        return res.status(status).json({
            success,
            msg,
            ...(validObj(data) ? { data } : {}),
        });
    }
};

export const login = async (req: Request, res: Response) => {
    let success = false,
        msg = "",
        status = 200,
        data = {};
    try {
        const user = req.user as obj;

        if (!user && validObj(user)) {
            msg = "User is Invalid!";
            status = 422;
            throw new Error(msg);
        }

        const token = jwt.sign({ sub: user._id, username: user.username }, JWT_SECRET_KEY, { expiresIn: "1h" });

        if (token) {
            success = true;
            msg = "Successfully generated token for the user";
            data = { token };
        }
    } catch (e) {
        console.error(`Error occured in login controller -> `, e);
        msg = msg || "Internal Server Error!";
        status = status || 500;
    } finally {
        return res.status(status).json({
            success,
            msg,
            ...(validObj(data) ? { data } : {}),
        });
    }
};

export const protectedController = async (req: Request, res: Response) => {
    res.json({ success: true, msg: "You are authorized to access this resource." });
};
