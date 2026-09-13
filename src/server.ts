import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./database/data-source";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "MedClinic API" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`MedClinic API executando em http://localhost:${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error("Não foi possível conectar ao PostgreSQL.", error);
    process.exit(1);
  });
