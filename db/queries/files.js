import db from "#db/client";

export async function createFile({ name, size, folderId }) {
  //!Making a new user means that we have to make a new ROW entry in DB "fullstack_employees"
  try {
    const sql = `
      INSERT INTO files (name, size, folder_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await db.query(sql, [name, size, folderId]);
    const newFile = rows;

    return newFile[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getFiles() {
  try {
    const sql = `
    SELECT * FROM files;
    `;
    const { rows } = await db.query(sql); //*"rows" = array of all employee rows
    const files = rows;

    return files;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function getFolders() {
  try {
    const sql = `
    SELECT files.*, folders.name AS folder_name FROM files
    JOIN folders ON files.folder_id = folders.id;
    `;
    //! "folders.name AS folder_name" === the "name" COLUMN in folders TABLE is renamed to "folder_name"
    //* This is to differentiate what "name"  refered to, since both tables have a COLUMN called "name"
    const { rows } = await db.query(sql); //*"rows" = array of all employee rows
    const folders = rows;

    return folders;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function getFolder(id) {
  try {
    const sql = `SELECT folders.name AS folder_name,
    files.* 
    FROM folders 
    JOIN files ON files.folder_id = folders.id 
    WHERE folders.id = $1`;
    const { rows } = await db.query(sql, [id]); //* "rows" is an array containing the row selected
    const selectedFolder = rows;

    return selectedFolder;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
