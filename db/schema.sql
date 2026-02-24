DROP TABLE IF EXISTS folders CASCADE;
DROP TABLE IF EXISTS files;

CREATE TABLE folders(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE files(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    size INT NOT NULL,
    folder_id INT NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
    UNIQUE(name, folder_id) 
);
--* "UNIQUE(a, c)" specifies that the combination of values in the indicated columns is 
--* unique across the whole table