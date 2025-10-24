import express from "express";
import { ENV } from "./config/env";
import llmRoutes from "./routes/llmRoutes";
import pdfRoute from "./routes/pdfRoutes";

const app = express();
app.use(express.json());
app.use("/api", llmRoutes);
app.use("/api/pdf", pdfRoute);

app.get("/", (req, res) => {
  res.send("🚀 API is running!");
});

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port http://localhost:${ENV.PORT}`);
})