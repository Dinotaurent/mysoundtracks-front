import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AlbumComponent } from './components/album/album.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { CancionComponent } from './components/cancion/cancion.component';
import { GeneroComponent } from './components/genero/genero.component';
import { LayoutModule } from './layout/layout.module';
import { ArtistaFormComponent } from './components/artista/artista-form.component';
import { AlbumFormComponent } from './components/album/album-form.component';
import { CancionFormComponent } from './components/cancion/cancion-form.component';
import { GeneroFormComponent } from './components/genero/genero-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent,
    ArtistaComponent,
    CancionComponent,
    GeneroComponent,
    GeneroFormComponent,
    ArtistaFormComponent,
    AlbumFormComponent,
    CancionFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
