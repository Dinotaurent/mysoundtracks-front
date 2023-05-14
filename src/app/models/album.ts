import { Cancion } from "./cancion";
import { Generic } from "./generic";
export class Album implements Generic{
    id: number;
    nombre: string;
    fotoHashCode: number;
    createAt: number;
    canciones: Cancion[] = [];
}