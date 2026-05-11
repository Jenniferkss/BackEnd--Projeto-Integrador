import 'dotenv/config'
const autenticar = (req, res, next) => {
    const key = req.headers['x-api-key'];

    if (!key || key !== process.env.API_KEY) {
        return res.status(401).json({ error: 'API key invalida ou ausente' });
    }

    next();
};

export default autenticar
