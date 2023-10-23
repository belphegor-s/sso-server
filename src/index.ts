import "dotenv/config";
const PORT = process.env?.PORT ?? 8080;

import express from "express";
import passport from "passport";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
const app = express();

app.use(express.json());
app.use(passport.initialize());
import "./config/passport";

app.get("/", (req, res) => {
    res.send("Server is live 🍵");
});
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});

export default app;
