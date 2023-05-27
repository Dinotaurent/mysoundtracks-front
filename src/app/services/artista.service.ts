import { Injectable } from '@angular/core';
import { CommonsService } from './commons.service';
import { Artista } from '../models/artista';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService extends CommonsService<Artista>{

  constructor(http: HttpClient) {
    super(http);
    this.URL = `${URL_BASE}artistas/`;
  }
}
