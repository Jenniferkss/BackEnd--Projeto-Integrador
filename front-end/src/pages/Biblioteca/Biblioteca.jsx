import { useEffect, useState } from 'react';

import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { fetchBiblioteca } from '../../services/bibliotecaService.js';
import styles from './Biblioteca.module.css';

const splitValues = (value) => {
    if (typeof value !== 'string') {
        return [];
    }

    return value
        .split(/\s*(?:,|;|\/|\||•)\s*/)
        .map((item) => item.trim())
        .filter(Boolean);
};

const pickText = (...values) => {
    for (const value of values) {
        if (typeof value === 'string' && value.trim()) {
            return value.trim();
        }
    }

    return '';
};

const getLocalizedText = (language, ptValues, enValues, fallback = '') => {
    const preferred = language === 'en' ? pickText(...enValues) : pickText(...ptValues);

    if (preferred) {
        return preferred;
    }

    const secondary = language === 'en' ? pickText(...ptValues) : pickText(...enValues);

    return secondary || fallback;
};

const copy = {
    pt: {
        kicker: 'Backend centralizador em Render',
        title: 'Biblioteca integrada',
        lead: 'Os livros agora chegam do backend centralizador, com fontes renderizadas individualmente, status visível e cards responsivos para cada obra.',
        sourcesLabel: 'Fontes',
        validBooksLabel: 'Livros válidos',
        alertSourcesLabel: 'Fontes com alerta',
        loadingToolbar: 'Buscando dados no backend centralizador...',
        loadingButton: 'Carregando...',
        errorToolbar: 'Houve um problema na última tentativa de carregamento.',
        successToolbar: 'Conteúdo sincronizado com o endpoint de integração da biblioteca.',
        retryButton: 'Tentar novamente',
        loadingTitle: 'Carregando biblioteca',
        loadingText: 'Consultando o backend centralizador e preparando as fontes.',
        errorLabel: 'Falha no carregamento',
        errorTitle: 'Não foi possível acessar a biblioteca agora.',
        errorText: 'Não foi possível carregar a biblioteca.',
        emptyLabel: 'Nada disponível',
        emptyTitle: 'O backend respondeu, mas não trouxe fontes no momento.',
        emptyText:
            'Quando houver livros válidos, eles vão aparecer aqui em cartões separados por fonte.',
        emptyBooksLabel: 'Sem livros válidos',
        emptyBooksTitle: 'Nenhuma fonte trouxe conteúdo utilizável nesta resposta.',
        emptyBooksText:
            'As fontes continuam visíveis abaixo para indicar qual integração está indisponível ou vazia.',
        sourceLabel: 'Fonte',
        sourceEmptyTitle: 'Sem livros válidos nesta fonte.',
        sourceEmptyUnavailable: 'A fonte não respondeu com conteúdo utilizável no momento.',
        sourceEmptyReady: 'A resposta chegou, mas o campo de conteúdo veio vazio.',
        sourceErrorFallback: 'Erro informado pela fonte.',
        availableStatus: 'Disponível',
        unavailableStatus: 'Indisponível',
        bookFallback: (index) => `Livro ${index + 1}`,
        authorFallback: 'Autor não informado',
        yearFallback: 'Ano não informado',
        coverFallback: 'Sem capa',
        photosLabel: 'Fotos do banco',
        photosFallback: 'Nenhuma foto adicional disponível.',
        authorPhotoLabel: 'Foto do autor',
        charactersPhotoLabel: 'Personagem',
        curiositiesPhotoLabel: 'Curiosidade',
        synopsisLabel: 'Resumo',
        synopsisFallback: 'Resumo não informado.',
        genreFallback: 'Gênero não informado.',
        itemsLabel: (count) => `${count} ${count === 1 ? 'item' : 'itens'}`,
    },
    en: {
        kicker: 'Render central backend',
        title: 'Integrated library',
        lead: 'Books now come from the central backend, with individually rendered sources, visible status, and responsive cards for each work.',
        sourcesLabel: 'Sources',
        validBooksLabel: 'Valid books',
        alertSourcesLabel: 'Sources with alert',
        loadingToolbar: 'Fetching data from the central backend...',
        loadingButton: 'Loading...',
        errorToolbar: 'There was a problem during the last loading attempt.',
        successToolbar: 'Content synced with the library integration endpoint.',
        retryButton: 'Try again',
        loadingTitle: 'Loading library',
        loadingText: 'Checking the central backend and preparing the sources.',
        errorLabel: 'Loading failed',
        errorTitle: 'We could not access the library right now.',
        errorText: 'Could not load the library.',
        emptyLabel: 'Nothing available',
        emptyTitle: 'The backend responded but did not return any sources.',
        emptyText:
            'When valid books are available, they will appear here in cards grouped by source.',
        emptyBooksLabel: 'No valid books',
        emptyBooksTitle: 'No source returned usable content in this response.',
        emptyBooksText:
            'The sources remain visible below to show which integration is unavailable or empty.',
        sourceLabel: 'Source',
        sourceEmptyTitle: 'No valid books in this source.',
        sourceEmptyUnavailable: 'The source did not return usable content at the moment.',
        sourceEmptyReady: 'The response arrived, but the content field was empty.',
        sourceErrorFallback: 'Error reported by the source.',
        availableStatus: 'Available',
        unavailableStatus: 'Unavailable',
        bookFallback: (index) => `Book ${index + 1}`,
        authorFallback: 'Author not provided',
        yearFallback: 'Year not provided',
        coverFallback: 'No cover',
        photosLabel: 'Database photos',
        photosFallback: 'No additional photos available.',
        authorPhotoLabel: 'Author photo',
        charactersPhotoLabel: 'Character',
        curiositiesPhotoLabel: 'Curiosity',
        synopsisLabel: 'Summary',
        synopsisFallback: 'Summary unavailable.',
        genreFallback: 'Genre unavailable.',
        itemsLabel: (count) => `${count} ${count === 1 ? 'item' : 'items'}`,
    },
};

