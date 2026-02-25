import express from "express";
import foldersRouter from "#api/folders";
import { getFiles } from "#db/queries/files";

const app = express();
export default app;

app.use(express.json());

app.use("/", (req, res, next) => {
  console.log(req.method + " " + req.originalURL);

  next();
});

app.get("/files", async (req, res) => {
  const allFiles = await getFiles();
  res.send(allFiles);
});

app.use("/folders", foldersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
