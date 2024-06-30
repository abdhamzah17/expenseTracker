import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/routes.js";
const { PORT, CLIENT_URL } = process.env;

const app = express();
const port = PORT || 5000;

app.use(
  cors({
    origin: String(CLIENT_URL),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.listen(port, () => {
  console.log("Server running on port " + port);
});
