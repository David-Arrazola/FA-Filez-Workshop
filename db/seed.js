import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();

const folder = await createFile({
  name: "ZooWeeMama.txt",
  size: 500,
  folderId: 2,
});
console.log("THIS IS THE FOLDER WITH ITS FILES", folder); //fix DELETE

await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  try {
    const folderSql = `
      INSERT INTO folders (name)
      VALUES ($1)
      RETURNING id;
    `;

    const fileSql = `
      INSERT INTO files (name, size, folder_id)
      VALUES ($1, $2, $3)
    `;

    for (let i = 0; i < 3; i++) {
      const folderName = faker.word.noun();
      const { rows } = await db.query(folderSql, [folderName]);
      const folderId = rows[0].id;

      for (let j = 0; j < 5; j++) {
        const fileName = faker.system.fileName();
        const fileSize = faker.number.int({ min: 1, max: 100000 });

        await db.query(fileSql, [fileName, fileSize, folderId]);
      }
    }
  } catch (e) {
    console.error(e);
  }
}
