const sql = require('mssql/msnodesqlv8');

const sqlConfig = {
    database: 'ToDo',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const getItems = async() => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT * FROM ToDoItems');
    return recordset;
}

const getCategories = async() => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query('SELECT * FROM Categoties');
    return recordset;
}

const addItem = async({ title, dueDate, categoryId }) => {
    await sql.connect(sqlConfig);
    await sql.query `INSERT INTO ToDoItems (Title, DueDate, CategoryId)
    VALUES (${title}, ${dueDate}, ${categoryId})`;
}

const addCategory = async({ name }) => {
    await sql.connect(sqlConfig);
    await sql.query `INSERT INTO Categories (Name)
    VALUES (${name})`;
}

const markCompleted = async({ id }) => {
    await sql.connect(sqlConfig);
    await sql.query `UPDATE ToDoItems SET CompletedDate = GETDATE()
    WHERE Id = ${id}`;
}

const getCompletedItems = async() => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query(`SELECT tdi.*, c.Name as CategoryName FROM Categories c
    JOIN ToDoItems tdi
    ON c.Id = tdi.CategoryId
    WHERE tdi.CompletedDate IS NOT Null`);
    return recordset;
}

const getCategory = async(id) => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query `SELECT * FROM Catagories WHERE Id = ${id}`;
    return recordset[0];
}

const updateCategory = async({ name, id }) => {
    await sql.connect(sqlConfig);
    await sql.query `UPDATE CATEGORIES SET Name = ${name} WHERE Id = ${id}`;
}

module.exports = {
    getItems,
    getCategories,
    addItem,
    addCategory,
    markCompleted,
    getCompletedItems,
    getCategory,
    updateCategory
}