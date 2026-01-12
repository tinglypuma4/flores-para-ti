const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(__dirname));

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

// Aquí puedes agregar más cartas fácilmente:
// app.get('/mes-4', (req, res) => {
//     res.sendFile(path.join(__dirname, 'aniversario-4-meses.html'));
// });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`\nRutas disponibles:`);
    console.log(`  - http://localhost:${PORT}/          (Menú principal)`);
    console.log(`  - http://localhost:${PORT}/mes-2     (Carta 2 meses)`);
    console.log(`  - http://localhost:${PORT}/mes-3     (Carta 3 meses)`);
});