import { Injectable } from '@angular/core';
import { CommonsService } from './commons.service';
import { Genero } from '../models/genero';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../config/app';
import { Observable } from 'rxjs';
import { Artista } from '../models/artista';

@Injectable({
  providedIn: 'root',
})
export class GeneroService extends CommonsService<Genero> {
  constructor(http: HttpClient) {
    super(http);
    this.URL = `${URL_BASE}generos/`;
  }

  asignarArtistas(generoId: number, artistas: Artista[]): Observable<Genero> {
    return this.http.put<Genero>(
      `${this.URL}${generoId}/asignar-artistas`,
      artistas,
      { headers: this.headers }
    );
  }

  removerArtista(generoId: number, artista: Artista): Observable<Genero> {
    return this.http.put<Genero>(
      `${this.URL}${generoId}/remover-artista`,
      artista,
      { headers: this.headers }
    );
  }

  removerTodos(id: number): Observable<Genero>{
    return this.http.put<Genero>(
      `${this.URL}${id}/remover-todos`,
      { headers: this.headers }
    );
  }

}
