import express from "express"
import cors from "cors"
import { addBook,getBookById,getData,deleteBook,getBookByISBN } from "./database.js"

const app = express()
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST","DELETE","OPTIONS"],       
    allowedHeaders: ["Content-Type", "Accept"]
}))




app.get("/books", async (req,res)=>{
    const data = await getData()
    res.json(data)
})
app.get("/book/:id", async (req,res)=>{
    const id  =req.params.id
    const book = await getBookById(id)
    res.json(book)
})
app.post("/book", async (req,res)=>{
    const data = req.body
    
    if (!data.isbn) {
        return res.status(400).json({ error: "ISBN jest wymagany." });
    }
    
    const existingBooks = await getBookByISBN(data.isbn);

    
    if (existingBooks && existingBooks.length > 0) {
        return res.status(400).json({ error: "Książka z tym numerem ISBN już istnieje w bazie danych." });
    }

    
    
    const result = await addBook(data)
    res.json(existingBooks)
})
app.delete("/book", async (req,res)=>{
    const {id} = req.body
    const result = await deleteBook(id)
    if (!id) {
        return res.status(400).json({ error: "Not provided ID" });
    }
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Not found a book with this ID" });
    }
    res.json(result)
    
})

app.use((err,req,res,next)=>{
    console.error("Błąd Backend:", err.stack)
    res.status(500).json({ 
        error: "Internal Server Error", 
        message: err.message 
    });
})

app.listen(8080,()=>{
    console.log('Server is running on port 8080')
})