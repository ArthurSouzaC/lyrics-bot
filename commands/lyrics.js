import { getLyrics } from "../services/lyrics.js";

export default {
    name: '&letra',
    description: 'Busca a letra de uma música na API do Vagalume',
    execute: (msg) => getLyrics(msg)
}