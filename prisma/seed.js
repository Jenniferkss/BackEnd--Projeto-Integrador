import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela exemplo...');

    // Remove todos os registros
    // await prisma.exemplo.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.livro.create({
        data: {
            tituloPT: 'Quarto de Despejo: Diário de uma Favelada',
            tituloEN: 'Child of the Dark: The Diary of Carolina Maria de Jesus',
            capaURl: 'https://exemplo.com/capa-quarto-despejo.jpg',
            autor: 'Carolina Maria de Jesus',
            anoPublicacao: 1960,
            generoPT: 'Autobiografia, Literatura Testemunhal',
            generoEN: 'Autobiography, Testimonial Literature',
            descricaoPT: 'O diário de Carolina Maria de Jesus relata o cotidiano de miséria, fome e sobrevivência na favela do Canindé, em São Paulo.',
            descricaoEN: 'The diary of Carolina Maria de Jesus reports the daily life of misery, hunger, and survival in the Canindé favela, in São Paulo.',
            personagens: ['Carolina', 'João José', 'José Carlos', 'Vera Eunice'],
            contextoHistoricoPT: 'Brasil dos anos 50, urbanização acelerada e a marginalização das populações periféricas.',
            contextoHistoricoEN: '1950s Brazil, rapid urbanization, and the marginalization of peripheral populations.',
            analisePT: 'A obra utiliza uma linguagem crua para denunciar a estrutura social brasileira e a personificação da fome.',
            analiseEN: 'The work uses raw language to denounce the Brazilian social structure and the personification of hunger.',

            // Relacionamentos 1:N
            reviews: {
                create: [
                    {
                        autor: 'Leitor Atento',
                        comentarioPt: 'Uma leitura necessária e transformadora.',
                        comentarioEn: 'A necessary and transformative read.',
                        avaliacao: 5
                    }
                ]
            },
            videoAulas: {
                create: [
                    {
                        tituloPt: 'Análise Completa: Quarto de Despejo',
                        tituloEn: 'Full Analysis: Child of the Dark',
                        urlMidia: 'https://www.youtube.com/watch?v=exemplo',
                        descricaoPt: 'Aula focada em aspectos sociais e literários.',
                        descricaoEn: 'Class focused on social and literary aspects.'
                    }
                ]
            },
            curiosidades: {
                create: [
                    {
                        tituloPt: 'Manuscritos',
                        tituloEn: 'Manuscripts',
                        conteudoPt: 'Carolina escrevia em cadernos encontrados no lixo.',
                        conteudoEn: 'Carolina wrote in notebooks found in the trash.'
                    }
                ]
            },
            dicasVestibular: {
                create: [
                    {
                        tituloPt: 'Foco na Variação Linguística',
                        tituloEn: 'Focus on Linguistic Variation',
                        conteudoPt: 'Observe o uso da linguagem como forma de identidade e denúncia.',
                        conteudoEn: 'Observe the use of language as a form of identity and denunciation.'
                    }
                ]
            },
            simulados: {
                create: [
                    {
                        tituloPt: 'Simulado Carolina Maria de Jesus',
                        tituloEn: 'Carolina Maria de Jesus Quiz',
                        questoes: {
                            create: [
                                {
                                    perguntaPt: 'Qual o papel da "Fome" na narrativa?',
                                    perguntaEn: 'What is the role of "Hunger" in the narrative?',
                                    respostaCorretaPt: 'Personagem antagonista',
                                    respostaCorretaEn: 'Antagonist character',
                                    explicacaoPt: 'A fome é descrita quase como um ser vivo que persegue a autora.',
                                    explicacaoEn: 'Hunger is described almost as a living being that haunts the author.',
                                    alternativas: {
                                        create: [
                                            { textoPt: 'Personagem antagonista', textoEn: 'Antagonist character' },
                                            { textoPt: 'Apenas um detalhe', textoEn: 'Just a detail' },
                                            { textoPt: 'Um mito', textoEn: 'A myth' }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    });

    // Inserção da Equipe
    await prisma.equipe.create({
        data: {
            nome: 'Equipe de Desenvolvimento',
            curso: 'Tecnologia em Sistemas',
            objetivoPt: 'Facilitar o estudo literário.',
            objetivoEn: 'Facilitating literary study.'
        }
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end(); // Importante fechar o pool de conexões
    });

    console.log('✅ Seed concluído!');

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
