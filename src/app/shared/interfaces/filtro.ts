export interface Filtro {
    filtro: string
    limit: number
    offset: number
}

export interface FiltroComunicado extends Filtro {
    dataMinima: string
    dataMaxima: string
}
