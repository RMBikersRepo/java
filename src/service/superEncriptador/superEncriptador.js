// Función que genera los tokens del proceso de encriptación
const superEncriptar = (texto) => {
    let mensajeEncriptado = '';
    const desplazamiento = 3;  // Desplazamiento para el cifrado César
    const tokens = [];         // Array que contiene los tokens generados

    // Recorrer cada carácter del texto original
    for (let i = 0; i < texto.length; i++) {
        let char = texto.charCodeAt(i); // Obtener el código del carácter original

        // Crear un token para cada carácter antes de transformarlo
        tokens.push({ tipo: 'VAR', valor: String.fromCharCode(char) });  // Token para la variable original

        // Verificación para aplicar el desplazamiento solo a letras (mayúsculas o minúsculas)
        if (char >= 65 && char <= 90) { // Letras mayúsculas (A-Z)
            // Desglosamos el cálculo de la operación en tokens
            tokens.push({ tipo: 'OPERADOR', valor: `(char - 65)` });
            tokens.push({ tipo: 'OPERADOR', valor: `+ ${desplazamiento}` });
            tokens.push({ tipo: 'OPERADOR', valor: `% 26` });
            tokens.push({ tipo: 'OPERADOR', valor: `+ 65` });

            // Cálculo del nuevo carácter
            char = ((char - 65 + desplazamiento) % 26) + 65;
            tokens.push({ tipo: 'RESULTADO', valor: String.fromCharCode(char) });  // Resultado de la operación
        } else if (char >= 97 && char <= 122) { // Letras minúsculas (a-z)
            // Desglosamos el cálculo de la operación en tokens
            tokens.push({ tipo: 'OPERADOR', valor: `(char - 97)` });
            tokens.push({ tipo: 'OPERADOR', valor: `+ ${desplazamiento}` });
            tokens.push({ tipo: 'OPERADOR', valor: `% 26` });
            tokens.push({ tipo: 'OPERADOR', valor: `+ 97` });

            // Cálculo del nuevo carácter
            char = ((char - 97 + desplazamiento) % 26) + 97;
            tokens.push({ tipo: 'RESULTADO', valor: String.fromCharCode(char) });  // Resultado de la operación
        } else {
            // Para caracteres no alfabéticos, no se encriptan
            tokens.push({ tipo: 'NO_ENCRIPTADO', valor: String.fromCharCode(char) });
        }

        // Agregar el carácter encriptado al mensaje final
        mensajeEncriptado += String.fromCharCode(char);
    }

    // Retornar tanto el mensaje encriptado como los tokens generados
    return { mensajeEncriptado, tokens };
};

// Esta es la función que se usará para procesar el mensaje
const superEncriptador = (mensaje) => {
    if (!mensaje) {
        throw new Error('Se debe enviar un mensaje para encriptar');
    }

    // Encriptar el mensaje y obtener los tokens
    return superEncriptar(mensaje);
};

module.exports = { superEncriptador };
