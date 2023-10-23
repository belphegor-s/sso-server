import passport from "passport";
import { compare } from "bcryptjs";
import { Strategy } from "passport-local";
import UserModel from "../models/User";
import passportJWT from "passport-jwt";
import { JWT_SECRET_KEY } from "../utils/env";

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;

passport.use(
    new Strategy({ usernameField: "username", passwordField: "password" }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });

            if (!user) {
                return done(null, false, { message: "Invalid Username!" });
            }

            const isPasswordValid = await compare(password, user.password);

            if (!isPasswordValid) {
                return done(null, false, { message: "Invalid Password!" });
            }

            return done(null, user);
        } catch (error) {
            console.error("Error occurred while logging in -> ", error);
            return done(error);
        }
    })
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET_KEY,
        },
        (jwtPayload, done) => {
            return done(null, jwtPayload);
        }
    )
);
