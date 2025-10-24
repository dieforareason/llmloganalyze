import express from "express";
import { ENV } from "./config/env";
import llmRoutes from "./routes/llmRoutes";

const app = express();
app.use(express.json());
app.use("/api", llmRoutes);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port http://localhost:${ENV.PORT}`);
})