// service/superDesencriptador/superDesencriptador.js

const superDesencriptador = (req, res) => {
    const { mensajeEncriptado } = req.body;

    if (!mensajeEncriptado) {
        return res.status(400).json({ error: 'Se debe enviar un mensaje encriptado en el cuerpo de la solicitud' });
    }

    console.log('Mensaje encriptado recibido:', mensajeEncriptado);  // Mostrar el mensaje encriptado recibido

    let mensajeDesencriptado = '';
    const desplazamiento = 3; // Desplazamiento para el cifrado César

    // Recorrer cada carácter del texto encriptado
    for (let i = 0; i < mensajeEncriptado.length; i++) {
        let char = mensajeEncriptado.charCodeAt(i);

        if (char >= 65 && char <= 90) {
            char = ((char - 65 - desplazamiento + 26) % 26) + 65;
        } else if (char >= 97 && char <= 122) {
            char = ((char - 97 - desplazamiento + 26) % 26) + 97;
        }

        mensajeDesencriptado += String.fromCharCode(char);
    }

    console.log('Desencriptando mensaje...');  // Imprimir cuando estamos desencriptando
    console.log('Mensaje desencriptado:', mensajeDesencriptado);  // Mostrar el mensaje desencriptado

    return res.status(200).json({ mensajeDesencriptado });
};

module.exports = { superDesencriptador };
