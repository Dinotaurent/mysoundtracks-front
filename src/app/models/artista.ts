import { Album } from "./album";
import { Cancion } from "./cancion";
import { Generic } from "./generic";
import { Genero } from "./genero";
export class Artista implements Generic{
    id: number;
    nombre: string;
    fotoHashCode: number;
    createAt: number;
    albumes: Album[] = []; 
    canciones: Cancion[] = [];
    generos: Genero[] = [];
}