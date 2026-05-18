import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import livroRoutes from './routes/LivroRoute.js';
import alternativaRoutes from './routes/alternativaRoute.js';
import arquivoEquipeRoutes from './routes/arquivoEquipeRoute.js';
import arquivoLivroRoutes from './routes/arquivoLivroRoute.js';
import curiosidadeRoutes from './routes/curiosidadeRoute.js';
import dicaVestibularRoutes from './routes/dicaVestibularRoute.js';
import equipeRoutes from './routes/equipeRoute.js';
import questaoRoutes from './routes/questaoRoute.js';
import reviewsRoutes from './routes/reviewsRoute.js';
import simuladoRoutes from './routes/simuladoRoute.js';
import videoAulaRoutes from './routes/videoAulaRoute.js';
import fotoEquipeRoutes from './routes/fotoEquipeRoute.js';
import fotoLivroRoutes from './routes/fotoLivroRoute.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://backend-projeto-integrador-rana.onrender.com',
    process.env.FRONTEND_URL,
].filter(Boolean);

// ✅ CORS antes de tudo
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('Origem bloqueada pelo CORS'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    })
);

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas de fotos e arquivos
app.use('/api/foto-equipe', fotoEquipeRoutes);
app.use('/api/foto-livro', fotoLivroRoutes);
app.use('/api/foto-autor', arquivoLivroRoutes);
app.use('/api/arquivo-equipe', arquivoEquipeRoutes);

// Rotas principais
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