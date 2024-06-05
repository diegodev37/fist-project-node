const express = require("express")
const uuid = require("uuid")

const port = 3000
const app = express()

const users = []

app.get('/users', (request, response) => {
    return response.json(users)

})

app.post('/users', (request, response) => {

    const{ name, age } = request.body
    
    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(users)

})


app.listen(port, () => {
    console.log(`🐱‍🏍Servidor incicializando com a porta🐱‍🏍 ${port}`)
})