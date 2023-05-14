import { Generic } from './../models/generic';
import { Directive, OnInit, ViewChild } from '@angular/core';
import { CommonsService } from '../services/commons.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Directive()
export class CommonsListarComponent<
  E extends Generic,
  S extends CommonsService<E>
> implements OnInit
{
    titulo: string;
    lista: E[];
    datosFiltrados: E[] = [];
    listaFiltrada: E[] = [];
    totalRegistros = 0;
    paginaActual = 0;
    totalXPagina = 8;
    pageSizeOptions: number[] = [5, 10, 20, 50, 100];
    protected nombreEntity: string;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(protected service: S) {}
  
    ngOnInit(): void {
      this.calcularRangos();
    }
  
    paginar(event: PageEvent): void {
      this.paginaActual = event.pageIndex;
      this.totalXPagina = event.pageSize;
      this.calcularRangos();
    }
  
    calcularRangos() {
      this.service
        .listarXPagina(this.paginaActual.toString(), this.totalXPagina.toString())
        .subscribe((p) => {
          this.lista = p.content as E[];
          this.listaFiltrada = this.lista;
          this.totalRegistros = p.totalElements as number;
          this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
        });
    }
  
    filtrar(event: any): void {
      let nombre: string = (<HTMLInputElement>event.target).value;
      nombre = nombre !== undefined ? nombre.trim() : '';
  
      if (nombre !== '') {
        this.listaFiltrada = [];
        this.service.buscarXNombre(nombre).subscribe(
          (datos) =>{
            (this.datosFiltrados = datos.filter((dato) => {
              let filtrado = true;
              this.lista.forEach((dl) => {
  
                if (dato.id === dl.id) {
                  filtrado = false;
                  this.listaFiltrada.push(dl);
                }
              });
              return filtrado;
            }))
            this.totalRegistros = this.listaFiltrada.length;
          }
        );
      } else {
        this.calcularRangos();
      }
    }
  
    eliminar(e: E): void {
      Swal.fire({
        title: `Estas seguro de eliminar ${this.nombreEntity} ${e.nombre}?`,
        text: 'Esto no se podra revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.eliminar(e.id).subscribe(() => {
            this.calcularRangos();
          });
          Swal.fire('Eliminado!', `${e.nombre} fue borrado`, 'success');
        }
      });
    }
}
