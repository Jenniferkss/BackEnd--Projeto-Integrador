import 'dotenv/config';
import express from 'express';
import livroRoutes from './routes/LivroRoute.js';
import equipeRoutes from './routes/equipeRoute.js';
import reviewsRoutes from './routes/reviewsRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/livro', livroRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/equipe', equipeRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
