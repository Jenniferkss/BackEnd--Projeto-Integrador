import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';
import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const imagemParaDataUrl = async (arquivo) => {
    const caminho = path.resolve(process.cwd(), 'fotos', arquivo);
    const extensao = path.extname(arquivo).toLowerCase();
    const mimeType =
        extensao === '.png' ? 'image/png' : extensao === '.webp' ? 'image/webp' : 'image/jpeg';

    const buffer = await fs.readFile(caminho);
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
};

async function limparDados() {
    await prisma.alternativa.deleteMany();
    await prisma.questao.deleteMany();
    await prisma.simulado.deleteMany();
    await prisma.review.deleteMany();
    await prisma.videoaula.deleteMany();
    await prisma.curiosidade.deleteMany();
    await prisma.dicaVestibular.deleteMany();
    await prisma.livro.deleteMany();
    await prisma.equipe.deleteMany();
}

async function main() {
    console.log('🌱 Limpando dados antigos...');
    await limparDados();

    console.log('📦 Inserindo novos registros...');

    const capaLivro = await imagemParaDataUrl('Capitaes da areia.jpg');
    const fotoAutor = await imagemParaDataUrl('memorias postumas de bras cubas.jpg');
    const fotoPersonagem1 = await imagemParaDataUrl('O guarani.jpg');
    const fotoPersonagem2 = await imagemParaDataUrl('olhosDagua.jpg');
    const fotoCuriosidade = await imagemParaDataUrl('vidas secas.jpg');

    await prisma.livro.create({
        data: {
            tituloPT: 'Quarto de despejo',
            tituloEN: 'Child of the Dark',
            capaURl: capaLivro,
            fotoAutor,
            autor: 'Carolina Maria de Jesus',
            anoPublicacao: 1960,
            generoPT: 'Diário, Autobiografia, Literatura Testemunhal',
            generoEN: ' Diary, Autobiography, Testimonial Literature',
            descricaoPT:
                'Narrado por Bentinho, o romance explora ciúmes, memória e ambiguidade na relação com Capitu, questionando a confiabilidade do narrador.',
            descricaoEN:
                "Narrated by Bentinho, the novel explores jealousy, memory, and ambiguity in his relationship with Capitu, questioning the narrator's reliability.",
            personagens: [
                'Bentinho (Dom Casmurro)',
                'Capitu',
                'Ezequiel',
                'José Dias',
                'Sancha',
                'Escobar',
            ],
            fotoPersonagens: [fotoPersonagem1, fotoPersonagem2],
            fotosCuriosidades: [fotoCuriosidade],
            descricaoPersonagensPT:
                'Bentinho é um homem inseguro e ciumento; Capitu possui olhos de ressaca e personalidade forte; Escobar é o amigo calculista e pragmático.',
            descricaoPersonagensEN:
                'Bentinho is an insecure and jealous man; Capitu has tide-like eyes and a strong personality; Escobar is the calculative and pragmatic friend.',
            contextoHistoricoPT:
                'Brasil do século XIX, Rio de Janeiro imperial, ascensão da burguesia e influências do Realismo europeu.',
            contextoHistoricoEN:
                '19th century Brazil, Imperial Rio de Janeiro, rise of the bourgeoisie, and influences of European Realism.',
            analisePT:
                'Obra-prima da ironia machadiana: o foco narrativo em primeira pessoa cria dúvida sobre a traição de Capitu, convidando o leitor a interpretar.',
            analiseEN:
                "A masterpiece of Machadian irony: the first-person narration casts doubt on Capitu's alleged betrayal, inviting reader interpretation.",
            reviews: {
                create: [
                    {
                        autor: 'Prof. Literatura',
                        comentarioPt:
                            'Leitura essencial para entender o Realismo no Brasil. A ambiguidade é genial.',
                        comentarioEn:
                            'Essential reading to understand Brazilian Realism. The ambiguity is brilliant.',
                        avaliacao: 5,
                    },
                    {
                        autor: 'Estudante Vestibular',
                        comentarioPt:
                            'Desafiador, mas recompensador. A narrativa não linear exige atenção.',
                        comentarioEn:
                            'Challenging but rewarding. The non-linear narrative demands attention.',
                        avaliacao: 4,
                    },
                ],
            },
            videoAulas: {
                create: [
                    {
                        tituloPt: 'Dom Casmurro: Narrador Confiável?',
                        tituloEn: 'Dom Casmurro: Is the Narrator Reliable?',
                        urlMidia: 'https://www.youtube.com/watch?v=exemplo1',
                        descricaoPt: 'Análise da focalização narrativa e recursos de ambiguidade.',
                        descricaoEn: 'Analysis of narrative focalization and ambiguity devices.',
                    },
                ],
            },
            curiosidades: {
                create: [
                    {
                        tituloPt: 'Título Enigmático',
                        tituloEn: 'Enigmatic Title',
                        conteudoPt:
                            '"Casmurro" significa teimoso, calado. Bentinho ganha o apelido pela postura reservada na velhice.',
                        conteudoEn:
                            '"Casmurro" means stubborn, taciturn. Bentinho earns the nickname for his reserved demeanor in old age.',
                    },
                ],
            },
            dicasVestibular: {
                create: [
                    {
                        tituloPt: 'Narrador em 1ª Pessoa',
                        tituloEn: 'First-Person Narrator',
                        conteudoPt:
                            'Lembre-se: Bentinho narra os fatos anos depois, com subjetividade. A "verdade" é relativa.',
                        conteudoEn:
                            'Remember: Bentinho narrates events years later, with subjectivity. The "truth" is relative.',
                    },
                ],
            },
            simulados: {
                create: [
                    {
                        tituloPt: 'Simulado Dom Casmurro - Vestibular',
                        tituloEn: 'Dom Casmurro Quiz - College Entrance Exam',
                        questoes: {
                            create: [
                                {
                                    perguntaPt:
                                        'Qual recurso narrativo é central para a ambiguidade em Dom Casmurro?',
                                    perguntaEn:
                                        'Which narrative device is central to the ambiguity in Dom Casmurro?',
                                    respostaCorretaPt: 'Narrador em primeira pessoa não confiável',
                                    respostaCorretaEn: 'Unreliable first-person narrator',
                                    explicacaoPt:
                                        'Bentinho controla a narrativa, omitindo e distorcendo fatos, o que gera dúvida sobre a traição de Capitu.',
                                    explicacaoEn:
                                        "Bentinho controls the narrative, omitting and distorting facts, which casts doubt on Capitu's alleged betrayal.",
                                    alternativas: {
                                        create: [
                                            {
                                                textoPt:
                                                    'Narrador em primeira pessoa não confiável',
                                                textoEn: 'Unreliable first-person narrator',
                                            },
                                            {
                                                textoPt: 'Narrador onisciente neutro',
                                                textoEn: 'Neutral omniscient narrator',
                                            },
                                            {
                                                textoPt: 'Múltiplos narradores em terceira pessoa',
                                                textoEn: 'Multiple third-person narrators',
                                            },
                                            {
                                                textoPt: 'Diário íntimo com datas cronológicas',
                                                textoEn: 'Intimate diary with chronological dates',
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    // 👥 Equipe de Desenvolvimento
    await prisma.equipe.create({
        data: {
            nome: 'Equipe de Desenvolvimento',
            curso: 'Tecnologia em Sistemas para Internet',
            objetivoPt:
                'Democratizar o acesso à análise literária de qualidade, unindo tecnologia e educação para preparar estudantes para vestibulares e ENEM.',
            objetivoEn:
                'Democratize access to quality literary analysis, combining technology and education to prepare students for college entrance exams.',
            fotoEquipe: [
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4tbcK-lYuDQM5fe7XyCB_x0ckDtrcSwuzQUo4W9Dawuky_7xhyH-rIWkj_LbHqERPoxxR5CugiaWa6uxsNd0Akkxyi1nQ73TXElBP8ttC8mnf8MopLd42ZtZeTyaruJU37D5yXOeaWDYxKxeJjngba0uy2Zakiclchxk-5IXK9KSEgV3rvcmywTUOADdYyiLLwnallVorIhvh8VyA3k7yk1qB88P_IYj84MiSqnifMh0MXQePYcyG-JYP3IdY24S0R7GMi2mRpyI458pv3kfaKaAGPnjX9qmHEu-HPDEJZM0WCrQdCiVwjLzRggXlUb6RQ=w1872-h970-rw',
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4toZBe53Xs0nmNJjBgDQdsghaYyrj9psCLJGFXvYNQNOStMPLpOLIzT6LezH-a6sbUNF-5DAvZPwjQRji5xiZeaHPaHJsT_VOhl-cKeesEfYQpjwNy8XlUAM4BoMwzQcEJmllzMRZEONgOtChEM7eJovWV5LffFEwTdle_VEdN83L8k5T79P8jFXC4OxP5g-uKcc0uJiVPVLG4iUADuslmqaS4HbJRpsYH_bXAUeQAKgDyrPCWB0n1A-reCkMvbEGiaiFmoJj7tgU5X9xblvmPF38yIKI72E4dc8PhRqHiQQPDmmHEZlBq0dtmeck8c00Y=w1872-h970-rw',
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4tEjzH2oWm0cl1n5CEXr_6uL_FB-sihgiMiCpMjHLncYuLpW5QlsNz-5_cLiZ9FCsO32e3zlXrzh0verJ6-VOV2nbnhJVnBJ3zVBaRF5FpTYrKnpA1V7-1MtyV_EhhOhehnk09mkZOSDHJWLrUXqLpd9GixVb4PZ8bXjWL5ebgQMAOOBGPwyCTOnXgNtLKhk1JCWY5Ob96F1Qpq_d4nSFL5WFOK-78VZ4a1EYn0wytsyZcntzmwZcveu3wWi-uTdTpaeghxRTEKwtAt-7F7rpbQSWrvwrV-3fozh9JHFSOMYWhV-xakDFrB2N6UPme20eg=w1872-h970-rw',
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4stBs0Dur8uK2GeRMMCDIicjZBdI8w0lZ2WUfnLl9hu7l4d9R9bj7MQVDAEEvBGXB2Pvc7GdyNBhGX_29kWsHMjoyp6UOWXkE8GWJqrOEkgNzjI4Qvj7RVZOEiweQhDMv8dwsrGDRmcCjm7vva7ZklJXFHCYFKcKYSPqf1-C0kvbBn2tfWjhJFCuhuChQO2jUFn6b8vGIXe7EtohPKfuIm5r69bcDzLz1ck3-fDot1YJJ8CtphfuUEaG2_EPU42vtnmT5iaIvrFz3rbZVzi2Q9lsl_2zw6caL7rQzIE-k9PuwiTgt-qPx-0lNQVXtqkkAg=w1872-h970-rw',
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4vDyGdae2MmUhjzuIFa-I_7ATgLjE1nLIDHdY6tVLxYOJFr1nTYYNNI8mTLH4vriImKUH88NrU1nXv3skwAjQ0Hf1Mpj-LSj9jX4ydn9ftmpzSwaXo5hEOazsBCGg7sOqEt8jGTcN7aFPtmnvDt1BoTAJ-xa4cQ33HaPIGeKAHO1TV52IxooxI8FK8EMTWOI4npaav3BX9tLh1-tF2Mr1-IHyp1M4H4ejUqt96YCAR5Hd1GgixrLX3DmhgbxZJ-7Fcvb93KhICoG_EZcMjlMyZWXlpqcCbGzv-DnMGEL9052jtHgKurvvvYL02j7dzVQHo=w1872-h970-rw',
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4uxD8yzh3lnuOBfg8VsWHDv-aXVcjgk4n_74G3EBeqXSGvlKjcOey9jVq6TCqHwcy9-wfqWfW6cahnZd0DNLrC0YVUhhe-KsXt5rJpDdUU_ATxDx0kWCcjZbSpwEY-9BHYhWzeZzQ4eivzvQcjyUES23gNVAWMybQQMVcnTf0_mtgVuTmS6zRQ9zcc3A6YkqG6H6zKDt7ie_ktR-W_wOQDEOzr6yvz4FvPEuVJ-n1x7u-UrN5hKXoTzg1PFUs8PFLbaj7h53-iwgDApBHlRG7TbLOxzDG650PNUxPkfM7DanzAnzvyAEsXd_9XZRfxh8hs=w1872-h970-rw',
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4see_tqRt8m5sY2abBS1FtqMOOdDyuoVJgWxvs9zx-iIAgOHMQm21r6zNSeY3sBShXfFlT-ZA56wFlVkdc6-WEo3i1PBxRPlRLzc794l-c1AxwyE60p47PdCtN-kGHwbVKY4bHY4sajJ2gTdBBe53iXwe10L6HjFCAZmJhPtU8IpwLaQFQQ9_ZwduA0tLDGOPFSmXGFF_f_vNcit-6ZXZkaWKeqBNlAbTehW-zT5ANlcZd_HFX3aEP_PnEeFoCOpCMkKnhOeL5yXGTfVeohv7Si-Inuc8Rh6QuKWXl_Sf258N4ZulAqf6QSIZfOoHbc8wY=w1872-h970-rw',
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4uzrBq3E0jy4GlbWqbelWoNnEpAlvhicEaPQP73HPpmHPZ_zEB3GMeCBNJIu_dV207wNWEJmBhsJ4bjV9cWwY6WL85IJTdmKlQ9srr9wvDwYFJDNs6A69bR93LQ-08I_rMu6HiKCSRwcPx5mD01eLjgz-_VAQkrcO56qjzmYtQM2v_JBoooUuwFSy0Civa6rqSb9WkFLpRkzkHdGxnRTpBvRnKajxRsXtKhHK0fCO2Qy5yJIJfyntxQinWCiN_haFBwcehL-nT-NIjee2N08PIevTUJZDP6LpdMD8cNM2TR9_p9YXbhmtloXI0ADp2-xBU=w1872-h970-rw',
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4vwp9n7rJ7gJMDW-J6jhLRojfBhLbpD8VYmvu0wBPkAh-A8G_wy-7ipMKPoZ7YAY06hMo3fF0INwhxL4xO33BuEP_SBCbgaAVO_f8nBaB0xF_zfQuiaa0gOaO66o7KZNImg4-fZ6ZXDJoxfK8dugrDpJWWJsnO5ywwChmY2ygWS33ec0Qzob_hPv7VzV3o9V8TOc5nsyJbTn8cvn9wjU3htQtKuhYyz8aSJPwrUeaHcT1AOurAXeztUY9QQUzCk_Okvzao-auXvK0_2c-DNQcN6mxdf0QShVyBOJ_6SYhgQuFx3ndjLad6RDiZsVRXaY10=w1872-h970-rw',
                'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4v1QAPldE2RIFewX5BDkesbO_8qiHk0E2o2V0vDtxQN7TeqhYvnci1NEbQgpV5JZyeXUczMWsB9aNOlIkmO4VMeIa7wGbDz0ZKLpiuN3QVjWDdXx5BRrXJQNi_1M0_Tl6ceJk17J-yK8LHawF7Ty9jev4kQpKvaF3uYw9o3-pWJ79mBtqnWhxAimcCazdlWSgXGmmyR_H2V9bVPdomFSNVK_ZIjz8Ugv7efAFV2rzR8l3SzF1S6txWm1HwTQHQhVf1q33fG1t6HbvK3IaW2O1k_REplTViwqJ3tmJqYUORlzHHa6yZjEhEvfUIp_3tbMvY=w1872-h970-rw',
            ],
        },
    });

    console.log('✅ Seed concluído com sucesso!');
    console.log(`📚 Livros inseridos: 1`);
    console.log(`👥 Equipe inserida: 1`);
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
        console.log('🔌 Conexões encerradas.');
    });
