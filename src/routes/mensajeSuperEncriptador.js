const express = require('express');
const router = express.Router();
const {superEncriptador} = require('../service/superEncriptador/superEncriptador'); // Assuming getTopic is a function
const {superDesencriptador} = require('../service/superDesencriptador/superDesencriptador'); // Assuming getTopic is a function

// Define your routes
router.post("/envioMensaje", superEncriptador);  // This will work if getTopic is a function
router.post("/reciboMensaje", superDesencriptador);
module.exports = router;  // Ensure this is exporting the router
