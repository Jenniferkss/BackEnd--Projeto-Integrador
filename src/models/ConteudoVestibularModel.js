import prisma from '../lib/services/prismaClient.js'
import LivroModel from './LivroModel.js'

const criarErro = (status, message) => {
  const error = new Error(message)
  error.status = status
  return error
}

export default class ConteudoVestibularModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.livroId = data.livroId ?? data.livroid
    this.analiseCriticaPt = data.analiseCriticaPt ?? data.analisecriticapt
    this.analiseCriticaEn = data.analiseCriticaEn ?? data.analisecriticaen
    this.interpretacoesPt = data.interpretacoesPt ?? data.interpretacoespt
    this.interpretacoesEn = data.interpretacoesEn ?? data.interpretacoesen
    this.temasRedacaoPt = data.temasRedacaoPt ?? data.temasredacaopt ?? []
    this.temasRedacaoEn = data.temasRedacaoEn ?? data.temasredacaoen ?? []
    this.tituloPrincipalPt = data.tituloPrincipalPt ?? data.tituloprincipalpt
    this.tituloPrincipalEn = data.tituloPrincipalEn ?? data.tituloprincipalen
    this.textoPrincipalPt = data.textoPrincipalPt ?? data.textoprincipalpt
    this.textoPrincipalEn = data.textoPrincipalEn ?? data.textoprincipalen
    this.citacao = data.citacao
    this.vetor1TituloPt = data.vetor1TituloPt ?? data.vetor1titulopt
    this.vetor1TituloEn = data.vetor1TituloEn ?? data.vetor1tituloen
    this.vetor1TextoPt = data.vetor1TextoPt ?? data.vetor1textopt
    this.vetor1TextoEn = data.vetor1TextoEn ?? data.vetor1textoen
    this.vetor2TituloPt = data.vetor2TituloPt ?? data.vetor2titulopt
    this.vetor2TituloEn = data.vetor2TituloEn ?? data.vetor2tituloen
    this.vetor2TextoPt = data.vetor2TextoPt ?? data.vetor2textopt
    this.vetor2TextoEn = data.vetor2TextoEn ?? data.vetor2textoen
    this.vetor3TituloPt = data.vetor3TituloPt ?? data.vetor3titulopt
    this.vetor3TituloEn = data.vetor3TituloEn ?? data.vetor3tituloen
    this.vetor3TextoPt = data.vetor3TextoPt ?? data.vetor3textopt
    this.vetor3TextoEn = data.vetor3TextoEn ?? data.vetor3textoen
    this.frequenciaFuvest = data.frequenciaFuvest ?? data.frequenciafuvest ?? 30
    this.frequenciaUnicamp =
      data.frequenciaUnicamp ?? data.frequenciaunicamp ?? 72
    this.frequenciaEnem = data.frequenciaEnem ?? data.frequenciaenem ?? 42
  }

  validarCampos() {
    if (!Number.isInteger(Number(this.livroId))) {
      throw criarErro(400, 'O campo "livroId" é obrigatório.')
    }
    if (!this.tituloPrincipalPt) {
      throw criarErro(400, 'O campo "tituloPrincipalPt" é obrigatório.')
    }
  }

  async garantirLivroExiste() {
    const livro = await LivroModel.buscarPorId(Number(this.livroId))
    if (!livro) {
      throw criarErro(404, 'Livro não encontrado.')
    }
  }

  async criar() {
    this.validarCampos()
    await this.garantirLivroExiste()

    return prisma.conteudoVestibular.create({
      data: {
        livroid: Number(this.livroId),
        analisecriticapt: this.analiseCriticaPt,
        analisecriticaen: this.analiseCriticaEn,
        interpretacoespt: this.interpretacoesPt,
        interpretacoesen: this.interpretacoesEn,
        temasredacaopt: this.temasRedacaoPt,
        temasredacaoen: this.temasRedacaoEn,
        tituloprincipalpt: this.tituloPrincipalPt,
        tituloprincipalen: this.tituloPrincipalEn,
        textoprincipalpt: this.textoPrincipalPt,
        textoprincipalen: this.textoPrincipalEn,
        citacao: this.citacao,
        vetor1titulopt: this.vetor1TituloPt,
        vetor1tituloen: this.vetor1TituloEn,
        vetor1textopt: this.vetor1TextoPt,
        vetor1textoen: this.vetor1TextoEn,
        vetor2titulopt: this.vetor2TituloPt,
        vetor2tituloen: this.vetor2TituloEn,
        vetor2textopt: this.vetor2TextoPt,
        vetor2textoen: this.vetor2TextoEn,
        vetor3titulopt: this.vetor3TituloPt,
        vetor3tituloen: this.vetor3TituloEn,
        vetor3textopt: this.vetor3TextoPt,
        vetor3textoen: this.vetor3TextoEn,
        frequenciafuvest: this.frequenciaFuvest,
        frequenciaunicamp: this.frequenciaUnicamp,
        frequenciaenem: this.frequenciaEnem,
      },
    })
  }

  async atualizar() {
    this.validarCampos()
    await this.garantirLivroExiste()

    return prisma.conteudoVestibular.update({
      where: { id: this.id },
      data: {
        livroid: Number(this.livroId),
        analisecriticapt: this.analiseCriticaPt,
        analisecriticaen: this.analiseCriticaEn,
        interpretacoespt: this.interpretacoesPt,
        interpretacoesen: this.interpretacoesEn,
        temasredacaopt: this.temasRedacaoPt,
        temasredacaoen: this.temasRedacaoEn,
        tituloprincipalpt: this.tituloPrincipalPt,
        tituloprincipalen: this.tituloPrincipalEn,
        textoprincipalpt: this.textoPrincipalPt,
        textoprincipalen: this.textoPrincipalEn,
        citacao: this.citacao,
        vetor1titulopt: this.vetor1TituloPt,
        vetor1tituloen: this.vetor1TituloEn,
        vetor1textopt: this.vetor1TextoPt,
        vetor1textoen: this.vetor1TextoEn,
        vetor2titulopt: this.vetor2TituloPt,
        vetor2tituloen: this.vetor2TituloEn,
        vetor2textopt: this.vetor2TextoPt,
        vetor2textoen: this.vetor2TextoEn,
        vetor3titulopt: this.vetor3TituloPt,
        vetor3tituloen: this.vetor3TituloEn,
        vetor3textopt: this.vetor3TextoPt,
        vetor3textoen: this.vetor3TextoEn,
        frequenciafuvest: this.frequenciaFuvest,
        frequenciaunicamp: this.frequenciaUnicamp,
        frequenciaenem: this.frequenciaEnem,
      },
    })
  }

  async deletar() {
    return prisma.conteudoVestibular.delete({
      where: { id: this.id },
    })
  }

  static async buscarPorLivroId(livroId) {
    const idNumero = parseInt(livroId)
    if (Number.isNaN(idNumero)) return null

    const data = await prisma.conteudoVestibular.findFirst({
      where: { livroid: idNumero },
    })

    return data ? new ConteudoVestibularModel(data) : null
  }

  static async buscarPorId(id) {
    const idNumero = parseInt(id)
    if (Number.isNaN(idNumero)) return null

    const data = await prisma.conteudoVestibular.findUnique({
      where: { id: idNumero },
    })

    return data ? new ConteudoVestibularModel(data) : null
  }

  static async buscarTodos(filtros = {}) {
    const where = {}

    if (filtros.livroId !== undefined && filtros.livroId !== '') {
      const idNumero = parseInt(filtros.livroId)
      if (!Number.isNaN(idNumero)) {
        where.livroid = idNumero
      }
    }

    if (filtros.tituloPrincipal) {
      where.OR = [
        { tituloprincipalpt: { contains: filtros.tituloPrincipal, mode: 'insensitive' } },
        { tituloprincipalen: { contains: filtros.tituloPrincipal, mode: 'insensitive' } },
      ]
    }

    const registros = await prisma.conteudoVestibular.findMany({ where })
    return registros.map((r) => new ConteudoVestibularModel(r))
  }
}
