import "dotenv/config";

const JWT_SECRET_KEY = process.env?.JWT_SECRET_KEY ?? "",
    MONGO_URI = process.env?.MONGO_URI ?? "";

if (!JWT_SECRET_KEY) {
    throw new Error(`JWT_SECRET_KEY missing!`);
} else if (!MONGO_URI) {
    throw new Error(`MONGO_URI missing!`);
}

export { JWT_SECRET_KEY, MONGO_URI };
