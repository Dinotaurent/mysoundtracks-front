import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GeneroComponent } from './components/genero/genero.component';
import { GeneroFormComponent } from './components/genero/genero-form.component';
import { AlbumComponent } from './components/album/album.component';
import { AlbumFormComponent } from './components/album/album-form.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { ArtistaFormComponent } from './components/artista/artista-form.component';
import { CancionComponent } from './components/cancion/cancion.component';
import { CancionFormComponent } from './components/cancion/cancion-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: HomeComponent },
  { path: 'generos', component: GeneroComponent },
  { path: 'generos/form', component: GeneroFormComponent },
  { path: 'generos/form/:id', component: GeneroFormComponent },
  { path: 'albumes', component: AlbumComponent },
  { path: 'albumes/form', component: AlbumFormComponent },
  { path: 'albumes/form/:id', component: AlbumFormComponent },
  { path: 'artistas', component: ArtistaComponent },
  { path: 'artistas/form', component: ArtistaFormComponent },
  { path: 'artistas/form/:id', component: ArtistaFormComponent },
  { path: 'canciones', component: CancionComponent },
  { path: 'canciones/form', component: CancionFormComponent },
  { path: 'canciones/form/:id', component: CancionFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
