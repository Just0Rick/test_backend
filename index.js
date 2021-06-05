const fs = require('fs');

const express = require('express');
const app = express();

const PORT = 2012

app.get("/obtenerPuntuaciones", (req, res, next)=>{
    fs.readFile('./datos.json', 'utf8', (err, data)=>{
        if(err){
            res.json({
                error: true,
                mensajeError: "No se encontró el origen de datos"
            });
            return res.end();
        } 
        let datos = JSON.parse(data);
        let respuesta = {
            error: false,
            datos
        };
        res.status(200).json(respuesta);
        res.end();
    });
});

app.post("/ingresarPuntuacionNueva", (req, res, next)=>{
    if(!req.body.Serie){
        res.json({
            error: true,
            mensajeError: "El objeto no tiene el formato correcto."
        });
        return res.end();
    }
    fs.readFile('./datos.json', 'utf8', (err, data)=>{
        if(err){
            res.json({
                error: true,
                mensajeError: "No se encontró el origen de datos"
            });
            return res.end();
        } 
        let datos = JSON.parse(data);
        datos.push(req.body);
        let respuesta = {
            error: false,
            datos
        };
        res.status(200).json(respuesta);
        res.end();
    });
});

app.use((req, res, next) =>{
    res.status(404).json({
        error: true,
        mensajeError: "La ruta solicitada no es correcta"
    });
    res.end();
});

app.listen(PORT, () => console.log(`Escuchando en localhost:${PORT}`));