const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
	return []
})

app.listen('4567')

// location.href = "http://localhost:4567/"