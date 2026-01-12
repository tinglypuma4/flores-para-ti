const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta principal - Menú de cartas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rutas para las cartas individuales
app.get('/mes-2', (req, res) => {
    res.sendFile(path.join(__dirname, 'aniversario-2-meses.html'));
});

app.get('/mes-3', (req, res) => {
    res.sendFile(path.join(__dirname, 'aniversario-3-meses.html'));
});

// Servir archivos estáticos (DESPUÉS de las rutas específicas)
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});