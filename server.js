const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Detectar automáticamente los archivos de cartas existentes
function getCartas() {
    const files = fs.readdirSync(__dirname);
    const meses = [];
    files.forEach(file => {
        const match = file.match(/^aniversario-(\d+)-meses\.html$/);
        if (match) {
            meses.push(parseInt(match[1]));
        }
    });
    return meses.sort((a, b) => a - b);
}

// API: devuelve la lista de meses disponibles
app.get('/api/cartas', (req, res) => {
    res.json(getCartas());
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta dinámica para cualquier carta por número de mes
app.get('/mes-:numero', (req, res) => {
    const numero = parseInt(req.params.numero);
    if (isNaN(numero)) return res.status(400).send('Número de mes inválido');

    const filename = `aniversario-${numero}-meses.html`;
    const filepath = path.join(__dirname, filename);

    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).send('Carta no encontrada');
    }
});

// Servir archivos estáticos (DESPUÉS de las rutas específicas)
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Cartas disponibles: meses ${getCartas().join(', ')}`);
});
