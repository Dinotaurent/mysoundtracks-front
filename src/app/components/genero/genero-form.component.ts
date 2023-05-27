import { Component, HostListener } from '@angular/core';
import { CommonsFormComponent } from '../commons-form.component';
import { GeneroService } from 'src/app/services/genero.service';
import { Genero } from 'src/app/models/genero';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { URL_BASE } from 'src/app/config/app';

@Component({
  selector: 'app-genero-form',
  templateUrl: './genero-form.component.html',
})
export class GeneroFormComponent extends CommonsFormComponent<
  Genero,
  GeneroService
> {
  URL = `${URL_BASE}generos/`;

  constructor(service: GeneroService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
    this.model = new Genero();
    this.rutaRedirect = '/generos';
    this.nombreEntity = Genero.name;
    this.titulo = 'Registrar nuevo género musical';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if(this.model.nombre == undefined){
      Swal.fire({
        title: 'Aun quedan campos pendientes por llenar',
        icon: 'info',
      })
    }
    }
  }

  override crear(): void {
    if (!this.fotoSeleccionada) {
      super.crear();
    } else {
      super.crearConFoto(this.model, this.fotoSeleccionada);
    }
  }

  override editar(): void {
    if (!this.fotoSeleccionada) {
      super.editar();
    } else {
      Swal.fire({
        title: 'Seguro que quieres guardar los cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: 'No guardar',
      }).then((result) => {
        if (result.isConfirmed) {
          super.editarConFoto(this.model, this.fotoSeleccionada)
        } else if (result.isDenied) {
          Swal.fire('No se aplicaron los cambios', '', 'info');
        }
      });
    }
  }
}
