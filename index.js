const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ Error: "User not found" })
    }

    request.userindex = index
    request.userId = id

    next()

}



app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)


})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userindex
    const id = request.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)
})


app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userindex

    users.splice(index, 1)



    return response.status(204).json()
})



app.listen(port, () => {
    console.log(`🐱‍🏍Servidor incicializando com a porta🐱‍🏍 ${port}`)
})