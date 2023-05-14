import { Album } from "./album";
import { Cancion } from "./cancion";
import { Generic } from "./generic";
export class Genero implements Generic{
    id: number;
    nombre: string;
    fotoHashCode: number;
    createAt: number;
    albumes: Album[] = []; 
    canciones: Cancion[] = [];

}