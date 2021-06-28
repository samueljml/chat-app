const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
	return [{
		id: 1,
		imageUrl: "",
		imageAlt: "",
		title: "Desconhecido",
		createdAt: "Apr 16",
		latestMessageText: "",
		messages: [],
	},
	{
		id: 2,
		imageUrl: "",
		imageAlt: "Samuel",
		title: "Samuel",
		createdAt: "Oct 20",
		latestMessageText: "Eu também!",
		messages: [
			{
				imageUrl: "",
				imageAlt: "",
				messageText: "Eu também!",
				createdAt: "June 22",
				isMyMessage: true,
			},
			{
				imageUrl: "",
				imageAlt: "Daryl Duckmanton",
				messageText: "Tudo e você?",
				createdAt: "June 22",
				isMyMessage: false,
			},
			{
				imageUrl: "",
				imageAlt: "",
				messageText: "Olá, tudo bem?",
				createdAt: "June 22",
				isMyMessage: true,
			},
			{
				imageUrl: "",
				imageAlt: "",
				messageText: "Olá",
				createdAt: "June 22",
				isMyMessage: false,
			},
		],
	}]
})

app.listen('4567')

// location.href = "http://localhost:4567/"