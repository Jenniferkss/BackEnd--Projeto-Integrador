import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

const carregarEnv = () => {
    const envPath = path.resolve(process.cwd(), '.env');

    if (!fs.existsSync(envPath)) {
        return;
    }

    const conteudo = fs.readFileSync(envPath, 'utf8');

    for (const linha of conteudo.split(/\r?\n/)) {
        const texto = linha.trim();

        if (!texto || texto.startsWith('#')) {
            continue;
        }

        const separador = texto.indexOf('=');

        if (separador === -1) {
            continue;
        }

        const chave = texto.slice(0, separador).trim();
        let valor = texto.slice(separador + 1).trim();

        if (
            (valor.startsWith('"') && valor.endsWith('"')) ||
            (valor.startsWith("'") && valor.endsWith("'"))
        ) {
            valor = valor.slice(1, -1);
        }

        if (process.env[chave] === undefined) {
            process.env[chave] = valor;
        }
    }
};

carregarEnv();

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'node prisma/seed.js',
    },
    datasource: {
        url: process.env['DIRECT_URL'],
    },
});
