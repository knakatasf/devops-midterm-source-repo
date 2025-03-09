import express  from "express";
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host: process.env.RDS_HOST || "database",
    port: process.env.RDS_PORT || 3306,
    user: process.env.RDS_USER || "user",
    password: process.env.RDS_PASSWORD || "password",
    database: process.env.RDS_NAME || "db"
})

app.use(express.json())//return json data using the api server postman

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
};

app.use(cors(corsOptions));

// app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hello World from the backend!!!")
})

//postman -> get method  http://localhost:8800/books
app.get("/books", (req,res)=>{
    const query = "SELECT * FROM books"
    db.query(query, (err,data)=>{
          if(err) return res.json(err)
          return res.json(data)
    })
})


  //postman ---> post method
  //json body bellow
  //----------------------------- http://localhost:8800/books
  //{
// "title": "title from client",
// "description": "description from client",
// "cover": "cover from client"
// }

  app.post("/books", (req,res)=>{
    const query = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)"
    const values = [
       req.body.title,
       req.body.description,
       req.body.price,
       req.body.cover
    ]

    db.query(query, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created successfully!!!")
    })
  })

  app.delete("/books/:id", (req,res)=>{
      const bookID = req.params.id
      const query = "DELETE FROM books WHERE id = ?"

      db.query(query, [bookID], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully!!!")
      } )
  })

  app.put("/books/:id", (req,res)=>{
    const bookID = req.params.id
    const query = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.cover
    ]

    db.query(query, [...values, bookID], (err, data)=>{
      if(err) return res.json(err)
      return res.json("Book has been updated successfully!!!")
    } )
})


app.listen(8800, ()=>{
    console.log("Connect to the backend!!!!")
})

//npm start