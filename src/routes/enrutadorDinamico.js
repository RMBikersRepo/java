const express = require('express');
const router = express.Router();
const fs = require('fs');
const PATH_ROUTH = __dirname;

const cleanFileName = (fileName) => {
    const clean = fileName.split('.').shift();
    return clean;
};

fs.readdirSync(PATH_ROUTH).filter(fileName => {
    const prefixRoute = cleanFileName(fileName);

    // Skip the enrutadorDinamico.js file to prevent it from being treated as a route
    if (prefixRoute !== "index" && prefixRoute !== "enrutadorDinamico") {
        console.log("Ruta: ", prefixRoute);  // Deberías ver "Ruta: producto" en consola
        try {
            const routeModule = require(`./${prefixRoute}.js`);
            // Check if routeModule is a valid router or middleware
            if (typeof routeModule === 'function' || routeModule instanceof express.Router) {
                router.use(`/${prefixRoute}`, routeModule);
            } else {
                console.error(`Invalid route module: ${prefixRoute}.js does not export a valid router.`);
            }
        } catch (err) {
            console.error(`Error loading route module for ${prefixRoute}: ${err.message}`);
        }
    }
});

module.exports = { router };
