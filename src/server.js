import 'dotenv/config';
import express from 'express';
import livroRoutes from './routes/LivroRoute.js';
import alternativaRoutes from './routes/alternativaRoute.js';
import curiosidadeRoutes from './routes/curiosidadeRoute.js';
import dicaVestibularRoutes from './routes/dicaVestibularRoute.js';
import equipeRoutes from './routes/equipeRoute.js';
import questaoRoutes from './routes/questaoRoute.js';
import reviewsRoutes from './routes/reviewsRoute.js';
import simuladoRoutes from './routes/simuladoRoute.js';
import videoAulaRoutes from './routes/videoAulaRoute.js';
import arquivoEquipeRoutes from './routes/arquivoEquipeRoute.js';
import arquivoLivroRoutes from './routes/arquivoLivroRoute.js';

import fotoEquipeRoutes from './routes/fotoEquipeRoute.js';
import fotoLivroRoutes from './routes/fotoLivroRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});
//rotas de fotos
app.use('/api/foto-equipe', fotoEquipeRoutes);
app.use('/api/foto-livro', fotoLivroRoutes);
app.use('/api/foto-autor', arquivoLivroRoutes);
app.use('/api/arquivo-equipe', arquivoEquipeRoutes);


// Rotas
app.use('/api/livro', livroRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/equipe', equipeRoutes);
app.use('/api/videoaula', videoAulaRoutes);
app.use('/api/curiosidade', curiosidadeRoutes);
app.use('/api/dica-vestibular', dicaVestibularRoutes);
app.use('/api/simulado', simuladoRoutes);
app.use('/api/questao', questaoRoutes);
app.use('/api/alternativa', alternativaRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
