import { Request, Response } from "express";
import UserModel from "../models/User";

export const deleteController = async (req: Request, res: Response) => {
    let success = false,
        status = 200,
        msg = "";
    try {
        const id = req.params.id;
        if (!id) {
            msg = "Invalid User Id!";
            status = 200;
            throw new Error(msg);
        }
        const data = await UserModel.deleteOne({ _id: id });

        if (data.acknowledged) {
            success = true;
            msg = "Successfully deleted user";
        }
    } catch (e) {
        console.error(`Error in deleteController -> `, e);
        msg = msg || "Internal Server Error!";
        status = status || 500;
    } finally {
        res.status(status).json({
            success,
            msg,
        });
    }
};
