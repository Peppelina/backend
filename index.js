import express from 'express'

const PORT = 5000

const app = express()

app.get('/', (req, res) => {
    res.status(200).json('Сервер работает')
})

app.listen(PORT, () => console.log('сервер работает ' + PORT))