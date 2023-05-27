import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Artista } from 'src/app/models/artista';
import { Genero } from 'src/app/models/genero';
import { GeneroService } from 'src/app/services/genero.service';
import { ArtistaService } from 'src/app/services/artista.service';

@Component({
  selector: 'app-asignar-artistas',
  templateUrl: './asignar-artistas.component.html',
  styles: [],
})
export class AsignarArtistasComponent implements OnInit {
  genero: Genero;
  artistaAsignar: Artista[] = [];
  artistasRegistrados: Artista[];
  mostrarColumnas = ['seleccion', 'nombre'];
  mostrarColumnasRegistrados = ['nombre', 'eliminar'];
  seleccion: SelectionModel<Artista> = new SelectionModel<Artista>(true, []);
  totalXPagina = [5, 10, 40, 100];
  tabIndex = 0;
  dataSource: MatTableDataSource<Artista>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private generoService: GeneroService,
    private artistaService: ArtistaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      const id: number = +p.get('id');
      this.generoService.listarXId(id).subscribe((g) => {
        this.genero = g;
        this.artistasRegistrados = this.genero.artistas;

        this.iniciarPaginador();
      });
    });
  }

  iniciarPaginador(): void {
    this.dataSource = new MatTableDataSource<Artista>(this.artistasRegistrados);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
  }

  filtrarArtistas(event: any): void {
    let nombre: string = (<HTMLInputElement>event.target).value;
    nombre = nombre !== undefined ? nombre.trim() : '';
    if (nombre !== '') {
      this.artistaService.buscarXNombre(nombre).subscribe(
        (artistas) =>
          (this.artistaAsignar = artistas.filter((a) => {
            let filtrado = true;
            this.artistasRegistrados.forEach((ar) => {
              if (a.id === ar.id) {
                filtrado = false;
              }
            });
            return filtrado;
          }))
      );
    }
  }

  todoSeleccionados(): boolean {
    const seleccionados = this.seleccion.selected.length;
    const numArtistas = this.artistaAsignar.length;
    return seleccionados === numArtistas;
  }

  seleccionarTodos(): void {
    this.todoSeleccionados()
      ? this.seleccion.clear()
      : this.artistaAsignar.forEach((e) => this.seleccion.select(e));
  }

  asignar(): void {
    this.generoService
      .asignarArtistas(this.genero.id, this.seleccion.selected)
      .subscribe(() => {
        this.artistasRegistrados = this.artistasRegistrados.concat(
          this.seleccion.selected
        );
        this.iniciarPaginador();
        this.artistaAsignar = [];
        this.seleccion.clear();
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    this.tabIndex = 0;
  }

  remover(artista: Artista): void {
    this.generoService.removerArtista(this.genero.id, artista).subscribe(() => {
      this.artistasRegistrados = this.artistasRegistrados.filter(
        (a) => a.id !== artista.id
      );
      this.iniciarPaginador();
      Swal.fire('Eliminado!', `${artista.nombre} fue borrado`, 'success');
    });
  }

  removerTodos(id: number): void {
    Swal.fire({
      title: 'Estas seguro de eliminar TODOS los artistas de este género ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.generoService.removerTodos(id).subscribe(() => {
          this.artistasRegistrados = this.artistasRegistrados.filter(
            (a) => this.artistasRegistrados != this.genero.artistas
          );
          this.iniciarPaginador();
        });
        Swal.fire(
          'Eliminados!',
          'Ahora este género musical esta vacio',
          'success'
        );
      }
    });
  }
}
