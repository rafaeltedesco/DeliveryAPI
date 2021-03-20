const express = require('express')
const clientController = require('./../controllers/client.controller')
const router = express.Router()


router.route('/')
.post(clientController.createClient)
.get(clientController.getClients)

module.exports = router