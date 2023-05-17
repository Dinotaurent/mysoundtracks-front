import { Injectable } from '@angular/core';
import { CommonsService } from './commons.service';
import { Genero } from '../models/genero';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../config/app';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { Cancion } from '../models/cancion';

@Injectable({
  providedIn: 'root',
})
export class GeneroService extends CommonsService<Genero> {
  constructor(http: HttpClient) {
    super(http);
    this.URL = `${URL_BASE}generos/`;
  }

  // crearConFoto(genero: Genero, archivo: File): Observable<Genero> {
  //   const formData = new FormData();
  //   formData.append('nombre', genero.nombre);
  //   formData.append('archivo', archivo);

  //   return this.http.post<Genero>(`${this.URL}crear-con-foto`, formData);
  // }

  asignarAlbumes(genero: Genero, albumes: Album[]): Observable<Genero> {
    return this.http.put<Genero>(
      `${this.URL}${genero.id}/asignar-albumes`,
      albumes,
      { headers: this.headers }
    );
  }

  removerAlbum(genero: Genero, album: Album): Observable<Genero> {
    return this.http.put<Genero>(
      `${this.URL}${genero.id}/remover-album`,
      album,
      { headers: this.headers }
    );
  }

  asignarCanciones(genero: Genero, canciones: Cancion[]): Observable<Genero> {
    return this.http.put<Genero>(
      `${this.URL}${genero.id}/asignar-canciones`,
      canciones,
      { headers: this.headers }
    );
  }

  removerCancion(genero: Genero, cancion: Cancion): Observable<Genero> {
    return this.http.put<Genero>(
      `${this.URL}${genero.id}/remover-cancion`,
      cancion,
      { headers: this.headers }
    );
  }
}
