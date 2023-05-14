import { GeneroService } from 'src/app/services/genero.service';
import { Component, OnInit } from '@angular/core';
import { CommonsListarComponent } from '../commons-listar.component';
import { URL_BASE } from 'src/app/config/app';
import { Genero } from 'src/app/models/genero';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html'
})
export class GeneroComponent extends CommonsListarComponent<Genero, GeneroService>{
  URL = `${URL_BASE}generos/`;
  constructor(service: GeneroService) {
    super(service);
    this.titulo = 'Listado de generos musicales';
    this.nombreEntity = Genero.name;
  }

}
