import express from "express";
import cors from "cors";
import youtubeRoutes from "./routes/youtube";
const app = express();
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

app.use("/youtube", youtubeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
