import express from "express";
import { getFolders, getFolder, createFile } from "#db/queries/files";
const foldersRouter = express.Router();
export default foldersRouter;

foldersRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const folderById = await getFolder(id);

    !folderById
      ? req.status(404).send("Folder doesn't exist")
      : req.send(folderById);
  } catch (e) {
    console.error(e);
  }
});

foldersRouter.get("/", async (req, res) => {
  try {
    const allFolders = await getFolders();
    res.send(allFolders);
  } catch (e) {
    console.error(e);
  }
});

foldersRouter.post("/:id/files", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("Body not provided");
    }
    if (!req.body.name || !req.body.size) {
      return res
        .status(400)
        .send("Either NAME or SIZE of file was not provided");
    }
    const { id } = req.params;
    const newFile = await createFile({
      name: req.body.name,
      size: req.body.size,
      folderId: id,
    });
    !newFile
      ? res.status(404).send("Folder does not exist")
      : res.status(201).send(newFile);
  } catch (e) {
    console.error(e);
  }
});
