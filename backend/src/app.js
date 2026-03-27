import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

const corsOptions = {
	credentials: true,
	origin(origin, callback) {
		if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
			callback(null, true);
			return;
		}

		callback(new Error("CORS origin not allowed"));
	},
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", apiRoutes);
app.use(errorHandler);

export default app;
