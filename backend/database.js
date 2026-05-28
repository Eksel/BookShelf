import mysql from 'mysql2'
import dotenv from 'dotenv';
dotenv.config();


const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise()


export async function getData() {
    const [rows] = await pool.query("Select * from mock_data;")
    return rows
}
export async function getBookById(id){
    const [rows] = await pool.query(`Select * from mock_data where id = ?;`[id])
    return rows[0]
    
}
export async function addBook(data){
    const {title,author,isbn,pages,rating} = data
    const [result] = await pool.query('insert into mock_data ( title, author, isbn, pages, rating) values ( ?, ?, ?, ?, ?);',[title,author,isbn,pages,rating])
    return result
}
export async function deleteBook(id){
    const [result] = await pool.query('delete from mock_data where id = ?',[id])
    return [result]
}
export async function getBookByISBN(isbn){
   const [rows] = await pool.query(
        `SELECT * FROM mock_data WHERE isbn = ?`,
        [isbn]
    );

    

    return rows;
}