import { Generic } from './../models/generic';
import { Directive, OnInit } from '@angular/core';
import { CommonsService } from '../services/commons.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Directive()
export abstract class CommonsFormComponent<
  E extends Generic,
  S extends CommonsService<E>
> implements OnInit
{
  titulo: string;
  model: E;
  error: any;
  fotoSeleccionada: File;
  protected rutaRedirect: string;
  protected nombreEntity: string;

  constructor(
    protected service: S,
    protected router: Router,
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      if (id) {
        this.service.listarXId(id).subscribe((model) => (this.model = model));
        this.titulo = `Modificar ${this.nombreEntity}`;
      }
    });
  }

  subirFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];

    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      this.fotoSeleccionada = null;
      Swal.fire({
        icon: 'error',
        text: 'La foto debe ser un tipo valido ejemplo: PNG,JPG',
      });
    }
  }

  crear(): void {
    this.service.crear(this.model).subscribe(
      (model) => {
        this.router.navigate([this.rutaRedirect]);
        Swal.fire(
          `${this.nombreEntity} ${model.nombre}`,
          'registrado con exito',
          'success'
        );
      },
      (err) => {
        if (err.status == 400) {
          this.error = err.error;
          Swal.fire({
            icon: 'error',
            title: 'Campos incorrectos',
          });
        }
      }
    );
  }

  crearConFoto(e: E, archivo: File): void {
    this.service.crearConFoto(this.model, this.fotoSeleccionada).subscribe(
      (model) => {
        this.router.navigate([this.rutaRedirect]);
        Swal.fire(
          `${this.nombreEntity} ${model.nombre}`,
          'registrado con exito',
          'success'
        );
      },
      (err) => {
        if (err.status == 400) {
          this.error = err.error;
          Swal.fire({
            icon: 'error',
            title: 'Campos incorrectos',
          });
        }
      }
    );
  }

  editar(): void {
    Swal.fire({
      title: 'Seguro que quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'No guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.editar(this.model).subscribe(
          (model) => {
            this.router.navigate([this.rutaRedirect]);
            Swal.fire('Actualizado!', `${this.model.nombre} fue actualizado correctamente`, 'success');
          },
          (err) => {
            if (err.status == 400) {
              this.error = err.error;
              console.log(this.error);
              Swal.fire({
                icon: 'error',
                title: 'Campos incorrectos',
              });
            }
          }
        );
      } else if (result.isDenied) {
        Swal.fire('No se aplicaron los cambios', '', 'info');
      }
    });
  }

  editarConFoto(e: E, archivo: File): void {
    this.service.editarConFoto(this.model, this.fotoSeleccionada).subscribe(
      (model) => {
        this.router.navigate([this.rutaRedirect]);
        Swal.fire('Actualizado', '', 'success');
      },
      (err) => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
          Swal.fire({
            icon: 'error',
            title: 'Campos incorrectos',
          });
        }
      }
    );
  }
}
