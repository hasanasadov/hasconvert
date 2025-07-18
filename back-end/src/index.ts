import express from "express";
import cors from "cors";
import youtubeRoutes from "./routes/youtube";
import downloadRoutes from "./routes/download";
const app = express();
app.set("trust proxy", 1);

const PORT = 3000;

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:7777"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to HasConvert API");
});

app.use("/youtube", youtubeRoutes);
app.use("/download", downloadRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
