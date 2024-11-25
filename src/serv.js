// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const app = express();
const { router } = require('./routes/enrutadorDinamico');
const setupSocket = require('./socket/sockets');
const compression = require('compression');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configuración para usar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Establecer la carpeta 'views' para los archivos EJS

// Usar el enrutador dinámico para las rutas tradicionales
app.use("/", router);

// Crear el servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO con el servidor HTTP
setupSocket(server);

// Ruta principal para renderizar la vista
app.get('/', (req, res) => {
    res.render('index'); // Renderiza el archivo 'index.ejs' desde la carpeta 'views'
});

// Iniciar el servidor en el puerto 3035
const PORT = process.env.PORT || 3035;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
