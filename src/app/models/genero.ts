import { Artista } from "./artista";
import { Generic } from "./generic";
export class Genero implements Generic{
    id: number;
    nombre: string;
    fotoHashCode: number;
    createAt: number;
    artistas: Artista[] = [];
}