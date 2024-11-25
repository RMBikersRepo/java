const socketIo = require('socket.io');
const { superEncriptador } = require('../service/superEncriptador/superEncriptador'); // Importar la función de encriptación

const setupSocket = (server) => {
    const io = socketIo(server); // Inicializa Socket.IO con el servidor

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado: ', socket.id);

        // Recibir mensaje del cliente
        socket.on('enviarMensaje', (data) => {
            console.log('Mensaje recibido del cliente:', data.mensaje);
            
            // Obtener el mensaje encriptado y los tokens léxicos
            const { mensajeEncriptado, tokens } = superEncriptador(data.mensaje);

            console.log('Mensaje encriptado:', mensajeEncriptado);  // Ver el mensaje encriptado
            console.log('Tokens generados:', tokens);  // Ver los tokens generados en la consola del servidor

            // Enviar el mensaje encriptado y los tokens al cliente
            socket.emit('mensajeEncriptado', { mensajeEncriptado, tokens });
        });

        // Manejar desconexión del cliente
        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });

    return io;
};

module.exports = setupSocket;
