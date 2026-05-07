import fs from 'fs';
import htmlPdf from 'html-pdf-node';

const montarImagem = (foto) => {
    if (!foto) {
        return '-';
    }

    if (fs.existsSync(foto)) {
        const base64 = fs.readFileSync(foto).toString('base64');
        return `<img src="data:image/jpeg;base64,${base64}" width="120" />`;
    }

    return `<span>${foto}</span>`;
};

export async function gerarPdfLivro(livro) {
    const personagens =
        Array.isArray(livro.personagens) && livro.personagens.length > 0
            ? livro.personagens.join(', ')
            : '-';

    const html = `
    <html>
    <body>
        <h1>Relatório do Livro</h1>
        <p>Capa: ${montarImagem(livro.capaURl)}</p>
        <p>Título PT: ${livro.tituloPT || '-'}</p>
        <p>Título EN: ${livro.tituloEN || '-'}</p>
        <p>Autor: ${livro.autor || '-'}</p>
        <p>Ano de publicação: ${livro.anoPublicacao || '-'}</p>
        <p>Gênero PT: ${livro.generoPT || '-'}</p>
        <p>Gênero EN: ${livro.generoEN || '-'}</p>
        <p>Resumo PT: ${livro.descricaoPT || '-'}</p>
        <p>Resumo EN: ${livro.descricaoEN || '-'}</p>
        <p>Personagens: ${personagens}</p>
        <p>Contexto PT: ${livro.contextoHistoricoPT || '-'}</p>
        <p>Contexto EN: ${livro.contextoHistoricoEN || '-'}</p>
        <p>Análise PT: ${livro.analisePT || '-'}</p>
        <p>Análise EN: ${livro.analiseEN || '-'}</p>
    </body>
    </html>
    `;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}

export async function gerarPdfLivros(livros) {
    const linhas = livros
        .map(
            (livro) => `
        <tr>
            <td>${livro.tituloPT || '-'}</td>
            <td>${livro.autor || '-'}</td>
            <td>${livro.anoPublicacao || '-'}</td>
            <td>${livro.generoPT || '-'}</td>
            <td>${livro.descricaoPT || '-'}</td>
        </tr>`
        )
        .join('');

    const html = `
    <html>
    <body>
        <h1 style="text-align: center;">Biblioteca de Livros</h1>
        <table border="1" cellspacing="0" cellpadding="8" style="width: 100%; border-collapse: collapse;">
            <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano</th>
                <th>Gênero</th>
                <th>Resumo</th>
            </tr>
            ${linhas}
        </table>
        <p>Total de livros: ${livros.length}</p>
    </body>
    </html>
    `;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}
