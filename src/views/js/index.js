let url;
const sendData = async(mensaje) =>{
    url = 'localhost:3035/mensajeSuperEncriptado/envioMensaje';

    const setMensajePaEncriptar = fecth(url => {
        "mensaje": mensaje,
    });
}