const isUnavailableStatus = (statusLabel) => {
    const normalizedStatus = typeof statusLabel === 'string' ? statusLabel.toLowerCase() : '';

    return normalizedStatus.includes('indispon') || normalizedStatus.includes('unavail');
};

const getStatusLabel = (statusApi, erro, language, texts) => {
    const normalizedStatus = typeof statusApi === 'string' ? statusApi.trim() : '';

    if (normalizedStatus) {
        if (normalizedStatus.toLowerCase().includes('indispon')) {
            return language === 'en' ? texts.unavailableStatus : texts.unavailableStatus;
        }

        if (normalizedStatus.toLowerCase().includes('unavail')) {
            return language === 'pt' ? texts.unavailableStatus : texts.unavailableStatus;
        }

        if (normalizedStatus.toLowerCase().includes('dispon')) {
            return language === 'en' ? texts.availableStatus : texts.availableStatus;
        }

        if (normalizedStatus.toLowerCase().includes('avail')) {
            return language === 'pt' ? texts.availableStatus : texts.availableStatus;
        }

        return normalizedStatus;
    }

    return erro ? texts.unavailableStatus : texts.availableStatus;
};

const getSourceTitle = (livro, fallbackIndex) => {
    if (typeof livro === 'string' && livro.trim()) {
        return livro.trim();
    }

    if (livro && typeof livro === 'object') {
        return (
            livro.titulo ||
            livro.tituloPt ||
            livro.tituloPT ||
            livro.tituloEn ||
            livro.tituloEN ||
            livro.nome ||
            livro.nomePt ||
            livro.nomePT ||
            livro.obra ||
            livro.obraPt ||
            livro.obraPT ||
            `Fonte ${fallbackIndex + 1}`
        );
    }

    return `Fonte ${fallbackIndex + 1}`;
};

const getStatusTone = (statusLabel) => {
    return isUnavailableStatus(statusLabel) ? styles.statusUnavailable : styles.statusAvailable;
};

