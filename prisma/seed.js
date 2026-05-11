// seed.js
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';
import 'dotenv/config';
import pg from 'pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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

    // 📚 Livro: Dom Casmurro
    await prisma.livro.create({
        data: {
            tituloPT: 'Dom Casmurro',
            tituloEN: 'Dom Casmurro',
            capaURl: 'https://exemplo.com/capa-dom-casmurro.jpg',
            autor: 'Machado de Assis',
            anoPublicacao: 1899,
            generoPT: 'Romance, Realismo Brasileiro',
            generoEN: 'Novel, Brazilian Realism',
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
                    {
                        tituloPt: 'Capitu: Vítima ou Vilã?',
                        tituloEn: 'Capitu: Victim or Villain?',
                        urlMidia: 'https://www.youtube.com/watch?v=exemplo2',
                        descricaoPt: 'Debate sobre a construção da personagem feminina no romance.',
                        descricaoEn:
                            'Discussion on the construction of the female character in the novel.',
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
                    {
                        tituloPt: 'Olhos de Ressaca',
                        tituloEn: 'Tide-like Eyes',
                        conteudoPt:
                            'A famosa metáfora "olhos de ressaca" para descrever Capitu é uma das mais estudadas da literatura brasileira.',
                        conteudoEn:
                            'The famous metaphor "tide-like eyes" to describe Capitu is one of the most studied in Brazilian literature.',
                    },
                ],
            },
            dicasVestibular: {
                create: [
                    {
                        tituloPt: 'Foco na Ironia',
                        tituloEn: 'Focus on Irony',
                        conteudoPt:
                            'Machado usa ironia fina. Questões frequentemente cobram interpretação de duplo sentido.',
                        conteudoEn:
                            'Machado uses subtle irony. Exam questions often test interpretation of double meanings.',
                    },
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
                                {
                                    perguntaPt:
                                        'O que simboliza o "seminário" na formação de Bentinho?',
                                    perguntaEn:
                                        'What does the "seminary" symbolize in Bentinho\'s upbringing?',
                                    respostaCorretaPt:
                                        'Repressão e conflito entre vocação e desejo',
                                    respostaCorretaEn:
                                        'Repression and conflict between vocation and desire',
                                    explicacaoPt:
                                        'O seminário representa a imposição familiar e social que entra em choque com os desejos pessoais de Bentinho.',
                                    explicacaoEn:
                                        "The seminary represents family and social imposition that clashes with Bentinho's personal desires.",
                                    alternativas: {
                                        create: [
                                            {
                                                textoPt:
                                                    'Repressão e conflito entre vocação e desejo',
                                                textoEn:
                                                    'Repression and conflict between vocation and desire',
                                            },
                                            {
                                                textoPt: 'Liberdade intelectual e espiritual',
                                                textoEn: 'Intellectual and spiritual freedom',
                                            },
                                            {
                                                textoPt: 'Ambiente de amizade e aprendizado',
                                                textoEn: 'Environment of friendship and learning',
                                            },
                                            {
                                                textoPt: 'Preparação para liderança política',
                                                textoEn: 'Preparation for political leadership',
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
        },
    });

    console.log('✅ Seed concluído com sucesso!');
    console.log(`📚 Livro inserido: Dom Casmurro`);
    console.log(`🎥 Videoaulas: 2`);
    console.log(`💡 Curiosidades: 2`);
    console.log(`🎯 Dicas Vestibular: 2`);
    console.log(`❓ Questões no simulado: 2`);
    console.log(`⭐ Reviews: 2`);
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
