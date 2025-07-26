import mysql from "mysql2/promise";

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'muh.akram1422',
        database: 'postapi'
    });

    const [rows, fields] = await connection.execute('SELECT * FROM posts');
    console.log(rows);

    await connection.end();
}

main();
