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

    // 📚 Livro 1: Dom Casmurro
    await prisma.livro.create({
        data: {
            tituloPT: 'Dom Casmurro',
            tituloEN: 'Dom Casmurro',
            capaURl: 'https://exemplo.com/capa-dom-casmurro.jpg',
            fotoAutor: 'https://exemplo.com/machado-de-assis.jpg',
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

    // 📚 Livro 2: Memórias Póstumas de Brás Cubas
    await prisma.livro.create({
        data: {
            tituloPT: 'Memórias Póstumas de Brás Cubas',
            tituloEN: 'The Posthumous Memoirs of Brás Cubas',
            capaURl: 'https://exemplo.com/capa-bras-cubas.jpg',
            fotoAutor: 'https://exemplo.com/machado-de-assis.jpg',
            autor: 'Machado de Assis',
            anoPublicacao: 1881,
            generoPT: 'Romance, Realismo, Sátira',
            generoEN: 'Novel, Realism, Satire',
            descricaoPT:
                'Um defunto-autor decide escrever sua autobiografia a partir do além, revisitando suas falhas, amores frustrados e o vazio de sua existência com extrema ironia.',
            descricaoEN:
                'A deceased author decides to write his autobiography from beyond the grave, revisiting his failures, frustrated loves, and the emptiness of his existence with extreme irony.',
            personagens: ['Brás Cubas', 'Virgília', 'Marcela', 'Quincas Borba', 'Lobo Neves'],
            descricaoPersonagensPT:
                'Brás Cubas é o defunto-autor burguês e medíocre; Virgília é seu grande amor e amante; Quincas Borba é o filósofo louco criador do Humanitismo.',
            descricaoPersonagensEN:
                'Brás Cubas is the mediocre, bourgeois deceased author; Virgília is his great love and mistress; Quincas Borba is the mad philosopher who created Humanitidom.',
            contextoHistoricoPT:
                'Brasil do século XIX, transição econômica, sociedade escravocrata e hipocrisia das elites aristocráticas.',
            contextoHistoricoEN:
                '19th century Brazil, economic transition, slave-owning society, and the hypocrisy of aristocratic elites.',
            analisePT:
                'Inaugura o Realismo no Brasil. Destaca-se pelo uso de metalinguagem, pessimismo, ironia ácida e uma estrutura fragmentada totalmente inovadora para a época.',
            analiseEN:
                'Marks the beginning of Realism in Brazil. It stands out for its use of metalanguage, pessimism, sharp irony, and a fragmented structure completely innovative for its time.',
            reviews: {
                create: [
                    {
                        autor: 'Crítico Literário',
                        comentarioPt:
                            'Uma das maiores obras da literatura mundial. O conceito de defunto-autor é revolucionário.',
                        comentarioEn:
                            'One of the greatest works in world literature. The concept of a deceased author is revolutionary.',
                        avaliacao: 5,
                    },
                ],
            },
            videoAulas: {
                create: [
                    {
                        tituloPt: 'Introdução ao Realismo com Brás Cubas',
                        tituloEn: 'Introduction to Realism with Brás Cubas',
                        urlMidia: 'https://www.youtube.com/watch?v=exemplo3',
                        descricaoPt: 'Análise de como Machado quebra as convenções românticas.',
                        descricaoEn: 'Analysis of how Machado breaks romantic conventions.',
                    },
                ],
            },
            curiosidades: {
                create: [
                    {
                        tituloPt: 'Defunto Autor vs. Autor Defunto',
                        tituloEn: 'Deceased Author vs. Author Deceased',
                        conteudoPt:
                            'Brás Cubas deixa claro: ele não é um escritor que morreu, mas um homem que morreu e, no além, decidiu escrever.',
                        conteudoEn:
                            'Brás Cubas makes it clear: he is not a writer who died, but a man who died and, in the afterlife, decided to write.',
                    },
                ],
            },
            dicasVestibular: {
                create: [
                    {
                        tituloPt: 'Volatilidade do Narrador',
                        tituloEn: 'Narrator Volatility',
                        conteudoPt:
                            'Brás Cubas altera a ordem dos capítulos e conversa direto com o leitor. Fique atento às quebras de narrativa nas provas.',
                        conteudoEn:
                            'Brás Cubas alters chapter order and speaks directly to the reader. Watch out for narrative breaks in exams.',
                    },
                ],
            },
            simulados: {
                create: [
                    {
                        tituloPt: 'Simulado Brás Cubas - Unicamp',
                        tituloEn: 'Brás Cubas Quiz - Unicamp',
                        questoes: {
                            create: [
                                {
                                    perguntaPt:
                                        'Como se chama a filosofia satírica criada por Quincas Borba no livro?',
                                    perguntaEn:
                                        'What is the name of the satirical philosophy created by Quincas Borba in the book?',
                                    respostaCorretaPt: 'Humanitismo',
                                    respostaCorretaEn: 'Humanitidom',
                                    explicacaoPt:
                                        'O Humanitismo é uma paródia das filosofias cientificistas do século XIX, resumida pela famosa frase: "Ao vencido, ódio ou compaixão; ao vencedor, as batatas".',
                                    explicacaoEn:
                                        'Humanitidom is a parody of 19th-century scientistic philosophies, summarized by the famous phrase: "To the victor, the potatoes".',
                                    alternativas: {
                                        create: [
                                            { textoPt: 'Humanitismo', textoEn: 'Humanitidom' },
                                            { textoPt: 'Positivismo', textoEn: 'Positivism' },
                                            { textoPt: 'Determinismo', textoEn: 'Determinism' },
                                            {
                                                textoPt: 'Existencialismo',
                                                textoEn: 'Existentialism',
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
            fotoEquipe: 'https://exemplo.com/foto-equipe.jpg',
        },
    });

    console.log('✅ Seed concluído com sucesso!');
    console.log(`📚 Livros inseridos: 2`);
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
