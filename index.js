const express = require('express')
const path = require("path")
const fs = require("fs")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'WEB')))
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile("index.html", {root: path.join(__dirname)})
})

app.post('/reg-data', (req, res) => {
    fs.appendFile("data.txt", JSON.stringify(req.body) + "\n", (err) => {
        if (err) {
            res.status(500).send("Пользователь НЕ добавлен")
        } else {
            res.status(201).send("Пользователь добавлен!")
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
