import { PrismaPg } from '@prisma/adapter-pg'
import pkg from '@prisma/client'
import 'dotenv/config'
import pg from 'pg'

const { PrismaClient } = pkg

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })


async function limparDados() {
  console.log('🧹 Limpando dados antigos...')
  await prisma.alternativa.deleteMany()
  await prisma.questao.deleteMany()
  await prisma.simulado.deleteMany()
  await prisma.review.deleteMany()
  await prisma.videoaula.deleteMany()
  await prisma.curiosidade.deleteMany()
  await prisma.dicaVestibular.deleteMany()
  await prisma.livro.deleteMany()
  await prisma.equipe.deleteMany()
}

async function main() {
  await limparDados()

  console.log('📚 Inserindo Livro: Quarto de Despejo...')

  const livro = await prisma.livro.create({
    data: {
      tituloPT: 'Quarto de Despejo',
      tituloEN: 'Child of the Dark',
      capaURl: 'https://m.media-amazon.com/images/I/71z42zpEwbL.jpg',
      fotoAutor:
        'https://conexao.ufrj.br/2022/03/carolina-maria-de-jesus-a-mulher-negra-que-criou-mundos-do-quarto-de-despejo/',
      autor: 'Carolina Maria de Jesus',
      anoPublicacao: 1960,
      generoPT: 'Diário, Autobiografia, Literatura Testemunhal',
      generoEN: 'Diary, Autobiography, Testimonial Literature',

      descricaoPT:
        'Diário real de Carolina Maria de Jesus que relata o dia a dia de uma favelada no Canindé (São Paulo), com fome, pobreza extrema, luta pela sobrevivência e críticas sociais fortes. Um dos documentos mais importantes da literatura brasileira do século XX.',
      descricaoEN:
        'Real diary of Carolina Maria de Jesus that reports the daily life of a favela resident in Canindé (São Paulo), with hunger, extreme poverty, struggle for survival and strong social criticism. One of the most important documents in 20th century Brazilian literature.',

      personagens: [
        'Carolina Maria de Jesus',
        'Vera Eunice',
        'João José',
        'José Carlos',
        'Manoel (vendeiro)',
        'Antônio Lira (peixeiro)',
        'Alfredo (eletricista)',
        'Orlando',
        'Arnaldo',
        'Seu Eduardo',
        'Raimundo',
        'Luiz',
      ],

      fotoPersonagens: [],
      fotosCuriosidades: [],

      descricaoPersonagensPT:
        'Carolina é mãe solo, catadora de papel e escritora. Vera Eunice é a filha caçula, símbolo de esperança. João José é o filho mais velho, que enfrenta os perigos da favela. José Carlos representa a inocência infantil em meio à miséria. Os demais são vizinhos e comerciantes que fazem parte do cotidiano da autora.',
      descricaoPersonagensEN:
        "Carolina is a single mother, paper picker and writer. Vera Eunice is the youngest daughter, a symbol of hope. João José is the oldest son, facing the dangers of the favela. José Carlos represents childhood innocence amid misery. The others are neighbors and merchants who are part of the author's daily life.",

      contextoHistoricoPT:
        'Brasil dos anos 1950-1960, período de grande crescimento econômico (desenvolvimentismo) mas também de profunda desigualdade social. A favela do Canindé, em São Paulo, era símbolo da exclusão urbana. O livro foi publicado em 1960, com prefácio de Audálio Dantas, e se tornou fenômeno editorial.',
      contextoHistoricoEN:
        'Brazil in the 1950s-1960s, a period of great economic growth (developmentalism) but also deep social inequality. The Canindé favela in São Paulo was a symbol of urban exclusion. The book was published in 1960, with a preface by Audálio Dantas, and became a publishing phenomenon.',

      analisePT:
        'Obra-prima da literatura testemunhal brasileira. Carolina escreve com linguagem direta, sem artifícios, transformando o diário em arma de denúncia social. O título "Quarto de Despejo" é uma metáfora poderosa: a favela é o lugar onde a cidade joga o que não quer mais. O livro antecipou debates sobre desigualdade, racismo, direitos da mulher negra e o direito à cidade que ainda estão em discussão hoje.',
      analiseEN:
        'Masterpiece of Brazilian testimonial literature. Carolina writes with direct language, without artifice, transforming the diary into a weapon of social denunciation. The title "Quarto de Despejo" (Dump Room) is a powerful metaphor: the favela is where the city throws what it no longer wants. The book anticipated debates on inequality, racism, Black women\'s rights and the right to the city that are still being discussed today.',

      reviews: {
        create: [
          {
            autor: 'Prof. Audálio Dantas',
            comentarioPt:
              'Um dos documentos humanos mais importantes já escritos no Brasil. Carolina tem o dom de transformar miséria em literatura de alto nível.',
            comentarioEn:
              'One of the most important human documents ever written in Brazil. Carolina has the gift of turning misery into high-level literature.',
            avaliacao: 5,
          },
          {
            autor: 'Estudante de Vestibular',
            comentarioPt:
              'Leitura obrigatória para entender o Brasil real. A força da narrativa está na autenticidade da voz de quem viveu a história.',
            comentarioEn:
              'Mandatory reading to understand the real Brazil. The strength of the narrative lies in the authenticity of the voice of someone who lived the story.',
            avaliacao: 5,
          },
        ],
      },

      videoAulas: {
        create: [
          {
            tituloPt: 'Quarto de Despejo: Literatura como Denúncia Social',
            tituloEn: 'Quarto de Despejo: Literature as Social Denunciation',
            urlMidia: 'https://www.youtube.com/watch?v=exemplo-quarto-despejo',
            descricaoPt:
              'Análise da obra como literatura testemunhal e sua importância para o debate sobre desigualdade no Brasil.',
            descricaoEn:
              'Analysis of the work as testimonial literature and its importance for the debate on inequality in Brazil.',
          },
          {
            tituloPt:
              'Carolina Maria de Jesus: A voz que o Brasil não queria ouvir',
            tituloEn:
              'Carolina Maria de Jesus: The Voice Brazil Did Not Want to Hear',
            urlMidia: 'https://www.youtube.com/watch?v=exemplo-carolina',
            descricaoPt:
              'Contexto histórico da publicação e o impacto do livro na sociedade brasileira dos anos 1960.',
            descricaoEn:
              "Historical context of the publication and the book's impact on Brazilian society in the 1960s.",
          },
        ],
      },

      curiosidades: {
        create: [
          {
            tituloPt: 'O título "Quarto de Despejo"',
            tituloEn: 'The Title "Quarto de Despejo"',
            conteudoPt:
              'Carolina criou o título para representar a favela como o lugar onde a cidade "joga fora" os pobres, como se fossem objetos velhos e indesejados. É uma das metáforas mais poderosas da literatura brasileira.',
            conteudoEn:
              'Carolina created the title to represent the favela as the place where the city "throws away" the poor, as if they were old and unwanted objects. It is one of the most powerful metaphors in Brazilian literature.',
          },
          {
            tituloPt: 'O sucesso editorial inesperado',
            tituloEn: 'The Unexpected Publishing Success',
            conteudoPt:
              'O livro vendeu mais de 100 mil exemplares em poucos meses após o lançamento em 1960. Carolina, que era analfabeta funcional até os 30 anos, se tornou uma das escritoras mais lidas do Brasil na época.',
            conteudoEn:
              'The book sold over 100,000 copies in just a few months after its release in 1960. Carolina, who was functionally illiterate until she was 30, became one of the most widely read writers in Brazil at the time.',
          },
          {
            tituloPt: 'A verdadeira Carolina',
            tituloEn: 'The Real Carolina',
            conteudoPt:
              'Após o sucesso do livro, Carolina foi explorada comercialmente e caiu no esquecimento. Morreu em 1977 na pobreza, quase na mesma condição que descreveu no diário. Hoje é reconhecida como uma das maiores escritoras brasileiras do século XX.',
            conteudoEn:
              "After the book's success, Carolina was commercially exploited and fell into oblivion. She died in 1977 in poverty, almost in the same condition she described in the diary. Today she is recognized as one of the greatest Brazilian writers of the 20th century.",
          },
        ],
      },

    
      dicasVestibular: {
        create: [
          {
            tituloPt: 'Literatura Testemunhal',
            tituloEn: 'Testimonial Literature',
            conteudoPt:
              'Quarto de Despejo é um dos maiores exemplos de literatura testemunhal do Brasil. Diferente da ficção, aqui quem narra viveu a história. Isso dá ao texto uma força e autenticidade únicas.',
            conteudoEn:
              'Quarto de Despejo is one of the greatest examples of testimonial literature in Brazil. Unlike fiction, here the narrator lived the story. This gives the text a unique strength and authenticity.',
          },
          {
            tituloPt: 'Narrador Protagonista',
            tituloEn: 'Protagonist Narrator',
            conteudoPt:
              'Carolina é ao mesmo tempo autora, narradora e protagonista. Isso cria uma relação direta entre quem escreve e o que é escrito. Não há mediação — a voz é dela.',
            conteudoEn:
              'Carolina is at the same time author, narrator and protagonist. This creates a direct relationship between who writes and what is written. There is no mediation — the voice is hers.',
          },
          {
            tituloPt: 'Crítica Social e Política',
            tituloEn: 'Social and Political Criticism',
            conteudoPt:
              'O livro não é apenas relato de miséria. Carolina faz crítica direta aos governantes, à mídia, ao racismo e à exploração dos pobres. Ela entende que a fome não é "natural" — é resultado de escolhas políticas.',
            conteudoEn:
              'The book is not just a report of misery. Carolina makes direct criticism of rulers, the media, racism and the exploitation of the poor. She understands that hunger is not "natural" — it is the result of political choices.',
          },
          {
            tituloPt: 'A favela como espaço político',
            tituloEn: 'The Favela as a Political Space',
            conteudoPt:
              'Para Carolina, a favela não é apenas um lugar de pobreza. É um espaço de resistência, de organização e de consciência política. Ela mostra que os pobres pensam, refletem e têm voz.',
            conteudoEn:
              'For Carolina, the favela is not just a place of poverty. It is a space of resistance, organization and political awareness. She shows that the poor think, reflect and have a voice.',
          },
        ],
      },

      
      simulados: {
        create: [
          {
            tituloPt: 'Simulado Quarto de Despejo - Vestibular',
            tituloEn: 'Quarto de Despejo Quiz - College Entrance Exam',
            questoes: {
              create: [
                {
                  perguntaPt:
                    'Sobre a obra Quarto de Despejo, é correto afirmar:',
                  perguntaEn:
                    'About the work Quarto de Despejo, it is correct to state:',
                  respostaCorretaPt:
                    'Trata-se de um diário real, onde Carolina registra sua vida, lutas, fome, trabalho e visão crítica da sociedade.',
                  respostaCorretaEn:
                    'It is a real diary, where Carolina records her life, struggles, hunger, work and critical view of society.',
                  explicacaoPt:
                    'Quarto de Despejo é um diário real escrito por Carolina Maria de Jesus entre 1955 e 1960. Não é ficção, mas testemunho vivo da realidade da favela.',
                  explicacaoEn:
                    'Quarto de Despejo is a real diary written by Carolina Maria de Jesus between 1955 and 1960. It is not fiction, but a living testimony of favela reality.',
                  alternativas: {
                    create: [
                      {
                        textoPt:
                          'É um romance fictício, baseado em histórias ouvidas pela autora.',
                        textoEn:
                          'It is a fictional novel, based on stories heard by the author.',
                      },
                      {
                        textoPt:
                          'Trata-se de um diário real, onde Carolina registra sua vida, lutas, fome, trabalho e visão crítica da sociedade.',
                        textoEn:
                          'It is a real diary, where Carolina records her life, struggles, hunger, work and critical view of society.',
                      },
                      {
                        textoPt:
                          'Tem como tema principal a relação amorosa e a família tradicional.',
                        textoEn:
                          'Its main theme is the love relationship and the traditional family.',
                      },
                      {
                        textoPt:
                          'Apresenta uma visão otimista, mostrando que todos conseguem sair da miséria com esforço.',
                        textoEn:
                          'It presents an optimistic view, showing that everyone can escape poverty through effort.',
                      },
                    ],
                  },
                },
                {
                  perguntaPt:
                    'Para Carolina, o domínio da escrita representa principalmente:',
                  perguntaEn:
                    'For Carolina, mastery of writing represents mainly:',
                  respostaCorretaPt:
                    'uma ferramenta de empoderamento, que permite romper o silêncio e dar visibilidade à sua realidade.',
                  respostaCorretaEn:
                    'a tool of empowerment, which allows breaking the silence and giving visibility to her reality.',
                  explicacaoPt:
                    'Carolina via a escrita como a única forma de fazer sua voz ser ouvida. Ela transformou o diário em instrumento de denúncia e resistência.',
                  explicacaoEn:
                    'Carolina saw writing as the only way to make her voice heard. She transformed the diary into an instrument of denunciation and resistance.',
                  alternativas: {
                    create: [
                      {
                        textoPt:
                          'um motivo de vergonha, pois ela considera que escreve mal.',
                        textoEn:
                          'a reason for shame, as she considers that she writes poorly.',
                      },
                      {
                        textoPt:
                          'um luxo desnecessário para quem precisa trabalhar tanto.',
                        textoEn:
                          'an unnecessary luxury for someone who needs to work so much.',
                      },
                      {
                        textoPt:
                          'uma ferramenta de empoderamento, que permite romper o silêncio e dar visibilidade à sua realidade.',
                        textoEn:
                          'a tool of empowerment, which allows breaking the silence and giving visibility to her reality.',
                      },
                      {
                        textoPt:
                          'uma forma de se diferenciar e se afastar dos outros moradores.',
                        textoEn:
                          'a way to differentiate herself and distance herself from other residents.',
                      },
                    ],
                  },
                },
                {
                  perguntaPt:
                    'Por que Quarto de Despejo é considerada uma obra fundamental para a história e literatura do Brasil?',
                  perguntaEn:
                    'Why is Quarto de Despejo considered a fundamental work for Brazilian history and literature?',
                  respostaCorretaPt:
                    'Por ser o primeiro relato feito por alguém que vivia na periferia, contando a própria história com a sua voz, denunciando realidades até então invisíveis.',
                  respostaCorretaEn:
                    'Because it is the first account made by someone who lived in the periphery, telling their own story with their own voice, denouncing realities that were previously invisible.',
                  explicacaoPt:
                    'Antes de Carolina, a favela era falada por outros (jornalistas, sociólogos, romancistas). Ela foi a primeira a falar de dentro, com a própria voz e autoridade de quem viveu.',
                  explicacaoEn:
                    'Before Carolina, the favela was spoken about by others (journalists, sociologists, novelists). She was the first to speak from within, with her own voice and the authority of someone who lived it.',
                  alternativas: {
                    create: [
                      {
                        textoPt:
                          'Por ser o primeiro livro escrito por uma mulher negra no Brasil.',
                        textoEn:
                          'Because it is the first book written by a Black woman in Brazil.',
                      },
                      {
                        textoPt:
                          'Por ser o primeiro relato feito por alguém que vivia na periferia, contando a própria história com a sua voz, denunciando realidades até então invisíveis.',
                        textoEn:
                          'Because it is the first account made by someone who lived in the periphery, telling their own story with their own voice, denouncing realities that were previously invisible.',
                      },
                      {
                        textoPt:
                          'Por ser o livro mais vendido do século XX no Brasil.',
                        textoEn:
                          'Because it was the best-selling book of the 20th century in Brazil.',
                      },
                      {
                        textoPt:
                          'Por ter mudado imediatamente as leis de moradia.',
                        textoEn: 'Because it immediately changed housing laws.',
                      },
                    ],
                  },
                },
                {
                  perguntaPt:
                    'Em Quarto de Despejo, Carolina aborda diversas questões sociais. Identifique a alternativa que NÃO corresponde aos temas centrais da obra:',
                  perguntaEn:
                    'In Quarto de Despejo, Carolina addresses several social issues. Identify the alternative that does NOT correspond to the central themes of the work:',
                  respostaCorretaPt:
                    'Descrição detalhada de festas, tradições e folguedos da cultura brasileira.',
                  respostaCorretaEn:
                    'Detailed description of parties, traditions and Brazilian cultural festivities.',
                  explicacaoPt:
                    'A obra foca na fome, miséria, racismo, exploração e abandono do poder público. Não há espaço para romantização ou folclorização da pobreza.',
                  explicacaoEn:
                    'The work focuses on hunger, misery, racism, exploitation and abandonment by public power. There is no room for romanticization or folklorization of poverty.',
                  alternativas: {
                    create: [
                      {
                        textoPt: 'Fome, miséria e falta de moradia digna.',
                        textoEn:
                          'Hunger, misery and lack of dignified housing.',
                      },
                      {
                        textoPt:
                          'Relações de poder, política e promessas não cumpridas pelos governantes.',
                        textoEn:
                          'Power relations, politics and unfulfilled promises by rulers.',
                      },
                      {
                        textoPt:
                          'Discriminação racial e condição da mulher negra e pobre.',
                        textoEn:
                          'Racial discrimination and the condition of poor Black women.',
                      },
                      {
                        textoPt:
                          'Descrição detalhada de festas, tradições e folguedos da cultura brasileira.',
                        textoEn:
                          'Detailed description of parties, traditions and Brazilian cultural festivities.',
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
  })

  console.log('✅ Livro inserido com sucesso!')

  console.log('👥 Inserindo equipe...')

  const equipeMembros = [
    { nome: 'Jennifer', curso: 'Desenvolvimento de Sistemas' },
    { nome: 'Maria Clara', curso: 'Desenvolvimento de Sistemas' },
    { nome: 'Kaike', curso: 'Desenvolvimento de Sistemas' },
    { nome: 'Maria Eduarda', curso: 'Desenvolvimento de Sistemas' },
    { nome: 'Manuela Caetano', curso: 'Desenvolvimento de Sistemas' },
    { nome: 'Douglas Santos', curso: 'Mecânica' },
    { nome: 'Julia Martins', curso: 'Mecânica' },
    { nome: 'Laura', curso: 'Desenvolvimento de Sistemas' },
    { nome: 'Lorenzo Lange', curso: 'Mecânica' },
    { nome: 'Nicole', curso: 'Elétrica' },
    { nome: 'Sophia Augusto Bandoni', curso: 'Elétrica' },
    { nome: 'Yasmin Gonçalves', curso: 'Elétrica' },
    { nome: 'Thales', curso: 'Desenvolvimento de Sistemas' },
    { nome: 'Maria Fernanda', curso: 'Mecânica' },
  ]

  for (const membro of equipeMembros) {
    await prisma.equipe.create({
      data: {
        nome: membro.nome,
        curso: membro.curso,
        objetivoPt:
          'Desenvolver um projeto integrador que una literatura, tecnologia e educação para ajudar estudantes a se prepararem para vestibulares e ENEM.',
        objetivoEn:
          'Develop an integrative project that combines literature, technology and education to help students prepare for college entrance exams and ENEM.',
        fotoEquipe: [],
      },
    })
  }

  console.log(`✅ ${equipeMembros.length} membros da equipe inseridos!`)
  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