function BookCard({ livro, fallbackIndex, language, texts }) {
    const [imageFailed, setImageFailed] = useState(false);

    const title = getLocalizedText(
        language,
        [livro.titulo_pt, livro.tituloPt, livro.tituloPT, livro.titulo, livro.nomePt, livro.nomePT],
        [livro.titulo_en, livro.tituloEn, livro.tituloEN, livro.titulo, livro.nomeEn, livro.nomeEN],
        texts.bookFallback(fallbackIndex)
    );
    const author =
        pickText(livro.autor, livro.autora, livro.nomeAutor, livro.nomeAutora) ||
        texts.authorFallback;
    const coverUrl = livro.capa_url || livro.capaUrl || livro.capaURl;
    const authorPhoto = pickText(
        livro.fotoAutor,
        livro.foto_autor,
        livro.fotoAutorUrl,
        livro.fotoAutorURL,
        livro.authorPhoto
    );
    const characterPhotos = Array.isArray(livro.fotoPersonagens)
        ? livro.fotoPersonagens.filter((item) => typeof item === 'string' && item.trim())
        : [];
    const curiosityPhotos = Array.isArray(livro.fotosCuriosidades)
        ? livro.fotosCuriosidades.filter((item) => typeof item === 'string' && item.trim())
        : [];
    const gallery = [
        ...(authorPhoto ? [{ src: authorPhoto, label: texts.authorPhotoLabel }] : []),
        ...characterPhotos.map((src, photoIndex) => ({
            src,
            label: `${texts.charactersPhotoLabel} ${photoIndex + 1}`,
        })),
        ...curiosityPhotos.map((src, photoIndex) => ({
            src,
            label: `${texts.curiositiesPhotoLabel} ${photoIndex + 1}`,
        })),
    ];
    const year = livro.ano || livro.anoPublicacao || texts.yearFallback;
    const genres = splitValues(
        getLocalizedText(
            language,
            [livro.genero_pt, livro.generoPt, livro.generoPT, livro.genero],
            [livro.genero_en, livro.generoEn, livro.generoEN, livro.genero],
            ''
        )
    );
    const synopsis = getLocalizedText(
        language,
        [livro.enredo_pt, livro.descricaoPT, livro.descricaoPt, livro.descricao, livro.conteudoPt],
        [livro.enredo_en, livro.descricaoEN, livro.descricaoEn, livro.descricao, livro.conteudoEn],
        texts.synopsisFallback
    );
    const showCover = Boolean(coverUrl) && !imageFailed;
    const coverAlt = showCover ? `Capa de ${title}` : `${texts.coverFallback} para ${title}`;

    return (
        <article className={styles.bookCard}>
            <div className={styles.coverFrame}>
                {showCover ? (
                    <img
                        className={styles.coverImage}
                        src={coverUrl}
                        alt={coverAlt}
                        loading='lazy'
                        onError={() => setImageFailed(true)}
                    />
                ) : (
                    <div
                        className={styles.coverPlaceholder}
                        aria-label={`${texts.coverFallback} para ${title}`}>
                        <span className={styles.placeholderGlyph} aria-hidden='true'>
                            LB
                        </span>
                        <span className={styles.placeholderLabel}>{texts.coverFallback}</span>
                    </div>
                )}
            </div>

            <div className={styles.bookBody}>
                <div className={styles.bookMetaRow}>
                    <span className={styles.bookYear}>{year}</span>
                    <span className={styles.bookAuthor}>{author}</span>
                </div>

                <h3 className={styles.bookTitle}>{title}</h3>

                <div className={styles.tagsGrid}>
                    {genres.length > 0 ? (
                        genres.map((genre) => (
                            <span key={genre} className={styles.genreTag}>
                                {genre}
                            </span>
                        ))
                    ) : (
                        <span className={`${styles.genreTag} ${styles.genreTagGhost}`}>
                            {texts.genreFallback}
                        </span>
                    )}
                </div>

                <div className={styles.synopsisGroup}>
                    <div>
                        <p className={styles.synopsisLabel}>{texts.synopsisLabel}</p>
                        <p className={styles.synopsisText}>{synopsis || texts.synopsisFallback}</p>
                    </div>
                </div>

                <div className={styles.photoSection}>
                    <p className={styles.photoSectionLabel}>{texts.photosLabel}</p>

                    {gallery.length > 0 ? (
                        <div className={styles.photoGrid}>
                            {gallery.slice(0, 4).map((photo, photoIndex) => (
                                <figure
                                    key={`${title}-${photoIndex}-${photo.label}`}
                                    className={styles.photoCard}>
                                    <img
                                        src={photo.src}
                                        alt={`${photo.label} - ${title}`}
                                        loading='lazy'
                                    />
                                    <figcaption>{photo.label}</figcaption>
                                </figure>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.photoEmpty}>{texts.photosFallback}</p>
                    )}
                </div>
            </div>
        </article>
    );
}

function SourceSection({ fonte, index, language, texts }) {
    const livros = Array.isArray(fonte.conteudo) ? fonte.conteudo.filter(Boolean) : [];
    const validBooks = livros.length;
    const sourceTitle = getSourceTitle(fonte.livro, index);
    const statusLabel = getStatusLabel(fonte.statusApi, fonte.erro, language, texts);
    const statusTone = getStatusTone(statusLabel);
    const totalItens = Number.isFinite(Number(fonte.totalItens))
        ? Number(fonte.totalItens)
        : validBooks;
    const sourceUnavailable = Boolean(fonte.erro) || isUnavailableStatus(statusLabel);

    return (
        <section className={styles.sourceCard}>
            <div className={styles.sourceHeader}>
                <div>
                    <p className={styles.sourceLabel}>
                        {texts.sourceLabel} {index + 1}
                    </p>
                    <h2 className={styles.sourceTitle}>{sourceTitle}</h2>
                </div>

                <div className={styles.sourceStats}>
                    <div className={`${styles.statusBadge} ${statusTone}`}>{statusLabel}</div>
                    <div className={styles.countBadge}>{texts.itemsLabel(totalItens)}</div>
                </div>
            </div>

            {fonte.erro ? <p className={styles.sourceError}>{fonte.erro}</p> : null}

            {validBooks > 0 ? (
                <div className={styles.booksGrid}>
                    {livros.map((livro, livroIndex) => (
                        <BookCard
                            key={`${sourceTitle}-${livro.titulo || livroIndex}-${livroIndex}`}
                            livro={livro}
                            fallbackIndex={livroIndex}
                            language={language}
                            texts={texts}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.sourceEmpty}>
                    <strong>{texts.sourceEmptyTitle}</strong>
                    <span>
                        {sourceUnavailable ? texts.sourceEmptyUnavailable : texts.sourceEmptyReady}
                    </span>
                </div>
            )}
        </section>
    );
}

export default function Biblioteca() {
    const { language } = useLanguage();
    const texts = copy[language];
    const [fontes, setFontes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reloadToken, setReloadToken] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const carregarBiblioteca = async () => {
            setLoading(true);
            setError('');

            try {
                const fontesRecebidas = await fetchBiblioteca(controller.signal);

                if (controller.signal.aborted) {
                    return;
                }

                setFontes(fontesRecebidas);
            } catch (fetchError) {
                if (fetchError.name === 'AbortError' || controller.signal.aborted) {
                    return;
                }

                setFontes([]);
                setError(fetchError.message || 'Não foi possível carregar a biblioteca.');
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        carregarBiblioteca();

        return () => controller.abort();
    }, [reloadToken]);

    const totalLivrosValidos = fontes.reduce(
        (total, fonte) =>
            total + (Array.isArray(fonte.conteudo) ? fonte.conteudo.filter(Boolean).length : 0),
        0
    );

    const fontesComErro = fontes.filter((fonte) => {
        const status = typeof fonte.statusApi === 'string' ? fonte.statusApi.toLowerCase() : '';

        return status.includes('indispon') || status.includes('unavail') || Boolean(fonte.erro);
    }).length;

    const handleRetry = () => {
        setReloadToken((currentValue) => currentValue + 1);
    };

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.shell}>
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <p className={styles.kicker}>{texts.kicker}</p>
                        <h1 className={styles.title}>{texts.title}</h1>
                        <p className={styles.lead}>{texts.lead}</p>
                    </div>

                    <div className={styles.heroPanel}>
                        <div className={styles.heroStat}>
                            <span>{texts.sourcesLabel}</span>
                            <strong>{fontes.length}</strong>
                        </div>
                        <div className={styles.heroStat}>
                            <span>{texts.validBooksLabel}</span>
                            <strong>{totalLivrosValidos}</strong>
                        </div>
                        <div className={styles.heroStat}>
                            <span>{texts.alertSourcesLabel}</span>
                            <strong>{fontesComErro}</strong>
                        </div>
                    </div>
                </section>

                <div className={styles.toolbar}>
                    <p className={styles.toolbarCopy}>
                        {loading
                            ? texts.loadingToolbar
                            : error
                              ? texts.errorToolbar
                              : texts.successToolbar}
                    </p>

                    <button type='button' className={styles.retryButton} onClick={handleRetry}>
                        {loading ? texts.loadingButton : texts.retryButton}
                    </button>
                </div>

                {loading ? (
                    <section className={styles.loadingState} aria-live='polite'>
                        <div className={styles.loadingSpinner} aria-hidden='true' />
                        <div>
                            <strong>{texts.loadingTitle}</strong>
                            <p>{texts.loadingText}</p>
                        </div>
                    </section>
                ) : error ? (
                    <section className={styles.errorState} role='alert'>
                        <div>
                            <p className={styles.errorLabel}>{texts.errorLabel}</p>
                            <h2>{texts.errorTitle}</h2>
                            <p>{error || texts.errorText}</p>
                        </div>

                        <button type='button' className={styles.retryButton} onClick={handleRetry}>
                            {texts.retryButton}
                        </button>
                    </section>
                ) : null}

                {!loading && !error && fontes.length === 0 ? (
                    <section className={styles.emptyState}>
                        <p className={styles.emptyLabel}>{texts.emptyLabel}</p>
                        <h2>{texts.emptyTitle}</h2>
                        <p>{texts.emptyText}</p>
                    </section>
                ) : null}

                {!loading && !error && totalLivrosValidos === 0 && fontes.length > 0 ? (
                    <section className={styles.emptyState}>
                        <p className={styles.emptyLabel}>{texts.emptyBooksLabel}</p>
                        <h2>{texts.emptyBooksTitle}</h2>
                        <p>{texts.emptyBooksText}</p>
                    </section>
                ) : null}

                {!loading && !error && fontes.length > 0 ? (
                    <section className={styles.sourcesStack}>
                        {fontes.map((fonte, index) => (
                            <SourceSection
                                key={`${getSourceTitle(fonte.livro, index)}-${index}`}
                                fonte={fonte}
                                index={index}
                                language={language}
                                texts={texts}
                            />
                        ))}
                    </section>
                ) : null}
            </main>

            <Footer />
        </div>
    );
}
