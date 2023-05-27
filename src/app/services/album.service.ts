import { Injectable } from '@angular/core';
import { CommonsService } from './commons.service';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../config/app';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends CommonsService<Album>{

  constructor(http: HttpClient) {
    super(http);
    this.URL = `${URL_BASE}albumes/`;
  }

}
