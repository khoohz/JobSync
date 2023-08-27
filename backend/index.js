import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";

import { register } from "./controllers/auths.js";
import { updateTaskPosition } from "./controllers/tasks.js";

import authRoutes from "./routes/auth.js";
import applicationRoutes from "./routes/application.js";
import taskRoutes from "./routes/task.js";
import contactRoutes from "./routes/contact.js";
import companyRoutes from "./routes/company.js";
import generalRoutes from "./routes/general.js";

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); //make api calls from another server
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }); // upload to local storage

// routes with files
app.post("/auth/register", upload.single("picture"), register);
app.put("/tasks/update-position", verifyToken, updateTaskPosition);

// Routes
app.use("/auth", authRoutes);
app.use("/general", generalRoutes); //users and dashboard
app.use("/applications", applicationRoutes);
app.use("/contacts", contactRoutes)
app.use("/companies", companyRoutes)
app.use("/tasks", taskRoutes)

app.get('/', (req, res) => {
  res.sendStatus(200)
})

// MONGOOSE Setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connected to MongoDB, server port: ${PORT}`)
    );
  })
  .catch((error) => console.log("error message: ", error.message));
