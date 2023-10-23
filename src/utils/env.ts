import "dotenv/config";

const JWT_SECRET_KEY = process.env?.JWT_SECRET_KEY ?? "";

if (!JWT_SECRET_KEY) {
    throw new Error(`JWT_SECRET_KEY missing!`);
}

export { JWT_SECRET_KEY };
