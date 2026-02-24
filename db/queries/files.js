import db from "#db/client";

/** @returns the employee created according to the provided details */
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

/** @returns all files */
//*fuction has been tested and works
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

/** @returns all files */
//*fuction has been tested and works
export async function getFolders() {
  try {
    const sql = `
    SELECT * FROM folders;
    `;
    const { rows } = await db.query(sql); //*"rows" = array of all employee rows
    const folders = rows;

    return folders;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getFolder(id) {
  try {
    const sql = `SELECT * FROM folders WHERE id = $1`;
    const { rows } = await db.query(sql, [id]); //* "rows" is an array containing the row selected
    const selectedFolder = rows;

    return selectedFolder[0];
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
