const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const Book = require("./db/Book")
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send("Something went wrong")
        }
        resp.send({ result, auth: token })
    })
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send("Something went wrong")
                }
                resp.send({ user, auth: token })
            })
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

app.post("/add-book", async (req, resp) => {
    let book = new Book(req.body);
    let result = await book.save();
    resp.send(result);
});

app.get("/books", async (req, resp) => {
    const books = await Book.find();
    if (books.length > 0) {
        resp.send(books)
    } else {
        resp.send({ result: "No Book found" })
    }
});

app.delete("/book/:id", async (req, resp) => {
    let result = await Book.deleteOne({ _id: req.params.id });
    resp.send(result)
}),

    app.get("/book/:id", async (req, resp) => {
        let result = await Book.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    })

app.put("/book/:id", async (req, resp) => {
    let result = await Book.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.put("/book/:id", async (req, resp) => {
    let result = await Book.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.get("/search/:key", async (req, resp) => {
    let result = await Book.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                author: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})

app.listen(5000);