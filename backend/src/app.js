import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

if (process.env.NODE_ENV === "production") {
	const distPath = path.join(__dirname, "../../frontend/dist");
	app.use(express.static(distPath));

	// Return React app for non-API routes.
	app.get(/^(?!\/api).*/, (req, res) => {
		res.sendFile(path.join(distPath, "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("Hello World!");
	});
}

app.use(errorHandler);

export default app;
